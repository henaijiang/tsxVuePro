import { Vue, Component, Prop } from "vue-property-decorator"
import { Dialog, Button } from "element-ui"
@Component
export default class ElTestDialog extends Vue{
  @Prop({
    type: Object,
    required: true,
    default() {
      return {visible: false};
    }
  })
  public propDialog!: {visible: boolean};

  public render() {
    const vm = this
    return (
      <Dialog
        title="提示"
        close-on-click-modal={false}
        visible={vm.propDialog.visible}
        {...{on:{'update:visible': (visible: boolean)=>{vm.propDialog.visible = visible} }}}
        width="50%"
        >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <Button on-click={()=>{vm.propDialog.visible = false}}>取 消</Button>
        </span>
      </Dialog>
    )
  }

}