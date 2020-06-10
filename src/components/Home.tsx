import { Component, Vue, Watch } from 'vue-property-decorator'
import { Container, Aside, Main, Select, Option, Divider, Button, Dialog, Tabs, TabPane } from "element-ui"
import Perview from "./Perview"
import { v1 } from "uuid"
import _ from "lodash"
import "./Home.scss"
import VueGridLayout from 'vue-grid-layout'
Vue.use(VueGridLayout)
const GridLayout = VueGridLayout.GridLayout;
const GridItem = VueGridLayout.GridItem;
const colNum = 12;
@Component
export default class Home extends Vue {
  /**左侧组件列表数据，key前端用于渲染组件，static用于区分是否可编辑（预览与编辑页面） */
  public asideLeftComponent = [
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"0", conmponentName: "HomeTest", key: "", component: 'dv-border-box-1', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"1", conmponentName: "HomeTest", key: "", component: 'dv-border-box-2', child: "dv-percent-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"2", conmponentName: "HomeTest", key: "", component: 'dv-border-box-3', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"3", conmponentName: "HomeTest", key: "", component: 'dv-border-box-4', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"4", conmponentName: "HomeTest", key: "", component: 'dv-border-box-5', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"5", conmponentName: "HomeTest", key: "", component: 'dv-border-box-6', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"6", conmponentName: "VCharts", key: "", component: 'dv-border-box-7', child: "dv-water-level-pond", static: false},
    {"x":0, "y":0, "w":colNum/2, "h":6, "i":"7", conmponentName: "ElTable", key: "", component: 'dv-border-box-8', child: "dv-water-level-pond", static: false}
  ]
  /**布局组件数据 */
  public layoutData: Array<any> = [];
  /**布局容器旧宽度 */
  public gridLayoutOldWidth: number = 0;
  /**选中组件元素数据 */
  public selectedGridItemData: any = {};
  /**遮罩层显隐 */
  public dragMaskShow: boolean = false;
  /**tab页切换名称 */
  public tabActiveName: string = "write";
  /**预览数据 */
  public perviewLayoutData: Array<any> = [];
  /**是否执行布局更新 */
  public layoutUpdated: boolean = false;
  /**布局容器key值 */
  public gridLayoutKey: number = new Date().getTime();
  /**加载状态 */
  public loading: boolean = false;
  /**监听layoutData数组长度 */
  @Watch("layoutData.length")
  public async layoutDataLengthChange() {
    const vm = this;
    //增加一定延迟便于断定宽度是否变化
    setTimeout(()=>{
      const gridLayoutWidth = (vm.$refs.gridLayout as Vue).$el.clientWidth;
      //容器宽度未变化
      if(gridLayoutWidth == vm.gridLayoutOldWidth){
      }else{
        vm.gridLayoutOldWidth = gridLayoutWidth
        vm.refreshAllGridItem();
      }
    },200)
  }
  /**created周期请求数据 */
  public created() {
    
  }
  /**mounted周期挂载监听器 */
  public mounted() {
    const vm = this;
    vm.gridLayoutOldWidth = (vm.$refs.gridLayout as Vue).$el.clientWidth;
    window.addEventListener("resize", vm.resizeEventListener);
  }
  /**窗口大小监听事件，增加一定延迟保证能获取父容器宽度 */
  public resizeEventListener() {
    const vm = this;
    vm.loading = true;
    setTimeout(()=>{vm.refreshAllGridItem();vm.loading = false;},200)
  }
  /**销毁监听元素 */
  public beforeDestroy() {
    const vm = this;
    window.removeEventListener("resize",vm.resizeEventListener)
  }
  /**大小改变 */
  public resize(i: string, newH: number, newW: number, newHPx: number, newWPx: number) {

  }
  /**大小改变结束 */
  public resized(i: string, newH: number, newW: number, newHPx: number, newWPx: number) {
    const vm = this;
    //更新对应组件，防止dataV元素大小不改变问题
    const gridLayoutWidth = (vm.$refs.gridLayout as Vue).$el.clientWidth;
    const data = _.find(vm.layoutData,(item: any)=>item.i == i);
    vm.selectedGridItemData = data;
    vm.selectDataChange();
    //容器宽度未变化
    if(gridLayoutWidth == vm.gridLayoutOldWidth){
      vm.layoutUpdated = true;
      vm.$nextTick(()=>{
        vm.layoutUpdated = false;
      })
    }else{
      vm.gridLayoutOldWidth = gridLayoutWidth
    }
  }
  /**位置改变 */
  public move(i: string, newX: number, newY: number) {

  }
  /**位置改变结束 */
  public moved(i: string, newX: number, newY: number) {
    const vm = this;
    const data = _.find(vm.layoutData,(item: any)=>item.i == i);
    vm.selectedGridItemData = data;
    const gridLayoutWidth = (vm.$refs.gridLayout as Vue).$el.clientWidth;
    //容器宽度未变化
    if(gridLayoutWidth == vm.gridLayoutOldWidth){
      vm.layoutUpdated = true;
      vm.$nextTick(()=>{
        vm.layoutUpdated = false;
      })
    }else{
      vm.gridLayoutOldWidth = gridLayoutWidth
    }
  }
  /**刷新所有子组件 */
  public async refreshAllGridItem() {
    const vm = this;
    await vm.$nextTick();
    vm.layoutData.forEach(item=>{
      item.key = v1();
      vm.registerComponent(item);
    });
    if(vm.selectedGridItemData.i){
      vm.selectGridItem()
    }
  }
  /**布局更新 */
  public layoutUpdatedEvent(newLayout: Array<any>) {
    const vm = this;
    if(vm.layoutUpdated){
      return
    }
    vm.refreshAllGridItem();
  }
  /**容器大小改变 */
  public containerResizedEvent(i: string, newH: number, newW: number, newHPx: number, newWPx: number) {
  }
  /**
   *开始拖拽标签
   */
  public startDragTag(evt: DragEvent, data: any) {
    const vm = this;
    if(!evt || !evt.target || !evt.dataTransfer)
    return
    //设置拖拽数据
    evt.dataTransfer.setData("Text", JSON.stringify(data));
    evt.dataTransfer.setDragImage((evt.target as Element), 0, 0);
    vm.dragMaskShow = true;
  }
  /**
   * 拖拽释放
   * @param evt 
   */
  public async drop(evt: DragEvent) {
    const vm = this;
    if(!evt || !evt.target || !evt.dataTransfer)
    return
    const colWidth = (evt.target as any).clientWidth/colNum;
    const colHeight = (evt.target as any).clientHeight/colNum;
    const x = Math.floor(evt.offsetX/colWidth);
    const y = Math.floor(evt.offsetY/colHeight);
    let data = JSON.parse(evt.dataTransfer.getData("Text"));
    data.x = x;
    data.y = y;
    //判断当前行是否放置不下，若是则修正x坐标
    if((x + data.w) > colNum){
      data.x = 0;
    }
    data.i = v1();
    data.key = v1();
    vm.layoutData.push(data);
    vm.selectedGridItemData = data;
    await vm.$nextTick();
    vm.registerComponent(data);
  }
  /**拖拽结束 */
  public dragend() {
    const vm = this;
    vm.dragMaskShow = false;
  }
  /**
   * 拖拽悬停
   * @param evt 
   */
  public dragOver(evt: DragEvent) {
    evt.preventDefault();
  }
  /**
   * 删除组件
   * @param i 
   */
  public deleteComponent(i: string, e:MouseEvent) {
    const vm = this;
    e.stopPropagation();
    vm.$confirm('此操作将删除该组件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      lockScroll: false
    }).then(async () => {
      const index = _.findIndex(vm.layoutData, (item) => item.i == i);
      vm.$delete(vm.layoutData, index);
      vm.$message.success("已删除!");
    }).catch(() => {
      vm.$message.info("已取消");       
    });
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
      vm.selectGridItem()
    })
  }
  /**选中元素样式变化 */
  public selectGridItem() {
    const vm = this;
    const i = vm.selectedGridItemData.i;
    if(!i){
      return
    }
    $(`#${i}`).addClass('selected').siblings().removeClass('selected');
  }
  /**选中子组件数据发生变化，更新该组件 */
  public async selectDataChange() {
    const vm = this;
    if(!vm.selectedGridItemData.key) {
      return
    }
    vm.selectedGridItemData.key = v1();
    await vm.$nextTick();
    vm.registerComponent(vm.selectedGridItemData);
  }
  /**页面数据保存 */
  public saveData() {
    console.log("数据保存");
  }
  /**切换tab页 */
  public async tabClickHandle(tab: Vue, event: MouseEvent) {
    const vm = this;
    if(vm.tabActiveName == "perview") {
      vm.perviewLayoutData = [];
      vm.layoutData.forEach(item=>{
        let obj = _.cloneDeep(item);
        obj.static = true;
        vm.perviewLayoutData.push(obj)
      })
    }else{
      vm.perviewLayoutData = [];
      await vm.$nextTick();
      vm.loadGridLayout();
    }
  }
  /**加载布局容器及更新相关子组件 */
  public async loadGridLayout() {
    const vm = this;
    vm.gridLayoutKey = new Date().getTime();
    await vm.$nextTick();
    vm.resizeEventListener();
  }
  render() {
    const vm = this;
    return (
      <Container>
        <Aside>
          {/* 左侧组件列表 */}
          <ul class="asideLeftClass">
            {vm.asideLeftComponent.map(item=>
              <li class="liSpan" draggable={true} key={item.i} ondragend={vm.dragend} ondragstart={(evt: DragEvent)=>{vm.startDragTag(evt,item)}}>
                <div class="spanTag">{item.component}</div>
              </li>
            )}
          </ul>
        </Aside>
        <Main 
          class="mainClass"
        >
          <Button vShow={vm.tabActiveName == "write"} class="saveButton" onClick={vm.saveData} type="primary" size="mini">保存</Button>
          <Tabs type="card" vModel={vm.tabActiveName} ontab-click={vm.tabClickHandle}>
            <TabPane label="编辑" name="write">
              <div class="gridLayoutClass">
                {/* GridLayout组件布局 */}
                <div
                  ref="dragMask"
                  class="dragMask"
                  vShow={vm.dragMaskShow}
                  ondrop={vm.drop}
                  ondragover={vm.dragOver}
                >
                </div>
                <GridLayout
                  v-loading={vm.loading}
                  key={vm.gridLayoutKey}
                  ref="gridLayout"
                  style={{ minHeight: '500px'}}
                  layout={vm.layoutData}
                  {...{on:{'update:layout': (layout: any)=>{vm.layoutData = layout} }}}
                  colNum={colNum}
                  rowHeight={30}
                  margin={[10, 10]}
                  onlayout-updated={vm.layoutUpdatedEvent}
                >
                  {vm.layoutData.map((item: any)=> 
                    <GridItem
                      ref="gridItem"
                      static={false}
                      id={item.i}
                      onMoved={vm.moved}
                      onResized={vm.resized}
                      onResize={vm.resize}
                      onMove={vm.move}
                      x={item.x}
                      y={item.y}
                      w={item.w}
                      h={item.h}
                      i={item.i}
                      key={item.key}
                      dragIgnoreFrom="i"
                      oncontainer-resized={vm.containerResizedEvent}
                      nativeOnClick={()=>{vm.selectedGridItemData = item;vm.selectGridItem()}}
                    >
                      <div style={{height: "100%"}}>
                        <div class="itemHeader">
                          <span>{item.component}</span>
                          <i class="el-icon-delete iconClass" onClick={(e:MouseEvent)=>{vm.deleteComponent(item.i,e)}}></i>
                        </div>
                        <Divider></Divider>
                        <div ref={item.key} class="itemMain"></div>
                      </div>
                    </GridItem>
                  )}
                </GridLayout>
              </div>
            </TabPane>
            <TabPane label="预览" name="perview">
              <Perview layoutData={vm.perviewLayoutData}></Perview>
            </TabPane>
          </Tabs>
        </Main>
        <Aside class="asideRightClass">
          {/* 右侧属性编辑栏 */}
        </Aside>
      </Container>
    )
  }
}