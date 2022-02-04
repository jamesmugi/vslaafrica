export default {
  namespaced: true,
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
    switchSidebar(state, value) {
      if (value) {
        state.sidebarClose = value;
      } else {
        state.sidebarClose = !state.sidebarClose;
      }
    },
    changeSidebarActive(state, index) {                                                    
      state.sidebarActiveElement = index;
    },
    increment (state, data) {
      state.dashboarddata = data;
    },
    update (state, data) {
      state.country = data;
    },
  },
  actions: {
    switchSidebar({ commit }, value) {
      commit('switchSidebar', value);
    },
    changeSidebarActive({ commit }, index) {
      commit('changeSidebarActive', index);
    },
  },
};
