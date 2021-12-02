import React from "react";
import { InputLabel, Select, MenuItem } from "@mui/material";

// components

class CustomTable extends React.Component {
    render() {
        return (
            <>
                <InputLabel id="demo-simple-select-label">
                    {this.props.label}
                </InputLabel>
                <Select
                    labelId={`${new Date().getTime()}-${this.props.label}`}
                    id={`${new Date().getTime()}-demo-simple-select`}
                    value={this.props.value}
                    label={this.props.label}
                    onChange={this.props.handleChange}
                >
                    {this.props.options.map((option, index) => (
                        <MenuItem key={index} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </>
        );
    }
}

export default CustomTable;
