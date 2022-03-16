/* eslint-disable */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/compat/app'
import store from './store'


Vue.config.productionTip = false

const config = {
  apiKey: "AIzaSyCQtHluI82iv-tXahX5Yl7PQTBxS-qlzx4",
  authDomain: "nagesen12107.firebaseapp.com",
  projectId: "nagesen12107",
  storageBucket: "nagesen12107.appspot.com",
  messagingSenderId: "742240357861",
  appId: "1:742240357861:web:637dbc64b6ac7b6ec4330c",
  measurementId: "G-FRW322JP9H"
};

firebase.initializeApp(config);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
