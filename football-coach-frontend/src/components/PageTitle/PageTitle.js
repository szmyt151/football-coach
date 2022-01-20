import React from "react";
import useStyles from "./styles";
import { Typography } from "../Wrappers";
import { Edit as EditIcon } from "@material-ui/icons";
import { IconButton } from "@mui/material";
export default function PageTitle(props) {
    var classes = useStyles();

    return (
        <div className={classes.pageTitleContainer}>
            <Typography className={classes.typo} variant="h1" size="sm">
                {props.title}
                {props.editButton && (
                    <IconButton aria-label="Edit">
                        <EditIcon onClick={props.editClick} />
                    </IconButton>
                )}
            </Typography>
            {props.button && props.button}
        </div>
    );
}
