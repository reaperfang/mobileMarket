import utils from "@/utils";
const titleCase = utils.titleCase;
const importVue = (name, callback)=> {
	import(`@/views/shop/decorate/comps/component${titleCase(name)}.vue`).then(loadedComponent => {
		callback(loadedComponent);
	})
	.catch(e => {
		console.error(e);
	});
}

const decorate = {
	state: {
		currentComponentName: "base",
		componentList: []
	},
	mutations: {
		setCurrentComponentName: (state, name) => {
			state.currentComponentName = name;
		},

		addComponentSync: (state, component) => {
			state.componentList.push(component);
			console.log(state.componentList);
		}
	},
	actions: {
		//添加组件
		addComponent({ commit, state }, name) {
			if(!state.componentList.length) {
				importVue(name, (loadedComponent)=>{
					const component = Object.assign({}, loadedComponent.default, {type: name});
					commit("addComponentSync", component);
				})
				return;
			}

			//收集组件名称
			let types = [];
			for(let i=0;i<state.componentList.length; i++) {
				types.push(state.componentList[i].type);
			}

			//判断是否已存在
			if(!types.includes(name)){
				importVue(name, (loadedComponent)=>{
					const component = Object.assign({}, loadedComponent.default, {type: name});
					commit("addComponentSync", component);
				})
			}
		}
	}
};

export default decorate;
