import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { Button, Message, InputNumber } from "element-ui"
import TestChild from "./TestChild"
import { testChildDTO } from "../dto"
import { serverExp } from "../server"
import "./Test.scss"
import { HButton, HInput } from "tsvue-h-ui"
import Rhomboid from "./rhomboid/Rhomboid"
import PickColor from "./pickColor.vue"
import { getStyle } from "../element-theme/getStyle"
import { ThemeColorDTO } from "../element-theme/ThemeColorDTO"
import ElTheme from "../element-theme/ElTheme"
import { ThemeConfigDTO } from '@/element-theme/ThemeConfigDTO'
@Component
export default class test extends Vue {
  public msg: string = '';
  public num: number = 0;
  public value: string = '';
  public arr: Array<number> = [0]
  private color: string = "";
  private themeVisible: boolean = false;
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
  public listData: Array<any> = [];
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
    vm.themeVisible = true;
  }
  /**
   * created生命周期函数
   */
  public async created() {
    console.log('组件创建时created被调用')
    let person = {id: '123', name: 'xiaoming', age: 18};
    const per = new testChildDTO(person);
    // per.say();
    console.log(per)
    try{
      // const result: any = await serverExp.getCimList('',1,10);
      // this.listData = result.data.data;
    }catch(err) {
      throw new Error(err)
    }
  }
  /**
   * mounted生命周期函数
   */
  public mounted() {
    console.log('组件创建时mounted被调用')
    setTimeout(()=>{
      this.arr[0] = 666;
      console.log(this.arr[0]);
    },500)
    console.log(new ThemeColorDTO())
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
  private handleClick(e: MouseEvent) {
    console.log(e)
  }
  private themeConfig: ThemeConfigDTO = new ThemeConfigDTO()
  private themeConfigChange(colors: ThemeConfigDTO) {
    console.log(colors)
  }
  public render() {
    const vm = this;
    return (
      <div class="class1" style={{'--primarycolor': 'red'}}>
        <Rhomboid textLabel='测试' boxColor='red' on-handleClick={vm.handleClick} />
        <br />
        <Button type="primary" ref="button" onClick={vm.clickMethod}>点我换肤</Button>
        <br />
        <el-dialog width="30%" visible={vm.themeVisible} {...{on:{'update:visible': (visible: boolean)=>{vm.themeVisible = visible} }}}>
          <el-collapse>
            <ElTheme on-themeConfigChange={vm.themeConfigChange} themeConfig={vm.themeConfig} />
          </el-collapse>
        </el-dialog>
        {vm.num?(<p>{vm.num}：{vm.msg}</p>):null}
        <p>{vm.arr[0]}</p>
        <p>循环遍历数组</p>
        <ol>
          {vm.listData.map(list => <li key={list.id}>{list.name}</li>)}
        </ol>
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
        <HButton color={"red"} on-click={(e: MouseEvent)=>{console.log(e)}}>测试按钮</HButton>
        <HInput />
      </div>
    )
  }
}