import { Component, Vue, Watch } from "vue-property-decorator";
import {
  Container,
  Header,
  Main,
  Aside,
  Menu,
  MenuItem,
  Submenu,
  Tabs,
  TabPane
} from "element-ui";
import "./index.scss";
import ResizeObserver from "resize-observer-polyfill";
import { Route } from "vue-router";
@Component
export default class Index extends Vue {
  /**当前时间 */
  timer: { day: string; hour: string } = { day: "", hour: "" };
  /**时间定时器 */
  clockInterval!: number;
  $refs!: {
    elScrollbar: Vue & { update: Function };
  };
  public get tabsViews(): Route[] {
    return this.$store.getters.getTabsViews;
  }
  mounted() {
    const vm = this;
    vm.setClock();
    vm.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      vm.menuHeight = entries[0].contentRect.height - 60;
      vm.$nextTick(() => {
        vm.$refs.elScrollbar.update();
      });
    });
    let el = document.querySelector(`body`);
    //开启监听
    if (el) vm.resizeObserver.observe(el);
  }
  /**设置时钟 */
  setClock() {
    const vm = this;
    if (vm.clockInterval) {
      clearInterval(vm.clockInterval);
    }
    vm.clockInterval = setInterval(() => {
      let time = new Date();
      vm.timer.day = `${time.getFullYear()}-${time.getMonth() +
        1}-${time.getDate()}`;
      vm.timer.hour = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    }, 1000);
  }
  beforeDestroy() {
    const vm = this;
    clearInterval(vm.clockInterval);
    let el = document.querySelector(`body`);
    //关闭监听
    if (el) vm.resizeObserver.unobserve(el);
  }
  resizeObserver!: ResizeObserver;
  menuHeight: number = 300;
  menuItems = [
    {
      name: "网易云音乐",
      route: "/",
      child: [
        { name: "发现音乐", route: "/" },
        { name: "我的音乐", route: "/my-music" }
      ]
    },
    {
      name: "3D测试",
      route: "/three",
      child: [{ name: "3D测试", route: "/three" }]
    },
    {
      name: "MapboxGl",
      route: "/mapboxGl",
      child: [{ name: "MapboxGl", route: "/mapboxGl" }]
    },
    { name: "home", route: "/home", child: [{ name: "home", route: "/home" }] },
    { name: "test", route: "/test", child: [{ name: "test", route: "/test" }] }
  ];
  get tabsValue() {
    return this.$route.path;
  }
  set tabsValue(value) {}
  /**移除标签 */
  removeTab(targetName: string) {
    const vm = this;
    let route = vm.tabsViews.find(tab => tab.path == targetName);
    let index = vm.tabsViews.findIndex(tab => tab.path == targetName);
    if (vm.tabsViews[index + 1]) {
      if (vm.$route.path != vm.tabsViews[index + 1].path) {
        vm.$router.push({ path: vm.tabsViews[index + 1].path });
      }
    } else {
      if (vm.$route.path != vm.tabsViews[index - 1].path) {
        vm.$router.push({ path: vm.tabsViews[index - 1].path });
      }
    }
    vm.$store.commit("removeTabViews", route);
  }
  tabClick(tab: TabPane) {
    const vm = this;
    let route = vm.tabsViews.find(route => route.meta.title == tab.label);
    if (route && vm.$route.path != route.path) {
      vm.$router.push({ path: route.path });
    }
  }
  render() {
    const vm = this;
    return (
      <Container class="container" direction="vertical">
        <Header class="container-header">
          <div class="user">
            {sessionStorage.getItem("loginUser") || "游客"}，你好！
          </div>
          <div class="clock">
            <span>{vm.timer.day}</span>
            <span>{vm.timer.hour}</span>
          </div>
        </Header>
        <section class="content-body">
          <Container>
            <Aside
              class="menu-aside"
              width="200px"
              style={{ height: `${vm.menuHeight}px` }}
            >
              <el-scrollbar ref="elScrollbar" style="height:100%">
                <Menu
                  default-active={vm.tabsValue}
                  router={true}
                  unique-opened={true}
                >
                  {vm.menuItems.map((item, i) => (
                    <Submenu index={i.toFixed()}>
                      <template slot="title">{item.name}</template>
                      {item.child.map(child => (
                        <MenuItem index={child.route}>{child.name}</MenuItem>
                      ))}
                    </Submenu>
                  ))}
                </Menu>
              </el-scrollbar>
            </Aside>
            <Main class="content-main" style={{ height: `${vm.menuHeight}px` }}>
              <Tabs
                type="card"
                on-tab-click={vm.tabClick}
                on-tab-remove={vm.removeTab}
                v-model={vm.tabsValue}
              >
                {vm.tabsViews.map(tab => (
                  <TabPane
                    key={tab.meta.title}
                    closable={tab.path !== "/"}
                    label={tab.meta.title}
                    name={tab.path}
                  ></TabPane>
                ))}
              </Tabs>
              <keep-alive>
                {vm.$route.meta.keepAlive && (
                  <router-view key={vm.$route.name} />
                )}
              </keep-alive>
              {!vm.$route.meta.keepAlive && (
                <router-view key={vm.$route.name} />
              )}
            </Main>
          </Container>
        </section>
      </Container>
    );
  }
}
