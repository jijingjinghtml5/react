export const setWidget = (index,text) => {
  return {
    type: 'SET_WIDGET',
    index,
    text
  }
}

export const setData = (text) => {
  return {
    type: 'SET_DATA',
    text
  }
}

