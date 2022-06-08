import React from "react";
import { shallow } from "enzyme";
import About from "./About";

describe("Test for Rendering About component", () => {
  let wrapper = shallow(<About />);
  it("Testing...", () => {
    let heading1 = wrapper.find("h2");
    expect(heading1.at(0).render().text()).toBe("Music App");
  });
  it("Testing button text..", () => {
    let button = wrapper.find("button");
    expect(button.at(0).render().text()).toBe("Create Playlist");
  });
});
