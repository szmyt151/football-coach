import React, { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleMatchModal,
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

export default function MatchModal() {
    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = React.useState(new Date());

    const handleDateChange = (date, handInput) => {
        setDate(date);
    };
    // global
    var { showMatchModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => toggleMatchModal(layoutDispatch);
    const handleSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        formdata.append("date", new Date(date).toISOString());
        setLoading(true);

        axios
            .post("/team-matches", Object.fromEntries(formdata))
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
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
        const fetchSeasons = async () => {
            axios.get("/seasons").then((data) => {
                setSeasons(data.data);
            });
        };

        fetchSeasons();
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
                aria-labelledby="match-modal-title"
                aria-describedby="match-modal-description"
                open={showMatchModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showMatchModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New match
                        </Typography>
                        <br />
                        <form onSubmit={handleSubmit} action="post">
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "30px",
                                }}
                            >
                                <FormControl
                                    variant="standard"
                                    sx={{ m: 1, width: 300 }}
                                >
                                    <InputLabel htmlFor="season">
                                        Season
                                    </InputLabel>

                                    <Select
                                        id="seasonId"
                                        name="season"
                                        labelId="season"
                                        required
                                        style={{ marginBottom: 30 }}
                                    >
                                        {seasons &&
                                            seasons.map((option, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={option.id}
                                                >
                                                    {option.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
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
                            </div>
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
                                    <Typography variant="h6" component="h6">
                                        Home
                                    </Typography>

                                    <FormControl
                                        variant="standard"
                                        sx={{ m: 1, width: 300 }}
                                    >
                                        <InputLabel htmlFor="hometeam">
                                            Home team
                                        </InputLabel>

                                        <Select
                                            id="homeTeamId"
                                            name="homeTeamId"
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
                                        style={{ textAlign: "center" }}
                                    >
                                        <TextField
                                            required
                                            key="scoreHome"
                                            label="Score home"
                                            name="scoreHome"
                                            variant="standard"
                                        />
                                    </FormControl>
                                </div>

                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                    }}
                                >
                                    <Typography variant="h6" component="h6">
                                        Away
                                    </Typography>
                                    <FormControl
                                        variant="standard"
                                        sx={{ m: 1, width: 300 }}
                                    >
                                        <InputLabel htmlFor="awayteam">
                                            Away team
                                        </InputLabel>

                                        <Select
                                            required
                                            id="awayTeamId"
                                            name="awayTeamId"
                                            labelId="awayteam"
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

                                    <FormControl>
                                        <TextField
                                            required
                                            key="scoreAway"
                                            label="Score away"
                                            name="scoreAway"
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
