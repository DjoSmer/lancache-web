'use client'

import {FC, useEffect, useState} from "react";

import List from '@mui/material/List';
import {CacheListItem} from "./CacheListItem";
import type {CacheDataList} from "@/types";

interface CacheListProps {
    paths: string[];
}

export const CacheList: FC<CacheListProps> = ({paths}) => {
    const [cacheList, setCacheList] = useState<CacheDataList | null>(null);

    useEffect(() => {
        async function loadData() {
            const res = await fetch(`/api/data`, {
                method: 'post',
                body: JSON.stringify(paths)
            });
            const {data} = await res.json();
            setCacheList(data);
        }
        loadData();
    }, []);

    return (
        <List sx={{ pl: 2 * paths.length }}>
            {cacheList && Object.keys(cacheList).map((key) =>
                <CacheListItem paths={paths} key={key} name={key} cacheData={cacheList[key]}/>)}
        </List>
    )
}


