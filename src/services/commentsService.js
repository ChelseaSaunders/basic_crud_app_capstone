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

const getAllPostgres = () => {
  const request = axios.get(`${baseUrl}/postgres`);
  return request.then(response => JSON.parse(response.data));
};

const createPostgres = async (newObject) => {
  const response = await axios.post(`${baseUrl}/postgres`, newObject)
  return response.data;
};

const updatePostgres = async (id, newObject) => {
  await axios.put(`${baseUrl}/postgres/${id}`, newObject);
};

const removePostgres = async (id) => {
  await axios.delete(`${baseUrl}/postgres/${id}`);
};

const commentService = { getAll,
                         create,
                         update,
                         remove,
                         getAllPostgres,
                         createPostgres,
                         updatePostgres,
                         removePostgres
                        };

export default commentService;