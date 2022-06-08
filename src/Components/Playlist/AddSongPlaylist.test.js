import React from "react";
import { shallow } from "enzyme";
import AddSongPlaylist from "./AddSongPlaylist";

const mockDispatch = jest.fn();
jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));
const props = {
  match: {
    params: { id: 1 },
  },
};

describe("AllSongsPage rendering of elements", () => {
  let wrapper = shallow(<AddSongPlaylist {...props} />);
  it("renders component without crashing", () => {
    expect(wrapper.find("label").length).toBe(0);
  });
  it("Check for button text", () => {
    let button = wrapper.find("button");
    expect(button.render().text()).toEqual("Update Playlist");
  });
});
