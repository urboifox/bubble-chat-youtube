import { writable } from "svelte/store";

export type Options = {
  dir: "ltr" | "rtl";
};

const options = writable<Options>({ dir: "ltr" });

function switchDirection(dir?: "ltr" | "rtl") {
  options.update((options) => {
    return { ...options, dir: dir || options.dir === "ltr" ? "rtl" : "ltr" };
  });
}

export { options, switchDirection };
