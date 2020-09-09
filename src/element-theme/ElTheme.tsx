import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { ThemeColorDTO } from "./ThemeColorDTO"
import { ThemeConfigDTO } from "./ThemeConfigDTO"
import ColorPick from "./ColorPick"
import { getStyle } from "./getStyle"
@Component
export default class ElTheme extends Vue{
  @Prop({
    type: Object,
    required: true,
    default(){
      return new ThemeConfigDTO()
    }
  })
  public themeConfig!: ThemeConfigDTO;
  /**监听颜色值变化执行style替换 */
  @Watch('themeConfig', {immediate: true, deep: true})
  private msgChange(newval: ThemeConfigDTO) {
    let newstyle = getStyle(new ThemeColorDTO(newval));
    let styleTag = document.getElementById('chalk-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.setAttribute('id', 'chalk-style');
      document.head.appendChild(styleTag);
    }
    styleTag.innerText = newstyle;

    this.$emit('themeConfigChange', newval);
  }
  /**主题色变化 */
  private colorPrimaryChange(value: string) {
    const vm = this;
    vm.themeConfig.colorPrimary = value;
  }
  /**成功色变化 */
  private colorSuccessChange(value: string) {
    const vm = this;
    vm.themeConfig.colorSuccess = value;
  }
  /**警告色变化 */
  private colorWarningChange(value: string) {
    const vm = this;
    vm.themeConfig.colorWarning = value;
  }
  /**危险色变化 */
  private colorDangerChange(value: string) {
    const vm = this;
    vm.themeConfig.colorDanger = value;
  }
  /**信息色变化 */
  private colorInfoChange(value: string) {
    const vm = this;
    vm.themeConfig.colorInfo = value;
  }
  /**主要文字色变化 */
  private colorTextPrimaryChange(value: string) {
    const vm = this;
    vm.themeConfig.colorTextPrimary = value;
  }
  /**常规文字色变化 */
  private colorTextRegularChange(value: string) {
    const vm = this;
    vm.themeConfig.colorTextRegular = value;
  }
  /**次要文字色变化 */
  private colorTextSecondaryChange(value: string) {
    const vm = this;
    vm.themeConfig.colorTextSecondary = value;
  }
  /**占位文字色变化 */
  private colorTextPlaceholderChange(value: string) {
    const vm = this;
    vm.themeConfig.colorTextPlaceholder = value;
  }
  /**一级边框颜色变化 */
  private borderColorBaseChange(value: string) {
    const vm = this;
    vm.themeConfig.borderColorBase = value;
  }
  /**二级边框颜色变化 */
  private borderColorLightChange(value: string) {
    const vm = this;
    vm.themeConfig.borderColorLight = value;
  }
  /**三级边框颜色变化 */
  private borderColorLighterChange(value: string) {
    const vm = this;
    vm.themeConfig.borderColorLighter = value;
  }
  /**四级边框颜色变化 */
  private borderColorExtraLightChange(value: string) {
    const vm = this;
    vm.themeConfig.borderColorExtraLight = value;
  }
  /**基础白色变化 */
  private colorWhiteChange(value: string) {
    const vm = this;
    vm.themeConfig.colorWhite = value;
  }
  /**基础黑色变化 */
  private colorBlackChange(value: string) {
    const vm = this;
    vm.themeConfig.colorBlack = value;
  }
  /**基础背景色变化 */
  private backgroundColorBaseChange(value: string) {
    const vm = this;
    vm.themeConfig.backgroundColorBase = value;
  }
  /**颜色重置 */
  public resetColor() {
    const vm = this;
    const configColor = new ThemeConfigDTO();
    Object.assign(vm.themeConfig, configColor);
  }

  render() {
    const vm = this;
    return(
      <el-collapse-item title="主题颜色">

        <ColorPick label="主题色" on-colorChange={vm.colorPrimaryChange} color={vm.themeConfig.colorPrimary} />

        <ColorPick label="成功颜色" on-colorChange={vm.colorSuccessChange} color={vm.themeConfig.colorSuccess} />

        <ColorPick label="警告颜色" on-colorChange={vm.colorWarningChange} color={vm.themeConfig.colorWarning} />

        <ColorPick label="危险颜色" on-colorChange={vm.colorDangerChange} color={vm.themeConfig.colorDanger} />

        <ColorPick label="信息颜色" on-colorChange={vm.colorInfoChange} color={vm.themeConfig.colorInfo} />

        <ColorPick label="主要文字颜色" on-colorChange={vm.colorTextPrimaryChange} color={vm.themeConfig.colorTextPrimary} />

        <ColorPick label="常规文字颜色" on-colorChange={vm.colorTextRegularChange} color={vm.themeConfig.colorTextRegular} />

        <ColorPick label="次要文字颜色" on-colorChange={vm.colorTextSecondaryChange} color={vm.themeConfig.colorTextSecondary} />

        <ColorPick label="占位文字颜色" on-colorChange={vm.colorTextPlaceholderChange} color={vm.themeConfig.colorTextPlaceholder} />

        <ColorPick label="一级边框颜色" on-colorChange={vm.borderColorBaseChange} color={vm.themeConfig.borderColorBase} />

        <ColorPick label="二级边框颜色" on-colorChange={vm.borderColorLightChange} color={vm.themeConfig.borderColorLight} />

        <ColorPick label="三级边框颜色" on-colorChange={vm.borderColorLighterChange} color={vm.themeConfig.borderColorLighter} />

        <ColorPick label="四级边框颜色" on-colorChange={vm.borderColorExtraLightChange} color={vm.themeConfig.borderColorExtraLight} />

        <ColorPick label="基础白色" on-colorChange={vm.colorWhiteChange} color={vm.themeConfig.colorWhite} />

        <ColorPick label="基础黑色" on-colorChange={vm.colorBlackChange} color={vm.themeConfig.colorBlack} />

        <ColorPick label="基础背景色" on-colorChange={vm.backgroundColorBaseChange} color={vm.themeConfig.backgroundColorBase} />
      </el-collapse-item>
    )
  }
}