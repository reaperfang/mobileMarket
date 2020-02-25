const menu = {
	state: {
		current: 0
	},
	mutations: {
		SETCURRENT: (state, index) => {
			state.current = index
		}
	}
}

export default menu