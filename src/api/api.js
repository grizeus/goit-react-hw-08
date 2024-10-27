import axios from "axios";

const instanceContacts = axios.create({
  baseURL: "https://connections-api.goit.global/",
  headers: {
    "Content-Type": "utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH",
  }
});

export default instanceContacts;
