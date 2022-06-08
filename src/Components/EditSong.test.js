import React from "react";
import { shallow } from "enzyme";
import EditSong from "./EditSong";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
let props = {
  match: {
    params: { id: 1 },
  },
};
describe("AllSongsPage rendering of elements", () => {
  let wrapper = shallow(<EditSong {...props} />);
  it("renders App component without crashing", () => {
    expect(wrapper.find("label").length).toBe(7);
  });
  it("Check for button Text", () => {
    let button = wrapper.find("button");
    expect(button.render().text()).toBe("Update");
  });
});
describe("Check for input field", () => {
  let wrapper = shallow(<EditSong {...props} />);
  it("Check for input field", () => {
    expect(wrapper.find("input").length).toBe(7);
  });
});
