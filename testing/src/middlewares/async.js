export default ({ dispatch }) => (next) => (action) => {
  // does action has a promise on its 'payload' property
  if (!action.payload || !action.payload.then) {
    return next(action);
  }
  // if yes, then wait for it to resolve
  action.payload.then(function (response) {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
  // if not, then send action to next middleware
};
