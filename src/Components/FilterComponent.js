import React, { useState, useEffect } from "react";
const FilterComponent = (props) => {
  const [showSinger, setSinger] = useState(false);
  const [showYear, setYear] = useState(false);
  const [showLength, setLength] = useState(false);

  useEffect(() => {
    props.parentSinger(showSinger, showYear, showLength);
  }, [showYear, showSinger, showLength]);
  const changeSinger = () => {
    setSinger(!showSinger);
  };
  const changeYear = () => {
    setYear(!showYear);
  };
  const changeLength = () => {
    setLength(!showLength);
  };
  return (
    <div style={{ maxHeight: "30px" }}>
      {!props.login ? (
        <h4 style={{ color: "red", textAlign: "center" }}>
          For customized view please Login <a href="/Login">Click Here</a>
        </h4>
      ) : (
        <div
          class="d-flex flex-row bd-highlight mb-3"
          style={{ color: "blue" }}
        >
          <div class="p-2 bd-highlight">
            <h4>Filter: </h4>
          </div>
          <div class="p-2 bd-highlight">
            {" "}
            <h5>
              <input
                type="checkbox"
                id="singer"
                name="topping"
                checked={showSinger}
                onChange={changeSinger}
              />
              Singer
            </h5>
          </div>
          <div class="p-2 bd-highlight">
            {" "}
            <h5>
              <input
                type="checkbox"
                id="year"
                name="topping"
                checked={showYear}
                onChange={changeYear}
              />
              Year
            </h5>
          </div>

          <div class="p-2 bd-highlight">
            <h5>
              <input
                type="checkbox"
                id="length"
                name="topping"
                checked={showLength}
                onChange={changeLength}
              />
              Length
            </h5>
          </div>
        </div>
      )}
    </div>
  );
};
export default FilterComponent;
