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
            sort: true,
        },
    },

    {
        name: "assists",
        label: "Assists",
        options: {
            filter: true,
            sort: true,
        },
    },

    {
        name: "cleanSheets",
        label: "Clean Sheet",
        options: {
            filter: true,
            sort: true,
        },
    },

    {
        name: "yellowCards",
        label: "Yellow cards",
        options: {
            filter: true,
            sort: true,
        },
    },

    {
        name: "redCards",
        label: "Red cards",
        options: {
            filter: true,
            sort: true,
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
