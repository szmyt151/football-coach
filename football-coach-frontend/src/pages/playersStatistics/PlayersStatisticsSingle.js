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

export default function PlayersStatisticsSingle(props) {
    const [playerStatistics, setPlayerStatistics] = useState(
        props.location.state || null,
    );

    useEffect(() => {
        const fetchPlayerStatistics = async () => {
            console.log({ props });
            axios
                .get(`/okayer-statistics/${props.match.params.playerid}`)
                .then((data) => {
                    setPlayerStatistics(data.data);
                });
        };
        fetchPlayerStatistics();
    }, []);

    return (
        <>
            <PageTitle title={``} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div>{JSON.stringify(playerStatistics, null, 4)}</div>
                </Grid>
            </Grid>
        </>
    );
}
