import React from "react";

import { Save as SaveIcon } from "@material-ui/icons";
import { FormGroup, FormControl, TextField } from "@mui/material";
// components
import Button from "@mui/material/Button";
import CustomSelect from "./Select";

function CustomForm(props) {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const data = new FormData(e.target);
        console.log(data);
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }
        await props.handleSubmit(data);
        setLoading(false);
    };

    return (
        <>
            <form onSubmit={handleSubmit} action="post">
                <FormGroup>
                    <FormControl>
                        {props.fields.map((field) => {
                            if (field.type === "input") {
                                return (
                                    <TextField
                                        key={field.name}
                                        label={field.label}
                                        name={field.name}
                                        variant="standard"
                                    />
                                );
                            }

                            if (field.type === "select") {
                                return (
                                    <CustomSelect key={field.name} {...field} />
                                );
                            }
                            return null;
                        })}
                    </FormControl>
                </FormGroup>
                <br />
                <FormGroup>
                    <FormControl>
                        <Button
                            variant="contained"
                            endIcon={<SaveIcon />}
                            loading={loading}
                            type="submit"
                        >
                            Save
                        </Button>
                    </FormControl>
                    {props.children}
                </FormGroup>
            </form>
        </>
    );
}

export default CustomForm;
