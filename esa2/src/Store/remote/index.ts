import { CrudOperations, MediaItem } from "../../Types/types";
import { REMOTE_HOST } from "./constants.ts";
import axios from 'axios';



const createRest = async (item: MediaItem) => {
  const response = await axios.post(`${REMOTE_HOST}/create`)
  return response.data;
};

const readRest = (id?: string) => { };

const updateRest = (item: MediaItem) => { };

const deleteRest = (id?: string) => { };

let crudOperations: CrudOperations
crudOperations = {
  create: createRest,
  read: readRest,
  update: updateRest,
  delete: deleteRest,
};

export { crudOperations };