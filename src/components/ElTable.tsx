/**
 * eltable测试
 */
import { Component, Vue } from "vue-property-decorator";
import { Table, TableColumn } from "element-ui"
@Component
export default class ElTable extends Vue {
  render() {
    const vm = this;
    return (
      <section class="content">
        <Table
          border
        >
          <TableColumn label="告警编号"></TableColumn>
          <TableColumn label="设备名称"></TableColumn>
          <TableColumn label="告警级别"></TableColumn>
        </Table>
      </section>
    )
  }
}
