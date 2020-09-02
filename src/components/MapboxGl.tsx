import { Component, Vue } from 'vue-property-decorator';
import MapboxGlJs from "./map/MapboxGlJs"
import mapboxgl, { MapboxOptions } from 'mapbox-gl';
import { contextmenuDTO } from './map/contextmenuDTO'
@Component
export default class MapboxGl extends Vue {
  /**在下载了所有必需的资源并进行了第一个视觉上完整的地图渲染之后，立即触发。 */
  handleMapLoad(map: mapboxgl.Map, self: MapboxGlJs) {
    console.log(map, self)
  }
  //单击
  handleMapClick(targetFeature: mapboxgl.MapboxGeoJSONFeature | null, geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[], e: mapboxgl.MapMouseEvent) {
    console.log(targetFeature, geoJSONFeatures, e)
  }
  handleMapDblclick(targetFeature: mapboxgl.MapboxGeoJSONFeature | null, geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[], e: mapboxgl.MapMouseEvent) {
    console.log(targetFeature, geoJSONFeatures, e)
  }
  /**参考类 MapboxOptions */
  public mapboxOptions: MapboxOptions = {container: '',style: 'http://192.168.199.179:1099/map/big-screen.json', crossSourceCollisions: false,}
  /**右键菜单 */
  handleContextmenu(targetFeature: mapboxgl.MapboxGeoJSONFeature | null, geoJSONFeatures: mapboxgl.MapboxGeoJSONFeature[], e: mapboxgl.MapMouseEvent) {
    const vm = this;
    vm.contextmenu = [];
    vm.contextmenu.push({
      divider: true,
      icon: 'fa fa-dot-circle-o',
      name: '测试',
      callback(){
        if(targetFeature){
          vm.$message.success('选中目标：'+targetFeature.properties?.name)
        }
      }
    })
  }
  contextmenu: Array<contextmenuDTO> = []
  render() {
    const vm = this
    return (
      <section>
        <MapboxGlJs
         mapboxOptions={vm.mapboxOptions}
         style={{height: '400px'}}
         onLoad={vm.handleMapLoad}
         onClick={vm.handleMapClick}
         on-dblclick={vm.handleMapDblclick}
         on-contextmenu={vm.handleContextmenu}
         contextmenu={vm.contextmenu}
        ></MapboxGlJs>
      </section>
    )
  }
}