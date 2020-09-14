import { ThemeConfigDTO } from "./ThemeConfigDTO"

class ThemeColorDTO extends ThemeConfigDTO {
  //primary色及其相关色
  colorPrimary1: string = '';
  colorPrimary2: string = '';
  colorPrimary3: string = '';
  colorPrimary4: string = '';
  colorPrimary5: string = '';
  colorPrimary6: string = '';
  colorPrimary7: string = '';
  colorPrimary8: string = '';
  colorPrimary9: string = '';
  shadePrimaryColor: string = '';
  //success色及其相关色
  colorSuccess2: string = '';
  colorSuccess4: string = '';
  colorSuccess5: string = '';
  colorSuccess6: string = '';
  colorSuccessLight: string = '';
  colorSuccessLighter: string = '';
  shadeSuccessColor: string = '';
  //warning色及其相关色
  colorWarning2: string = '';
  colorWarning4: string = '';
  colorWarning5: string = '';
  colorWarning6: string = '';
  colorWarningLight: string = '';
  colorWarningLighter: string = '';
  shadeWarningColor: string = '';
  //danger色及其相关色
  colorDanger2: string = '';
  colorDanger4: string = '';
  colorDanger5: string = '';
  colorDanger6: string = '';
  colorDangerLight: string = '';
  colorDangerLighter: string = '';
  shadeDangerColor: string = '';
  //info色及其相关色
  colorInfo2: string = '';
  colorInfo4: string = '';
  colorInfo5: string = '';
  colorInfo6: string = '';
  colorInfoLight: string = '';
  colorInfoLighter: string = '';
  shadeInfoColor: string = '';

  constructor(
    {
      colorPrimary = '#409EFF', 
      colorSuccess = '#67C23A',
      colorWarning = '#E6A23C',
      colorDanger = '#F56C6C',
      colorInfo = '#909399',
      colorTextPrimary = '#303133',
      colorTextRegular = '#606266',
      colorTextSecondary = '#909399',
      colorTextPlaceholder = '#C0C4CC',
      borderColorBase = '#DCDFE6',
      borderColorLight = '#E4E7ED',
      borderColorLighter = '#EBEEF5',
      borderColorExtraLight = '#F2F6FC',
      backgroundColorBase = '#F5F7FA',
      colorWhite = '#FFFFFF',
      colorBlack = '#000000',
    }: 
    {
    colorPrimary?: string,
    colorSuccess?: string,
    colorWarning?: string,
    colorDanger?: string,
    colorInfo?: string,
    colorTextPrimary?: string,
    colorTextRegular?: string,
    colorTextSecondary?: string,
    colorTextPlaceholder?: string,
    borderColorBase?: string,
    borderColorLight?: string,
    borderColorLighter?: string,
    borderColorExtraLight?: string,
    backgroundColorBase?: string,
    colorWhite?: string,
    colorBlack?: string
    } = {}
  ) {
    super({colorPrimary, colorSuccess, colorWarning, colorDanger, colorInfo, colorTextPrimary, colorTextRegular, colorTextSecondary, colorTextPlaceholder, borderColorBase, borderColorLight, borderColorLighter, borderColorExtraLight, backgroundColorBase, colorWhite, colorBlack})

    this.colorPrimary1 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.1);
    this.colorPrimary2 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.2);
    this.colorPrimary3 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.3);
    this.colorPrimary4 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.4);
    this.colorPrimary5 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.5);
    this.colorPrimary6 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.6);
    this.colorPrimary7 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.7);
    this.colorPrimary8 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.8);
    this.colorPrimary9 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorPrimary, 0.9);
    this.shadePrimaryColor = ThemeColorDTO.shadeColor(this.colorPrimary, 0.1);

    this.colorSuccess2 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.2);
    this.colorSuccess4 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.4);
    this.colorSuccess5 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.5);
    this.colorSuccess6 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.6);
    this.colorSuccessLight = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.8);
    this.colorSuccessLighter = ThemeColorDTO.getMixColor(this.colorWhite, this.colorSuccess, 0.9);
    this.shadeSuccessColor = ThemeColorDTO.shadeColor(this.colorSuccess, 0.1);
    
    this.colorWarning2 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.2);
    this.colorWarning4 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.4);
    this.colorWarning5 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.5);
    this.colorWarning6 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.6);
    this.colorWarningLight = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.8);
    this.colorWarningLighter = ThemeColorDTO.getMixColor(this.colorWhite, this.colorWarning, 0.9);
    this.shadeWarningColor = ThemeColorDTO.shadeColor(this.colorWarning, 0.1);

    this.colorDanger2 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.2);
    this.colorDanger4 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.4);
    this.colorDanger5 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.5);
    this.colorDanger6 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.6);
    this.colorDangerLight = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.8);
    this.colorDangerLighter = ThemeColorDTO.getMixColor(this.colorWhite, this.colorDanger, 0.9);
    this.shadeDangerColor = ThemeColorDTO.shadeColor(this.colorDanger, 0.1);
    
    this.colorInfo2 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.2);
    this.colorInfo4 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.4);
    this.colorInfo5 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.5);
    this.colorInfo6 = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.6);
    this.colorInfoLight = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.8);
    this.colorInfoLighter = ThemeColorDTO.getMixColor(this.colorWhite, this.colorInfo, 0.9);
    this.shadeInfoColor = ThemeColorDTO.shadeColor(this.colorInfo, 0.1);

  }
  /**
   * 获取主要颜色与白色的混合色,参数与scss的mix函数一样
   */
  static getMixColor(c1: string, c2: string, ratio: number) {
    ratio = Math.max(Math.min(Number(ratio), 1), 0);
    let r1 = parseInt(c2.substring(1, 3), 16);
    let g1 = parseInt(c2.substring(3, 5), 16);
    let b1 = parseInt(c2.substring(5, 7), 16);
    let r2 = parseInt(c1.substring(1, 3), 16);
    let g2 = parseInt(c1.substring(3, 5), 16);
    let b2 = parseInt(c1.substring(5, 7), 16);
    let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    return '#' + ('0' + (r || 0).toString(16)).slice(-2) + ('0' + (g || 0).toString(16)).slice(-2) + ('0' + (b || 0).toString(16)).slice(-2)
  }
  /**获取阴影颜色 */
  static shadeColor = (color: string, shade: number) => {
    shade = Math.max(Math.min(Number(shade), 1), 0);
    let red = parseInt(color.slice(1, 3), 16)
    let green = parseInt(color.slice(3, 5), 16)
    let blue = parseInt(color.slice(5, 7), 16)

    red = Math.round((1 - shade) * red)
    green = Math.round((1 - shade) * green)
    blue = Math.round((1 - shade) * blue)

    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
  }
}
export { ThemeColorDTO }