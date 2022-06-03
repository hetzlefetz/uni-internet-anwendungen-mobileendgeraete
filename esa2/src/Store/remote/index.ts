import { CrudOperations, MediaItem } from "../../Types/types";

import axios from 'axios';



const ConnectionSettings = {
  host: "http://localhost",
  port: "8001",
  apiEndpoint: "mediaitems"
}

const apiUrl = `${ConnectionSettings.host}:${ConnectionSettings.port}/${ConnectionSettings.apiEndpoint}`

const createRest = async (item: MediaItem) => {
  if (item.id) {
    throw new Error("Cant create with id");
  }
  const response = await axios.post(`${apiUrl}`, item)
  return response.data.data;
};

const readRest = async (id?: string) => {
  if (id) {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data.data;
  }
  const response = await axios.get(`${apiUrl}`);
  return response.data.data;
};

const updateRest = async (item: MediaItem) => {
  const response = await axios.put(`${apiUrl}`, item)
  return response.data.data;
};

const deleteRest = async (id?: string) => {
  const response = await axios.delete(`${apiUrl}/${id}`);
  return response.data.data;
};

let crudOperations: CrudOperations
crudOperations = {
  create: createRest,
  read: readRest,
  update: updateRest,
  delete: deleteRest,
};

export { crudOperations };