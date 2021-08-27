import axios from "axios";

export default class songApi {
  static getSongs() {
    return axios.get("http://localhost:3001/songs");
  }
  static postData(bodyFormData) {
    return axios.post("http://localhost:3001/songs", bodyFormData);
  }
  static handleDelete(itemId) {
    // Whatever you want to do with that item
    console.log(itemId);
    axios.delete(`http://localhost:3001/songs/${itemId}`);
  }
}
