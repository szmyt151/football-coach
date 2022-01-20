import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
    Home as HomeIcon,
    NotificationsNone as NotificationsIcon,
    FormatSize as TypographyIcon,
    FilterNone as UIElementsIcon,
    // BorderAll as TableIcon,
    // QuestionAnswer as SupportIcon,
    // LibraryBooks as LibraryIcon,
    // HelpOutline as FAQIcon,
    ArrowBack as ArrowBackIcon,
    People as PeopleIcon,
    Payment as PaymentIcon,
    // SportsSoccer as SportsSoccerIcon,
    EmojiEvents as EmojiEventsIcon,
    StarHalf as StarHalfIcon,
    FitnessCenter as FitnessCenterIcon,
    Accessibility as AccessibilityIcon,
} from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";

// context
import {
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
    { id: 4, label: "Users", link: "/app/users", icon: <PeopleIcon /> },
    { id: 5, label: "Payments", link: "/app/payment", icon: <PaymentIcon /> },
    { id: 6, label: "Players", link: "/app/players", icon: <PeopleIcon /> },
    {
        id: 7,
        label: "Statistics",
        link: "/app/statistics",
        icon: <StarHalfIcon />,
    },
    { id: 8, label: "Teams", link: "/app/teams", icon: <StarHalfIcon /> },
    { id: 9, label: "Matches", link: "/app/matches", icon: <StarHalfIcon /> },
    {
        id: 10,
        label: "Seasons",
        link: "/app/seasons",
        icon: <EmojiEventsIcon />,
    },
    {
        id: 11,
        label: "Trainings",
        link: "/app/trainings",
        icon: <FitnessCenterIcon />,
    },
    {
        id: 12,
        label: "Staff",
        link: "/app/staff",
        icon: <AccessibilityIcon />,
    },
];

function Sidebar({ location }) {
    var classes = useStyles();
    var theme = useTheme();

    // global
    var { isSidebarOpened } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    // local
    var [isPermanent, setPermanent] = useState(true);

    useEffect(function () {
        window.addEventListener("resize", handleWindowWidthChange);
        handleWindowWidthChange();
        return function cleanup() {
            window.removeEventListener("resize", handleWindowWidthChange);
        };
    });

    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames({
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.toolbar} />
            <div className={classes.mobileBackButton}>
                <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
                    <ArrowBackIcon
                        classes={{
                            root: classNames(
                                classes.headerIcon,
                                classes.headerIconCollapse,
                            ),
                        }}
                    />
                </IconButton>
            </div>
            <List className={classes.sidebarList}>
                {structure.map((link) => (
                    <SidebarLink
                        key={link.id}
                        location={location}
                        isSidebarOpened={isSidebarOpened}
                        {...link}
                    />
                ))}
            </List>
        </Drawer>
    );

    // ##################################################################
    function handleWindowWidthChange() {
        var windowWidth = window.innerWidth;
        var breakpointWidth = theme.breakpoints.values.md;
        var isSmallScreen = windowWidth < breakpointWidth;

        if (isSmallScreen && isPermanent) {
            setPermanent(false);
        } else if (!isSmallScreen && !isPermanent) {
            setPermanent(true);
        }
    }
}

export default withRouter(Sidebar);
