import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export default class songApi {
  static getSongs() {
    return axios.get("http://localhost:3001/songs");
  }
  static postData(bodyFormData) {
    bodyFormData.id = uuidv4();
    return axios.post("http://localhost:3001/songs", bodyFormData);
  }
  static putData(bodyFormData, id) {
    return axios.put(`http://localhost:3001/songs/${id}`, bodyFormData);
  }
  static handleDelete(itemId) {
    // Whatever you want to do with that item
    console.log(itemId);
    axios.delete(`http://localhost:3001/songs/${itemId}`);
  }
}
