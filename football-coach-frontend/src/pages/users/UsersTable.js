import React, { useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
 import { fetchUsers, useUsersDispatch } from "./UsersContext";
// components
import PageTitle from "../../components/PageTitle/PageTitle";


const columns = [
  {
   name: "id",
   label: "Number ID",
   options: {
    filter: true,
    sort: true,
   }
  },
  {
   name: "firstName",
   label: "Firstname",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "lastName",
   label: "Lastname",
   options: {
    filter: true,
    sort: false,
   }
  }
 ];


export default function UsersTables() {

  const [rows, setRows] = useState([])


  useEffect(() => {


    fetchUsers(useUsersDispatch, setRows)
  }, [])

  return (
    <>
      <PageTitle title="Users" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Users"
            data={rows}
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
