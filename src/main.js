// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import VeeValidate from 'vee-validate';

import BootstrapVue from 'bootstrap-vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import Toasted from 'vue-toasted';
import VCalendar from 'v-calendar';
import VueApexCharts from 'vue-apexcharts';

// import store from './store';
import router from './Routes';
import App from './App';
import layoutMixin from './mixins/layout';
import VueSessionStorage from "vue-sessionstorage";

Vue.use(VueSessionStorage);
Vue.use(VeeValidate);
Vue.use(BootstrapVue);
Vue.use(VCalendar, {
  firstDayOfWeek: 2
});
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyB7OXmzfQYua_1LEhRdqsoYzyJOPh9hGLg',
  },
});

Vue.component('apexchart', VueApexCharts);
Vue.mixin(layoutMixin);
Vue.use(Toasted, {duration: 10000});

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    sidebarClose: true,
    sidebarActiveElement: null,
    dashboarddata: [],
  },
  mutations: {
    increment (state, data) {
      state.dashboarddata = data;
    },
    update (state, data) {
      state.country = data;
    },
    setGroupData(state,data) {
      state.group_data = data
    },
    setCurrency(state,data){
      state.currency = data;
    },
    setGroupId(state,data){
      state.group_id = data
    },

switchSidebar(state, value) {
  if (value) {
    state.sidebarClose = value;
  } else {
    state.sidebarClose = !state.sidebarClose;
  }
},
changeSidebarActive(state, index) {                                                    
  state.sidebarActiveElement = index;
}
  },
actions: {
  switchSidebar({ commit }, value) {
    commit('switchSidebar', value);
  },
  changeSidebarActive({ commit }, index) {
    commit('changeSidebarActive', index);
  },
},
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
});
