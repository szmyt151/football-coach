import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

import {
    StarHalf as StarHalfIcon,
    People as PeopleIcon,
    EmojiEvents as EmojiEventsIcon,
} from "@material-ui/icons";
import {
    useLayoutDispatch,
    toggleMatchModal,
    togglePlayerModal,
    toggleSeasonModal,
} from "../../context/LayoutContext";

export default function BasicSpeedDial() {
    // global
    var layoutDispatch = useLayoutDispatch();

    const openModal = (modalName) => {
        if (modalName === "match") {
            toggleMatchModal(layoutDispatch);
        }

        if (modalName === "player") {
            togglePlayerModal(layoutDispatch);
        }

        if (modalName === "season") {
            toggleSeasonModal(layoutDispatch);
        }
    };

    return (
        <SpeedDial
            ariaLabel="Add player and match"
            sx={{ position: "fixed", bottom: 16, right: 16 }}
            icon={<SpeedDialIcon />}
        >
            <SpeedDialAction
                key="AddMatch"
                icon={<StarHalfIcon />}
                tooltipTitle="Add Match"
                onClick={() => openModal("match")}
            />
            <SpeedDialAction
                key="AddPlayer"
                icon={<PeopleIcon />}
                tooltipTitle="Add Player"
                onClick={() => openModal("player")}
            />

            <SpeedDialAction
                key="AddSeason"
                icon={<EmojiEventsIcon />}
                tooltipTitle="Add Season"
                onClick={() => openModal("season")}
            />
        </SpeedDial>
    );
}
