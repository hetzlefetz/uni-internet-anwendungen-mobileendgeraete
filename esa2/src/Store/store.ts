import React from "react";
import create from "zustand";
import shallow from "zustand/shallow";
import { MediaItem, MediaItemSource, MediaItemStore } from "../Types/types";
import { crudOperations as lc } from "./local/index.ts"
import { crudOperations as rc } from "./remote/index.ts"

const updateItemInStates = (item: MediaItem, state: MediaItemStore): MediaItemStore => {
  var index = state.items.findIndex((x) => x.id === item.id);
  if (index === -1) {
    state.items.push(item);
  } else {
    state.items[index] = item;
  }
  return state;
}




export const useMediaItemStore = create<MediaItemStore>(
  (set, get) => ({
    items: [],
    source: "local",
    switchSource: async () => {
      var newNewSource = get().source === "local" ? "remote" : "local";
      var fromDb = await dbRead(newNewSource);
      set(() => {
        return {
          source: newNewSource,
          items: fromDb
        }
      });
    },
    initialize: async () => {
      var fromDB = await dbRead(get().source);
      console.log("Initializing store ...")
      set((state) => {
        if (state.items.length !== fromDB.length) {
          return {
            items: fromDB,
          }
        }
        return state;
      })
    },
    read: async (id: string) => {
      var fromStore = get().items.find((x) => x.id === id);
      var fromDB = await dbRead(get().source, id);
      if (JSON.stringify(fromStore) !== JSON.stringify(fromDB)) {
        console.error("DB and Store missmatch !?");
      }
      return fromStore;
    },
    readAll: async () => {
      var fromStore = get().items;
      var fromDB = await dbRead(get().source);
      ////////////////////////
      // HIER HIER HIER
      ////////////////////////
      if (fromStore.length !== fromDB.length) {
        console.error("DB and Store missmatch !?");
      }
      return fromStore;
    },
    create: async (item: MediaItem) => {
      var result = await dbCreate(item, get().source);
      set((state) => {
        return {
          items: [...state.items, result ? result : item],
        }
      })
    },
    reset: async () => {
      await dbDelete(get().source);
      set(() => {
        return {
          items: [],
        }
      });
    },
    destroy: async (id: string) => {
      await dbDelete(get().source, id)
      set((state: MediaItemStore) => {
        return {
          items: state.items.filter((x) => x.id !== id),
        }
      });
    },
    update: async (item: MediaItem) => {
      await dbUpdate(item, get().source);
      set((state: MediaItemStore) => {
        return updateItemInStates(item, state);
      });
    }
  })
);


const dbCreate = async (item: MediaItem, state: MediaItemSource) => {
  if (state === "local") {
    //Id is generated serverside, simulated for lc
    item.id = "" + new Date().getTime();
    return lc.create(item);
  }
  return rc.create(item);
}

const dbRead: Promise<MediaItem[]> = async (source: MediaItemSource, id?: string) => {
  if (source === "local") {
    return lc.read(id);
  }
  return rc.read(id);
}

const dbUpdate = async (item: MediaItem, state: MediaItemSource) => {
  if (state === "local") {
    return lc.update(item);
  }
  return rc.update(item);
}
const dbDelete = async (state: MediaItemSource, id?: string) => {
  if (state === "local") {
    return lc.delete(id);
  }
  return rc.delete(id);
}
export const useIsInLocalMode = () => {
  const connectionMode = useMediaItemStore((x) => x.source, shallow);
  return React.useMemo(
    () => connectionMode === "local",
    [connectionMode]
  )
};
