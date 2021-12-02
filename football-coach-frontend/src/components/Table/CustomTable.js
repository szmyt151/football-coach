import React from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
// components
import PageTitle from "../PageTitle/PageTitle";
import CustomToolbarSelect from "./CustomToolbarSelect/CustomToolbarSelect";

class CustomTable extends React.Component {
    render() {
        return (
            <>
                <PageTitle title={this.props.title} />
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <MUIDataTable
                            title={this.props.title}
                            data={this.props.rows}
                            columns={this.props.columns}
                            options={{
                                filterType: "textField",
                                download: false,
                                print: false,
                                viewColumns: false,
                                filter: false,
                                customToolbarSelect: (selectedRows) => (
                                    <CustomToolbarSelect
                                        selectedRows={selectedRows}
                                    />
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
            </>
        );
    }
}

export default CustomTable;
