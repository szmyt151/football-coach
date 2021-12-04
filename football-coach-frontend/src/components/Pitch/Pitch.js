import React, { Component } from "react";

// https://www.npmjs.com/package/react-soccer-lineup
import SoccerLineUp from "react-soccer-lineup";

class Pitch extends Component {
    render() {
        const squad = this.props.players;
        const [gk] = squad
            .filter((p) => p.playerPosition.includes("GK"))
            .map((player) => {
                return {
                    name: `${player.firstName} ${player.lastName}`,
                    number: 1,
                    color: "#d6cb65",
                    numberColor: "#333333",
                };
            });

        const df = squad
            .filter((p) => p.playerPosition.includes("Back"))
            .map((player) => {
                return {
                    name: `${player.firstName} ${player.lastName}`,
                    number: player.shirtNumber,
                };
            });

        const cam = squad
            .filter((p) => p.playerPosition.match(/CAM|LW|RW/g))
            .map((player) => {
                return {
                    name: `${player.firstName} ${player.lastName}`,
                    number: player.shirtNumber,
                };
            });

        const cm = squad
            .filter((
                p, //
            ) => p.playerPosition.match(/CM|LM|RM|CDM/g))
            .map((player) => {
                return {
                    name: `${player.firstName} ${player.lastName}`,
                    number: player.shirtNumber,
                };
            });

        const fw = squad
            .filter((p) =>
                p.playerPosition.includes("ST" || "LF" || "RF" || "CF"),
            )
            .map((player) => {
                return {
                    name: `${player.firstName} ${player.lastName}`,
                    number: player.shirtNumber,
                };
            });

        let homeTeam = {
            squad: {
                cam: cam,
                df: df,
                fw: fw,
                gk: gk,
                cm: cm,
            },
        };
        // cdm: cdm,

        console.log({ homeTeam });

        return (
            <SoccerLineUp
                size={"responsive"}
                pattern={"lines"}
                homeTeam={homeTeam}
            />
        );
    }
}

export default Pitch;
