import React from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import "../App.css";

function UserProfile(props) {
  const user = useSelector((state) => state.users);

  const id = Number(props.match.params?.id);
  return (
    <div>
      {user
        .filter((value) => value.id === id)
        .map((data, key) => (
          <div className="profile">
            <FontAwesomeIcon icon={faUserCircle} className="userIcon" />
            <div key={key}>
              <h2 style={{ color: "#006600", textAlign: "center" }}>
                <u>Profile</u>
              </h2>

              <h3>
                Name: <span>{`${data.firstName} ${data.lastName}`}</span>
              </h3>

              <h3>
                Email: <span>{data.email}</span>
              </h3>
              <h3>
                Contact: <span>{data.mobile}</span>
              </h3>
              <h3>
                Location: <span>{data.location}</span>
              </h3>
            </div>
          </div>
        ))}
    </div>
  );
}
export default UserProfile;
