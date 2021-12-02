import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from "../../axios/index";

const columns = [
    {
        name: "id",
        label: "Number ID",
        options: {
            filter: true,
            sort: true,
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

    return (
        <>
            <PageTitle title="Teams" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <MUIDataTable
                        title="Teams"
                        data={teams}
                        columns={columns}
                        options={{
                            filterType: "checkbox",
                            download: false,
                            print: false,
                            viewColumns: false,
                            filter: false,
                        }}
                    />
                </Grid>
            </Grid>
        </>
    );
}
