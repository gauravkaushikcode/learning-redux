import store from "./store";
import { bugAdded, bugRemoved, bugResolved } from "./actions";

const unsubscribe = store.subscribe(() => {
  console.log("Store Changed!", store.getState());
});

store.dispatch(bugAdded("Bug 1"));
store.dispatch(bugResolved(1)("Bug 1 resolved by Gaurav"));
unsubscribe();
store.dispatch(bugRemoved(1));
console.log(store.getState());
