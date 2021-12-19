import React, { useState, useEffect } from "react";
// components
import axios from "../../axios/index";
import { Favorite as FavoriteIcon } from "@material-ui/icons";
import CustomTable from "../../components/Table/CustomTable";
import { withRouter } from "react-router-dom";

const columns = [
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
        name: "role",
        label: "Role",
        options: {
            filter: true,
            sort: false,
        },
    },
];

function StaffTable(props) {
    const [staff, setStaff] = useState([]);

    const fetchStaff = async () => {
        axios.get("/staff").then((data) => {
            setStaff(data.data);
        });
    };

    useEffect(() => {
        fetchStaff();
    }, []);

    const handleEditClick = (e, payload) => {
        props.history.push({
            pathname: `/app/staff/${payload.selectedRowData.id}`,
            state: { staff: payload.selectedRowData },
        });
    };
    const handleShowMoreClick = (e, payload) => {
        props.history.push({
            pathname: `/app/staff/${payload.selectedRowData.id}`,
            state: { staff: payload.selectedRowData },
        });
    };

    const handleDeleteClick = (arg, payload) => {
        axios
            .delete(`/staff/${payload.selectedRowData.id}`)
            .then(async () => {
                await fetchStaff();
            })
            .catch((err) => console.log(err));
    };

    return (
        <CustomTable
            title="Staff"
            columns={columns}
            rows={staff}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
            showEdit={false}
            showMore={false}
        />
    );
}

export default withRouter(StaffTable);
