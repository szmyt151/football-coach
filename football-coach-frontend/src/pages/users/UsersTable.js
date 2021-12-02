import React, { useState, useEffect } from "react";
import { fetchUsers, useUsersDispatch } from "./UsersContext";
// components
import CustomTable from "../../components/Table/CustomTable";

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
        name: "firstName",
        label: "Firstname",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "lastName",
        label: "Lastname",
        options: {
            filter: true,
            sort: false,
        },
    },
];

export default function UsersTables() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchUsers(useUsersDispatch, setRows);
    }, []);

    return <CustomTable title="Users" columns={columns} rows={rows} />;
}
