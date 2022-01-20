import React, { useState, useEffect } from "react";
// components
import axios from "../../axios";
import CustomTable from "../../components/Table/CustomTable";
import { getAge } from "../../components/Players/helpers";

const columns = [
    {
        name: "place",
        label: " ",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "name",
        label: "Team",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "wins",
        label: "W",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "draw",
        label: "D",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "lose",
        label: "L",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "gs",
        label: "GS",
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

export default function SeasonMatchTable(props) {
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

    if (props.season.tableData)
        return (
            <CustomTable
                title="Standings"
                columns={columns}
                rows={props?.season.tableData}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleShowMoreClick={handleShowMoreClick}
                selectableRows="none"
            />
        );
    else return null;
}
