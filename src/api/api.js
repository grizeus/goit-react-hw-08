import axios from "axios";

const instanceContacts = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3001/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default instanceContacts;
