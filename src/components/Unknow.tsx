import { Component, Vue } from "vue-property-decorator";

@Component
export default class Unknow extends Vue {
  render() {
    return <div>404，找不到该页面</div>;
  }
}
