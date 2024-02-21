import "./assets/main.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "@/assets/layout/layout.scss";

import OneSignalVuePlugin from "@onesignal/onesignal-vue3";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import PrimeVueConfigurator from "./PrimeVueConfigurator";

const pinia = createPinia();

const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(OneSignalVuePlugin, {
  appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
});

PrimeVueConfigurator.init(app);

app.mount("#app");
