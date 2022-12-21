/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function TheNavigation() {

  const meniu = [
    {name: "Home", href: "/"},
    {name: "About", href: "/about"},
    {name: "Contacts", href: "#"},
  ];
  
  return (
    <div class={tw`flex justify-between px-2 py-2 bg-green-300`} >
      <h1>🚀 Fresh</h1>
      <div>
        {meniu.map((item) => (
          <a
            href={item.href}
            key={item.href} 
            class={tw`mr-2`}>
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
