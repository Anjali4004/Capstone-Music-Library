import React from "react";
import { Provider } from "react-redux";
import { mount, shallow } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import ViewPlaylist from "./viewPlaylist";

const mockStore = configureMockStore([thunk]);

describe("App", () => {
  it("should render a Viewplaylist component", () => {
    const store = mockStore({
      playlist: [{ complete: false }],
    });
    const wrapper = mount(
      <Provider store={store}>
        <ViewPlaylist />
      </Provider>
    );
    expect(wrapper.find("button").length).toEqual(2);
  });
});
