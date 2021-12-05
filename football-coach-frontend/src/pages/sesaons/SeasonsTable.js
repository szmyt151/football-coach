import React, { useState, useEffect } from "react";
// components
import axios from "../../axios";
import CustomTable from "../../components/Table/CustomTable";
import { getAge } from "../../components/Players/helpers";
import { RowingSharp } from "@material-ui/icons";

const columns = [
    {
        name: "name",
        label: "Name",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "teams",
        label: "Teams",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                console.log({ data, args });
                return data.length;
            },
        },
    },
    {
        name: "seasonMatches",
        label: "Matches",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                console.log({ data, args });
                return data.length;
            },
        },
    },
];

export default function SeasonsTable(props) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchSeasons = async () => {
            axios.get("/seasons").then((data) => {
                setRows(data.data);
            });
        };

        fetchSeasons();
    }, []);

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
        console.log("handleEditClick", { args });
        console.log("handleDeleteClick", { props });
    };

    return (
        <CustomTable
            title="Seasons"
            columns={columns}
            rows={rows}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
        />
    );
}
