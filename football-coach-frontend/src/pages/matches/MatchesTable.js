import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";
import { withRouter } from "react-router-dom";

const columns = [
    {
        name: "homeTeam",
        label: "Home",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (data, ...args) => {
                return data.name;
            },
        },
    },
    {
        name: "awayTeam",
        label: "Away",
        options: {
            filter: true,
            sort: true,
            customBodyRender: (data, ...args) => {
                return data.name;
            },
        },
    },
    {
        name: "scoreHome",
        label: "Home score",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                return <>{data}</>;
            },
        },
    },
    {
        name: "scoreAway",
        label: "Away score",
        options: {
            customBodyRender: (data, ...args) => {
                return <>{data}</>;
            },
        },
    },
    {
        name: "date",
        label: "Match day",
        options: {
            customBodyRender: (data, ...args) => {
                return <>{new Date(data).toLocaleDateString()}</>;
            },
        },
    },
];

function MatchesTable(props) {
    const [teamsMatches, setTeamsMatches] = useState([]);

    useEffect(() => {
        const fetchTeamsMatches = async () => {
            axios.get("/team-matches").then((data) => {
                setTeamsMatches(data.data);
            });
        };

        fetchTeamsMatches();
    }, []);

    const handleShowMoreClick = (e, payload) => {
        console.log("handleShowMoreClick", { e, payload });
        console.log("handleShowMoreClick", { props });
        props.history.push({
            pathname: `/app/matches/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleEditClick = (e, payload) => {
        console.log("handleEditClick", { e, payload });
        console.log("handleEditClick", { props });
        props.history.push({
            pathname: `/app/matches/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (...args) => {
        console.log("handleDeleteClick", { args });
        console.log("handleDeleteClick", { props });
    };

    return (
        <CustomTable
            title="Matches"
            columns={columns}
            rows={teamsMatches}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
        />
    );
}

export default withRouter(MatchesTable);
