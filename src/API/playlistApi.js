import axios from "axios";

export default class playlistApi {
  static getPlaylist() {
    return axios.get("http://localhost:3001/playlist");
  }
  static postData(bodyFormData) {
    bodyFormData.songIDs = [];
    return axios.post("http://localhost:3001/playlist", bodyFormData);
  }
  static putData(bodyFormData, id) {
    console.log(id);
    return axios.put(`http://localhost:3001/playlist/${id}`, bodyFormData);
  }
  static handleDelete(itemId) {
    // Whatever you want to do with that item
    console.log(itemId);
    axios.delete(`http://localhost:3001/playlist/${itemId}`);
  }
}
