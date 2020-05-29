declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
/**解决ts中引入该文件报错找不到vue-grid-layout模块 */
declare module 'vue-grid-layout'
declare module '@jiaminghi/data-view'
declare module 'v-charts'
declare module 'v-charts/lib/histogram.common'

