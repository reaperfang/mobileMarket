const client = {
	state: {
		current: 0
	},
	mutations: {
		SETCURRENT: (state, index) => {
			state.current = index
		}
	}
}

export default client