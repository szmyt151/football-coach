import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";

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

export default function TeamTables() {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            axios.get("/teams").then((data) => {
                setTeams(data.data);
            });
        };

        fetchTeams();
    }, []);

    return <CustomTable title="Teams" columns={columns} rows={teams} />;
}
