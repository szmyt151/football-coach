import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import axios from "../../axios/index";
// components
import SeasonMatchTable from "./SeasonMatchTable";
import SeasonPlayersStatistics from "./SeasonPlayersStatistics";
import SeasonMatches from "./SeasonMatches";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { getAge } from "../../components/Players/helpers";
import { Link } from "react-router-dom";
import PageTitle from "../../components/PageTitle/PageTitle";

export default function SeasonSingle(props) {
    const [season, setSeason] = useState({});

    useEffect(() => {
        const fetchSeasons = async () => {
            axios
                .get(`/seasons/${props.match.params.seasonid}`)
                .then((data) => {
                    console.log({ playerdata: data.data });
                    setSeason(data.data);
                });
        };

        fetchSeasons();
    }, []);

    return (
        <>
            <PageTitle title={`Season ${season.name}`} />
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <SeasonMatchTable season={season} />
                </Grid>

                <Grid item xs={12}>
                    <SeasonPlayersStatistics season={season} />
                </Grid>

                <Grid item xs={12}>
                    <SeasonMatches season={season} />
                </Grid>
            </Grid>
        </>
    );
}
