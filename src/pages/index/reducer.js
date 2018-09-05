
const visibleDATA = (state = {}, action) => {

  switch (action.type) {
    case 'SET_WIDGET':
    	state.widgets[action.index] = action.text;
      return state
    case 'SET_DATA':
      return Object.assign({},state, action.text)
    default:
      return state
  }
}

export default {visibleDATA}


