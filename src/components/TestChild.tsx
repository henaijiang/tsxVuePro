import { Component, Vue, Prop } from 'vue-property-decorator'
import { Form, Input, FormItem, Button, Checkbox } from "element-ui"
import ElTestDialog from "./ElTestDialog"
@Component
export default class TestChild extends Vue{
  @Prop({
    type: String,
    required: false
  })
  public msg!: string;

  public ruleForm: {
    inputVal: string
  } = {
    inputVal: ''
  }

  public propDialogData: {
    visible: boolean
  } = {
    visible: false
  }
  public check: boolean = false;
  public checkChange(val:any) {
    console.log('选中值：' + val)
  }
  public rules: any = {
    inputVal: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ]
  }
  public submitForm() {
    const vm = this;
    let form: any = vm.$refs['form'];
    form.validate( (valid: boolean ) =>{
      console.log(valid)
    })
  }
  /**获取vuexCount状态 */
  public get vuexCount() {
    return this.$store.getters.getCount
  }
  /**
   * activated
   */
  public activated() {
    console.log('激活了')
  }
  public openDialog() {
    this.propDialogData.visible = true
  }
  public render() {
    const vm = this;
    return (
      <div>
        <p>{'子组件渲染成功：'+ vm.msg}</p>
        <Form label-position="top" ref="form" {...{ props: { model: vm.ruleForm } }} rules={vm.rules}>
          <FormItem label="活动名称" prop="inputVal">
            <Input vModel={vm.ruleForm.inputVal}></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={vm.submitForm}>立即创建</Button>
          </FormItem>
          <FormItem>
            <Checkbox vModel={vm.check} onChange={vm.checkChange} />
          </FormItem>
        </Form>
        vuexCount的值：
        <p>{vm.vuexCount}</p>
        {this.$slots.header}
        {this.$slots.main}
        {(this.$scopedSlots as any).default('我是子组件传值内容')}
        {this.$slots.footer}
        <Button onClick={vm.openDialog}>打开dialog弹窗</Button>
        <ElTestDialog propDialog={vm.propDialogData} {...{on:{'update:visible': (visible: boolean)=>{vm.propDialogData.visible = visible} }}} />
      </div>
    )
  }
}