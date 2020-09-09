class ThemeConfigDTO {
  //primary色
  colorPrimary: string = '';
  //success色
  colorSuccess: string = '';
  //warning色
  colorWarning: string = '';
  //danger色
  colorDanger: string = '';
  //info色
  colorInfo: string = '';
  //color-text-primary色
  colorTextPrimary: string = '';
  //color-text-regular色
  colorTextRegular: string = '';
  //color-text-secondary色
  colorTextSecondary: string = '';
  //color-text-placeholder色
  colorTextPlaceholder: string = '';
  //border-color-base色
  borderColorBase: string = '';
  //border-color-light色
  borderColorLight: string = '';
  //border-color-lighter色
  borderColorLighter: string = '';
  //border-color-extra-light色
  borderColorExtraLight: string = '';
  //background-color-base色
  backgroundColorBase: string = '';
  //color-white色
  colorWhite: string = '';
  //color-black色
  colorBlack: string = '';
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
    this.colorWhite = colorWhite;

    this.colorBlack = colorBlack;

    this.colorPrimary = colorPrimary;

    this.colorSuccess = colorSuccess;

    this.colorWarning = colorWarning;

    this.colorDanger = colorDanger;

    this.colorInfo = colorInfo;

    this.colorTextPrimary = colorTextPrimary;

    this.colorTextRegular = colorTextRegular;

    this.colorTextSecondary = colorTextSecondary;

    this.colorTextPlaceholder = colorTextPlaceholder;

    this.borderColorBase = borderColorBase;

    this.borderColorLight = borderColorLight;

    this.borderColorLighter = borderColorLighter;

    this.borderColorExtraLight = borderColorExtraLight;

    this.backgroundColorBase = backgroundColorBase;
  }
}
export { ThemeConfigDTO }