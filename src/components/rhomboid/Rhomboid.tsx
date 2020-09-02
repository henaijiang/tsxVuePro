import { Vue, Component, Prop } from "vue-property-decorator"
import "./rhomboid.scss"
@Component
export default class Rhomboid extends Vue{
  /**字体颜色 */
  @Prop({
    type: String,
    required: false,
    default(){
      return '#01c4e8'
    }
  })
  private textColor!: string;
  /**边框颜色 */
  @Prop({
    type: String,
    required: false,
    default(){
      return '#3883ae'
    }
  })
  private boxColor!: string;
  /**按钮内容 */
  @Prop({
    type: String,
    required: true,
    default(){
      return '按钮'
    }
  })
  private textLabel!: string;
  /**按钮图标 */
  @Prop({
    type: String,
    required: false,
    default(){
      return 'el-icon-edit'
    }
  })
  private iconClass!: string;
  /**单击事件 */
  private handleClick(e: MouseEvent) {
    const vm = this;
    vm.$emit('handleClick', e);
  }
  private render() {
    const vm = this;
    return (
      <div class="skew" on-click={vm.handleClick} style={{'--boxColor': vm.boxColor}}>
        <div class="skew-main" style={{color: vm.textColor}}>
          <i class={vm.iconClass}></i>&nbsp;&nbsp;{vm.textLabel}
        </div>
      </div>
    )
  }
}