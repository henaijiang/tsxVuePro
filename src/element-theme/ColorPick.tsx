import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import "./elTheme.scss"
@Component
export default class ColorPick extends Vue{
  /**颜色值 */
  @Prop({
    type: String,
    required: true,
    default(){
      return ""
    }
  })
  public color!: string;
  /**标签值 */
  @Prop({
    type: String,
    required: true,
    default(){
      return ""
    }
  })
  public label!: string;
  /**pickColor组件值 */
  private get pickColor() {
    return this.color
  }
  private set pickColor(value) {
  }

  private inputFocus() {
    const vm = this;
    (vm.$refs.contentPick as any).showPicker = true;
  }

  private colorChange(color: string) {
    const vm = this;
    vm.$emit('colorChange', color)
  }

  render() {
    const vm = this;
    return(
      <section class="config">
        <div class="config-label">
          {vm.label}
        </div>
        <div class="config-content">
          <div class="content-80">
            <el-input nativeOnClick={vm.inputFocus} size="medium" readonly={true} v-model={vm.color} />
          </div>
          <div class="content-20">
            <el-color-picker on-change={vm.colorChange} ref="contentPick" size="medium" class="colorPick" popper-class="clearBut" color-format="hex" v-model={vm.pickColor}></el-color-picker>
          </div>
        </div>
      </section>
    )
  }
}