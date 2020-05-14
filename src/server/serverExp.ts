import { httpService } from "./http"
class serverExp {
  //查询单线图列表
  static async getCimList(key: string, pageIndex: number, pageSize: number) {
    const result: any = await httpService.get(
      `/api/cim/core/2.0/circuit?key=${key}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    return result
  }
}
export { serverExp }