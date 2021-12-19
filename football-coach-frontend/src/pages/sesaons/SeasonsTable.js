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
    const fetchSeasons = async () => {
        axios.get("/seasons").then((data) => {
            setRows(data.data);
        });
    };
    useEffect(() => {
        fetchSeasons();
    }, []);

    const handleEditClick = (e, payload) => {
        props.history.push({
            pathname: `/app/seasons/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };
    const handleShowMoreClick = (e, payload) => {
        props.history.push({
            pathname: `/app/seasons/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (e, payload) => {
        axios.delete(`/seasons/${payload.selectedRowData.id}`).then((data) => {
            fetchSeasons();
        });
    };

    return (
        <CustomTable
            title="Seasons"
            columns={columns}
            rows={rows}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
            showEdit={false}
        />
    );
}
