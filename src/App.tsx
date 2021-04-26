import { Component, Vue } from "vue-property-decorator";
import "./App.scss";
@Component
export default class App extends Vue {
  public get cachedViews() {
    return this.$store.getters.getCachedViewsNane;
  }
  render() {
    const vm = this;
    return (
      <keep-alive include={vm.cachedViews}>
        <router-view key={vm.$route.name} />
      </keep-alive>
    );
  }
}
