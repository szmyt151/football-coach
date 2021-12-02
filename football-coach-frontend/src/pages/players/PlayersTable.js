import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import { getAge } from "../../components/Players/helpers";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from "../../axios";

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

    return (
        <>
            <PageTitle title="Players" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Players"
                        data={rows}
                        columns={columns}
                        options={{
                            download: false,
                            print: false,
                            viewColumns: false,
                            filter: false,
                            selectableRows: "single",
                            selectedRows: {
                                text: "row(s) selected",
                            },
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
