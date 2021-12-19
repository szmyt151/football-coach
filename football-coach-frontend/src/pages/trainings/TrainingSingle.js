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

const columns = [
    {
        name: "firstName",
        label: "Name",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "lastName",
        label: "Surname",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "birth",
        label: "Age",
        options: {
            filter: true,
            sort: false,
            customBodyRender: (data) => {
                return getAge(data);
            },
        },
    },
    {
        name: "preferredFoot",
        label: "Foot",
        options: {
            filter: true,
            sort: false,
        },
    },
    {
        name: "playerPosition",
        label: "Position",
        options: {
            filter: true,
            sort: false,
        },
    },
];

export default function TrainingSingle(props) {
    const [training, setTraining] = useState({});

    useEffect(() => {
        const fetchTraining = async () => {
            console.log({ props });
            axios
                .get(`/training/${props.match.params.trainingid}`)
                .then((data) => {
                    setTraining(data.data);
                });
        };
        fetchTraining();
    }, []);

    return (
        <>
            <PageTitle title={`Training`} />

            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5">Informations</Typography>
                            <Typography>
                                Date:{" "}
                                {new Date(training.date).toLocaleDateString()}
                            </Typography>
                            <Typography>
                                Type: {training.trainingType}
                            </Typography>
                            <Typography>
                                Description: {training.description}
                            </Typography>
                            <Typography>
                                Duration: {training.duration} min
                            </Typography>
                            <Typography>
                                Team: {training?.team?.name}
                            </Typography>
                            <Typography>
                                {`Staff: ${training?.staff?.firstName} ${training?.staff?.lastName}`}
                            </Typography>
                            <Typography>
                                Players: {training?.player?.length}
                            </Typography>
                        </CardContent>
                    </Card>

                    {training?.player?.length && (
                        <CustomTable
                            title="Players"
                            columns={columns}
                            rows={training?.player || []}
                            showMore={false}
                            showEdit={false}
                            showDelete={false}
                            selectableRows="none"
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}
