import { Component, Vue } from "vue-property-decorator";

@Component
export default class MyMusic extends Vue {
  render() {
    const vm = this;
    return <section>我的音乐</section>;
  }
}
