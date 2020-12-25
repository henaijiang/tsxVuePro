import { Component, Vue } from 'vue-property-decorator';
import { Button } from "element-ui"

@Component
export default class index extends Vue {

  handleClick(route) {
    const vm = this;
    vm.$router.push(route);
  }

  render() {
    const vm = this;
    return (
      <div>
        <Button type="primary" on-click={()=>{vm.handleClick('/Three')}}>threejs</Button>
        <Button type="success" on-click={()=>{vm.handleClick('/MapboxGl')}}>MapboxGl</Button>
        <Button type="info" on-click={()=>{vm.handleClick('/Home')}}>Home</Button>
        <Button type="warning" on-click={()=>{vm.handleClick('/AntiShake')}}>AntiShake</Button>
        <Button type="danger" on-click={()=>{vm.handleClick('/Test')}}>Test</Button>
      </div>
    )
  }
}