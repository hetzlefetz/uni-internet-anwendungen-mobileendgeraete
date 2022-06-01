import React from "react";
import create from "zustand";
import shallow from "zustand/shallow";
import { MediaItem, MediaItemSource } from "../Types/types";
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
export type StorageType = "local" | "remote"

export type MediaItemStore = {
  source: StorageType;
  items: MediaItem[];
  read: (id: string) => Promise<MediaItem>;
  readAll: () => Promise<MediaItem[]>;
  create: (item: MediaItem) => void;
  destroy: (id: string) => void;
  reset: () => void;
  update: (item: MediaItem) => void;
};



export const useMediaItemStore = create<MediaItemStore>(
  (set, get) => ({
    items: [],
    source: "local",
    switchSource: () => set((state) => ({ source: state.source === "local" ? "remote" : "local" })),
    read: async (id: string) => {
      var fromStore = get().items.find((x) => x.id === id);
      var fromDB = await dbRead("local", id);
      if (JSON.stringify(fromStore) !== JSON.stringify(fromDB)) {
        console.error("DB and Store missmatch !?");
      }
      return fromStore;
    },
    readAll: async () => {
      var fromStore = get().items;
      var fromDB = await dbRead("local");
      ////////////////////////
      // HIER HIER HIER
      ////////////////////////
      if (fromStore.length !== fromDB.length) {
        console.error("DB and Store missmatch !?");
      }
      return fromStore;
    },
    create: async (item: MediaItem) => {
      await dbCreate(item, "local");
      set((state) => {
        return {
          items: [...state.items, item],
        }
      })
    },
    reset: async () => {
      await dbDelete("local");
      set(() => {
        return {
          items: [],
        }
      });
    },
    destroy: async (id: string) => {
      await dbDelete("local", id)
      set((state: MediaItemStore) => {
        return {
          items: state.items.filter((x) => x.id !== id),
        }
      });
    },
    update: async (item: MediaItem) => {
      await dbUpdate(item, "local");
      set((state: MediaItemStore) => {
        return updateItemInStates(item, state);
      });
    }
  })
);


const dbCreate = async (item: MediaItem, state: MediaItemSource) => {
  if (state === "local") {
    return lc.create(item);
  }
  return rc.create(item);
}

const dbRead = async (source: MediaItemSource, id?: string) => {
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
