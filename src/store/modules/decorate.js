import uuid from 'uuid/v4';

const decorate = {
	state: {
		currentComponentId: "",  //当前组件id
		baseProperty: {},  //基础属性
		baseInfo: {},  //店铺装修页面基础信息
		componentDataIds: [],  //组件列表id序列
		componentDataMap: {}   //组件数据集合映射
	},
	mutations: {

		/* 设置当前组件id */
		setCurrentComponentId: (state, id) => {
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
				// 当前组件为基础组件
				this.commit("setCurrentComponentId", state.baseProperty.id);
			}
			state.componentDataIds.splice(index, 1);

		},


		/* 添加组件 */
		addComponent: (state, component) => {
			const id = uuid();
			const obj = {
				id,
				type: component.type,
				title: component.title,
				hidden: component.hidden,
				data: null   //默认必须是null，否则首次渲染模板会出错!
			};

			// 添加组件id到ids顺序表
			state.componentDataIds.push(id);

			// 添加组件数据到数据以映射表
			state.componentDataMap[id] = obj;

			// 设置当前组件id
			state.currentComponentId = id;

			// 设置基础组件
			if(component.isBase) {
				state.baseProperty = obj;
			}

		},


		/* 更新组件数据 */
		updateComponent(state, params) {
			//对基础信息组件特殊处理
			if (params.id === state.baseProperty.id) {
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

		//设置基本信息
		setBaseInfo(state, baseInfo) {
			state.baseInfo = baseInfo;
		},

		//外部设置ids顺序表
		setComponentDataIds(state, ids) {
			state.componentDataIds = ids;
		},

		//外部设置数据map列表
		setComponentDataMap(state, componentDataMap) {
			state.componentDataMap = componentDataMap;
		},

		//初始化所有数据
		clearAllData(state) {
			state.baseInfo = {};
			state.componentDataIds = [];
			state.componentDataMap = {};
		}
	},
	actions: {}
};

export default decorate;
