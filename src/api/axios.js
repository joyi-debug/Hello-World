// 二次封装axios 拦截器
import axios from 'axios'
import config from '../config/index'
// 根据开发和生产环境不一样，设置配置
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
class HttpRequest {
  constructor(baseUrl){
    this.baseUrl = baseUrl
  }

  getInsideConfig(){
    const config = {
      baseURL : this.baseUrl,
      header: {}
    }
    return config
  }

  interceptors(instance){
      // 添加请求拦截器
      instance.interceptors.request.use(function (config) {
        // 在发送请求之前做些什么
        return config;
      }, function (error) {
        // 对请求错误做些什么
          console.log(error)
          return Promise.reject(error);
      });

      // 添加响应拦截器
      instance.interceptors.response.use(function (response) {
        // 对响应数据做点什么
        return response.data;
      }, function (error) {
          // 对响应错误做点什么
          console.log(error)
          return Promise.reject(error);
      });
  }

  Request(option){
    const instance = axios.create()
    option = { ...(this.getInsideConfig()), ...option}
    this.interceptors(instance)
    return instance(option)
  }
}
export default new HttpRequest(baseUrl)
