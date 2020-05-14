import axios from 'axios';
import { Message } from 'element-ui';
const http = axios.create({
  timeout: 10000
});
// 添加request拦截器
http.interceptors.request.use(config => {     
  return config
}, error => {
  Promise.reject(error)
});
// 添加response拦截器
http.interceptors.response.use(response => {
  return response.data
}, error => {
  const msg = error.response.data !== undefined ? error.response.data.detail : '';
  Message.error(msg);
  return Promise.reject(error)
});
//封装axios
class httpService {
  static get(url: string) {
    return new Promise((resolve, reject) =>{        
      http.get(url).then(res => {
        resolve(res);
      }).catch(err =>{
        reject(err.response)        
      })
    })
  }
  static post(url: string, params: object) {
    return new Promise((resolve, reject) =>{        
      http.post(url,params).then(res => {
        resolve(res)
      }).catch(err =>{
        reject(err.response)        
      })
    })
  }
  static delete(url: string) {
    return new Promise((resolve, reject) =>{        
      http.delete(url).then(res => {
        resolve(res)
      }).catch(err =>{
        reject(err.response)        
      })
    })
  }
}
export { httpService }