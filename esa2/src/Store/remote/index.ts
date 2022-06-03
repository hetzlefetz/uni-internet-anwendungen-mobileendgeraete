import { CrudOperations, MediaItem } from "../../Types/types";

import axios from 'axios';



const ConnectionSettings = {
  host: "http://localhost",
  port: "8001",
  apiEndpoint: "mediaitems"
}

const toDto = (item: MediaItem) => {
  const dto = {
    id: item.id,
    title: item.title,
    creationDate: item.creationDate.toJSON(),
    src: item.src
  }
  return dto;
}

const fromDto = (item) => {
  const mediaItem = {
    id: item.id,
    title: item.title,
    creationDate: new Date(item.creationDate),
    src: item.src
  }
  return mediaItem;
}

const apiUrl = `${ConnectionSettings.host}:${ConnectionSettings.port}/${ConnectionSettings.apiEndpoint}`

const createRest = async (item: MediaItem) => {
  if (item.id) {
    throw new Error("Cant create with id");
  }

  const response = await axios.post(`${apiUrl}`, toDto(item))
  return fromDto(response.data.data);
};

const readRest = async (id?: string) => {
  if (id) {
    const response = await axios.get(`${apiUrl}/${id}`);
    return fromDto(response.data.data);
  }
  const response = await axios.get(`${apiUrl}`);
  return response.data.data.map(x => fromDto(x));
};

const updateRest = async (item: MediaItem) => {
  const response = await axios.put(`${apiUrl}/${item.id}`, toDto(item))
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