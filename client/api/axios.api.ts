import axios, { AxiosInstance } from "axios";

export const instance = (token?: string): AxiosInstance => {
  return axios.create({
    baseURL: "http://localhost:3003/api",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });
};
