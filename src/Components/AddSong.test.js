import React from "react";
import { shallow } from "enzyme";
import AddSong from "./AddSong";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("AllSongsPage rendering of elements", () => {
  let wrapper = shallow(<AddSong />);
  it("renders App component without crashing", () => {
    expect(wrapper.find("label").length).toBe(7);
  });
  it("Check for button Text", () => {
    let button = wrapper.find("button");
    expect(button.render().text()).toBe("Submit");
  });
});
describe("Check for input field", () => {
  let wrapper = shallow(<AddSong />);
  it("Check for input field", () => {
    expect(wrapper.find("input").length).toBe(7);
  });
});
