import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import Paginate from "vuejs-paginate";
import router from "./router";
import store from "./store";
import dataFilter from "@/filters/date.filter";
import messagePlugin from "@/utils/message.plugin";
import currencyFilter from "./filters/currency.filter";
import firebase from "firebase/app";
import Loader from "@/components/app/Loader";
import tooltipDirective from "@/directives/tooltip.directive";
import "./registerServiceWorker";
import "materialize-css/dist/js/materialize.min";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.filter("date", dataFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);
Vue.directive("tooltip", tooltipDirective);
Vue.component("Loader", Loader);
Vue.component("Paginate", Paginate);

firebase.initializeApp({
  apiKey: "AIzaSyCy4HBEhc_qSOMpsqIU1EoD6XCeixPsr1g",
  authDomain: "vue-stud.firebaseapp.com",
  databaseURL: "https://vue-stud.firebaseio.com",
  projectId: "vue-stud",
  storageBucket: "vue-stud.appspot.com",
  messagingSenderId: "297227169637",
  appId: "1:297227169637:web:d8ac037ae821174b96bb8c",
  measurementId: "G-01572Z73QC",
});

let app;

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
