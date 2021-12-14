import React, { useState, useEffect } from "react";
// components
import axios from "../../axios";
import CustomTable from "../../components/Table/CustomTable";
import { getAge } from "../../components/Players/helpers";

const columns = [
    {
        name: "homeTeamId",
        label: "Home",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "awayTeamId",
        label: "Away",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "scoreHome",
        label: "Home score",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "scoreAway",
        label: "Away score",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                return new Date(data).toLocaleDateString();
            },
        },
    },
];

export default function SeasonMatches(props) {
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

    console.log({
        tableData: props.season.tableData,
        matches: props?.season.seasonMatches,
    });
    if (props.season.seasonMatches) {
        const rows = props.season.seasonMatches.map((r) => {
            const teamA = props.season.teams.find((t) => t.id == r.homeTeamId);
            const teamB = props.season.teams.find((t) => t.id == r.awayTeamId);
            return { ...r, homeTeamId: teamA.name, awayTeamId: teamB.name };
        });
        return (
            <CustomTable
                title="Matches"
                columns={columns}
                rows={rows}
                handleEditClick={handleEditClick}
                handleDeleteClick={handleDeleteClick}
                handleShowMoreClick={handleShowMoreClick}
                selectableRows="none"
            />
        );
    } else return null;
}
