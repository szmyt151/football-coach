import React from "react";
import axios from "axios";
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case "LOGIN_SUCCESS":
            return { ...state, isAuthenticated: true };
        case "USER_ME":
            return { ...state, user: action.payload };
        case "SIGN_OUT_SUCCESS":
            return { ...state, isAuthenticated: false };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function UserProvider({ children }) {
    var [state, dispatch] = React.useReducer(userReducer, {
        isAuthenticated: !!localStorage.getItem("access_token"),
        user: {},
    });

    return (
        <UserStateContext.Provider value={state}>
            <UserDispatchContext.Provider value={dispatch}>
                {children}
            </UserDispatchContext.Provider>
        </UserStateContext.Provider>
    );
}

function useUserState() {
    var context = React.useContext(UserStateContext);
    if (context === undefined) {
        throw new Error("useUserState must be used within a UserProvider");
    }
    return context;
}

function useUserDispatch() {
    var context = React.useContext(UserDispatchContext);
    if (context === undefined) {
        throw new Error("useUserDispatch must be used within a UserProvider");
    }
    return context;
}

export {
    UserProvider,
    useUserState,
    useUserDispatch,
    loginUser,
    signOut,
    createUser,
    getMe,
};

// ###########################################################

async function loginUser(
    dispatch,
    login,
    password,
    history,
    setIsLoading,
    setError,
) {
    setError(false);
    setIsLoading(true);

    if (!!login && !!password) {
        try {
            const { data } = await axios.post("/auth/login", {
                username: login,
                password,
            });
            localStorage.setItem("access_token", data.access_token);

            getMe(dispatch);

            setError(null);
            setIsLoading(false);
            dispatch({ type: "LOGIN_SUCCESS" });
            history.push("/app/teams");
        } catch (error) {
            console.log(error);
        }
    } else {
        dispatch({ type: "LOGIN_FAILURE" });
        setError(true);
        setIsLoading(false);
    }
}

async function createUser(dispatch, body, history, setIsLoading, setError) {
    setError(false);
    setIsLoading(true);
    console.log(body);
    if (!!body.username && !!body.password) {
        try {
            const { data } = await axios.post("/users", body);
            setError(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(false);
        }
    } else {
        console.log("failed created");
        dispatch({ type: "LOGIN_FAILURE" });
        setError(false);
        setIsLoading(false);
    }
}

function signOut(dispatch, history) {
    localStorage.removeItem("access_token");
    dispatch({ type: "SIGN_OUT_SUCCESS" });
    history.push("/login");
}

async function getMe(dispatch) {
    try {
        const { data } = await axios.get("/me", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token"),
            },
        });
        console.log("user", { user: data });
        dispatch({ type: "USER_ME", payload: data });
    } catch (error) {}
}
