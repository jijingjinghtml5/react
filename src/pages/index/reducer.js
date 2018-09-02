
const visibleDATA = (state = {data:[],title:'页面标题'}, action) => {
  switch (action.type) {
    case 'SET_DATA':
    	state.widgets[action.index] = action.text;
      return state
    case 'SET_WIDGET':
      return Object.assign({},state, action.text)
    default:
      return state
  }
}

export default visibleDATA


