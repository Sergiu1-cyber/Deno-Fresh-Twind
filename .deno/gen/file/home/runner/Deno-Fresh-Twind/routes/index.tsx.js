/** @jsx h */ import { h } from "preact";
import { tw } from "@twind";
import TheNavigation from "../components/TheNavigation.tsx";
import Counter from "../islands/Counter.tsx";
import Component1 from "../components/Component1.tsx";
export default function Home() {
    return /*#__PURE__*/ h("div", {
        class: tw`mx-auto max-w-screen-md`
    }, /*#__PURE__*/ h(TheNavigation, null), /*#__PURE__*/ h("div", {
        class: tw`p-4`
    }, /*#__PURE__*/ h("img", {
        src: "/logo.svg",
        height: "100px",
        alt: "the fresh logo: a sliced lemon dripping with juice"
    }), /*#__PURE__*/ h(Component1, null), /*#__PURE__*/ h("p", {
        class: tw`my-6`
    }, "Fresh Funcționează  :)"), /*#__PURE__*/ h(Counter, {
        start: 3
    })));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbGU6Ly8vaG9tZS9ydW5uZXIvRGVuby1GcmVzaC1Ud2luZC9yb3V0ZXMvaW5kZXgudHN4Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKiBAanN4IGggKi9cbmltcG9ydCB7IGggfSBmcm9tIFwicHJlYWN0XCI7XG5pbXBvcnQgeyB0dyB9IGZyb20gXCJAdHdpbmRcIjtcblxuaW1wb3J0IFRoZU5hdmlnYXRpb24gZnJvbSBcIi4uL2NvbXBvbmVudHMvVGhlTmF2aWdhdGlvbi50c3hcIlxuaW1wb3J0IENvdW50ZXIgZnJvbSBcIi4uL2lzbGFuZHMvQ291bnRlci50c3hcIjtcbmltcG9ydCBDb21wb25lbnQxIGZyb20gXCIuLi9jb21wb25lbnRzL0NvbXBvbmVudDEudHN4XCI7XG5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSG9tZSgpIHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzPXt0d2BteC1hdXRvIG1heC13LXNjcmVlbi1tZGB9PlxuICAgICAgPFRoZU5hdmlnYXRpb24gLz5cbiAgICAgIDxkaXYgY2xhc3M9e3R3YHAtNGB9PlxuICAgICAgPGltZ1xuICAgICAgICBzcmM9XCIvbG9nby5zdmdcIlxuICAgICAgICBoZWlnaHQ9XCIxMDBweFwiXG4gICAgICAgIGFsdD1cInRoZSBmcmVzaCBsb2dvOiBhIHNsaWNlZCBsZW1vbiBkcmlwcGluZyB3aXRoIGp1aWNlXCJcbiAgICAgIC8+XG4gICAgICA8Q29tcG9uZW50MSAvPlxuICAgICAgPHAgY2xhc3M9e3R3YG15LTZgfT5cbiAgICAgICAgRnJlc2ggRnVuY8ibaW9uZWF6xIMgIDopXG4gICAgICA8L3A+XG4gICAgICA8Q291bnRlciBzdGFydD17M30gLz5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGFBQWEsQ0FDYixTQUFTLENBQUMsUUFBUSxRQUFRLENBQUM7QUFDM0IsU0FBUyxFQUFFLFFBQVEsUUFBUSxDQUFDO0FBRTVCLE9BQU8sYUFBYSxNQUFNLGlDQUFpQyxDQUFBO0FBQzNELE9BQU8sT0FBTyxNQUFNLHdCQUF3QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLDhCQUE4QixDQUFDO0FBR3RELGVBQWUsU0FBUyxJQUFJLEdBQUc7SUFDN0IscUJBQ0UsQUFYSixDQUFhLENBV1IsS0FBRztRQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUM7cUJBQ3JDLEFBWk4sQ0FBYSxDQVlOLGFBQWEsT0FBRyxnQkFDakIsQUFiTixDQUFhLENBYU4sS0FBRztRQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDO3FCQUNuQixBQWROLENBQWEsQ0FjTixLQUFHO1FBQ0YsR0FBRyxFQUFDLFdBQVc7UUFDZixNQUFNLEVBQUMsT0FBTztRQUNkLEdBQUcsRUFBQyxvREFBb0Q7TUFDeEQsZ0JBQ0YsQUFuQk4sQ0FBYSxDQW1CTixVQUFVLE9BQUcsZ0JBQ2QsQUFwQk4sQ0FBYSxDQW9CTixHQUFDO1FBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUM7T0FBRSx3QkFFcEIsQ0FBSSxnQkFDSixBQXZCTixDQUFhLENBdUJOLE9BQU87UUFBQyxLQUFLLEVBQUUsQ0FBQztNQUFJLENBQ2YsQ0FDRixDQUNOO0NBQ0gsQ0FBQSJ9