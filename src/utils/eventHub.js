/**
 * 全局事件中心
 * 跨组件通信,导出单例
 */
import Vue from 'vue'
let eventHub = {}
//导出单例，保证唯一性
eventHub._instance = undefined;
eventHub.getInstance = function () {
    if (!eventHub._instance) {
        eventHub._instance = new Vue();
    }
    return eventHub._instance;
};
const result = eventHub.getInstance();
export default result
