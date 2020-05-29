import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import VueGridLayout from 'vue-grid-layout'
import { v1 } from "uuid"
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
        v-loading={vm.loading}
        layout={vm.layoutData}
        colNum={colNum}
        rowHeight={30}
        margin={[10, 10]}
        isDraggable={false}
        isResizable={false}
      >
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