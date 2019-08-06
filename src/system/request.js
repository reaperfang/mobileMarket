import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "@/store";
import utils from "@/utils";
import { getToken } from '@/system/auth'
import md5 from 'md5'
import appConfig from '@/system/appConfig';
class Ajax {
  constructor() {
    this.systemRequest = 'head';
    this.service = axios.create({
      timeout: 10000, // request timeout
    });

    this.initGlobal();
  }

  static getInstance() {
    return (this.instance = this.instance || new this());
  }

  initGlobal() {
    // 响应拦截
    this.service.interceptors.response.use(
      response => {
        const res = response.data
          if(res.status === 'success'){
            if(res.accessToken){
              return res;
            }
            return res.data;
          } else if(res.errno === 0){
            return res.data;;
          } else {
            return Promise.reject(res.msg)
          }
      },
      error => {
        if (error.code === "ECONNABORTED") {
          error.message = "登录连接超时（后台不能连接，请联系系统管理员）";
        }
        return Promise.reject(error.message);
      }
    );
  }

  request(config) {
    this.setApiAddress(config);
    if(config.target){
      config = this.setRequestParams(config);
    }
    return this.service(config);
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
<<<<<<< HEAD
      accessToken: store.getters.token || '7834a06f4bcc3d0fc54d7773d5e0149d5e169d161133f8714f906fe8f2d5cc2d',
=======
      accessToken: store.getters.token || '7834a06f4bcc3d0fc54d7773d5e0149d3f98de0d0032ba516aad3ae775707115',
>>>>>>> 38d9d04bf2718efeb78b2c7cedc1633c3ebe4965
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

  //配置接口地址
  setApiAddress(config) {
    if(!config.baseURL){
      if(config.apiType){
        switch(config.apiType) {
          case 'member':  //新零售商城
            config.baseURL = `${process.env.DATA_API}/api-member-web/member/api.do`;
          break;
          case 'coupon':  //优惠券系统
            config.baseURL = `${process.env.DATA_API}/coupon/api.do`; //测试环境
          break;
          case 'monitor': //埋点项目
            config.baseURL = `${process.env.DATA_API}/monitor-web/monitor/api.do`;
          break;
          case 'goods': //商品系统
            config.baseURL = `${process.env.DATA_API}/api-commodity-web/commodity/api.do`; // 王浩
          break;
<<<<<<< HEAD
          case 'order': //订单系统
            config.baseURL = `${process.env.DATA_API}/api-order-web/order/api.do`; // 李刚 尹茂凯
=======
          case 'decorate':  //装修接口
            config.baseURL = `${process.env.DATA_API}/decoration/api.do`;
>>>>>>> 38d9d04bf2718efeb78b2c7cedc1633c3ebe4965
          break;
        }
      }
    }
    
  }
}

let ajax = Ajax.getInstance();

export default ajax.request.bind(ajax);
