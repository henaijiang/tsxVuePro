import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as THREE from 'three';
//引入控件支持鼠标左中右键操作和键盘方向键操作插件
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from "three/examples/jsm/libs/stats.module"
import { DoubleSide } from 'three';
import _ from "lodash"
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader"
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader"
@Component
export default class Threejs extends Vue {

  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer
  clock!: THREE.Clock
  controls!: OrbitControls
  stats!: Stats
  mouse = new THREE.Vector2()
  debounceWindowResize = _.debounce(this.onWindowResize, 100)
  raycaster = new THREE.Raycaster();
  //当前选中的元素
  INTERSECTED!: THREE.Object3D | null
  mounted() {
    const vm = this;
    vm.initScene();
    vm.initLight();
    vm.initPlane();
    vm.createdBox();
    vm.createdLine();
    vm.initBall();
    vm.loadObjModel('model/IronMan/IronMan', 0.5, new THREE.Vector3(0, -4, 0));
    vm.loadObjModel('model/wolf/Wolf_One_obj', 60, new THREE.Vector3(50, 45, 0));
    vm.renderControls();
    window.addEventListener( 'resize', vm.debounceWindowResize, false );
    window.addEventListener( 'mousemove', vm.onMouseMove, false );
  }
  beforeDestroy() {
    const vm = this;
    window.removeEventListener( 'resize', vm.debounceWindowResize, false );
    window.removeEventListener( 'mousemove', vm.onMouseMove, false );
  }
  /**
   * 创建场景及相机
   */
  initScene() {
    const vm = this;
    let container = document.getElementById("threejs");
    if(!container){
      return
    }
    vm.scene = new THREE.Scene();
    vm.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 10000 );
    vm.camera.position.set(0, 200, 150);
    vm.camera.lookAt(new THREE.Vector3(0, 0, 0));
    //antialias:true增加抗锯齿效果
    vm.renderer = new THREE.WebGLRenderer({antialias:true});
    vm.renderer.setSize(window.innerWidth , window.innerHeight);
    vm.renderer.setPixelRatio( window.devicePixelRatio );
    vm.renderer.shadowMap.enabled = true;
    vm.renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 默认的是，没有设置的这个清晰 THREE.PCFShadowMap
    container.appendChild(vm.renderer.domElement);
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    let axisHelper = new THREE.AxesHelper(250);
    vm.scene.add(axisHelper);
    //fps显示
    vm.stats = Stats();
    vm.stats.showPanel(0);
    container.appendChild(vm.stats.dom);
    vm.initControl();
  }
  /**
   * 初始化鼠标控件
   */
  initControl() {
    const vm = this;
    let control = new OrbitControls(vm.camera, vm.renderer.domElement);

    // 是否开启当前的控制器 默认值为true
    control.enabled = true;

    // 设置当前控制器的焦点 默认为原点位置
    control.target = new THREE.Vector3();

    // 控制器控制相机可移动的距离焦点的最远距离和最近距离 默认值是0到无限远的距离 此属性适用于透视相机 PerspectiveCamera
    control.minDistance = 0;
    control.maxDistance = Infinity;

    // 控制器控制相机可移动的距离焦点的最远距离和最近距离 默认值是0到无限远的距离 此属性适用于正交相机 OrthographicCamera
    control.minZoom = 0;
    control.maxZoom = Infinity;

    // 相机垂直方向移动的弧度，默认从顶部九十度到底部九十度 默认值是0和Math.PI
    control.minPolarAngle = 0; // 弧度
    control.maxPolarAngle = Math.PI; // 弧度

    // 当前相机水平位置下在焦点的z轴正方向可以偏转的弧度，默认无限旋转。
    // 如果不可以无限旋转，只能够从左方和右方旋转180度，可以设置成minAzimuthAngle = - Math.PI maxAzimuthAngle = Math.PI
    control.minAzimuthAngle = - Infinity; // 弧度
    control.maxAzimuthAngle = Infinity; // 弧度

    // 是否开启拖拽后的惯性（停止拖拽后，相机会慢慢停下来），如果开启了当前的属性，还需要在动画循环中调用相机的update()更新位置
    control.enableDamping = false;
    control.dampingFactor = 0.25; //设置当前的惯性的阻力，值越小阻力越小

    // 设置控制器是否缩放以及缩放速度
    control.enableZoom = true;
    control.zoomSpeed = 1.0;

    // 设置控制器是否可以旋转以及旋转速度
    control.enableRotate = true;
    control.rotateSpeed = 1.0;

    // 是否开启改变视角焦点中心以及移动视角中心的速度
    control.enablePan = true;
    control.panSpeed = 1.0;
    control.screenSpacePanning = false; // 移动相机位置焦点默认是修改x轴和z轴方向，如果将此值修改为true，焦点位置将修改x轴和y轴方向
    control.keyPanSpeed = 7.0;	// 修改焦点位置移动的速度

    // 设置当前是否自动旋转
    control.autoRotate = false;
    control.autoRotateSpeed = 2.0; // 默认速度为30秒旋转一周的速度，一秒60帧的情况下

    // 是否开启键盘控制
    control.enableKeys = true;

    // 控制焦点的位置偏移的键盘按键 默认是上下左右键的 keyCode
    control.keys = { LEFT: 37, UP: 38, RIGHT: 39, BOTTOM: 40 };

    // 控制相机控制器的鼠标按键设置 默认左键旋转，中键缩放，右键移动焦点位置
    control.mouseButtons = { LEFT: THREE.MOUSE.LEFT, MIDDLE: THREE.MOUSE.MIDDLE, RIGHT: THREE.MOUSE.RIGHT };
    vm.controls = control;
  }
  /**
   * 窗口改变事件
   */
  onWindowResize() {
    const vm = this;
    vm.camera.aspect = window.innerWidth / window.innerHeight;
    vm.camera.updateProjectionMatrix();
    vm.renderer.setSize(window.innerWidth , window.innerHeight);
  }
  /**
   * 刷新视图
   */
  renderControls(){
    const vm = this;
    vm.stats.begin();
    // 通过摄像机和鼠标位置更新射线
    vm.raycaster.setFromCamera( vm.mouse, vm.camera );
    // 计算物体和射线的焦点
    var intersects = vm.raycaster.intersectObjects( vm.scene.children );
    if ( intersects.length > 0 ) {
      vm.INTERSECTED = intersects[0].object;
    } else {
      vm.INTERSECTED = null;
    }
    vm.controls.update();
    vm.renderer.render(vm.scene, vm.camera);
    vm.stats.end();
    requestAnimationFrame(vm.renderControls);

  }
  /**
   * 创建平面
   */
  initPlane() {
    const vm = this;
    let planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    //材质
    let textureLoader = new THREE.TextureLoader();
    let planeTexture = textureLoader.load(require('../../assets/plane.jpg'));
    let planeMaterial = new THREE.MeshLambertMaterial({map: planeTexture, side: THREE.DoubleSide});
    let plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.position.y = -5.1;
    plane.receiveShadow = true; //可以接收阴影
    vm.scene.add(plane);
  }
  /**
   * 创建球体
   */
  initBall() {
    const vm = this;
    let sphereGeometry = new THREE.SphereGeometry(5, 24, 16);
    let sphereMaterial = new THREE.MeshStandardMaterial({color: 0xff00ff});
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true; //开启阴影
    sphere.position.set(0, 0, 30);
    vm.scene.add(sphere);
  }
  /**
   * 创建线条
   */
  createdLine() {
    const vm = this;
    let material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
    let geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3( -10, 0, 0) );
    geometry.vertices.push(new THREE.Vector3( 0, 10, 0) );
    geometry.vertices.push(new THREE.Vector3( 10, 0, 0) );
    let line = new THREE.Line( geometry, material );
    vm.scene.add( line );
    vm.renderer.render( vm.scene, vm.camera );
  }
  /**
   * 创建光源
   */
  initLight() {
    const vm = this;
    //环境光
    let ambientLight = new THREE.AmbientLight("#111111");
    vm.scene.add(ambientLight);
    //平行光源
    let directionalLight = new THREE.DirectionalLight("#ffffff", 1);
    directionalLight.position.set(1000, 1000, 1000);

    directionalLight.shadow.camera.near = 0.1; //产生阴影的最近距离
    directionalLight.shadow.camera.far = 2000; //产生阴影的最远距离
    directionalLight.shadow.camera.left = -500; //产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = 500; //最右边
    directionalLight.shadow.camera.top = 500; //最上边
    directionalLight.shadow.camera.bottom = -500; //最下面

    //这两个值决定生成阴影密度 默认512
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.mapSize.width = 1024;

    //告诉平行光需要开启阴影投射
    directionalLight.castShadow = true;

    vm.scene.add(directionalLight);
  }
  /**
   * 创建长方体
   */
  createdBox(){
    const vm = this;
    let geometry = new THREE.BoxGeometry( 50, 50, 50 );
    //材质
    let textureLoader = new THREE.TextureLoader();
    let boxTexture = textureLoader.load(require('../../assets/box.jpg'));
    //side: DoubleSide 双面渲染，可进入内部
    let material = new THREE.MeshBasicMaterial( { map: boxTexture, side: DoubleSide } );
    let cube = new THREE.Mesh( geometry, material );
    cube.castShadow = true; //开启阴影
    vm.scene.add( cube );
    cube.position.set(50,20,0);
  }
  /**
   * 鼠标移动事件
   * @param event 
   */
  onMouseMove(event: MouseEvent) {
    const vm = this;
    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)
    vm.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    vm.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  }
  /**
   * 加载3d模型-.obj文件
   */
  loadObjModel(path: string, scale: number, position: THREE.Vector3) {
    const vm = this;
    let objLoader = new OBJLoader();
    let mtlLoader = new MTLLoader();
    mtlLoader.load(`${path}.mtl`,(materials)=>{
      objLoader.setMaterials(materials);
      objLoader.load(`${path}.obj`, (obj)=>{
        obj.scale.set(scale,scale,scale)
        obj.position.set(position.x, position.y, position.z);
        obj.castShadow = true;
        obj.children.forEach(child=>{
          child.castShadow = true; //开启阴影
        })
        vm.scene.add(obj);
        //下载json文件
        /* let content = obj.toJSON()
        content = JSON.stringify(content)
        var blob = new Blob([content], {
          type: "text/plain;charset=utf-8"
        });
        var objurl = URL.createObjectURL(blob);
        var link = document.createElement("a");
        link.download = "json.txt";
        link.href = objurl;
        link.click(); */
      })
    })
  }
  render() {
    const vm = this;
    return (
      <div id="threejs">
      </div>
    )
  }
}