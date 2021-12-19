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

import { SportsSoccer as SportsSoccerIcon } from "@material-ui/icons";

export default function MatchesSingle(props) {
    const [match, setMatch] = useState(null);

    useEffect(() => {
        const fetchMatch = async () => {
            console.log({ props });
            axios
                .get(`/team-matches/${props.match.params.matchid}`)
                .then((data) => {
                    setMatch(data.data);
                });
        };
        fetchMatch();
    }, []);

    const statType = (stat) => {
        switch (stat.type) {
            case "Goal":
                return <SportsSoccerIcon style={{ marginRight: "5px" }} />;
            case "Yellow Card":
                return (
                    <img src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/yellow-card-right.svg" />
                );
            case "Red Card":
                return (
                    <img src="https://ssl.gstatic.com/onebox/sports/soccer_timeline/red-card-right.svg" />
                );
        }
    };

    if (!match) return null;
    return (
        <>
            <PageTitle
                title={`Match ${match.homeTeam.name} vs ${match.awayTeam.name}`}
            />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <div>
                                <div>
                                    {new Date(match.date).toLocaleDateString()}
                                </div>
                                <div
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <div
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            marginRight: "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="h4">
                                            {match.homeTeam.name}
                                        </Typography>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            flex: 1,
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="h4">
                                            {" "}
                                            {match.scoreHome} -{" "}
                                            {match.scoreAway}
                                        </Typography>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex",
                                            flex: 1,
                                            marginLeft: "auto",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography variant="h4">
                                            {match.awayTeam.name}
                                        </Typography>
                                    </div>
                                </div>

                                {match.playerStatistics
                                    .filter(
                                        (e) =>
                                            e.goals ||
                                            e.yellowCards ||
                                            e.redCards,
                                    )
                                    .map((ps) => {
                                        return (
                                            <div
                                                key={ps.id}
                                                style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-evenly",
                                                }}
                                            >
                                                <div></div>
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {statType(ps)} {ps.minute}'{" "}
                                                    {ps.player.firstName}{" "}
                                                    {ps.player.lastName}
                                                </div>
                                                <div></div>
                                            </div>
                                        );
                                    })}
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
