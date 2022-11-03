import axios from "axios";

const url = "http://myjson.dit.upm.es/api/bins/exx2";

export const getProducts = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${url}`, config);
};