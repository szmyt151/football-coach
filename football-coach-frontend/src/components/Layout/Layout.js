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

// context
import { useLayoutState } from "../../context/LayoutContext";
import PlayersStatistics from "../../pages/playersStatistics/PlayersStatistics";
import PlayersStatisticsSingle from "../../pages/playersStatistics/PlayersStatisticsSingle";
import MatchesTable from "../../pages/matches/MatchesTable";
import MatchesSingle from "../../pages/matches/MatchesSingle";
import SeasonsTable from "../../pages/sesaons/SeasonsTable";
import SeasonSingle from "../../pages/sesaons/SeasonSingle";
import StaffTable from "../../pages/staff/StaffTable";
import TrainingsTable from "../../pages/trainings/TrainingsTable";
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
                            path="/app/statistics/:playerid"
                            component={PlayersStatisticsSingle}
                        />

                        <Route
                            exact
                            path="/app/matches"
                            component={MatchesTable}
                        />
                        <Route
                            path="/app/matches/:matchid"
                            component={MatchesSingle}
                        />

                        <Route exact path="/app/teams" component={TeamsTable} />
                        <Route
                            path="/app/teams/:teamid"
                            component={TeamSingle}
                        />

                        <Route
                            exact
                            path="/app/seasons"
                            component={SeasonsTable}
                        />
                        <Route
                            path="/app/seasons/:seasonid"
                            component={SeasonSingle}
                        />

                        <Route
                            exact
                            path="/app/trainings"
                            component={TrainingsTable}
                        />
                        {/* <Route
                            path="/app/trainings/:trainingid"
                            component={SeasonSingle}
                        /> */}

                        <Route exact path="/app/staff" component={StaffTable} />
                        {/* <Route
                            path="/app/staff/:staffid"
                            component={SeasonSingle}
                        /> */}

                        <Route path="/app/ui/maps" component={Maps} />
                        <Route path="/app/ui/icons" component={Icons} />
                    </Switch>
                    <BasicSpeedDial />
                </div>
            </>
        </div>
    );
}

export default withRouter(Layout);
