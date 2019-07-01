import ReconnectingWebSocket from 'reconnecting-websocket';
import { Message, MessageBox } from "element-ui";
import store from "@/store";
import utils from "@/utils";
import { getToken } from '@/system/auth'
import md5 from 'md5'
import appConfig from '@/system/appConfig';

class Websocket {

  static websocket(config) {
    return new Websocket(config);
  }
  
  constructor(config) {
    this.systemRequest = 'head';
    this.service = null;
    this.onopen = config.methods.onopen;
    this.onmessage = config.methods.onmessage;
    this.onerror = config.methods.onerror;
    this.onclose = config.methods.onclose;
    this.init(config);
  }

  init(config) {
    const _self = this;

    const url = this.setUrl(config);
    this.service = new ReconnectingWebSocket(url);
    //连接成功建立的回调方法
    this.service.onopen = ()=>{
        _self.onopen();
        _self.service.send(url);
    };
    //接收到消息的回调方法
    this.service.onmessage = (event)=>{
        const res = event.data;
        if(res){
          _self.onmessage(res);
        } else {
          _self.onerror('error');
        }
    };
    //连接关闭的回调方法
    this.service.onclose = (event)=>{
        _self.onclose(event.reason);
    };
  }

  setUrl(config) {
    return config.baseURL + config.url;
  }

  // 根据后端接口重置请求
  setRequestParams(config) {
    const CONST = appConfig[this.systemRequest];
    if(!CONST){
      MessageBox.alert('请求参数错误', '警告', {
        confirmButtonText: '确定',
        type: 'error'
      })
    }

    //拼接参数head
    let head = {
      target: config.target,
      accessToken: store.getters.token || '',
      client: CONST.CLIENT,
      version: CONST.VERSION,
      requestTime: utils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
      channel: CONST.CHANNEL,
      key: CONST.KEY
    };
    head.value = md5(CONST.VALUE + head.target + head.requestTime);

    //获取cid和shopInfoId
    let cid = store.getters.userInfo && store.getters.userInfo.cid ? store.getters.userInfo.cid : '';
    let shopInfoId = store.getters.userInfo && store.getters.userInfo.shopInfoId ? store.getters.userInfo.shopInfoId 
    : '';

      //拼接全部参数
      if (config.method == "post") {
        if(config.noCid){
          config.data =`json=${encodeURI(JSON.stringify({ head, data: config.data}))}`;
        }else{
          config.data =`json=${encodeURI(JSON.stringify({ head, data: {...config.data,cid,shopInfoId}}))}`;
        }
      } else if (config.method == "get") {
        if(config.noCid){
          config.params = {json: {head, data: config.params}};
        }else{
          config.params = {json: {head, data: {...config.params,cid,shopInfoId}}};
        }
      }
      return config;
    }

}


export default Websocket.websocket;
