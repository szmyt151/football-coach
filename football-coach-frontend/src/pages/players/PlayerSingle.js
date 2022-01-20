import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "../../axios/index";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import {
    Card,
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    IconButton,
} from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getAge } from "../../components/Players/helpers";
import { Link, withRouter } from "react-router-dom";
import CustomTable from "../../components/Table/CustomTable";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

const columns = [
    {
        name: "goals",
        label: "Goals",
        options: {
            filter: false,
            sort: false,
        },
    },

    {
        name: "assists",
        label: "Assists",
        options: {
            filter: false,
            sort: false,
        },
    },

    {
        name: "cleanSheets",
        label: "Clean Sheet",
        options: {
            filter: false,
            sort: false,
        },
    },

    {
        name: "yellowCards",
        label: "Yellow cards",
        options: {
            filter: false,
            sort: false,
        },
    },

    {
        name: "redCards",
        label: "Red cards",
        options: {
            filter: false,
            sort: false,
        },
    },
];

function PlayerSingle(props) {
    const [player, setPlayer] = useState({});
    const [edit, setEdit] = useState(window.location.hash.includes("edit"));

    const handleEditClick = (e, payload) => {};
    const handleShowMoreClick = (e, payload) => {};
    const handleDeleteClick = (...args) => {};

    const [loading, setLoading] = React.useState(false);
    const [date, setDate] = React.useState(new Date());
    const [playerPositions, setPlayerPositions] = React.useState([]);
    const handleDateChange = (date, handInput) => {
        setDate(date);
    };

    const updatePlayer = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target);
        formdata.append("birth", new Date(date).toISOString());
        setLoading(true);

        axios
            .patch(`/players/${player.id}`, Object.fromEntries(formdata))
            .then(() => {
                setLoading(false);
                setEdit(false);
                fetchPlayer();
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    };
    const fetchPlayer = async () => {
        axios
            .get(`/players/${props.match.params.playerid}`)
            .then((data) => {
                setPlayer(data.data);
                setDate(data.data.birth);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchPlayer();
    }, []);

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
        <>
            <PageTitle
                title={`${player.firstName} ${player.lastName}`}
                editButton={true}
                editClick={() => setEdit(!edit)}
            />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card key={player.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <form onSubmit={updatePlayer} action="post">
                                {!edit ? (
                                    <Typography
                                        sx={{ fontSize: 14 }}
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {player.playerPosition}
                                    </Typography>
                                ) : (
                                    <>
                                        <InputLabel htmlFor="playerPosition">
                                            Player position
                                        </InputLabel>
                                        <Select
                                            id="position"
                                            name="playerPosition"
                                            labelId="playerPosition"
                                            required
                                            autoWidth={true}
                                            defaultValue={player.playerPosition}
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
                                    </>
                                )}
                                <Typography variant="h5" component="div">
                                    {!edit ? (
                                        <>
                                            {player.firstName} {player.lastName}
                                        </>
                                    ) : (
                                        <>
                                            <TextField
                                                required
                                                key="firstName"
                                                label="Firstname"
                                                name="firstName"
                                                variant="standard"
                                                defaultValue={player.firstName}
                                                style={{ marginTop: 10 }}
                                            />
                                            <TextField
                                                required
                                                key="lastName"
                                                label="Lastname"
                                                name="lastName"
                                                variant="standard"
                                                defaultValue={player.lastName}
                                                style={{
                                                    marginLeft: 10,
                                                    marginTop: 10,
                                                }}
                                            />
                                        </>
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {!edit ? (
                                        <>{player.nationality}</>
                                    ) : (
                                        <TextField
                                            required
                                            key="nationality"
                                            label="Nationality"
                                            name="nationality"
                                            variant="standard"
                                            defaultValue={player.nationality}
                                            style={{ marginTop: 10 }}
                                        />
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {!edit ? (
                                        <> Age: {getAge(player.birth)}</>
                                    ) : (
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
                                                    <TextField
                                                        {...params}
                                                        style={{
                                                            marginTop: 10,
                                                        }}
                                                    />
                                                )}
                                            />
                                        </LocalizationProvider>
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {!edit ? (
                                        <>Foot: {player.preferredFoot}</>
                                    ) : (
                                        <TextField
                                            required
                                            key="preferredFoot"
                                            label="Foot"
                                            name="preferredFoot"
                                            variant="standard"
                                            style={{ marginTop: 10 }}
                                            defaultValue={player.preferredFoot}
                                        />
                                    )}
                                </Typography>
                                <Typography
                                    sx={{ mb: 1.5 }}
                                    color="text.secondary"
                                >
                                    {!edit ? (
                                        <>
                                            Team:
                                            <Link
                                                to={`/app/teams/${player?.team?.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                    color: "inherit",
                                                }}
                                            >
                                                {` ${
                                                    player?.team?.name ||
                                                    "no-team"
                                                }`}
                                            </Link>
                                        </>
                                    ) : (
                                        <>
                                            <InputLabel htmlFor="hometeam">
                                                Team
                                            </InputLabel>
                                            <Select
                                                id="homeTeamId"
                                                name="teamId"
                                                labelId="hometeam"
                                                required
                                                defaultValue={player?.team?.id}
                                            >
                                                {teams &&
                                                    teams.map(
                                                        (option, index) => (
                                                            <MenuItem
                                                                key={index}
                                                                value={
                                                                    option.id
                                                                }
                                                            >
                                                                {option.name}
                                                            </MenuItem>
                                                        ),
                                                    )}
                                            </Select>
                                        </>
                                    )}
                                </Typography>

                                {edit ? (
                                    <Button variant="contained" type="submit">
                                        Save
                                    </Button>
                                ) : null}
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            {player ? (
                <CustomTable
                    title="Statistics"
                    columns={columns}
                    rows={[player.stats]}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                    handleShowMoreClick={handleShowMoreClick}
                    selectableRows="none"
                    search={false}
                />
            ) : null}
        </>
    );
}

export default withRouter(PlayerSingle);
