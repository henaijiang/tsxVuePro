import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import * as THREE from 'three';

@Component
export default class Threejs extends Vue {

  scene!: THREE.Scene
  camera!: THREE.PerspectiveCamera
  renderer!: THREE.WebGLRenderer
  
  mounted() {
    const vm = this;
    let container = document.getElementById("threejs");
    if(!container){
      return
    }
    vm.scene = new THREE.Scene();
    vm.camera = new THREE.PerspectiveCamera( 45, container.clientWidth / container.clientHeight, 0.1, 1000 );
    vm.renderer = new THREE.WebGLRenderer();
    vm.renderer.setSize( container.clientWidth , container.clientHeight );
    container.appendChild(vm.renderer.domElement);
    vm.createdBox();
  }
  /**
   * 创建线条
   */
  createdLine() {
    const vm = this;
    vm.camera.position.set( 0, 0, 100 );
    vm.camera.lookAt( 0, 0, 0 );
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
   * 创建长方体
   */
  createdBox(){
    const vm = this;
    //点光源
    var point = new THREE.PointLight(0xffffff);
    point.position.set(0, 0, 100); //点光源位置
    vm.scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    vm.scene.add(ambient);

    let geometry = new THREE.BoxGeometry( 10, 10, 5 );
    let material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    let cube = new THREE.Mesh( geometry, material );
    vm.scene.add( cube );
    vm.camera.position.set(0, 0, 80);
    vm.camera.lookAt(vm.scene.position);
    function animate() {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      vm.renderer.render( vm.scene, vm.camera );
    }
    animate();
  }

  render() {
    const vm = this;
    return (
      <div id="threejs" style={{width: '100%', minHeight: '400px'}}>
      </div>
    )
  }
}