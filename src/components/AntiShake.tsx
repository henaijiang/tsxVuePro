import { Vue, Component } from "vue-property-decorator"
import { Input } from 'element-ui'
import { debounce, throttle } from "../debounce"
@Component
export default class AntiShake extends Vue{
  public inputText1: string = ""
  public inputText2: string = ""
  
  private inputTextChange1(val: string){
    const vm = this;
    console.log('防抖：' + vm.inputText1);
  }

  private inputTextChange2(val: string){
    const vm = this;
    console.log('节流：' + vm.inputText2);
  }

  public created() {
    const vm = this;
    /**tsx文件中使用防抖 */
    vm.inputTextChange1 = debounce(vm.inputTextChange1);
    /**tsx文件中使用节流 */
    vm.inputTextChange2 = throttle(vm.inputTextChange2);
  }

  public render() {
    const vm = this;
    return (
      <div>
        <h1>防抖</h1>
          <Input v-model={vm.inputText1} onInput={ vm.inputTextChange1 } />
        <h1>节流</h1>
          <Input v-model={vm.inputText2} onInput={ vm.inputTextChange2 } />
      </div>
    )
  }
}