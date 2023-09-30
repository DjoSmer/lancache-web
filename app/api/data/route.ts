import {NextRequest} from 'next/server'
import type {CacheData} from '@/types'

const getInfo = (db: Object) => {

    if (db["0"]) {
        const fileData: CacheData = {
            size: 0,
            createdAt: null
        };
        Object.keys(db).forEach((key) => {
            fileData.size += Math.round(parseInt(db[key]['content-length']) / 1024 / 1024);
            const createdAt = new Date(db[key]['date']);
            if (fileData.createdAt < createdAt) {
                fileData.createdAt = createdAt;
            }
        });

        return fileData;
    }

    const dirData: CacheData = {
        size: 0,
        createdAt: null
    }
    Object.keys(db).forEach((key) => {
        const data = getInfo(db[key]);
        dirData.size += data.size;
        const createdAt = data.createdAt;
        if (dirData.createdAt < createdAt) {
            dirData.createdAt = createdAt;
        }
    });

    return dirData;
}

const getPath = (paths: string[], db: Object) => {
    return paths.reduce((db, path) => {
        return db[path];
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
    }, {});

    return Response.json({data})
}