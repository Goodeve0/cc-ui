import type Input from "./input.vue";

export type InputInstance = InstanceType<typeof Input>;

export interface InputExpose {
  focus: () => void;
  blur: () => void;
  select: () => void;
  inputRef: HTMLInputElement | undefined;
}
