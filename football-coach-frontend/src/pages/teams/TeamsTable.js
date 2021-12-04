import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";
import { withRouter } from "react-router-dom";

const columns = [
    {
        name: "id",
        label: "Number ID",
        options: {
            filter: true,
            sort: true,
            display: false,
        },
    },
    {
        name: "userId",
        label: "Number ID",
        options: {
            filter: true,
            sort: true,
            display: false,
        },
    },
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        label: "MyTeam",
        name: "myTeam",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{data ? <FavoriteIcon /> : null}</div>;
            },
        },
    },
];

function TeamTables(props) {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            axios.get("/teams").then((data) => {
                setTeams(data.data);
            });
        };

        fetchTeams();
    }, []);

    const handleEditClick = (e, payload) => {
        console.log("handleEditClick", { e, payload });
        console.log("handleEditClick", { props });
        props.history.push({
            pathname: `/app/teams/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (...args) => {
        console.log("handleEditClick", { args });
        console.log("handleDeleteClick", { props });
    };

    return (
        <CustomTable
            title="Teams"
            columns={columns}
            rows={teams}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
        />
    );
}

export default withRouter(TeamTables);
