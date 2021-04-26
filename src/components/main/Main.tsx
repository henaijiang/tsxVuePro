import { Component, Vue } from "vue-property-decorator";
import { Tabs, TabPane } from "element-ui";

@Component({ name: "Main" })
export default class Main extends Vue {
  name = "Main";
  topList = [
    { name: "发现音乐", route: "/main" },
    { name: "我的音乐", route: "/main/my-music" }
  ];
  tabModel: string = "/main";

  handleClickTab(tab: TabPane) {
    this.$router.push({ path: tab.name });
  }
  render() {
    const vm = this;
    return (
      <section>
        <keep-alive>
          <router-view key={vm.$route.name} />
        </keep-alive>
      </section>
    );
  }
}
