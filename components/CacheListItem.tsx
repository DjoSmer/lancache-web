'use client'

import {FC, useState} from 'react';
import {Collapse, Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
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

    const itemText = <ListItemText primary={cacheData.filepath || name}
                                   secondary={<CacheListItemInfo cacheData={cacheData}/>}/>;

    return cacheData.filepath ?
        <>
            <ListItem onClick={handleClick}>
                {itemText}
            </ListItem>
            <Divider component="li"/>
        </>
        :
        <>
            <ListItemButton onClick={handleClick}>
                {itemText}
                {open ? '-' : '+'}
            </ListItemButton>
            <Divider component="li"/>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <CacheList paths={paths.concat(name)}/>
            </Collapse>
        </>


}