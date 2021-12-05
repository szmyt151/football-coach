import React from "react";
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import classnames from "classnames";

// styles
import useStyles from "./styles";

// components
import Header from "../Header";
import Sidebar from "../Sidebar";
import BasicSpeedDial from "../SpeedDial/SpeedDial";

// pages
import Dashboard from "../../pages/dashboard";
import Typography from "../../pages/typography";
import Notifications from "../../pages/notifications";
import Maps from "../../pages/maps";
import UsersTables from "../../pages/users";
import PaymentTable from "../../pages/payment";
import PlayersTable from "../../pages/players/PlayersTable";
import TeamsTable from "../../pages/teams/TeamsTable";
import TeamSingle from "../../pages/teams/TeamSingle";
import PlayerSingle from "../../pages/players/PlayerSingle";
import Icons from "../../pages/icons";
import Charts from "../../pages/charts";

// context
import { useLayoutState } from "../../context/LayoutContext";
import PlayersStatistics from "../../pages/playersStatistics/PlayersStatistics";
import MatchesTable from "../../pages/matches/MatchesTable";
function Layout(props) {
    var classes = useStyles();

    // global
    var layoutState = useLayoutState();

    return (
        <div className={classes.root}>
            <>
                <Header history={props.history} />
                <Sidebar />
                <div
                    className={classnames(classes.content, {
                        [classes.contentShift]: layoutState.isSidebarOpened,
                    })}
                >
                    <div className={classes.fakeToolbar} />
                    <Switch>
                        <Route path="/app/dashboard" component={Dashboard} />
                        <Route path="/app/typography" component={Typography} />
                        <Route
                            path="/app/notifications"
                            component={Notifications}
                        />
                        <Route
                            exact
                            path="/app/ui"
                            render={() => <Redirect to="/app/ui/icons" />}
                        />

                        <Route path="/app/users" component={UsersTables} />
                        <Route
                            path="/app/users/:userid"
                            component={UsersTables}
                        />

                        <Route path="/app/payment" component={PaymentTable} />
                        <Route
                            path="/app/payment:paymentid"
                            component={PaymentTable}
                        />

                        <Route
                            exact
                            path="/app/players"
                            component={PlayersTable}
                        />
                        <Route
                            path="/app/players/:playerid"
                            component={PlayerSingle}
                        />

                        <Route
                            exact
                            path="/app/statistics"
                            component={PlayersStatistics}
                        />

                        <Route
                            exact
                            path="/app/matches"
                            component={MatchesTable}
                        />
                        {/* <Route
                            path="/app/matches/:matchid"
                            component={MatchSingle}
                        /> */}

                        {/* <Route path="/app/statistics/:playerid" component={PlayersStatisticsSingle} /> */}

                        <Route exact path="/app/teams" component={TeamsTable} />
                        <Route
                            path="/app/teams/:teamid"
                            component={TeamSingle}
                        />

                        <Route path="/app/ui/maps" component={Maps} />
                        <Route path="/app/ui/icons" component={Icons} />
                        <Route path="/app/ui/charts" component={Charts} />
                    </Switch>
                    <BasicSpeedDial />
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
