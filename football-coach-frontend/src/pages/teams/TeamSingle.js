import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "../../axios/index";
// components
import PageTitle from "../../components/PageTitle/PageTitle";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getAge } from "../../components/Players/helpers";
import { Link } from "react-router-dom";

export default function TeamSingle(props) {
    // const [player, setPlayer] = useState({});
    const [team, setTeam] = useState({});
    const [teamPlayers, setTeamPlayers] = useState({});
    const [teamMatches, setTeamMatches] = useState({});

    useEffect(() => {
        const fetchTeam = async () => {
            console.log({ props });
            axios.get(`/players/${props.match.params.teamid}`).then((data) => {
                console.log({ playerdata: data.data });
                setTeam(data.data);
                fetchTeamPlayers();
            });
        };

        const fetchTeamPlayers = async () => {
            axios
                .get(`/players/team/${props.match.params.teamid}`)
                .then((data) => {
                    setTeamPlayers(data.data);
                });
        };

        fetchTeam();
        // fetchTeamPlayers();
    });

    return (
        <>
            <PageTitle title={`${team.name} players`} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    {JSON.stringify(teamPlayers)}
                </Grid>
            </Grid>

            <PageTitle title="Last matches" />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card key={player.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                Show player matches here
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <PageTitle title="Statistics" />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card key={player.id} sx={{ minWidth: 275 }}>
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
