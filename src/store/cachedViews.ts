import { RouteRecord, Route } from "vue-router";
import { Commit } from "vuex";
/**需要缓存的页面 */
export default {
  state: {
    cachedViews: [],
    cachedViewsName: []
  },
  mutations: {
    /**添加tabs标签 */
    addTabsViews(state: { cachedViews: Route[] }, view: Route) {
      if (!state.cachedViews.find(element => element.name == view.name)) {
        state.cachedViews.push(view);
      }
    },
    /**移除tabs标签 */
    removeTabViews(state: { cachedViews: Route[] }, view: Route) {
      let index = state.cachedViews.findIndex(
        element => element.name == view.name
      );
      state.cachedViews.splice(index, 1);
    },
    /**添加缓存组件名称 */
    addCachedViewsName(
      state: { cachedViewsName: string[] },
      view: RouteRecord
    ) {
      let name = view.components.default.name;
      if (name) {
        if (!state.cachedViewsName.find(item => item == name)) {
          state.cachedViewsName.push(name);
        }
      }
    }
  },
  getters: {
    getTabsViews(state: { cachedViews: RouteRecord[] }) {
      return state.cachedViews;
    },
    getCachedViewsNane(state: { cachedViewsName: string[] }) {
      return state.cachedViewsName;
    }
  },
  actions: {
    addCachedViewsName({ commit }: { commit: Commit }, view: RouteRecord) {
      commit("addCachedViewsName", view);
    }
  }
};
