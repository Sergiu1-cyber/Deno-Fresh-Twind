/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import TheNavigation from "../components/TheNavigation.tsx"


export default function About() {
  return (
    <div>
      <TheNavigation />
      <h1>About Page</h1>
      <h3>Deno e Cool</h3>
    </div>
  );
}