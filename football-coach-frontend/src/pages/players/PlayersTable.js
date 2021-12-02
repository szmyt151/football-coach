import React, { useState, useEffect } from "react";
// components
import axios from "../../axios";
import CustomTable from "../../components/Table/CustomTable";
import { getAge } from "../../components/Players/helpers";

const columns = [
    {
        name: "team",
        label: "Team",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data) => {
                return data.name;
            },
        },
    },
    {
        name: "firstName",
        label: "Name",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "lastName",
        label: "Surname",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "birth",
        label: "Age",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data) => {
                return getAge(data);
            },
        },
    },
    {
        name: "preferredFoot",
        label: "Foot",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "playerPosition",
        label: "Position",
        options: {
            filter: true,
            sort: false,
        },
    },
];

export default function PlayersTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            axios.get("/players").then((data) => {
                setRows(data.data);
            });
        };

        fetchPlayers();
    }, []);

    return <CustomTable title="Players" columns={columns} rows={rows} />;
}
