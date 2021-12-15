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
import CustomTable from "../../components/Table/CustomTable";

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

export default function PlayerSingle(props) {
    const [player, setPlayer] = useState({});

    const handleEditClick = (e, payload) => {};
    const handleShowMoreClick = (e, payload) => {};
    const handleDeleteClick = (...args) => {};

    useEffect(() => {
        const fetchPlayer = async () => {
            axios
                .get(`/players/${props.match.params.playerid}`)
                .then((data) => {
                    setPlayer(data.data);
                })
                .catch((error) => {
                    console.log(error);
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
