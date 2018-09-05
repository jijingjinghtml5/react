// export const setWidget = (index,text) => {
//   return {
//     type: 'SET_WIDGET',
//     index,
//     text
//   }
// }

// export const setData = (text) => {
//   return {
//     type: 'SET_DATA',
//     text
//   }
// }


export default () => {
    var action = {};
    action['setWidget'] = (index,text) => {
	  return {
	    type: 'SET_WIDGET',
	    index,
	    text
	  }
	}

	action['setData'] = (text) => {
	  return {
	    type: 'SET_DATA',
	    text
	  }
	}
	console.log(action);
    return action;
} 