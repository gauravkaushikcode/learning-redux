import React from "react";
import { mount } from "enzyme";
import Root from "Root";
import CommentBox from "components/CommentBox";

let wrappedCommentBoxComponent;
beforeEach(() => {
  wrappedCommentBoxComponent = mount(
    <Root>
      <CommentBox />
    </Root>
  );
});
afterEach(() => {
  wrappedCommentBoxComponent.unmount();
});
it("has a textarea and two buttons", () => {
  expect(wrappedCommentBoxComponent.find("textarea").length).toEqual(1);
  expect(wrappedCommentBoxComponent.find("button").length).toEqual(2);
});

describe("textarea should have", () => {
  beforeEach(() => {
    expect(wrappedCommentBoxComponent.find("textarea").length).toEqual(1);
    wrappedCommentBoxComponent
      .find("textarea")
      .simulate("change", { target: { value: "new comment" } });
    wrappedCommentBoxComponent.update();
  });
  it("has a textarea that users can type in", () => {
    expect(wrappedCommentBoxComponent.find("textarea").prop("value")).toEqual(
      "new comment"
    );
  });
  it("clean textarea when form submit", () => {
    expect(wrappedCommentBoxComponent.find("textarea").prop("value")).toEqual(
      "new comment"
    );
    wrappedCommentBoxComponent.find("form").simulate("submit");
    wrappedCommentBoxComponent.update();
    expect(wrappedCommentBoxComponent.find("textarea").prop("value")).toEqual(
      ""
    );
  });
});
