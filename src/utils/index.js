import * as utils from "./base"; //基础工具方法
import clipboard from "./clipboard"; //剪切板
import * as eventHub from "./eventHub"; //全局事件中心
import print from "./print"; //打印工具箱
import * as validate from "./validate"; //验证工具箱

export default Object.assign(utils, {
	clipboard,
	eventHub,
	print,
	validate
});
