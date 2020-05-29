import { Component, Vue } from 'vue-property-decorator'
import { CreateElement } from "vue"
import "./Home.scss"
@Component
export default class HomeTest extends Vue {
  public propMsg: any = ""
  public config = {
    data: [66, 45],
    shape: 'roundRect',
    waveNum	: 6,
    colors: ["red"],
    value: 66
  }

  render(h: CreateElement) {
    const vm = this
    return h(
      vm.propMsg.component,
      {
        class: {
          itemMain: !vm.propMsg.static
        }
      },
      [
        h(vm.propMsg.child, {
          props: {
            config: vm.config,
          },
          style: {
            width: "100%",
            height: "100%",
          }
        })
      ]
    )
  }
}