import { createApp } from "vue";
import { createPinia } from "pinia";
import * as NaiveUI from "naive-ui";
import App from "./App.vue";
import router from "./router";
import i18n from "./i18n";
import "./style.css";

const app = createApp(App);

Object.entries(NaiveUI).forEach(([key, component]) => {
  if (key.startsWith("N") && component?.name) {
    app.component(key, component);
  }
});

app.use(createPinia());
app.use(i18n);
app.use(router);
app.mount("#app");
