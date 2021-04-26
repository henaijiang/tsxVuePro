import { httpService } from "./http";
/**
 * 网易云音乐api
 */
class wyyServer {
  /**登录 */
  static async loginByPhone(phone: number, password: string) {
    const result: any = await httpService.get(
      `/login/cellphone?phone=${phone}&password=${password}`
    );
    return result;
  }
}
export { wyyServer };
