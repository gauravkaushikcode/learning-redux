import React from "react";
import { mount } from "enzyme";

import CommentList from "components/CommentList";
import Root from "root";

let wrappedCommentsList;

beforeEach(() => {
  const initialState = {
    comments: ["comment 1", "comment 2", "comment 3"],
  };

  wrappedCommentsList = mount(
    <Root initialState={initialState}>
      <CommentList />
    </Root>
  );
});

it("creates one li per comment", () => {
  expect(wrappedCommentsList.find("li").length).toEqual(3);
});
it("shows the text for each comment", () => {
  expect(wrappedCommentsList.render().text()).toContain("comment 1");
  expect(wrappedCommentsList.render().text()).toContain("comment 2");
  expect(wrappedCommentsList.render().text()).toContain("comment 3");
});
