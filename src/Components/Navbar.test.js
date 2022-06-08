import React from "react";
import { shallow } from "enzyme";
import NavBar from "./Navbar";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
describe("Check Navbar rendering", () => {
  it("Testing...", () => {
    let wrapper = shallow(<NavBar />);
    expect(wrapper.find("Navbar").length).toBe(1);
  });
});
