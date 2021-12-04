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

export default function TeamSingle(props) {
    const [team, setTeam] = useState(props.location.state || null);
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

    if (team == null) {
        return null;
    }

    const players = team.players && team.players.filter((p) => p.firstsquad);
    const reserves = team.players && team.players.filter((p) => !p.firstsquad);

    return (
        <>
            <PageTitle title={`${team.name}`} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div>{JSON.stringify(team, null, 4)}</div>
                </Grid>
            </Grid>
            {team.players ? (
                <>
                    <PageTitle title="Team" />
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

            <PageTitle title="Last matches" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card key={team.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {team.matches ? "Last matches" : "No matches"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <PageTitle title="Statistics" />

            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Card key={team.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Show player statistics here
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
