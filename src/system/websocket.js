import { config} from './config.js'
import ReconnectingWebSocket from 'reconnecting-websocket';
class Websocket {

      constructor(params) {
            this.type = params.type;
            this.data = params.data;
            this.callbacks = params.callbacks;
            this.wsObj = {};
            this.init();
      }
      /**
    * 连接websocket
    * 
    * @memberof Http
    */
      init() {
            let apiType = config[this.type]
            const paramsUrl = this.data ? 'requestPath:' + this.urlReplace(apiType.paramsUrl, this.data) : 'requestPath:' + apiType.paramsUrl;
            let url = this.getUrl(apiType.baseUrl);
            this.createWsObj(url,paramsUrl);
      }

      createWsObj(url,paramsUrl){
            const _self = this;
            this.wsObj = new ReconnectingWebSocket(url);
            //连接成功建立的回调方法
            this.wsObj.onopen = ()=>{
                  _self.callbacks.onopen &&  _self.callbacks.onopen();
                  _self.wsObj.send(paramsUrl);
            };
            //接收到消息的回调方法
            this.wsObj.onmessage = (event)=>{
                  var result = null;
                  if (typeof event.data === 'string' && event.data !== '') {
                        result = JSON.parse(event.data);
                  } else if (event.data instanceof Object) {
                        result = event.data;
                  } else {
                        _self.callbacks.onmessage &&  _self.callbacks.onmessage(true, '数据错误');
                        return;
                  }
                  if (result.code === 2000) {
                        _self.callbacks.onmessage &&  _self.callbacks.onmessage(false, result.data);
                  } else {
                        _self.callbacks.onmessage &&  _self.callbacks.onmessage(true, '连接错误,错误码:' + result.code);
                  }
            };
            //连接关闭的回调方法
            this.wsObj.onclose = ()=>{
                  _self.callbacks.onclose &&  _self.callbacks.onclose();
            };
      }

      urlReplace(url, replaceObj) {
            for (let filed in replaceObj) {
                  url = url.indexOf(filed) >= 0 ? url.replace(filed, replaceObj[filed]) : url;
            }
            return url;
      }

      getUrl(baseUrl){
            const env = process.env.NODE_ENV.trim();
            let url = '';
            if(env === 'development'){
                  url = baseUrl;
            }else{
                  url = 'ws://' + window.location.host + baseUrl;
            }
            return url;
      }

      close(){
            this.wsObj.close();
            console.log(this.type,'已关闭');
      }

}

export default Websocket;