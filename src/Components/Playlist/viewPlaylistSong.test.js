import React from "react";
import { shallow } from "enzyme";
import ViewPlaylistSong from "./ViewPlaylistSong";

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
  let wrapper = shallow(<ViewPlaylistSong {...props} />);
  it("renders component without crashing", () => {
    expect(wrapper.find("Card").length).toBe(1);
  });
  it("Check for button Text", () => {
    let button = wrapper.find("button");
    expect(button.render().text()).toBe("Add New Song");
  });
});
