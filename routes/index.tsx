/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

import TheNavigation from "../components/TheNavigation.tsx"
import Counter from "../islands/Counter.tsx";
import Component1 from "../components/Component1.tsx";


export default function Home() {
  return (
    <div class={tw`mx-auto max-w-screen-md`}>
      <TheNavigation />
      <div class={tw`p-4`}>
      <img
        src="/logo.svg"
        height="100px"
        alt="the fresh logo: a sliced lemon dripping with juice"
      />
      <Component1 />
      <h1>Fresh e Cool!</h1>
      <p class={tw`my-6`}>
        Fresh Funcționează  :)
      </p>
      <Counter start={3} />
      </div>
    </div>
  );
}
