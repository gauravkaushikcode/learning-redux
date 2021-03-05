import React from "react";
import { shallow } from "enzyme";

import App from "components/App";
import CommentBox from "components/CommentBox";
import CommentList from "components/CommentList";

let wrappedAppComponent;
beforeEach(() => {
  wrappedAppComponent = shallow(<App />);
});

it("shows a comment box", () => {
  expect(wrappedAppComponent.find(CommentBox).length).toEqual(1);
});
it("shows a comment list", () => {
  expect(wrappedAppComponent.find(CommentList).length).toEqual(1);
});
