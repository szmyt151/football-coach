import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleTrainingModal,
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

const style = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function TrainingModal() {
    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [selectedTeam, setselectedTeam] = React.useState();
    const [selectedPlayers, setselectedPlayers] = React.useState([]);
    const [staff, setStaff] = React.useState([]);

    const handlePlayersChange = (event) => {
        const {
            target: { value },
        } = event;
        setselectedPlayers(
            // On autofill we get a the stringified value.
            typeof value === "string" ? value.split(",") : value,
        );
    };

    const handleDateChange = (date, handInput) => {
        setDate(date);
    };

    const handleTeamChange = (e) => {
        console.log({ e });
        setselectedTeam(e.target.value);
    };
    // global
    var { showTrainingModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => toggleTrainingModal(layoutDispatch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        formdata.append("date", new Date(date).toISOString());
        setLoading(true);

        axios
            .post("/training", Object.fromEntries(formdata))
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
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchSeasons = async () => {
            axios.get("/players").then((data) => {
                setPlayers(data.data);
            });
        };

        fetchSeasons();
    }, []);

    useEffect(() => {
        const fetchStaff = async () => {
            axios.get("/staff").then((data) => {
                setStaff(data.data);
            });
        };

        fetchStaff();
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            axios.get("/teams").then((data) => {
                setTeams(data.data);
            });
        };

        fetchTeams();
    }, []);

    return (
        <div>
            <Modal
                aria-labelledby="training-modal-title"
                aria-describedby="training-modal-description"
                open={showTrainingModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showTrainingModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New training
                        </Typography>
                        <br />
                        <form onSubmit={handleSubmit} action="post">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    marginBottom: "30px",
                                    justifyContent: "space-evenly",
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
                                        sx={{
                                            m: 1,
                                            width: 300,
                                        }}
                                    >
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DesktopDatePicker
                                                label="Date"
                                                inputFormat="dd/MM/yyyy"
                                                name="date"
                                                value={date}
                                                onChange={handleDateChange}
                                                renderInput={(params) => (
                                                    <TextField {...params} />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    </FormControl>

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            m: 1,
                                            width: 300,
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <InputLabel htmlFor="hometeam">
                                            Team
                                        </InputLabel>

                                        <Select
                                            id="team"
                                            name="teamId"
                                            labelId="hometeam"
                                            required
                                            onChange={handleTeamChange}
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
                                        variant="standard"
                                        sx={{
                                            m: 1,
                                            width: 300,
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <InputLabel htmlFor="staff">
                                            Staff
                                        </InputLabel>

                                        <Select
                                            id="staffInput"
                                            name="staffId"
                                            labelId="staff"
                                            required
                                        >
                                            {staff &&
                                                staff.map((option, index) => (
                                                    <MenuItem
                                                        key={index}
                                                        value={option.id}
                                                    >
                                                        {`${option.firstName} ${option.lastName}`}
                                                    </MenuItem>
                                                ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            m: 1,
                                            width: 300,
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <InputLabel htmlFor="players">
                                            Players
                                        </InputLabel>

                                        <Select
                                            id="player"
                                            name="player"
                                            labelId="players"
                                            required
                                            multiple
                                            value={selectedPlayers}
                                            onChange={handlePlayersChange}
                                        >
                                            {players &&
                                                players
                                                    .filter(
                                                        (p) =>
                                                            p.teamId ===
                                                            selectedTeam,
                                                    )
                                                    .map((option, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={option.id}
                                                        >
                                                            {option.firstName}{" "}
                                                            {option.lastName}
                                                        </MenuItem>
                                                    ))}
                                        </Select>
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="trainingType"
                                            label="Type"
                                            name="trainingType"
                                            variant="standard"
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="description"
                                            label="Description"
                                            name="description"
                                            variant="standard"
                                            multiline={true}
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: "10px",
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="duration"
                                            label="Duration (min)"
                                            name="duration"
                                            variant="standard"
                                            inputProps={{
                                                inputMode: "numeric",
                                                pattern: "[0-9]*",
                                            }}
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
