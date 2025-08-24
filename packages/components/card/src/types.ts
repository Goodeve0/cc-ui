import { ExtractPropTypes, PropType } from "vue";

export type CardSize = "small" | "default" | "large";
export type CardShadow = "always" | "hover" | "never";

export interface CardProps {
  /** 卡片头部内容 */
  header?: string;
  /** 卡片标题 */
  title?: string;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 卡片尺寸 */
  size?: CardSize;
  /** 卡片右上角操作区域 */
  extra?: string;
  /** 设置卡片 body 的样式 */
  bodyStyle?: Record<string, any>;
  /** 设置阴影显示时机 */
  shadow?: CardShadow;
  /** 鼠标悬停时是否显示阴影 */
  hoverable?: boolean;
}

export const cardProps = {
  header: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: ""
  },
  bordered: {
    type: Boolean,
    default: true
  },
  size: {
    type: String as PropType<CardSize>,
    default: "default"
  },
  extra: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: Object as PropType<Record<string, any>>,
    default: () => ({})
  },
  shadow: {
    type: String as PropType<CardShadow>,
    default: "never"
  },
  hoverable: {
    type: Boolean,
    default: false
  }
} as const;

export type CardPropsType = ExtractPropTypes<typeof cardProps>;
