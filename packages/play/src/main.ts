import { createApp } from "vue";
import App from "./app.vue";
import { CButton } from "c-ui";
import { CTree } from "c-ui";

const app = createApp(App);
app.use(CButton as any);
app.use(CTree as any);
app.mount("#app");
