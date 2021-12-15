import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { getAge } from "./helpers";
import { Link } from "react-router-dom";
function showStatistics(e) {
    console.log("showStatistics");
}

function showProfile(e) {
    console.log("showProfile");
}

export default function PlayerCard({ player }) {
    return (
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
                    {getAge(player.birth)} - {player.team.name}
                </Typography>
            </CardContent>
            <CardActions style={{ justifyContent: "flex-end" }}>
                {/* <Link
                    to={{ pathname: `/app/statistics/${player.id}` }}
                    style={{ textDecoration: "none" }}
                >
                    <Button size="small" onClick={showStatistics}>
                        Show statistics
                    </Button>
                </Link> */}

                <Link
                    to={{ pathname: `/app/players/${player.id}` }}
                    style={{ textDecoration: "none" }}
                >
                    <Button size="small" onClick={showProfile}>
                        Show profile
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}
