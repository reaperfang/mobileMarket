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

  // request拦截器
  requestGlobal() {
    this.service.interceptors.request.use(
      e => {
        e.params = e.params || {}
        // e.headers = e.headers || {}
        e.headers = {
          businessId: 1,
          tenantId: 1,
          merchantId: 1,
          loginUserId: 1
        }
        return e
      },
      error => ({ status: 0, msg: error.message })
    )
  }

  // respone拦截器
  initGlobal() {
    this.service.interceptors.response.use(
      response => {
        const res = response.data
        if (res.status === 'success' || res.status === 200) {
          if (res.accessToken) {
            return res;
          }
          return res.data;
        } else if (res.errno === 0) {
          return res.data;
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
    if (config.target) {
      config = this.setRequestParams(config);
    } else {
      this.requestGlobal();
    }
    return this.service(config);
  }

  // 根据后端接口重置请求 -- 电商
  setRequestParams(config) {
    const CONST = appConfig[this.systemRequest];
    if (!CONST) {
      MessageBox.alert('请求参数错误', '警告', {
        confirmButtonText: '确定',
        type: 'error'
      })
    }

    //拼接参数head
    let head = {
        target: config.target,
        accessToken: store.getters.token || '7834a06f4bcc3d0fc54d7773d5e0149dbbc8c6bfa9f10f632f254e9845946eaf',
        client: CONST.CLIENT,
        version: CONST.VERSION,
        requestTime: utils.formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
        channel: CONST.CHANNEL,
        key: CONST.KEY
      };
      head.value = md5(CONST.VALUE + head.target + head.requestTime);

    //获取cid和shopInfoId
    let cid = store.getters.userInfo && store.getters.userInfo.cid ? store.getters.userInfo.cid : '2';
    let shopInfoId = store.getters.userInfo && store.getters.userInfo.shopInfoId ? store.getters.userInfo.shopInfoId
      : '';

    //拼接全部参数
    if (config.method == "post") {
      if (config.noCid) {
        config.data = `json=${encodeURI(JSON.stringify({ head, data: config.data }))}`;
      } else {
        config.data = `json=${encodeURI(JSON.stringify({ head, data: { cid, ...config.data } }))}`;
      }
    } else if (config.method == "get") {
      if (config.noCid) {
        config.params = { json: { head, data: config.params } };
      } else {
        config.params = { json: { head, data: { ...config.params, cid } } };
      }
    }
    return config;
  }

  //配置接口地址
  setApiAddress(config) {
    if (!config.baseURL) {
      if (config.apiType) {
        switch (config.apiType) {
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
          case 'order': //订单系统
            //config.baseURL = `${process.env.DATA_API}/api-order-web/order/api.do`; // 李刚 尹茂凯
            config.baseURL = `/order_server/api-order-web/order/api.do`; // 李刚 尹茂凯
            break;
          case 'decorate':  //装修接口
            config.baseURL = `${process.env.DATA_API}/decoration/api.do`;
            break;
          case 'finance':  //财务接口
            config.baseURL = `${process.env.DATA_API}/api-financial-web/financial/api.do`;
            break;
          case 'goodsOperate':  //商品运营
            config.baseURL = `${process.env.DATA_API}/api-public-web/public/api.do`;
            break;
          case 'publicOrder':  //地址
          config.baseURL = `${process.env.DATA_API}/api-public-web/public/api.do`; // 李权宇
            break;
        }
      }
    }

  }
}

let ajax = Ajax.getInstance();

export default ajax.request.bind(ajax);