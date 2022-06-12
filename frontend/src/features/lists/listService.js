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
//get user lists
const getLists = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}
// delete Task
const deleteList = async (listId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + listId, config)

  return (response.data)
}

//update Task
const updateList = async (listId, listData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + listId, listData, config)

  return response.data
}
const listService = {
  createList,
  getLists,
  deleteList,
  updateList
}

export default listService