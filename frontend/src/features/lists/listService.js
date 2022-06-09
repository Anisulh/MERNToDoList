import { axios } from "axios";

const API_URL = "/api/lists/"


//create new list
const createList = async (listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const response = await axios.post(API_URL, listData, config)
  return response.data
}
const listService = {
  createList,
}

export default listService