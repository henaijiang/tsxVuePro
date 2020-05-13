import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Button, Message, InputNumber } from "element-ui"
import TestChild from "./TestChild"
import { testChildDTO } from "../dto"
import "./Test.scss"
@Component
export default class test extends Vue {
  public msg: string = '';
  public num: number = 0;
  public value: string = '';
  public arr: Array<number> = [0]
  /**
   * prop用法
   */
  @Prop({
    type: String,
    required: false,
    default() {
      return ''
    }
  }) 
  public propVal!: string
  /**
   * watch监听
   */
  @Watch('num', {immediate: true})
  protected msgChange(newval: number) {
    console.log('监听值：'+newval)
  }

  /**
   * computed使用方法
   */
  public get valueChange() {
    this.value = this.num + '22312'
    let msg = `计算属性值：${this.value}`
    return msg
  }

  /**获取vuexCount状态 */
  public get vuexCount() {
    return this.$store.getters.getCount
  }
  /**修改vuexCount状态 */
  public set vuexCount(value) {
    this.$store.commit('changeCount', value)
  }
  /**
   * methods方法
   */
  private clickMethod() {
    const vm = this;
    vm.msg = '点击我了';
    Message({message: vm.msg, type: 'success'})
    vm.num++;
    console.log('prop值：'+this.propVal);
  }
  /**
   * created生命周期函数
   */
  public created() {
    console.log('组件创建时created被调用')
    let person = {id: '123', name: 'xiaoming', age: 18};
    const per = new testChildDTO(person);
    // per.say();
    console.log(per)
  }
  /**
   * mounted生命周期函数
   */
  public mounted() {
    console.log('组件创建时mounted被调用')
    setTimeout(()=>{
      this.arr[0] = 666;
      console.log(this.arr[0]);
    },3000)
  }
  /**
   * beforeDestroy
   */
  public beforeDestroy() {
    console.log('销毁了')
  }
  public goToChild() {
    const vm = this;
    vm.$router.push({path: '/TestChild'})
  }
  public slotProp: any = ""
  public render() {
    const vm = this;
    return (
      <div class="class1">
        <Button ref="button" class="class2" title='电蚊拍' onClick={vm.clickMethod}>点我</Button>
        <br />
        {vm.num?(<p>{vm.num}：{vm.msg}</p>):null}
        <p>{vm.arr[0]}</p>
        <TestChild msg={vm.valueChange} scopedSlots={{default: (props: any) => {
          return (
            <div style="line-height: 60px;">
              {props}
            </div>
          );
        }}}>
          <p style={{color:'red'}} slot="header">我是插槽header内容</p>
          <p style={{color:'blue'}} slot="main">我是插槽main内容</p>
          <p style={{color:'black'}} slot="footer">我是插槽footer内容</p>
        </TestChild>
        <InputNumber v-model={vm.vuexCount}></InputNumber>
      </div>
    )
  }
}