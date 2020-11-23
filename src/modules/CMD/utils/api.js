import axios from 'axios'

export const getAPI = async (url) => await axios(url)

export const postAPI = async (url, data) => await axios.post(url, data)

export const putAPI = async (url, data) => await axios.put(url, data)

export const deleteAPI = async (url) => await axios.delete(url)
