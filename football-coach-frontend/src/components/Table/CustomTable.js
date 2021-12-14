import React from "react";

import { Grid } from "@material-ui/core";
import MUIDataTable from "mui-datatables";
// components
import PageTitle from "../PageTitle/PageTitle";
import CustomToolbarSelect from "./CustomToolbarSelect/CustomToolbarSelect";

class CustomTable extends React.Component {
    constructor() {
        super();
        this.state = { selectedRow: {} };
    }
    onRowsSelect = (curRowSelected, allRowsSelected) => {
        console.log("---RowSelect");
        console.log("Row Selected: ", curRowSelected);
        console.log("All Selected: ", allRowsSelected);

        if (allRowsSelected[0]) {
            const rowData = this.props.rows[allRowsSelected[0].index]; //.dataIndex
            this.setState({ selectedRow: rowData });
        } else {
            this.setState({ selectedRow: {} });
        }
    };

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
                                fixedHeader: true,
                                selectableRows:
                                    this.props.selectableRows || "single",
                                onRowsSelect: this.onRowsSelect,
                                customToolbarSelect: (selectedRows) => (
                                    <CustomToolbarSelect
                                        {...this.props}
                                        selectedRows={selectedRows}
                                        selectedRowData={this.state.selectedRow}
                                        handleEditClick={
                                            this.props.handleEditClick
                                        }
                                        handleDeleteClick={
                                            this.props.handleDeleteClick
                                        }
                                        handleShowMoreClick={
                                            this.props.handleShowMoreClick
                                        }
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
