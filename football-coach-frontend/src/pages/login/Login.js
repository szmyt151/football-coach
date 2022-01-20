import React, { useState } from "react";
import {
    Grid,
    CircularProgress,
    Typography,
    Button,
    Tabs,
    Tab,
    TextField,
    Fade,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

// styles
import useStyles from "./styles";

// logo
import logo from "./logo.svg";

// context
import {
    useUserDispatch,
    loginUser,
    createUser,
} from "../../context/UserContext";

function Login(props) {
    var classes = useStyles();

    // global
    var userDispatch = useUserDispatch();

    // local
    var [isLoading, setIsLoading] = useState(false);
    var [error, setError] = useState(null);
    var [activeTabId, setActiveTabId] = useState(0);
    var [nameValue, setNameValue] = useState("");
    var [lastnameValue, setLastNameValue] = useState("");
    var [loginValue, setLoginValue] = useState("szmyt151");
    var [passwordValue, setPasswordValue] = useState("1234567890");

    return (
        <Grid container className={classes.container}>
            <div className={classes.logotypeContainer}>
                <img src={logo} alt="logo" className={classes.logotypeImage} />
                <Typography className={classes.logotypeText}>
                    Football Coach
                </Typography>
            </div>
            <div className={classes.formContainer}>
                <div className={classes.form}>
                    <Tabs
                        value={activeTabId}
                        onChange={(e, id) => setActiveTabId(id)}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Login" classes={{ root: classes.tab }} />
                        <Tab label="New User" classes={{ root: classes.tab }} />
                    </Tabs>
                    {activeTabId === 0 && (
                        <React.Fragment>
                            <Typography
                                variant="h1"
                                className={classes.greeting}
                            >
                                Welcome coach!
                            </Typography>
                            <Fade in={error}>
                                <Typography
                                    color="secondary"
                                    className={classes.errorMessage}
                                >
                                    Something is wrong with your login or
                                    password :(
                                </Typography>
                            </Fade>
                            <TextField
                                id="email"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={loginValue}
                                onChange={(e) => setLoginValue(e.target.value)}
                                margin="normal"
                                placeholder="Email Adress"
                                type="email"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={passwordValue}
                                onChange={(e) =>
                                    setPasswordValue(e.target.value)
                                }
                                margin="normal"
                                placeholder="Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.formButtons}>
                                {isLoading ? (
                                    <CircularProgress
                                        size={26}
                                        className={classes.loginLoader}
                                    />
                                ) : (
                                    <Button
                                        disabled={
                                            loginValue.length === 0 ||
                                            passwordValue.length === 0
                                        }
                                        onClick={() =>
                                            loginUser(
                                                userDispatch,
                                                loginValue,
                                                passwordValue,
                                                props.history,
                                                setIsLoading,
                                                setError,
                                            )
                                        }
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                    {activeTabId === 1 && (
                        <React.Fragment>
                            <Typography
                                variant="h1"
                                className={classes.greeting}
                            >
                                Welcome!
                            </Typography>
                            <Typography
                                variant="h2"
                                className={classes.subGreeting}
                            >
                                Create your account
                            </Typography>
                            <Fade in={error}>
                                <Typography
                                    color="secondary"
                                    className={classes.errorMessage}
                                >
                                    You account is created
                                </Typography>
                            </Fade>
                            <TextField
                                id="firstname"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={nameValue}
                                onChange={(e) => setNameValue(e.target.value)}
                                margin="normal"
                                placeholder="Firstname"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="lastname"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={lastnameValue}
                                onChange={(e) =>
                                    setLastNameValue(e.target.value)
                                }
                                margin="normal"
                                placeholder="Lastname"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="username"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={loginValue}
                                onChange={(e) => setLoginValue(e.target.value)}
                                margin="normal"
                                placeholder="Username"
                                type="text"
                                fullWidth
                            />
                            <TextField
                                id="password"
                                InputProps={{
                                    classes: {
                                        underline: classes.textFieldUnderline,
                                        input: classes.textField,
                                    },
                                }}
                                value={passwordValue}
                                onChange={(e) =>
                                    setPasswordValue(e.target.value)
                                }
                                margin="normal"
                                placeholder="Password"
                                type="password"
                                fullWidth
                            />
                            <div className={classes.creatingButtonContainer}>
                                {isLoading ? (
                                    <CircularProgress size={26} />
                                ) : (
                                    <Button
                                        onClick={() =>
                                            createUser(
                                                userDispatch,
                                                {
                                                    firstName: nameValue,
                                                    lastName: lastnameValue,
                                                    username: loginValue,
                                                    password: passwordValue,
                                                },
                                                props.history,
                                                setIsLoading,
                                                setError,
                                            )
                                        }
                                        disabled={
                                            loginValue.length === 0 ||
                                            passwordValue.length === 0 ||
                                            lastnameValue.length === 0
                                        }
                                        size="large"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        className={classes.createAccountButton}
                                    >
                                        Create your account
                                    </Button>
                                )}
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </Grid>
    );
}

export default withRouter(Login);
