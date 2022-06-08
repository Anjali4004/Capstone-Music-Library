import React from "react";
import { mount, shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Player from "./Player";
const mockStore = configureMockStore([thunk]);

let props = {
  match: {
    params: { id: 1 },
  },
};
describe("Testing component Player", () => {
  const store = mockStore({
    songs: [{ id: 1 }],
  });
  let wrapper = mount(
    <Provider store={store}>
      <Player {...props} />
    </Provider>
  );
  it("Successful rendering", () => {
    expect(wrapper.find(".video_player").length).toBe(1);
  });
});
