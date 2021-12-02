import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

import { Edit as EditIcon } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

const defaultToolbarSelectStyles = {
    iconButton: {
        marginRight: "24px",
        top: "50%",
        display: "inline-block",
        position: "relative",
    },
    deleteIcon: {
        color: "#000",
    },
};

class CustomToolbarSelect extends React.Component {
    handleEditClick = () => {
        console.log("click! current selected rows", this.props);
    };
    handleDeleteClick = () => {
        console.log("click! current selected rows", this.props);
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                <Tooltip title={"Edit"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={this.handleEditClick}
                    >
                        <EditIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={"Delete"}>
                    <IconButton
                        className={classes.iconButton}
                        onClick={this.handleDeleteClick}
                    >
                        <DeleteIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "CustomToolbarSelect",
})(CustomToolbarSelect);
