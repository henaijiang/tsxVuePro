import { Component, Vue } from "vue-property-decorator";

@Component
export default class FindMusic extends Vue {
  name = "FindMusic";
  render() {
    const vm = this;
    return <section>发现音乐</section>;
  }
}
