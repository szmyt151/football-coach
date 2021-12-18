import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";
import { withRouter } from "react-router-dom";

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
        label: "My Team",
        name: "myTeam",
        options: {
            customBodyRender: (data, ...args) => {
                return <div>{data ? <FavoriteIcon /> : null}</div>;
            },
        },
    },
];

function TrainingsTable(props) {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchTrainings = async () => {
            axios.get("/training").then((data) => {
                setTrainings(data.data);
            });
        };

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

    const handleDeleteClick = (...args) => {
        console.log("handleEditClick", { args });
        console.log("handleDeleteClick", { props });
    };

    return (
        <CustomTable
            title="Trainings"
            columns={columns}
            rows={trainings}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
        />
    );
}

export default withRouter(TrainingsTable);
