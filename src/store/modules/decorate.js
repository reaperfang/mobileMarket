import utils from "@/utils";
import uuid from 'uuid/v4';
const titleCase = utils.titleCase;

/* 继续选中 */
const selectNext = (state, index)=>{
	const prevId = state.componentDataIds[index-1];
	const nextId = state.componentDataIds[index+1];
	const firstId = state.componentDataIds[0];
	if(nextId) {
		this.commit("setCurrentComponentId", nextId);
	}else if(prevId){
		this.commit("setCurrentComponentId", prevId);
	}else {
		this.commit("setCurrentComponentId", firstId);
	}
}

const decorate = {
	state: {
		currentComponentId: "",
		componentDataIds: [],
		componentDataMap: {}
	},
	mutations: {
		/* 设置当前组件id */
		setCurrentComponentId: (state, id) => {
			state.currentComponentId = id;
		},

		/* 添加组件数据 */
		addComponent: (state, component) => {
			const id = uuid();
			state.componentDataIds.push(id);
			state.componentDataMap[id] = {
				id,
				type: component.type,
				title: component.title,
				data: null   //默认必须是null，否则首次渲染模板会出错!
				// data: {}   //默认必须是null，否则首次渲染模板会出错!
			};
		},

		/* 删除组件 */
		deleteComponent(state, id) {

			//删除顺序列表中对应项
			const index = state.componentDataIds.indexOf(id);
			const prevId = state.componentDataIds[index-1];
			const nextId = state.componentDataIds[index+1];
			const firstId = state.componentDataIds[0];
			if(nextId) {
				this.commit("setCurrentComponentId", nextId);
			}else if(prevId){
				this.commit("setCurrentComponentId", prevId);
			}else {
				this.commit("setCurrentComponentId", firstId);
			}
			state.componentDataIds.splice(index, 1);

			//删除数据列表中对应项
			const tempcomponentDataMap = {...state.componentDataMap};
			delete tempcomponentDataMap[id];
			state.componentDataMap = tempcomponentDataMap;
		},

		/* 更新组件 */
		updateComponent(state, params) {
			const tempcomponentDataMap = {...state.componentDataMap};
			const componentData = tempcomponentDataMap[params.id];
			if(componentData){
				componentData['data'] = params.data;
				state.componentDataMap = tempcomponentDataMap;
			}
		}
	},
	actions: {}
};

export default decorate;
