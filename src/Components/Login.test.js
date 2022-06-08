import React from "react";
import { shallow } from "enzyme";
import Login from "./Login";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
describe("Login Component", () => {
  let wrapper = shallow(<Login />);
  it("Test for input field", () => {
    let input = wrapper.find("input");
    expect(input.length).toBe(2);
  });
  it("Test for button Field", () => {
    let button = wrapper.find("button");
    expect(button.prop("className")).toBe("login");
  });
});
