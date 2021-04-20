import { Component, Vue } from "vue-property-decorator";
import { Container, Main, Aside, Menu, MenuItem } from "element-ui";
import "../../App.scss";
import ResizeObserver from "resize-observer-polyfill";
import "./mainContainer.scss";

@Component
export default class MainContainer extends Vue {
  resizeObserver!: ResizeObserver;
  menuHeight: number = 300;
  menuItems = [
    { name: "首页", route: "/main" },
    { name: "3D测试", route: "/three" },
    { name: "MapboxGl", route: "/mapboxGl" },
    { name: "home", route: "/home" },
    { name: "test", route: "/test" }
  ];
  mounted() {
    const vm = this;
    vm.resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      vm.menuHeight = entries[0].contentRect.height - 60;
    });
    let el = document.querySelector(`body`);
    //开启监听
    if (el) vm.resizeObserver.observe(el);
  }
  beforeDestroy() {
    const vm = this;
    let el = document.querySelector(`body`);
    //关闭监听
    if (el) vm.resizeObserver.unobserve(el);
  }
  render() {
    const vm = this;
    return (
      <section class="content-body">
        <Container>
          <Aside
            class="menu-aside"
            width="200px"
            style={{ height: `${vm.menuHeight}px` }}
          >
            <el-scrollbar style="height:100%">
              <Menu router={true} default-active={vm.$route.path}>
                {vm.menuItems.map(item => (
                  <MenuItem index={item.route}>{item.name}</MenuItem>
                ))}
              </Menu>
            </el-scrollbar>
          </Aside>
          <Main class="content-main" style={{ height: `${vm.menuHeight}px` }}>
            {this.$route.meta.keepAlive ? (
              <keep-alive>
                <router-view key={this.$route.name}></router-view>
              </keep-alive>
            ) : (
              <router-view key={this.$route.name}></router-view>
            )}
          </Main>
        </Container>
      </section>
    );
  }
}
