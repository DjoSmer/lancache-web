export type CacheData =  {
    filepath?: string;
    size: number;
    createdAt: Date
}

export type CacheDataList = {
    [key: string]: CacheData
}
