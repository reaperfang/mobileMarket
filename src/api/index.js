import { MessageBox } from "element-ui";
import * as demo from "./demo"; //订单接口
import * as demo2 from "./demo2"; //商铺接口shop

let modules = {
	demo,
	demo2
};

let keys = [];
let apis = {};
for (let k in modules) {
	for (let k2 in modules[k]) {
		if (!keys.includes(k2)) {
			keys.push(k2);
			apis[k2] = modules[k][k2];
		} else {
			MessageBox.alert(
				`接口名称< ${k2} >重复,请重命名后再次尝试！`,
				"警告",
				{
					confirmButtonText: "确定",
					type: "error"
				}
			);
		}
	}
}

export default apis;
