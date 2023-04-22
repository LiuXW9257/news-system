/**
 * 封装 axios
 */

import axios from "axios";
import { BASE_URL, TIMEOUT } from "./config";

class Request {
  constructor(baseURL, timeout) {
    this.instance = axios.create({
      baseURL,
      timeout,
    });
    // 定义统一的响应拦截器
    this.instance.interceptors.response.use(
      res => {
        return res
      },
      err => {
        // console.Error(err);
        // return err
        throw err
      }
    )
  }
  // 定义通用的请求方法
  request(config){
    return this.instance.request(config)
  }
  get(url){
    return this.request({
      url,
      method: 'get',
    })
  }
  post(url, data={}){
    return this.request({
      url,
      method: 'post',
      data,
    })
  }
  delete(url) {
    return this.request({
      url,
      method: 'delete'
    })
  }
  patch(url, data={}) {
    return this.request({
      url,
      method: 'patch',
      data,
    })
  }
}

export const req = new Request(BASE_URL, TIMEOUT)