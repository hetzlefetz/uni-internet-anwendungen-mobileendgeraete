export type MediaItem = {
    id: string;
    src: URL;
    creationDate: Date;
    title: string;
};

type CreateFnType = (item: MediaItem) => Promise<string>
type ReadFnType = (id?: string) => Promise<MediaItem | MediaItem[]>
type UpdateFnType = (item: MediaItem) => Promise<string>
type DeleteFnType = (id: string) => void

export type CrudOperations = {
    create: CreateFnType,
    read: ReadFnType,
    update: UpdateFnType,
    delete: DeleteFnType,
}

export type MediaItemSource = "local" | "remote";
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
    initialize: () => void;
};