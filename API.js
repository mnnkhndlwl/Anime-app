import axios from "axios";

const url = "https://graphql.anilist.co";

export const AxiosInstance = axios.create({
    baseURL: url,
  });