import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "../../axios/index";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getAge } from "../../components/Players/helpers";
import Pitch from "../../components/Pitch/Pitch";
import { Link } from "react-router-dom";
import CustomTable from "../../components/Table/CustomTable";

const matchesColumns = [
    {
        name: "homeTeamId",
        label: "Home",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "awayTeamId",
        label: "Away",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "scoreHome",
        label: "Home score",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "scoreAway",
        label: "Away score",
        options: {
            filter: true,
            sort: false,
        },
    },

    {
        name: "date",
        label: "Date",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data, ...args) => {
                return new Date(data).toLocaleDateString();
            },
        },
    },
];

export default function TeamSingle(props) {
    const [team, setTeam] = useState(props.location.state || null);
    const [teams, setTeams] = useState([]);
    const [teamPlayers, setTeamPlayers] = useState({});
    const [teamMatches, setTeamMatches] = useState({});

    useEffect(() => {
        const fetchTeam = async () => {
            console.log({ props });
            axios.get(`/teams/${props.match.params.teamid}`).then((data) => {
                setTeam(data.data);
            });
        };
        fetchTeam();
    }, []);

    useEffect(() => {
        const fetchTeams = async () => {
            console.log({ props });
            axios.get(`/teams`).then((data) => {
                setTeams(data.data);
            });
        };
        fetchTeams();
    }, []);

    if (team == null) {
        return null;
    }

    const players = team.players && team.players.filter((p) => p.firstsquad);
    const reserves = team.players && team.players.filter((p) => !p.firstsquad);

    const matches =
        team &&
        team.teamMatches &&
        team.teamMatches.map((tm) => {
            return {
                ...tm,
                homeTeamId: teams.find((e) => e.id === tm.homeTeamId).name,
                awayTeamId: teams.find((e) => e.id === tm.awayTeamId).name,
            };
        });

    return (
        <>
            {team.players ? (
                <>
                    <PageTitle title={`Team ${team.name}`} />
                    <Card key={team.id}>
                        <CardContent>
                            <Grid container spacing={4}>
                                <Grid item xs={12} sm={6}>
                                    <Pitch players={players} />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Grid container spacing={2}>
                                        <Grid
                                            item
                                            direction="column"
                                            xs={12}
                                            sm={6}
                                        >
                                            <Typography
                                                // sx={{ fontSize: 15 }}
                                                variant="h4"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Lineup
                                            </Typography>

                                            <List>
                                                {players
                                                    .sort(
                                                        (a, b) =>
                                                            a.shirtNumber -
                                                            b.shirtNumber,
                                                    )
                                                    .map((player) => {
                                                        const name = (
                                                            <>
                                                                {`${player.shirtNumber} `}
                                                                <b>{`${player.firstName}  ${player.lastName}`}</b>
                                                            </>
                                                        );
                                                        return (
                                                            <ListItem
                                                                key={player.id}
                                                                disablePadding
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        name
                                                                    }
                                                                />
                                                            </ListItem>
                                                        );
                                                    })}
                                            </List>
                                        </Grid>

                                        <Grid
                                            item
                                            direction="column"
                                            xs={12}
                                            sm={6}
                                        >
                                            <Typography
                                                // sx={{ fontSize: 15 }}
                                                variant="h4"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Bench
                                            </Typography>
                                            <List>
                                                {reserves
                                                    .sort(
                                                        (a, b) =>
                                                            a.shirtNumber -
                                                            b.shirtNumber,
                                                    )
                                                    .map((player) => {
                                                        const name = (
                                                            <>
                                                                {`${player.shirtNumber} `}
                                                                <b>{`${player.firstName}  ${player.lastName}`}</b>
                                                            </>
                                                        );
                                                        return (
                                                            <ListItem
                                                                key={player.id}
                                                                disablePadding
                                                            >
                                                                <ListItemText
                                                                    primary={
                                                                        name
                                                                    }
                                                                />
                                                            </ListItem>
                                                        );
                                                    })}
                                            </List>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </>
            ) : null}

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <CustomTable
                        columns={matchesColumns}
                        rows={matches}
                        title="Last matches"
                        selectableRows="none"
                    />
                </Grid>
            </Grid>
        </>
    );
}
