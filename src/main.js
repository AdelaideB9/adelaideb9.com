import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import { VueShowdownPlugin } from "vue-showdown";

import "./index.css";
import "vue-toastification/dist/index.css";

const clickOutside = {
  beforeMount: (el, binding) => {
    el.clickOutsideEvent = (event) => {
      if (!(el == event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener("click", el.clickOutsideEvent);
  },
  unmounted: (el) => {
    document.removeEventListener("click", el.clickOutsideEvent);
  },
};

const app = createApp(App);

app.directive("click-outside", clickOutside);

app.use(store);
app.use(router);
app.use(Toast, { position: POSITION.TOP_CENTER });
app.use(VueShowdownPlugin);
app.mount("#app");
