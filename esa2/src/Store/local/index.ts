
import { DB_CONSTS } from "./constants.ts";
import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { CrudOperations, MediaItem } from "../../Types/types";

interface MediaItemDb extends DBSchema {
  mediaItems: {
    value: MediaItem;
    key: string;
  };
}
const db = openDB<MediaItemDb>(DB_CONSTS.NAME, DB_CONSTS.VERSION, {
  upgrade: (db) => {
    db.createObjectStore("mediaItems", { keyPath: "id" });
  }
});

const createIndexedDb = async (item: MediaItem) => {
  return (await db).put("mediaItems", item, item.id);

};

const readIndexedDb = async (id?: string) => {
  var result = [];
  if (id) {
    var tmp = await (await db).get("mediaItems", id);
    result.push(tmp)
    return result;
  } else {
    return (await db).getAll("mediaItems");
  }
};

const updateIndexedDb = async (item: MediaItem) => {
  return (await db).put("mediaItems", item, item.id);
};

const deleteIndexedDb = async (id?: string) => {
  if (id) {

    return (await db).delete("mediaItems", id);
  } else {
    return (await db).clear("mediaItems");
  }
};


let crudOperations: CrudOperations
crudOperations = {
  create: createIndexedDb,
  read: readIndexedDb,
  update: updateIndexedDb,
  delete: deleteIndexedDb,
};

export { crudOperations };
