import React from "react";
import { mount } from "enzyme";
import App from "./App";

describe("App", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });

  test("renders correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
