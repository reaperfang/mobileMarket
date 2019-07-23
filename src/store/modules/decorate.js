import uuid from 'uuid/v4';

const decorate = {
	state: {
		currentComponentId: "",  //当前组件id
		basePropertyShow: true,  //基础属性显示开关
		baseInfo: {  //店铺装修页面基础信息
			pageName: '',
			pageTitle: '',
			pageDesc: '',
			pageClassify: '1',
			pageBackground: ''
		},  
		componentDataIds: [],  //组件列表id序列
		componentDataMap: {}   //组件数据集合映射
	},
	mutations: {
		/* 设置当前组件id */
		setCurrentComponentId: (state, id) => {
			state.basePropertyShow = false;
			state.currentComponentId = id;
		},

		showBaseProperty: (state) => {
			state.basePropertyShow = true;
		},

		hideBaseProperty: (state) => {
			state.basePropertyShow = false;
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
			};

			state.basePropertyShow = false;
			state.currentComponentId = id;
		},

		/* 删除组件 */
		deleteComponent(state, id) {
			//删除数据列表中对应项
			const tempcomponentDataMap = {...state.componentDataMap};
			delete tempcomponentDataMap[id];
			state.componentDataMap = tempcomponentDataMap;

			//删除顺序列表中对应项
			const index = state.componentDataIds.indexOf(id);
			const prevId = state.componentDataIds[index-1];
			const nextId = state.componentDataIds[index+1];
			if(nextId) {
				this.commit("setCurrentComponentId", nextId);
			}else if(prevId){
				this.commit("setCurrentComponentId", prevId);
			}else{
				state.basePropertyShow = true;
			}
			state.componentDataIds.splice(index, 1);

		},

		/* 更新组件 */
		updateComponent(state, params) {

			//对基础信息组件特殊处理
			if(params.type && params.type === 'base') {
				state.baseInfo = params.data;
			}else{
				//对列表组件处理
				const tempcomponentDataMap = {...state.componentDataMap};
				const componentData = tempcomponentDataMap[params.id];
				if(componentData){
					componentData['data'] = params.data;
					state.componentDataMap = tempcomponentDataMap;
				}
			}
		}
	},
	actions: {}
};

export default decorate;
