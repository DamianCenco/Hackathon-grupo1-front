import axios from "axios";

const url = "http://localhost:8787";

export const getProducts = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return axios.get(`${url}/api/products`, config);
};

export const getRecipes = (name) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      ingrediente: name, // This is the body part
    },
  };
  return axios.post(`${url}/recipes/ingrediente`, config);
};
