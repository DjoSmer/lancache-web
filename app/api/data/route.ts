import {NextRequest} from 'next/server'
import {CacheDataList, CacheData} from '@/types'

interface DB {
    [key: string]: DB | string
}

interface FileData {
    filepath: string;
    'content-length': string;
    date: string;
}

interface FileList {
    [key: string]: FileData
}

const getInfo = (db: DB) => {

    if (db['key']) {
        const file = db as unknown as FileData;
        const fileData: CacheData = {
            filepath: file.filepath,
            size: parseInt(file['content-length']),
            createdAt: new Date(file.date)
        };

        return fileData;
    }

    const dirData: CacheData = {
        size: 0,
        createdAt: new Date('01/01/1970')
    }
    Object.keys(db).forEach((key) => {
        const data = getInfo(<DB>db[key]);
        dirData.size += data.size;
        const createdAt = data.createdAt;
        if (dirData.createdAt < createdAt) {
            dirData.createdAt = createdAt;
        }
    });

    return dirData;
}

const getPath = (paths: string[], db: DB) => {
    return paths.reduce((db, path) => {
        return <DB>db[path];
    }, db);
}

export async function POST(req: NextRequest) {
    const paths = await req.json();
    let db = require('/db.json');

    if (paths.length) {
        db = getPath(paths, db);
    }

    const data = Object.keys(db).reduce((data, key) => {
        data[key] = getInfo(db[key]);
        return data;
    }, {} as CacheDataList);

    return Response.json({data})
}