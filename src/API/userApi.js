import axios from "axios";

export default class userApi {
  static getUsers() {
    return axios.get("http://localhost:3001/users");
  }

  static addUser(bodyFormData) {
    return axios.post("http://localhost:3001/users", bodyFormData);
  }
}
