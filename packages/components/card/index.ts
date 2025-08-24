import Card from "./src/card.vue";
import { withInstall } from "@c-ui/utils";

export const CCard = withInstall(Card);
export default CCard;

// 导出类型定义
export * from "./src/types";
export * from "./src/interface";
