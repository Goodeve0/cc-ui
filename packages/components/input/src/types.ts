import { ExtractPropTypes, PropType } from "vue";

export type InputSize = "small" | "default" | "large";
export type InputType =
  | "text"
  | "password"
  | "email"
  | "number"
  | "tel"
  | "url"
  | "search";

export interface InputProps {
  /** 输入框类型 */
  type?: InputType;
  /** 输入框尺寸 */
  size?: InputSize;
  /** 输入框的值 */
  modelValue?: string | number;
  /** 占位符文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 是否可清空 */
  clearable?: boolean;
  /** 是否显示密码切换按钮 */
  showPassword?: boolean;
  /** 输入框前缀图标 */
  prefixIcon?: string;
  /** 输入框后缀图标 */
  suffixIcon?: string;
  /** 最大输入长度 */
  maxlength?: number;
  /** 最小输入长度 */
  minlength?: number;
  /** 是否显示字数统计 */
  showWordLimit?: boolean;
  /** 输入框的 name 属性 */
  name?: string;
  /** 输入框的 id 属性 */
  id?: string;
  /** 自动完成属性 */
  autocomplete?: string;
  /** 自动聚焦 */
  autofocus?: boolean;
  /** 表单验证规则 */
  validateEvent?: boolean;
}

export const inputProps = {
  type: {
    type: String as PropType<InputType>,
    default: "text"
  },
  size: {
    type: String as PropType<InputSize>,
    default: "default"
  },
  modelValue: {
    type: [String, Number],
    default: ""
  },
  placeholder: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  readonly: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  showPassword: {
    type: Boolean,
    default: false
  },
  prefixIcon: {
    type: String,
    default: ""
  },
  suffixIcon: {
    type: String,
    default: ""
  },
  maxlength: {
    type: Number,
    default: undefined
  },
  minlength: {
    type: Number,
    default: undefined
  },
  showWordLimit: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    default: ""
  },
  id: {
    type: String,
    default: ""
  },
  autocomplete: {
    type: String,
    default: "off"
  },
  autofocus: {
    type: Boolean,
    default: false
  },
  validateEvent: {
    type: Boolean,
    default: true
  }
} as const;

export type InputPropsType = ExtractPropTypes<typeof inputProps>;

export type InputEmits = {
  "update:modelValue": [value: string];
  input: [value: string];
  change: [value: string];
  focus: [event: FocusEvent];
  blur: [event: FocusEvent];
  clear: [];
  keydown: [event: KeyboardEvent];
  keyup: [event: KeyboardEvent];
  enter: [event: KeyboardEvent];
};
