import * as actions from "./actionTypes";

export default function reducer(state = [], action) {
  let lastId = 0;
  switch (action.type) {
    case actions.BUG_ADDED:
      return [
        ...state,
        {
          id: ++lastId,
          description: action.payload.description,
          resolved: false,
        },
      ];
    case actions.BUG_REMOVED:
      return state.filter((bug) => bug.id !== action.payload.id);
    case actions.BUG_RESOLVED:
      return state.map((bug) =>
        bug.id !== action.payload.id
          ? bug
          : { ...bug, description: action.payload.description, resolved: true }
      );
    default:
      return state;
  }
}
