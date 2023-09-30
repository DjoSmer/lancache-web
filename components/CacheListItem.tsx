'use client'

import {useState, FC} from 'react';
import {Divider, ListItemButton, ListItemText, Collapse} from "@mui/material";
import {CacheData} from "@/types";
import {CacheListItemInfo} from "./CacheListItemInfo";
import {CacheList} from "./CacheList";

interface CacheListItemProps {
    name: string;
    paths: string[];
    cacheData: CacheData;
}

export const CacheListItem: FC<CacheListItemProps> = ({paths, name, cacheData}) => {

    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return <>
        <ListItemButton onClick={handleClick}>
            <ListItemText primary={name} secondary={<CacheListItemInfo cacheData={cacheData}/>} />
            {open ? '-' : '+'}
        </ListItemButton>
        <Divider component="li" />
        <Collapse in={open} timeout="auto" unmountOnExit>
            <CacheList paths={paths.concat(name)}/>
        </Collapse>
    </>
}