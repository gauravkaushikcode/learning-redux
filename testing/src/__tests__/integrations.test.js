import React from "react";
import { mount } from "enzyme";
import moxios from 'moxios';
import Root from "root";
import App from "components/App";
beforeEach(()=>{
  moxios.install();
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{name:'comment 1'},{name:'comment 2'},{name:'comment 3'}]
  });
})
afterEach(()=>{
  moxios.uninstall();
})
it("can fetch a list of comments and display them", (done) => {
  //render App >> find 'fetchComments' button >> click >> get a list of comments

  const wrapped = mount(
    <Root>
      <App />
    </Root>
  );
  wrapped.find(".fetch-comments").simulate("click");

  //introduce a TINY sleep or time-out
  // setTimeout(() => {
  //   wrapped.update();
  //   expect(wrapped.find("li").length).toEqual(3);
  //   done();
  //   wrapped.unmount();
  // }, 100);
  // or instead use moxios.wait

  moxios.wait(()=>{
    wrapped.update();
    expect(wrapped.find("li").length).toEqual(3);
    done();
    wrapped.unmount();
  });
  
});
