import { join, Node, parse, Project, resolve } from "./src/dev/deps.ts";
import { error } from "./src/dev/error.ts";
import { freshImports, twindImports } from "./src/dev/imports.ts";
import { collect, ensureMinDenoVersion, generate } from "./src/dev/mod.ts";
ensureMinDenoVersion();
const help = `fresh-update

Update a Fresh project. This updates dependencies and optionally performs code
mods to update a project's source code to the latest recommended patterns.

To upgrade a projecct in the current directory, run:
  fresh-update .

USAGE:
    fresh-update <DIRECTORY>
`;
const flags = parse(Deno.args, {});
if (flags._.length !== 1) {
    error(help);
}
const unresolvedDirectory = Deno.args[0];
const resolvedDirectory = resolve(unresolvedDirectory);
// Update dependencies in the import map.
const IMPORT_MAP_PATH = join(resolvedDirectory, "import_map.json");
let importMapText = await Deno.readTextFile(IMPORT_MAP_PATH);
const importMap = JSON.parse(importMapText);
freshImports(importMap.imports);
if (importMap.imports["twind"]) {
    twindImports(importMap.imports);
}
importMapText = JSON.stringify(importMap, null, 2);
await Deno.writeTextFile(IMPORT_MAP_PATH, importMapText);
// Code mod for classic JSX -> automatic JSX.
const JSX_CODEMOD = `This project is using the classic JSX transform. Would you like to update to the
automatic JSX transform? This will remove the /** @jsx h */ pragma from your
source code and add the jsx: "react-jsx" compiler option to your deno.json file.`;
const DENO_JSON_PATH = join(resolvedDirectory, "deno.json");
let denoJsonText = await Deno.readTextFile(DENO_JSON_PATH);
const denoJson = JSON.parse(denoJsonText);
if (denoJson.compilerOptions?.jsx !== "react-jsx" && confirm(JSX_CODEMOD)) {
    console.log("Updating config file...");
    denoJson.compilerOptions = denoJson.compilerOptions || {};
    denoJson.compilerOptions.jsx = "react-jsx";
    denoJson.compilerOptions.jsxImportSource = "preact";
    denoJsonText = JSON.stringify(denoJson, null, 2);
    await Deno.writeTextFile(DENO_JSON_PATH, denoJsonText);
    const project = new Project();
    const sfs = project.addSourceFilesAtPaths(join(resolvedDirectory, "**", "*.{js,jsx,ts,tsx}"));
    for (const sf of sfs){
        for (const d of sf.getImportDeclarations()){
            if (d.getModuleSpecifierValue() !== "preact") continue;
            for (const n of d.getNamedImports()){
                const name = n.getName();
                if (name === "h" || name === "Fragment") n.remove();
            }
            if (d.getNamedImports().length === 0 && d.getNamespaceImport() === undefined && d.getDefaultImport() === undefined) {
                d.remove();
            }
        }
        let text = sf.getFullText();
        text = text.replaceAll("/** @jsx h */\n", "");
        text = text.replaceAll("/** @jsxFrag Fragment */\n", "");
        sf.replaceWithText(text);
        await sf.save();
    }
}
// Code mod for class={tw`border`} to class="border".
const TWIND_CODEMOD = `This project is using an old version of the twind integration. Would you like to
update to the new twind plugin? This will remove the 'class={tw\`border\`}'
boilerplate from your source code replace it with the simpler 'class="border"'.`;
if (importMap.imports["@twind"] && confirm(TWIND_CODEMOD)) {
    await Deno.remove(join(resolvedDirectory, importMap.imports["@twind"]));
    delete importMap.imports["@twind"];
    importMapText = JSON.stringify(importMap, null, 2);
    await Deno.writeTextFile(IMPORT_MAP_PATH, importMapText);
    const MAIN_TS = `/// <reference no-default-lib="true" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import { start } from "$fresh/server.ts";
import manifest from "./fresh.gen.ts";

import twindPlugin from "$fresh/plugins/twind.ts";
import twindConfig from "./twind.config.ts";

await start(manifest, { plugins: [twindPlugin(twindConfig)] });\n`;
    const MAIN_TS_PATH = join(resolvedDirectory, "main.ts");
    await Deno.writeTextFile(MAIN_TS_PATH, MAIN_TS);
    const TWIND_CONFIG_TS = `import { Options } from "$fresh/plugins/twind.ts";

  export default {
    selfURL: import.meta.url,
  } as Options;
  `;
    await Deno.writeTextFile(join(resolvedDirectory, "twind.config.ts"), TWIND_CONFIG_TS);
    const project1 = new Project();
    const sfs1 = project1.addSourceFilesAtPaths(join(resolvedDirectory, "**", "*.{js,jsx,ts,tsx}"));
    for (const sf1 of sfs1){
        const nodes = sf1.forEachDescendantAsArray();
        for (const n1 of nodes){
            if (!n1.wasForgotten() && Node.isJsxAttribute(n1)) {
                const init = n1.getInitializer();
                const name1 = n1.getName();
                if (Node.isJsxExpression(init) && (name1 === "class" || name1 === "className")) {
                    const expr = init.getExpression();
                    if (Node.isTaggedTemplateExpression(expr)) {
                        const tag = expr.getTag();
                        if (Node.isIdentifier(tag) && tag.getText() === "tw") {
                            const template = expr.getTemplate();
                            if (Node.isNoSubstitutionTemplateLiteral(template)) {
                                n1.setInitializer(`"${template.getLiteralValue()}"`);
                            }
                        }
                    } else if (expr?.getFullText() === `tw(props.class ?? "")`) {
                        n1.setInitializer(`{props.class}`);
                    }
                }
            }
        }
        const text1 = sf1.getFullText();
        const removeTw = [
            ...text1.matchAll(/tw[,\s`(]/g)
        ].length === 1;
        for (const d1 of sf1.getImportDeclarations()){
            if (d1.getModuleSpecifierValue() !== "@twind") continue;
            for (const n2 of d1.getNamedImports()){
                const name2 = n2.getName();
                if (name2 === "tw" && removeTw) n2.remove();
            }
            d1.setModuleSpecifier("twind");
            if (d1.getNamedImports().length === 0 && d1.getNamespaceImport() === undefined && d1.getDefaultImport() === undefined) {
                d1.remove();
            }
        }
        await sf1.save();
    }
}
const manifest = await collect(resolvedDirectory);
await generate(resolvedDirectory, manifest);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvZnJlc2hAMS4xLjIvdXBkYXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGpvaW4sIE5vZGUsIHBhcnNlLCBQcm9qZWN0LCByZXNvbHZlIH0gZnJvbSBcIi4vc3JjL2Rldi9kZXBzLnRzXCI7XG5pbXBvcnQgeyBlcnJvciB9IGZyb20gXCIuL3NyYy9kZXYvZXJyb3IudHNcIjtcbmltcG9ydCB7IGZyZXNoSW1wb3J0cywgdHdpbmRJbXBvcnRzIH0gZnJvbSBcIi4vc3JjL2Rldi9pbXBvcnRzLnRzXCI7XG5pbXBvcnQgeyBjb2xsZWN0LCBlbnN1cmVNaW5EZW5vVmVyc2lvbiwgZ2VuZXJhdGUgfSBmcm9tIFwiLi9zcmMvZGV2L21vZC50c1wiO1xuXG5lbnN1cmVNaW5EZW5vVmVyc2lvbigpO1xuXG5jb25zdCBoZWxwID0gYGZyZXNoLXVwZGF0ZVxuXG5VcGRhdGUgYSBGcmVzaCBwcm9qZWN0LiBUaGlzIHVwZGF0ZXMgZGVwZW5kZW5jaWVzIGFuZCBvcHRpb25hbGx5IHBlcmZvcm1zIGNvZGVcbm1vZHMgdG8gdXBkYXRlIGEgcHJvamVjdCdzIHNvdXJjZSBjb2RlIHRvIHRoZSBsYXRlc3QgcmVjb21tZW5kZWQgcGF0dGVybnMuXG5cblRvIHVwZ3JhZGUgYSBwcm9qZWNjdCBpbiB0aGUgY3VycmVudCBkaXJlY3RvcnksIHJ1bjpcbiAgZnJlc2gtdXBkYXRlIC5cblxuVVNBR0U6XG4gICAgZnJlc2gtdXBkYXRlIDxESVJFQ1RPUlk+XG5gO1xuXG5jb25zdCBmbGFncyA9IHBhcnNlKERlbm8uYXJncywge30pO1xuXG5pZiAoZmxhZ3MuXy5sZW5ndGggIT09IDEpIHtcbiAgZXJyb3IoaGVscCk7XG59XG5cbmNvbnN0IHVucmVzb2x2ZWREaXJlY3RvcnkgPSBEZW5vLmFyZ3NbMF07XG5jb25zdCByZXNvbHZlZERpcmVjdG9yeSA9IHJlc29sdmUodW5yZXNvbHZlZERpcmVjdG9yeSk7XG5cbi8vIFVwZGF0ZSBkZXBlbmRlbmNpZXMgaW4gdGhlIGltcG9ydCBtYXAuXG5jb25zdCBJTVBPUlRfTUFQX1BBVEggPSBqb2luKHJlc29sdmVkRGlyZWN0b3J5LCBcImltcG9ydF9tYXAuanNvblwiKTtcbmxldCBpbXBvcnRNYXBUZXh0ID0gYXdhaXQgRGVuby5yZWFkVGV4dEZpbGUoSU1QT1JUX01BUF9QQVRIKTtcbmNvbnN0IGltcG9ydE1hcCA9IEpTT04ucGFyc2UoaW1wb3J0TWFwVGV4dCk7XG5mcmVzaEltcG9ydHMoaW1wb3J0TWFwLmltcG9ydHMpO1xuaWYgKGltcG9ydE1hcC5pbXBvcnRzW1widHdpbmRcIl0pIHtcbiAgdHdpbmRJbXBvcnRzKGltcG9ydE1hcC5pbXBvcnRzKTtcbn1cbmltcG9ydE1hcFRleHQgPSBKU09OLnN0cmluZ2lmeShpbXBvcnRNYXAsIG51bGwsIDIpO1xuYXdhaXQgRGVuby53cml0ZVRleHRGaWxlKElNUE9SVF9NQVBfUEFUSCwgaW1wb3J0TWFwVGV4dCk7XG5cbi8vIENvZGUgbW9kIGZvciBjbGFzc2ljIEpTWCAtPiBhdXRvbWF0aWMgSlNYLlxuY29uc3QgSlNYX0NPREVNT0QgPVxuICBgVGhpcyBwcm9qZWN0IGlzIHVzaW5nIHRoZSBjbGFzc2ljIEpTWCB0cmFuc2Zvcm0uIFdvdWxkIHlvdSBsaWtlIHRvIHVwZGF0ZSB0byB0aGVcbmF1dG9tYXRpYyBKU1ggdHJhbnNmb3JtPyBUaGlzIHdpbGwgcmVtb3ZlIHRoZSAvKiogQGpzeCBoICovIHByYWdtYSBmcm9tIHlvdXJcbnNvdXJjZSBjb2RlIGFuZCBhZGQgdGhlIGpzeDogXCJyZWFjdC1qc3hcIiBjb21waWxlciBvcHRpb24gdG8geW91ciBkZW5vLmpzb24gZmlsZS5gO1xuY29uc3QgREVOT19KU09OX1BBVEggPSBqb2luKHJlc29sdmVkRGlyZWN0b3J5LCBcImRlbm8uanNvblwiKTtcbmxldCBkZW5vSnNvblRleHQgPSBhd2FpdCBEZW5vLnJlYWRUZXh0RmlsZShERU5PX0pTT05fUEFUSCk7XG5jb25zdCBkZW5vSnNvbiA9IEpTT04ucGFyc2UoZGVub0pzb25UZXh0KTtcbmlmIChkZW5vSnNvbi5jb21waWxlck9wdGlvbnM/LmpzeCAhPT0gXCJyZWFjdC1qc3hcIiAmJiBjb25maXJtKEpTWF9DT0RFTU9EKSkge1xuICBjb25zb2xlLmxvZyhcIlVwZGF0aW5nIGNvbmZpZyBmaWxlLi4uXCIpO1xuICBkZW5vSnNvbi5jb21waWxlck9wdGlvbnMgPSBkZW5vSnNvbi5jb21waWxlck9wdGlvbnMgfHwge307XG4gIGRlbm9Kc29uLmNvbXBpbGVyT3B0aW9ucy5qc3ggPSBcInJlYWN0LWpzeFwiO1xuICBkZW5vSnNvbi5jb21waWxlck9wdGlvbnMuanN4SW1wb3J0U291cmNlID0gXCJwcmVhY3RcIjtcbiAgZGVub0pzb25UZXh0ID0gSlNPTi5zdHJpbmdpZnkoZGVub0pzb24sIG51bGwsIDIpO1xuICBhd2FpdCBEZW5vLndyaXRlVGV4dEZpbGUoREVOT19KU09OX1BBVEgsIGRlbm9Kc29uVGV4dCk7XG5cbiAgY29uc3QgcHJvamVjdCA9IG5ldyBQcm9qZWN0KCk7XG4gIGNvbnN0IHNmcyA9IHByb2plY3QuYWRkU291cmNlRmlsZXNBdFBhdGhzKFxuICAgIGpvaW4ocmVzb2x2ZWREaXJlY3RvcnksIFwiKipcIiwgXCIqLntqcyxqc3gsdHMsdHN4fVwiKSxcbiAgKTtcblxuICBmb3IgKGNvbnN0IHNmIG9mIHNmcykge1xuICAgIGZvciAoY29uc3QgZCBvZiBzZi5nZXRJbXBvcnREZWNsYXJhdGlvbnMoKSkge1xuICAgICAgaWYgKGQuZ2V0TW9kdWxlU3BlY2lmaWVyVmFsdWUoKSAhPT0gXCJwcmVhY3RcIikgY29udGludWU7XG4gICAgICBmb3IgKGNvbnN0IG4gb2YgZC5nZXROYW1lZEltcG9ydHMoKSkge1xuICAgICAgICBjb25zdCBuYW1lID0gbi5nZXROYW1lKCk7XG4gICAgICAgIGlmIChuYW1lID09PSBcImhcIiB8fCBuYW1lID09PSBcIkZyYWdtZW50XCIpIG4ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBpZiAoXG4gICAgICAgIGQuZ2V0TmFtZWRJbXBvcnRzKCkubGVuZ3RoID09PSAwICYmXG4gICAgICAgIGQuZ2V0TmFtZXNwYWNlSW1wb3J0KCkgPT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBkLmdldERlZmF1bHRJbXBvcnQoKSA9PT0gdW5kZWZpbmVkXG4gICAgICApIHtcbiAgICAgICAgZC5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdGV4dCA9IHNmLmdldEZ1bGxUZXh0KCk7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZUFsbChcIi8qKiBAanN4IGggKi9cXG5cIiwgXCJcIik7XG4gICAgdGV4dCA9IHRleHQucmVwbGFjZUFsbChcIi8qKiBAanN4RnJhZyBGcmFnbWVudCAqL1xcblwiLCBcIlwiKTtcbiAgICBzZi5yZXBsYWNlV2l0aFRleHQodGV4dCk7XG5cbiAgICBhd2FpdCBzZi5zYXZlKCk7XG4gIH1cbn1cblxuLy8gQ29kZSBtb2QgZm9yIGNsYXNzPXt0d2Bib3JkZXJgfSB0byBjbGFzcz1cImJvcmRlclwiLlxuY29uc3QgVFdJTkRfQ09ERU1PRCA9XG4gIGBUaGlzIHByb2plY3QgaXMgdXNpbmcgYW4gb2xkIHZlcnNpb24gb2YgdGhlIHR3aW5kIGludGVncmF0aW9uLiBXb3VsZCB5b3UgbGlrZSB0b1xudXBkYXRlIHRvIHRoZSBuZXcgdHdpbmQgcGx1Z2luPyBUaGlzIHdpbGwgcmVtb3ZlIHRoZSAnY2xhc3M9e3R3XFxgYm9yZGVyXFxgfSdcbmJvaWxlcnBsYXRlIGZyb20geW91ciBzb3VyY2UgY29kZSByZXBsYWNlIGl0IHdpdGggdGhlIHNpbXBsZXIgJ2NsYXNzPVwiYm9yZGVyXCInLmA7XG5pZiAoaW1wb3J0TWFwLmltcG9ydHNbXCJAdHdpbmRcIl0gJiYgY29uZmlybShUV0lORF9DT0RFTU9EKSkge1xuICBhd2FpdCBEZW5vLnJlbW92ZShqb2luKHJlc29sdmVkRGlyZWN0b3J5LCBpbXBvcnRNYXAuaW1wb3J0c1tcIkB0d2luZFwiXSkpO1xuXG4gIGRlbGV0ZSBpbXBvcnRNYXAuaW1wb3J0c1tcIkB0d2luZFwiXTtcbiAgaW1wb3J0TWFwVGV4dCA9IEpTT04uc3RyaW5naWZ5KGltcG9ydE1hcCwgbnVsbCwgMik7XG4gIGF3YWl0IERlbm8ud3JpdGVUZXh0RmlsZShJTVBPUlRfTUFQX1BBVEgsIGltcG9ydE1hcFRleHQpO1xuXG4gIGNvbnN0IE1BSU5fVFMgPSBgLy8vIDxyZWZlcmVuY2Ugbm8tZGVmYXVsdC1saWI9XCJ0cnVlXCIgLz5cbi8vLyA8cmVmZXJlbmNlIGxpYj1cImRvbVwiIC8+XG4vLy8gPHJlZmVyZW5jZSBsaWI9XCJkb20uaXRlcmFibGVcIiAvPlxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZG9tLmFzeW5jaXRlcmFibGVcIiAvPlxuLy8vIDxyZWZlcmVuY2UgbGliPVwiZGVuby5uc1wiIC8+XG5cbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSBcIiRmcmVzaC9zZXJ2ZXIudHNcIjtcbmltcG9ydCBtYW5pZmVzdCBmcm9tIFwiLi9mcmVzaC5nZW4udHNcIjtcblxuaW1wb3J0IHR3aW5kUGx1Z2luIGZyb20gXCIkZnJlc2gvcGx1Z2lucy90d2luZC50c1wiO1xuaW1wb3J0IHR3aW5kQ29uZmlnIGZyb20gXCIuL3R3aW5kLmNvbmZpZy50c1wiO1xuXG5hd2FpdCBzdGFydChtYW5pZmVzdCwgeyBwbHVnaW5zOiBbdHdpbmRQbHVnaW4odHdpbmRDb25maWcpXSB9KTtcXG5gO1xuICBjb25zdCBNQUlOX1RTX1BBVEggPSBqb2luKHJlc29sdmVkRGlyZWN0b3J5LCBcIm1haW4udHNcIik7XG4gIGF3YWl0IERlbm8ud3JpdGVUZXh0RmlsZShNQUlOX1RTX1BBVEgsIE1BSU5fVFMpO1xuXG4gIGNvbnN0IFRXSU5EX0NPTkZJR19UUyA9IGBpbXBvcnQgeyBPcHRpb25zIH0gZnJvbSBcIiRmcmVzaC9wbHVnaW5zL3R3aW5kLnRzXCI7XG5cbiAgZXhwb3J0IGRlZmF1bHQge1xuICAgIHNlbGZVUkw6IGltcG9ydC5tZXRhLnVybCxcbiAgfSBhcyBPcHRpb25zO1xuICBgO1xuICBhd2FpdCBEZW5vLndyaXRlVGV4dEZpbGUoXG4gICAgam9pbihyZXNvbHZlZERpcmVjdG9yeSwgXCJ0d2luZC5jb25maWcudHNcIiksXG4gICAgVFdJTkRfQ09ORklHX1RTLFxuICApO1xuXG4gIGNvbnN0IHByb2plY3QgPSBuZXcgUHJvamVjdCgpO1xuICBjb25zdCBzZnMgPSBwcm9qZWN0LmFkZFNvdXJjZUZpbGVzQXRQYXRocyhcbiAgICBqb2luKHJlc29sdmVkRGlyZWN0b3J5LCBcIioqXCIsIFwiKi57anMsanN4LHRzLHRzeH1cIiksXG4gICk7XG5cbiAgZm9yIChjb25zdCBzZiBvZiBzZnMpIHtcbiAgICBjb25zdCBub2RlcyA9IHNmLmZvckVhY2hEZXNjZW5kYW50QXNBcnJheSgpO1xuICAgIGZvciAoY29uc3QgbiBvZiBub2Rlcykge1xuICAgICAgaWYgKCFuLndhc0ZvcmdvdHRlbigpICYmIE5vZGUuaXNKc3hBdHRyaWJ1dGUobikpIHtcbiAgICAgICAgY29uc3QgaW5pdCA9IG4uZ2V0SW5pdGlhbGl6ZXIoKTtcbiAgICAgICAgY29uc3QgbmFtZSA9IG4uZ2V0TmFtZSgpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgTm9kZS5pc0pzeEV4cHJlc3Npb24oaW5pdCkgJiZcbiAgICAgICAgICAobmFtZSA9PT0gXCJjbGFzc1wiIHx8IG5hbWUgPT09IFwiY2xhc3NOYW1lXCIpXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGV4cHIgPSBpbml0LmdldEV4cHJlc3Npb24oKTtcbiAgICAgICAgICBpZiAoTm9kZS5pc1RhZ2dlZFRlbXBsYXRlRXhwcmVzc2lvbihleHByKSkge1xuICAgICAgICAgICAgY29uc3QgdGFnID0gZXhwci5nZXRUYWcoKTtcbiAgICAgICAgICAgIGlmIChOb2RlLmlzSWRlbnRpZmllcih0YWcpICYmIHRhZy5nZXRUZXh0KCkgPT09IFwidHdcIikge1xuICAgICAgICAgICAgICBjb25zdCB0ZW1wbGF0ZSA9IGV4cHIuZ2V0VGVtcGxhdGUoKTtcbiAgICAgICAgICAgICAgaWYgKE5vZGUuaXNOb1N1YnN0aXR1dGlvblRlbXBsYXRlTGl0ZXJhbCh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBuLnNldEluaXRpYWxpemVyKGBcIiR7dGVtcGxhdGUuZ2V0TGl0ZXJhbFZhbHVlKCl9XCJgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZXhwcj8uZ2V0RnVsbFRleHQoKSA9PT0gYHR3KHByb3BzLmNsYXNzID8/IFwiXCIpYCkge1xuICAgICAgICAgICAgbi5zZXRJbml0aWFsaXplcihge3Byb3BzLmNsYXNzfWApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHRleHQgPSBzZi5nZXRGdWxsVGV4dCgpO1xuICAgIGNvbnN0IHJlbW92ZVR3ID0gWy4uLnRleHQubWF0Y2hBbGwoL3R3WyxcXHNgKF0vZyldLmxlbmd0aCA9PT0gMTtcblxuICAgIGZvciAoY29uc3QgZCBvZiBzZi5nZXRJbXBvcnREZWNsYXJhdGlvbnMoKSkge1xuICAgICAgaWYgKGQuZ2V0TW9kdWxlU3BlY2lmaWVyVmFsdWUoKSAhPT0gXCJAdHdpbmRcIikgY29udGludWU7XG4gICAgICBmb3IgKGNvbnN0IG4gb2YgZC5nZXROYW1lZEltcG9ydHMoKSkge1xuICAgICAgICBjb25zdCBuYW1lID0gbi5nZXROYW1lKCk7XG4gICAgICAgIGlmIChuYW1lID09PSBcInR3XCIgJiYgcmVtb3ZlVHcpIG4ucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICBkLnNldE1vZHVsZVNwZWNpZmllcihcInR3aW5kXCIpO1xuICAgICAgaWYgKFxuICAgICAgICBkLmdldE5hbWVkSW1wb3J0cygpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBkLmdldE5hbWVzcGFjZUltcG9ydCgpID09PSB1bmRlZmluZWQgJiZcbiAgICAgICAgZC5nZXREZWZhdWx0SW1wb3J0KCkgPT09IHVuZGVmaW5lZFxuICAgICAgKSB7XG4gICAgICAgIGQucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgc2Yuc2F2ZSgpO1xuICB9XG59XG5cbmNvbnN0IG1hbmlmZXN0ID0gYXdhaXQgY29sbGVjdChyZXNvbHZlZERpcmVjdG9yeSk7XG5hd2FpdCBnZW5lcmF0ZShyZXNvbHZlZERpcmVjdG9yeSwgbWFuaWZlc3QpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQVMsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sUUFBUSxtQkFBbUIsQ0FBQztBQUN4RSxTQUFTLEtBQUssUUFBUSxvQkFBb0IsQ0FBQztBQUMzQyxTQUFTLFlBQVksRUFBRSxZQUFZLFFBQVEsc0JBQXNCLENBQUM7QUFDbEUsU0FBUyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxRQUFRLGtCQUFrQixDQUFDO0FBRTNFLG9CQUFvQixFQUFFLENBQUM7QUFFdkIsTUFBTSxJQUFJLEdBQUcsQ0FBQzs7Ozs7Ozs7OztBQVVkLENBQUMsQUFBQztBQUVGLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxBQUFDO0FBRW5DLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO0lBQ3hCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztDQUNiO0FBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxBQUFDO0FBQ3pDLE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLG1CQUFtQixDQUFDLEFBQUM7QUFFdkQseUNBQXlDO0FBQ3pDLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxBQUFDO0FBQ25FLElBQUksYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQUFBQztBQUM3RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxBQUFD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