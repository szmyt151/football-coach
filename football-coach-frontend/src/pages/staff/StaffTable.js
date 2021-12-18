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
        label: "My Team",
        name: "myTeam",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{data ? <FavoriteIcon /> : null}</div>;
            },
        },
    },
];

function StaffTable(props) {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            axios.get("/staff").then((data) => {
                setTrainings(data.data);
            });
        };

        fetchTrainings();
    }, []);

    const handleEditClick = (e, payload) => {
        console.log("handleEditClick", { e, payload });
        console.log("handleEditClick", { props });
        props.history.push({
            pathname: `/app/trainings/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };
    const handleShowMoreClick = (e, payload) => {
        console.log("handleShowMoreClick", { e, payload });
        console.log("handleShowMoreClick", { props });
        props.history.push({
            pathname: `/app/trainings/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (...args) => {
        console.log("handleEditClick", { args });
        console.log("handleDeleteClick", { props });
    };

    return (
        <CustomTable
            title="Staff"
            columns={columns}
            rows={trainings}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
        />
    );
}

export default withRouter(StaffTable);
