import { ExtractPropTypes, PropType } from "vue";

export type CardSize = "small" | "default" | "large";

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
    type: Object,
    default: () => ({})
  },
  shadow: {
    type: String as PropType<"always" | "hover" | "never">,
    default: "never"
  },
  hoverable: {
    type: Boolean,
    default: false
  }
};

export type CardProps = ExtractPropTypes<typeof cardProps>;
