import { httpService } from "./http";
class userServer {
  /**登录 */
  static async login(obj: any) {
    const result: any = await httpService.post(`/api/user/login`, obj);
    return result;
  }
}
export { userServer };
