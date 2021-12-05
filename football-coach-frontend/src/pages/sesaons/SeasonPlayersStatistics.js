import React, { useState, useEffect } from "react";
// components
import axios from "../../axios";
import CustomTable from "../../components/Table/CustomTable";
import { getAge } from "../../components/Players/helpers";

const columns = [
    {
        name: "player",
        label: "Player",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                return `${data.firstName} ${data.lastName}`;
            },
        },
    },
    {
        name: "goals",
        label: "Goals",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "assists",
        label: "Assists",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "Clean Sheet",
        label: "cleanSheets",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "Yellow cards",
        label: "yellowCards",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "redCards",
        label: "Red cards",
        options: {
            filter: true,
            sort: false,
            display: false,
        },
    },

    {
        name: "gl",
        label: "GL",
        options: {
            filter: true,
            sort: false,
            display: false,
        },
    },

    {
        name: "gd",
        label: "GD",
        options: {
            filter: true,
            sort: false,
            display: false,
        },
    },

    {
        name: "points",
        label: "Points",
        options: {
            filter: true,
            sort: false,
        },
    },
];

export default function SeasonPlayersStatistics(props) {
    const handleEditClick = (e, payload) => {
        console.log("handleEditClick", { e, payload });
        console.log("handleEditClick", { props });
        props.history.push({
            pathname: `/app/seasons/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };
    const handleShowMoreClick = (e, payload) => {
        console.log("handleShowMoreClick", { e, payload });
        console.log("handleShowMoreClick", { props });
        props.history.push({
            pathname: `/app/seasons/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (...args) => {
        console.log("handleDeleteClick", { args });
        console.log("handleDeleteClick", { props });
    };

    if (props.season.stats)
        return (
            <CustomTable
                title="Statistics"
                columns={columns}
                rows={props?.season.stats}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleShowMoreClick={handleShowMoreClick}
                selectableRows="none"
            />
        );
    else return null;
}
