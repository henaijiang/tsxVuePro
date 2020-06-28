<template>
  <section>
    <h1>防抖</h1>
    <el-input v-model="inputText" @input="inputTextChange" />
    <h1>节流</h1>
    <el-input v-model="inputText2" @input="inputTextChange2" />
  </section>
</template>
<script>
import { debounce, throttle } from "../debounce"
export default {
  data() {
    return  {
      inputText: "",
      inputText2: ""
    }
  },
  created() {
    const vm = this;
    /**vue文件中使用防抖 */
    vm.inputTextChange = debounce(vm.inputTextChange);
    /**vue文件中使用节流 */
    vm.inputTextChange2 = throttle(vm.inputTextChange2);
  },
  methods: {
    inputTextChange(val){
      const vm = this;
      console.log('防抖：' + vm.inputText);
    },
    inputTextChange2(val){
      const vm = this;
      console.log('节流：' + vm.inputText2);
    }
  }
}
</script>