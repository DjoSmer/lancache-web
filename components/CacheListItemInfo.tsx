import {FC, useMemo} from "react";
import {Typography} from "@mui/material";
import {CacheData} from "@/types";

interface ListItemInfoProps {
    cacheData: CacheData;
}

const units = ['KB', 'MB', 'GB', 'TB'];

export const CacheListItemInfo: FC<ListItemInfoProps> = ({cacheData}) => {

    const createdAt = new Date(cacheData.createdAt!);
    const [size, unit] = useMemo(() => {
        let size = cacheData.size;

        const unit = units.find((unit) => {
            size = size / 1024;
            return size < 1024;
        });

        return [Math.round(size), unit];
    }, []);

    return <Typography
        component="span"
        variant="body2"
        color="text.primary"
    >
        {createdAt.toLocaleDateString()} - {size}<small>{unit}</small>
    </Typography>
}