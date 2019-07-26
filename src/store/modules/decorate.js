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
		/* 显示基础属性组件 */
		showBaseProperty: (state) => {
			state.basePropertyShow = true;
		},

		/* 隐藏基础属性组件 */
		hideBaseProperty: (state) => {
			state.basePropertyShow = false;
		},

		/* 设置当前组件id */
		setCurrentComponentId: (state, id) => {
			state.basePropertyShow = false;
			state.currentComponentId = id;
		},


		/* 删除组件 */
		deleteComponent(state, id) {
			//删除数据列表中对应项
			const tempComponentDataMap = { ...state.componentDataMap };
			delete tempComponentDataMap[id];
			state.componentDataMap = tempComponentDataMap;

			//删除顺序列表中对应项
			const index = state.componentDataIds.indexOf(id);
			const prevId = state.componentDataIds[index - 1];
			const nextId = state.componentDataIds[index + 1];
			if (nextId) {
				this.commit("setCurrentComponentId", nextId);
			} else if (prevId) {
				this.commit("setCurrentComponentId", prevId);
			} else {
				state.basePropertyShow = true;
			}
			state.componentDataIds.splice(index, 1);

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


		/* 更新组件数据 */
		updateComponent(state, params) {

			//对基础信息组件特殊处理
			if (params.type && params.type === 'base') {
				state.baseInfo = params.data;
			} else {
				//对列表组件处理
				const tempComponentDataMap = { ...state.componentDataMap };
				const componentData = tempComponentDataMap[params.id];
				if (componentData) {
					componentData['data'] = params.data;
					state.componentDataMap = tempComponentDataMap;
				}
			}
		},

		//设置店铺基本信息
		setBaseInfo(state, baseInfo) {
			state.baseInfo = baseInfo;
		},

		//外部设置ids序列
		setComponentDataIds(state, ids) {
			state.componentDataIds = ids;
		},

		//外部设置数据map列表
		setComponentDataMap(state, componentDataMap) {
			state.componentDataMap = componentDataMap;
		},

		//清除所有数据实现初始化
		clearAllData(state) {
			state.baseInfo = {
				pageName: '',
				pageTitle: '',
				pageDesc: '',
				pageClassify: '1',
				pageBackground: ''
			};
			state.componentDataIds = [];
			state.componentDataMap = {};
		}
	},
	actions: {}
};

export default decorate;
