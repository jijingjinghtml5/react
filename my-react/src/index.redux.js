const ADD_GUN = '+';
const REMOVE_GUN = '-';


export function counter(state=0,action){
 	switch(action.type){
 		case ADD_GUN:
 		    return state+1
 		case REMOVE_GUN:
 			return state-1
 		default:
 		return state
 	}
 }

 export function addGUN(){
 	return {
 		type:ADD_GUN
 	}
 }


 export function removeGUN(){
 	return {
 		type:REMOVE_GUN
 	}
 }
