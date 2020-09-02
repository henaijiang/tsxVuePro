import { Component, Vue, Prop } from 'vue-property-decorator';
import { contextmenuDTO } from './contextmenuDTO'
@Component
export default class Contextmenu extends Vue {
  /**contextmenu */
  @Prop({
    type: Array,
    required: true,
    default() {
      return []
    }
  })
  private contextmenu!: Array<contextmenuDTO>
  private isShow: boolean = false
  public close() {
    const vm = this;
    vm.isShow = false;
  }
  public async show(e: mapboxgl.MapMouseEvent) {
    const vm = this;
    vm.isShow = true;
    let parent = $("#mapboxGlJs");
    let child = $(".menu");
    child.css("left",e.point.x + 5 + 'px');
    child.css("top",e.point.y + 5 + 'px');
    await vm.$nextTick();
    let  parentWidth = parent.width() || 0;
    let childWidth = child.width() || 0;
    let parentHeight = parent.height() || 0;
    let childHeight = child.height() || 0;
    let parentLeft = parent.offset()?.left || 0;
    let childLeft = child.offset()?.left || 0;
    let parentTop = parent.offset()?.top || 0;
    let childTop = child.offset()?.top || 0;
    let parentRight = parentLeft + parentWidth || 0;
    let childRight = childLeft + childWidth;
    let parentBottom = parentTop + parentHeight;
    let childBottom = childTop + childHeight;
    if(childLeft<parentLeft){
      console.log("左边超出");
    }
    if(childTop<parentTop){
      console.log("上边超出");
    }
    if(childRight>parentRight){
      //右边超出
      child.css("left",e.point.x - 10 - childWidth + 'px');
    }
    if(childBottom>parentBottom){
      //下边超出
      child.css("top",e.point.y - 10 - childHeight + 'px');
    }
  }
  render() {
    const vm = this
    return (
      <div
        v-show={vm.isShow}
        class='menu'
        onContextmenu={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        <ul>
          {vm.contextmenu.map((menu: contextmenuDTO) => 
            <li onClick={()=>{menu.callback();vm.close()}}>
              {menu.divider?<el-divider style={{display: menu.divider?'block':'none'}}></el-divider>:null}
              <div><i class={menu.icon} aria-hidden="true"></i>&nbsp;&nbsp;{menu.name}</div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}