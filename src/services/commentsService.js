import axios from 'axios';
const baseUrl = '/api/comments';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject)
  return response.data;
};

const update = (id, newObject) => {
  axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = async (id) => {
  axios.delete(`${baseUrl}/${id}`);
};

const commentService = { getAll, create, update, remove }

export default commentService;