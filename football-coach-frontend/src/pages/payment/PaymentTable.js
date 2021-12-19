import React, { useState, useEffect } from "react";
import CustomTable from "../../components/Table/CustomTable";

// components
import axios from "../../axios";

const columns = [
    {
        name: "paymentType",
        label: "Type",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "description",
        label: "Description",
        options: {
            filter: true,
            sort: true,
        },
    },
    {
        name: "value",
        label: "Value",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "user",
        label: "User",
        options: {
            filter: true,
            sort: false,
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

export default function UsersTables() {
    const [rows, setRows] = useState([]);
    const fetchPayments = async () => {
        axios.get("/payments").then((data) => {
            console.log(data);
            setRows(data.data);
        });
    };
    useEffect(() => {
        fetchPayments();
    }, []);

    const handleEditClick = (e, payload) => {};
    const handleShowMoreClick = (e, payload) => {};

    const handleDeleteClick = (e, payload) => {
        axios.delete(`/payments/${payload.selectedRowData.id}`).then((data) => {
            fetchPayments();
        });
    };

    return (
        <CustomTable
            title="Payments"
            columns={columns}
            rows={rows}
            handleEditClick={handleEditClick}
            handleDeleteClick={handleDeleteClick}
            handleShowMoreClick={handleShowMoreClick}
            showEdit={false}
            showMore={false}
        />
    );
}
