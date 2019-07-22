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
		componentList: [],
		dataList: []
	},
	mutations: {

		/* 设置当前组件 */
		setCurrentComponentName: (state, type) => {
			state.currentComponentName = type;
		},

		/* 同步添加组件 */
		addComponentSync: (state, component) => {
			state.componentList.push(component);
			state.dataList.push({type: component.type});
		},

		/* 删除组件 */
		deleteComponent(state, component) {
			const tempComponentList = [...state.componentList];
      for(let i=0;i<tempComponentList.length; i++) {
        if(tempComponentList[i] === component ) {
          const index = tempComponentList.indexOf(component);
          if(index > -1) {
						if(tempComponentList[index+1]) {
							this.commit('setCurrentComponentName', tempComponentList[index+1].type);
						}else{
							this.commit('setCurrentComponentName', 'base');
						}
						this.commit('deleteData', component.type);
            tempComponentList.splice(index, 1);
          }
        }
      }
      state.componentList = tempComponentList;
		},

		/* 删除一条数据 */
		deleteData(state, type) {
			const tempDataList = [...state.dataList];
      for(let i=0;i<tempDataList.length; i++) {
        if(tempDataList[i].type === type ) {
          tempDataList.splice(i, 1);
        }else{
					continue;
				}
      }
      state.dataList = tempDataList;
		},

		/* 更新组件 */
		updateComponent(state, params) {
			const tempDataList = [...state.dataList];
      for(let i=0;i<tempDataList.length; i++) {
        if(tempDataList[i].type === params.type ) {
					Object.assign(tempDataList[i], params.data )
        }else{
					continue;
				}
      }
      state.dataList = tempDataList;
		}
	},
	actions: {

		//异步添加组件
		addComponent({ commit, state }, widget) {
			if(!state.componentList.length) {
				importVue(widget.name, (loadedComponent)=>{
					const component = Object.assign({}, loadedComponent.default, {type: widget.name, title: widget.title});
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
			if(!types.includes(widget.name)){
				importVue(widget.name, (loadedComponent)=>{
					const component = Object.assign({}, loadedComponent.default, {type: widget.name, title: widget.title});
					commit("addComponentSync", component);
				})
			}
		}
	}
};

export default decorate;
