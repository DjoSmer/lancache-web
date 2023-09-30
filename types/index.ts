export type CacheData =  {
    size: number;
    createdAt: Date
}

export type CacheDataList = {
    [key: string]: CacheData
}
