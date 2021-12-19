import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";
import { withRouter } from "react-router-dom";

const columns = [
    {
        name: "trainingType",
        label: "Training type",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "description",
        label: "Description",
    },
    {
        name: "date",
        label: "Date",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{new Date(data).toLocaleDateString()}</div>;
            },
        },
    },
    {
        name: "duration",
        label: "Duration (min)",
    },
    {
        name: "team",
        label: "Team",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{data.name}</div>;
            },
        },
    },
    {
        name: "player",
        label: "Players",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{data.length}</div>;
            },
        },
    },
    {
        name: "staff",
        label: "Staff",
        options: {
            customBodyRender: (data, ...args) => {
                return (
                    <div>
                        {data.firstName} {data.lastName}
                    </div>
                );
            },
        },
    },
];

function TrainingsTable(props) {
    const [trainings, setTrainings] = useState([]);

    const fetchTrainings = async () => {
        axios.get("/training").then((data) => {
            setTrainings(data.data);
        });
    };
    useEffect(() => {
        fetchTrainings();
    }, []);

    const handleEditClick = (e, payload) => {
        props.history.push({
            pathname: `/app/trainings/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };
    const handleShowMoreClick = (e, payload) => {
        props.history.push({
            pathname: `/app/trainings/${payload.selectedRowData.id}`,
            state: { team: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (e, payload) => {
        console.log("handleDeleteClick", { payload });

        axios.delete(`/training/${payload.selectedRowData.id}`).then((data) => {
            fetchTrainings();
        });
    };

    return (
        <CustomTable
            title="Trainings"
            columns={columns}
            rows={trainings}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
            showEdit={false}
        />
    );
}

export default withRouter(TrainingsTable);
