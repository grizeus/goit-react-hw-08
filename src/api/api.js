import axios from "axios";

const instanceContacts = axios.create({
  baseURL: "https://connections-api.goit.global/",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, DELETE, PATCH",
    "Access-Control-Allow-Headers":
      "X-Requested-With, content-type, Authorization",
  },
});

export default instanceContacts;
