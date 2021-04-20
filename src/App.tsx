import { Component, Vue } from "vue-property-decorator";
import { Container, Header, Main, Aside } from "element-ui";
import "./App.scss";
@Component
export default class App extends Vue {
  /**当前时间 */
  timer: { day: string; hour: string } = { day: "", hour: "" };
  /**时间定时器 */
  clockInterval!: number;
  mounted() {
    const vm = this;
    vm.setClock();
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
        <router-view key={this.$route.name}></router-view>
      </Container>
    );
  }
}
