const defauleState = {
  detailData: [],
};
export function cartData(state = defauleState, actions) {
  if (actions.type === 'addDetail') {
    state.detailData = actions.data;
    return state;
  }
  return state;
}
