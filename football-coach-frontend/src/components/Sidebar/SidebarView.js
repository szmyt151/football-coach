import React from "react";
import { Drawer, IconButton, List, withStyles } from "@material-ui/core";
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
} from "@material-ui/icons";
import classNames from "classnames";

import SidebarLink from "./components/SidebarLink/SidebarLinkContainer";

const structure = [
    { id: 0, label: "Dashboard", link: "/app/dashboard", icon: <HomeIcon /> },
    {
        id: 1,
        label: "Typography",
        link: "/app/typography",
        icon: <TypographyIcon />,
    },
    {
        id: 2,
        label: "Notifications",
        link: "/app/notifications",
        icon: <NotificationsIcon />,
    },
    {
        id: 3,
        label: "UI Elements",
        link: "/app/ui",
        icon: <UIElementsIcon />,
        children: [
            { label: "Icons", link: "/app/ui/icons" },
            { label: "Charts", link: "/app/ui/charts" },
            { label: "Maps", link: "/app/ui/maps" },
        ],
    },

    { id: 4, label: "Admins", link: "/app/users", icon: <PeopleIcon /> },
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
        icon: <StarHalfIcon />,
    },
    {
        id: 12,
        label: "Staff",
        link: "/app/staff",
        icon: <StarHalfIcon />,
    },
];

const SidebarView = ({
    classes,
    theme,
    toggleSidebar,
    isSidebarOpened,
    isPermanent,
    location,
}) => {
    return (
        <Drawer
            variant={isPermanent ? "permanent" : "temporary"}
            className={classNames(classes.drawer, {
                [classes.drawerOpen]: isSidebarOpened,
                [classes.drawerClose]: !isSidebarOpened,
            })}
            classes={{
                paper: classNames(classes.drawer, {
                    [classes.drawerOpen]: isSidebarOpened,
                    [classes.drawerClose]: !isSidebarOpened,
                }),
            }}
            open={isSidebarOpened}
        >
            <div className={classes.mobileBackButton}>
                <IconButton onClick={toggleSidebar}>
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
};

const drawerWidth = 240;

const styles = (theme) => ({
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        top: theme.spacing.unit * 8,
        [theme.breakpoints.down("sm")]: {
            top: 0,
        },
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing.unit * 7 + 40,
        [theme.breakpoints.down("sm")]: {
            width: drawerWidth,
        },
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down("sm")]: {
            display: "none",
        },
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
    },
    mobileBackButton: {
        marginTop: theme.spacing.unit * 0.5,
        marginLeft: theme.spacing.unit * 3,
        [theme.breakpoints.only("sm")]: {
            marginTop: theme.spacing.unit * 0.625,
        },
        [theme.breakpoints.up("md")]: {
            display: "none",
        },
    },
});

export default withStyles(styles, { withTheme: true })(SidebarView);
