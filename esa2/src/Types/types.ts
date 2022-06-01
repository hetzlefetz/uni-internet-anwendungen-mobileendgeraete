export type MediaItem = {
    id: string;
    src: URL;
    creationDate: Date;
    title: string;
};

type CreateFnType = (item: MediaItem) => Promise<string>
type ReadFnType = (id?: string) => Promise<MediaItem[]>
type UpdateFnType = (item: MediaItem) => Promise<string>
type DeleteFnType = (id: string) => void

export type CrudOperations = {
    create: CreateFnType,
    read: ReadFnType,
    update: UpdateFnType,
    delete: DeleteFnType,
}

export type MediaItemSource = "local" | "remote";