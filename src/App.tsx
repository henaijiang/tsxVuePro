import { Component, Vue } from 'vue-property-decorator'
@Component
export default class App extends Vue {
  render() {
    return (
      <div>
        {this.$route.meta.keepAlive?(
          <keep-alive>
            <router-view key={this.$route.name}></router-view>
          </keep-alive>
        ):(
          <router-view key={this.$route.name}></router-view>
        )}
      </div>
    )
  }
}

