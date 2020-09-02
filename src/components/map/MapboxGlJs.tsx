import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import "mapbox-gl/dist/mapbox-gl.css";
import "./MapboxGlJs.scss";
import mapboxgl, { MapboxOptions } from 'mapbox-gl';
import Contextmenu from './Contextmenu'
import { contextmenuDTO } from './contextmenuDTO'
@Component
export default class MapboxGlJs extends Vue {
  private map: mapboxgl.Map | null = null
  /**parameters */
  @Prop({
    type: Object,
    required: true,
    default() {
      return {}
    }
  })
  private mapboxOptions!: MapboxOptions
  /**contextmenu */
  @Prop({
    type: Array,
    required: false,
    default() {
      return []
    }
  })
  private contextmenu!: Array<contextmenuDTO>
  /**样式改变 */
  @Watch('mapboxOptions.style')
  protected msgChange(newval: string) {
    const vm = this;
    if(!vm.map) return
    vm.map.setStyle(newval);
  }
  private contextmenuText: Array<contextmenuDTO> = []
  private mounted() {
    const vm = this;
    vm.initMap();
  }
  /**
   * 地图初始化加载
   */
  private initMap() {
    const vm = this;
    if (!mapboxgl.supported()) {
      alert('Your browser does not support Mapbox GL');
      return
    }
    if(!vm.mapboxOptions.style){
      throw new Error('style属性时必须的');
      return
    }
    const mapboxOptions = Object.assign(vm.mapboxOptions, {container: 'mapboxGlJs'})
    const loading = vm.$loading({
      target: '#mapboxGlJs',
      lock: true,
      text: '地图初始化中，请稍后...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    });
    vm.map = new mapboxgl.Map(mapboxOptions);
    vm.map.addControl(new mapboxgl.NavigationControl({showZoom: false}));
    vm.map.addControl(new mapboxgl.ScaleControl());
    vm.map.addControl(new mapboxgl.FullscreenControl());
    /**在下载了所有必需的资源并进行了第一个视觉上完整的地图渲染之后，立即触发。 */
    vm.map.on('load',(e: mapboxgl.MapboxEvent)=>{
      loading.close();
      vm.$emit('load', e.target, vm);
    })
    /**错误提示 */
    vm.map.on('error',(err: ErrorEvent)=>{
      vm.$message({
        type: 'error',
        message: err.error.message
      });
      loading.close();
      vm.$emit('error', err);
    })
    vm.initMapEvents();
  }
  /**
   * 地图常用事件绑定
   */
  private initMapEvents() {
    const vm = this;
    if(!vm.map) return
    //处理双击时会触发两次单击事件
    let time: number | undefined = undefined
    /**单击事件 */
    vm.map.on('click',(e: mapboxgl.MapMouseEvent)=>{
      const contextmenuEl = (vm.$refs['contextmenu'] as Vue).$el;
      (vm.$refs['contextmenu'] as Contextmenu).close();
      clearTimeout(time);
      time = setTimeout(()=>{
        if(!vm.map) return
        let geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[] = vm.map.queryRenderedFeatures(e.point);
        let targetFeature: mapboxgl.MapboxGeoJSONFeature | null = null;
        if(geoJSONFeatures.length){
          //最顶层的渲染特征首先出现在返回的数组中，随后的特征按z降序排序。
          targetFeature = geoJSONFeatures[0];
        }
        vm.$emit('click', targetFeature, geoJSONFeatures, e);
      },500)
    })
    /**双击事件 */
    vm.map.on('dblclick',(e: mapboxgl.MapMouseEvent)=>{
      clearTimeout(time);
      if(!vm.map) return
      let geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[] = vm.map.queryRenderedFeatures(e.point);
      let targetFeature: mapboxgl.MapboxGeoJSONFeature | null = null;
      if(geoJSONFeatures.length){
        //最顶层的渲染特征首先出现在返回的数组中，随后的特征按z降序排序。
        targetFeature = geoJSONFeatures[0];
      }
      vm.$emit('dblclick', targetFeature, geoJSONFeatures, e);
    })
    /**其余事件：MapMouseEvent */
    const mouseEventListByMapMouseEvent: string[] = ['mousemove']
    mouseEventListByMapMouseEvent.forEach(eventName=>{
      if(!vm.map) return
      vm.map.on(eventName,(e: mapboxgl.MapMouseEvent)=>{
        if(!vm.map) return
        let geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[] = vm.map.queryRenderedFeatures(e.point);
        let targetFeature: mapboxgl.MapboxGeoJSONFeature | null = null;
        if(geoJSONFeatures.length){
          //最顶层的渲染特征首先出现在返回的数组中，随后的特征按z降序排序。
          targetFeature = geoJSONFeatures[0];
        }
        vm.$emit(eventName, targetFeature, geoJSONFeatures, e);
      })
    })
    /**其余事件：MapboxEvent */
    const mouseEventListByMapboxEvent: string[] = ['movestart', 'moveend', 'zoomstart', 'zoomend', 'dragstart', 'dragend', 'rotatestart', 'rotateend', 'pitchstart', 'pitchend']
    mouseEventListByMapboxEvent.forEach(eventName=>{
      if(!vm.map) return
      vm.map.on(eventName,(e: mapboxgl.MapboxEvent)=>{
        if(!vm.map) return
        vm.$emit(eventName, e.target, e.originalEvent);
      })
    })
    /**其余事件：MapBoxZoomEvent */
    const mouseEventListByMapBoxZoomEvent: string[] = ['boxzoomcancel', 'boxzoomstart', 'boxzoomend']
    mouseEventListByMapBoxZoomEvent.forEach(eventName=>{
      if(!vm.map) return
      vm.map.on(eventName,(e: mapboxgl.MapBoxZoomEvent)=>{
        if(!vm.map) return
        vm.$emit(eventName, e.target, e.originalEvent);
      })
    })
    /**其余事件：MapWheelEvent */
    vm.map.on('wheel',(e: mapboxgl.MapWheelEvent)=>{
      if(!vm.map) return
      vm.$emit('wheel', e.target, e.originalEvent);
    })
    /**其余事件：MapDataEvent 加载或更改任何地图数据时触发 */
    vm.map.on('data',(e: mapboxgl.MapDataEvent)=>{
      if(!vm.map) return
      vm.$emit('data', e);
    })
    /**右键菜单 */
    vm.map.on('contextmenu', async (e: mapboxgl.MapMouseEvent)=>{
      if(!vm.map) return
      let geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[] = vm.map.queryRenderedFeatures(e.point);
      let targetFeature: mapboxgl.MapboxGeoJSONFeature | null = null;
      if(geoJSONFeatures.length){
        //最顶层的渲染特征首先出现在返回的数组中，随后的特征按z降序排序。
        targetFeature = geoJSONFeatures[0];
      }
      vm.$emit('contextmenu', targetFeature, geoJSONFeatures, e);
      await vm.$nextTick();
      /**菜单默认选项 */
      vm.contextmenuText = [
        {name: '放大一级', icon: 'fa fa-plus', callback(){vm.map?.zoomIn()}},
        {name: '缩小一级', icon: 'fa fa-minus', callback(){vm.map?.zoomOut()}},
        {name: '移到中心', icon: 'fa fa-dot-circle-o', callback(){vm.map?.flyTo({center: e.lngLat})}}
      ]
      vm.contextmenuText.push(...vm.contextmenu);
      (vm.$refs['contextmenu'] as Contextmenu).show(e);
    })
  }
  /**
   * 动态添加图标（添加后使用方法跟精灵图一样）
   * @param url 
   * @param name 
   * @param options 
   */
  public mapboxAddImage(url: string, name: string, options?: { pixelRatio?: number; sdf?: boolean }) {
    const vm = this;
    if(!vm.map){
      return
    }
    vm.map.loadImage(url, (error: any, image: HTMLImageElement | ArrayBufferView | { width: number; height: number; data: Uint8Array | Uint8ClampedArray; } | ImageData) => {
      if (error) throw error;
      if(!vm.map){
        return
      }
      if (!vm.map.hasImage(name)) vm.map.addImage(name, image, options);
    });
  }

  private render() {
    const vm = this;
    return (
      <div id="mapboxGlJs" style={{height: '100%'}}>
        <Contextmenu ref="contextmenu" contextmenu={vm.contextmenuText} />
      </div>
    )
  }
}