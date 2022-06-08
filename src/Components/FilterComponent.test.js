import React from "react";
import { shallow } from "enzyme";
import FilterComponent from "./FilterComponent";
let props = {
  login: true,
};

describe("Test for FilterComponent", () => {
  let wrapper = shallow(<FilterComponent {...props} />);
  it("Testing Text", () => {
    let heading = wrapper.find("h5");
    expect(heading.at(0).render().text()).toBe("Singer");
    expect(heading.at(1).render().text()).toBe("Year");
    expect(heading.at(2).render().text()).toBe("Length");
  });
});
