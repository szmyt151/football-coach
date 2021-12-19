import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleStaffModal,
} from "../../context/LayoutContext";
import Form from "../Form/Form";
import Typography from "@mui/material/Typography";
import {
    FormGroup,
    FormControl,
    TextField,
    Select,
    MenuItem,
    InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import axios from "../../axios/index";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Add as AddIcon } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const style = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "20%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function StaffModal() {
    const [loading, setLoading] = React.useState(false);

    // global
    var { showStaffModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => toggleStaffModal(layoutDispatch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        setLoading(true);

        axios
            .post("/staff", Object.fromEntries(formdata))
            .then(() => {
                setLoading(false);
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    return (
        <div>
            <Modal
                aria-labelledby="staff-modal-title"
                aria-describedby="staff-modal-description"
                open={showStaffModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showStaffModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New staff
                        </Typography>
                        <br />
                        <form onSubmit={handleSubmit} action="post">
                            <div
                                style={{
                                    display: "flex",
                                    marginBottom: "30px",
                                }}
                            ></div>
                            <div
                                style={{
                                    display: "flex",
                                    marginBottom: "30px",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                            marginTop: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="firstName"
                                            label="Firstname"
                                            name="firstName"
                                            variant="standard"
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="lastName"
                                            label="Lastname"
                                            name="lastName"
                                            variant="standard"
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="role"
                                            label="Role"
                                            name="role"
                                            variant="standard"
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="nationality"
                                            label="Nationality"
                                            name="nationality"
                                            variant="standard"
                                        />
                                    </FormControl>
                                </div>
                            </div>

                            <FormControl
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    loading={loading.toString()}
                                    type="submit"
                                >
                                    Save
                                </Button>
                            </FormControl>
                        </form>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
