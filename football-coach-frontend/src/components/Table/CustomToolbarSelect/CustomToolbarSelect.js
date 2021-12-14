import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";

import {
    Edit as EditIcon,
    ArrowForward as ArrowForwardIcon,
} from "@material-ui/icons";
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
    render() {
        const {
            classes,
            handleEditClick,
            handleDeleteClick,
            selectedRows,
            selectedRowData,
            handleShowMoreClick,
            showEdit = true,
            showDelete = true,
            showMore = true,
        } = this.props;

        return (
            <div className={"custom-toolbar-select"}>
                {showEdit && (
                    <Tooltip title={"Edit"}>
                        <IconButton
                            className={classes.iconButton}
                            onClick={(e) =>
                                handleEditClick(e, {
                                    selectedRows,
                                    selectedRowData,
                                })
                            }
                        >
                            <EditIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Tooltip>
                )}

                {showDelete && (
                    <Tooltip title={"Delete"}>
                        <IconButton
                            className={classes.iconButton}
                            onClick={(e) =>
                                handleDeleteClick(e, {
                                    selectedRows,
                                    selectedRowData,
                                })
                            }
                        >
                            <DeleteIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Tooltip>
                )}

                {showMore && (
                    <Tooltip title={"Show more"}>
                        <IconButton
                            className={classes.iconButton}
                            onClick={(e) =>
                                handleShowMoreClick(e, {
                                    selectedRows,
                                    selectedRowData,
                                })
                            }
                        >
                            <ArrowForwardIcon className={classes.deleteIcon} />
                        </IconButton>
                    </Tooltip>
                )}
            </div>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {
    name: "CustomToolbarSelect",
})(CustomToolbarSelect);
