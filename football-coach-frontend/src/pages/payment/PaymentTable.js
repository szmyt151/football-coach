import React, { useState, useEffect} from "react";
import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";

// components
import PageTitle from "../../components/PageTitle/PageTitle";
import axios from "../../axios";


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
   name: "value",
   label: "Value",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
   name: "paymentType",
   label: "Type",
   options: {
    filter: true,
    sort: false,
   }
  },
  {
    name: "userId",
    label: "User",
    options: {
     filter: true,
     sort: false,
    }
   }
 ];


export default function UsersTables() {

  const [rows, setRows] = useState([])


  useEffect(() => {
    const fetchPayments = async () => {
        axios.get('/payments')
      .then(data => {
        console.log(data)
        setRows(data.data)
      })
    }

    fetchPayments()
  }, [])

  return (
    <>
      <PageTitle title="Payments" />
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <MUIDataTable
            title="Payments"
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
