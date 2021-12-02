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
export default function PlayerSingle(props) {
    const [player, setPlayer] = useState({});

    useEffect(() => {
        const fetchPlayer = async () => {
            console.log({ props });
            axios
                .get(`/players/${props.match.params.playerid}`)
                .then((data) => {
                    console.log({ playerdata: data.data });
                    setPlayer(data.data);
                });
        };

        fetchPlayer();
    }, []);

    return (
        <>
            <PageTitle title={`${player.firstName} ${player.lastName}`} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card key={player.id} sx={{ minWidth: 275 }}>
                        <CardContent>
                            <Typography
                                sx={{ fontSize: 14 }}
                                color="text.secondary"
                                gutterBottom
                            >
                                {player.playerPosition}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {player.firstName} {player.lastName}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                {player.nationality}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Age: {getAge(player.birth)}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Foot: {player.preferredFoot}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Team:
                                <Link
                                    to={`/app/teams/${player?.team?.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "inherit",
                                    }}
                                >
                                    {` ${player?.team?.name || "no-team"}`}
                                </Link>
                            </Typography>
                        </CardContent>
                    </Card>
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
