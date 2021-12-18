import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSeasonModal,
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

export default function SeasonModal() {
    const [loading, setLoading] = React.useState(false);

    // global
    var { showSeasonModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => toggleSeasonModal(layoutDispatch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        console.log(sealectedTeams);
        formdata.set("teams", sealectedTeams);
        setLoading(true);

        axios
            .post("/seasons", Object.fromEntries(formdata))
            .then(() => {
                setLoading(false);
                handleClose();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };

    const [teams, setTeams] = useState([]);
    const [sealectedTeams, setSelectedTeams] = useState([]);

    useEffect(() => {
        const fetchTeams = async () => {
            axios.get("/teams").then((data) => {
                setTeams(data.data);
            });
        };

        fetchTeams();
    }, []);

    const handleTeamsChange = (event) => {
        const {
            target: { value },
        } = event;
        console.log("handleTeamsChange", value);
        setSelectedTeams(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
    };

    return (
        <div>
            <Modal
                aria-labelledby="seasson-modal-title"
                aria-describedby="seasson-modal-description"
                open={showSeasonModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showSeasonModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New season
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
                                        variant="standard"
                                        sx={{ margin: 0, marginTop: 1 }}
                                    >
                                        <InputLabel htmlFor="hometeam">
                                            Teams
                                        </InputLabel>

                                        <Select
                                            id="homeTeamId"
                                            name="teams"
                                            labelId="hometeam"
                                            required
                                            multiple
                                            value={sealectedTeams}
                                            onChange={handleTeamsChange}
                                        >
                                            {teams &&
                                                teams.map((option, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={option.id}
                                                    >
                                                        {option.name}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                            marginTop: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="name"
                                            label="Name of season"
                                            name="name"
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
