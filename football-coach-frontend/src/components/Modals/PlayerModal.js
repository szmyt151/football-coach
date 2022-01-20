import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    togglePlayerModal,
} from "../../context/LayoutContext";
import Typography from "@mui/material/Typography";
import {
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

export default function PlayerModal() {
    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [playerPositions, setPlayerPositions] = React.useState([]);

    const handleDateChange = (date, handInput) => {
        setDate(date);
    };
    // global
    var { showPlayerModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => togglePlayerModal(layoutDispatch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        formdata.append("birth", new Date(date).toISOString());
        setLoading(true);

        axios
            .post("/players", Object.fromEntries(formdata))
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

    useEffect(() => {
        const fetchTeams = async () => {
            axios.get("/teams").then((data) => {
                setTeams(data.data);
            });
        };

        fetchTeams();
    }, []);

    useEffect(() => {
        const fetchPlayerPositions = async () => {
            axios.get("players/positions").then((data) => {
                setPlayerPositions(Object.entries(data.data));
            });
        };

        fetchPlayerPositions();
    }, []);

    return (
        <div>
            <Modal
                aria-labelledby="match-modal-title"
                aria-describedby="match-modal-description"
                open={showPlayerModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showPlayerModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New player
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
                                    <FormControl variant="standard">
                                        <LocalizationProvider
                                            dateAdapter={AdapterDateFns}
                                        >
                                            <DesktopDatePicker
                                                label="Birth"
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
                                        sx={{ margin: 0, marginTop: 1 }}
                                    >
                                        <InputLabel htmlFor="hometeam">
                                            Team
                                        </InputLabel>

                                        <Select
                                            id="homeTeamId"
                                            name="teamId"
                                            labelId="hometeam"
                                            required
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
                                            margin: 0,
                                            marginTop: 1,
                                        }}
                                    >
                                        <InputLabel htmlFor="plaerPosition">
                                            Position
                                        </InputLabel>

                                        <Select
                                            id="position"
                                            name="playerPosition"
                                            labelId="plaerPosition"
                                            required
                                        >
                                            {playerPositions &&
                                                playerPositions.map(
                                                    (option, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={option[1]}
                                                        >
                                                            {option[1]}
                                                        </MenuItem>
                                                    ),
                                                )}
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
                                            key="preferredFoot"
                                            label="Foot"
                                            name="preferredFoot"
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

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                        }}
                                    >
                                        <TextField
                                            required
                                            key="shirtNumber"
                                            label="Shirt number"
                                            name="shirtNumber"
                                            variant="standard"
                                        />
                                    </FormControl>

                                    <FormControl
                                        style={{
                                            textAlign: "center",
                                            marginBottom: 15,
                                        }}
                                    >
                                        <FormControlLabel
                                            control={<Checkbox value={true} />}
                                            label="First squad"
                                            name="firstsquad"
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
