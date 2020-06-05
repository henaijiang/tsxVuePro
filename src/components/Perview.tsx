import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import VueGridLayout from 'vue-grid-layout'
import { v1 } from "uuid"
import { Button } from "element-ui"
import screenfull from 'screenfull'
Vue.use(VueGridLayout)
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
const colNum = 12;
@Component
export default class Perview extends Vue{
  @Prop()
  public layoutData!: Array<any>

  @Watch("layoutData")
  public async layoutDataChange(){
    const vm = this;
    vm.loading = true;
    /**增加一定延迟，使dataV组件能正常加载 */
    setTimeout(()=>{
      vm.layoutData.forEach(item=>{
        item.key = v1();
        vm.registerComponent(item);
      })
      vm.loading = false;
    },200)
  }

  /**加载状态 */
  public loading: boolean = false
  /**mounted */
  public mounted() {
    const vm = this;
    window.addEventListener("resize", vm.layoutDataChange);
  }
  /**beforeDestroy */
  public beforeDestroy() {
    const vm = this;
    window.removeEventListener("resize", vm.layoutDataChange);
  }
  public screenfullHandle() {
    const vm = this;
    const element = (vm.$refs.perview as Vue).$el;
    if (!screenfull.isEnabled) {
      vm.$message({
        message: '不支持全屏',
        type: 'warning'
      })
      return false
    }
    screenfull.toggle(element)
  }
  /**
   * 注册组件并挂载到实例上
   */
  public registerComponent(propMsg: any) {
    const vm = this;
    import(`./${propMsg.conmponentName}`).then(component => {
      let Component = Vue.extend(component.default);
      const el = (vm.$refs as any)[propMsg.key];
      new Component({
        el: el,
        data: {
          propMsg
        }
      })
    })
  }

  render() {
    const vm = this;
    return (
      <GridLayout
        ref="perview"
        v-loading={vm.loading}
        layout={vm.layoutData}
        colNum={colNum}
        rowHeight={30}
        margin={[10, 10]}
        isDraggable={false}
        isResizable={false}
        style={{backgroundColor: "#fff"}}
      >
        <Button class="saveButton" onClick={vm.screenfullHandle} type="primary" size="mini">全屏</Button>
        {vm.layoutData.map((item: any)=> 
          <GridItem
            ref="gridItem"
            x={item.x}
            y={item.y}
            w={item.w}
            h={item.h}
            i={item.i}
            key={item.key}
          >
            <div ref={item.key}></div>
          </GridItem>
        )}
      </GridLayout>
    )
  }
}