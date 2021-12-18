import React from "react";
import MatchModal from "../components/Modals/MatchModal";
import PlayerModal from "../components/Modals/PlayerModal";
import SeasonModal from "../components/Modals/SeasonModal";

var LayoutStateContext = React.createContext();
var LayoutDispatchContext = React.createContext();

function layoutReducer(state, action) {
    switch (action.type) {
        case "TOGGLE_SIDEBAR":
            return { ...state, isSidebarOpened: !state.isSidebarOpened };

        case "MATCH_MODAL":
            return { ...state, showMatchModal: !state.showMatchModal };

        case "PLAYER_MODAL":
            return { ...state, showPlayerModal: !state.showPlayerModal };

        case "SEASON_MODAL":
            return { ...state, showSeasonModal: !state.showSeasonModal };
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

function LayoutProvider({ children }) {
    var [state, dispatch] = React.useReducer(layoutReducer, {
        isSidebarOpened: true,
        showMatchModal: false,
        showPlayerModal: false,
    });
    return (
        <LayoutStateContext.Provider value={state}>
            <LayoutDispatchContext.Provider value={dispatch}>
                {children}
                {state.showMatchModal && <MatchModal />}
                {state.showPlayerModal && <PlayerModal />}
                {state.showSeasonModal && <SeasonModal />}
            </LayoutDispatchContext.Provider>
        </LayoutStateContext.Provider>
    );
}

function useLayoutState() {
    var context = React.useContext(LayoutStateContext);
    if (context === undefined) {
        throw new Error("useLayoutState must be used within a LayoutProvider");
    }
    return context;
}

function useLayoutDispatch() {
    var context = React.useContext(LayoutDispatchContext);
    if (context === undefined) {
        throw new Error(
            "useLayoutDispatch must be used within a LayoutProvider",
        );
    }
    return context;
}

export {
    LayoutProvider,
    useLayoutState,
    useLayoutDispatch,
    toggleSidebar,
    toggleMatchModal,
    togglePlayerModal,
    toggleSeasonModal,
};

// ###########################################################
function toggleSidebar(dispatch) {
    dispatch({
        type: "TOGGLE_SIDEBAR",
    });
}

function toggleMatchModal(dispatch) {
    dispatch({
        type: "MATCH_MODAL",
    });
}

function togglePlayerModal(dispatch) {
    dispatch({
        type: "PLAYER_MODAL",
    });
}

function toggleSeasonModal(dispatch) {
    dispatch({
        type: "SEASON_MODAL",
    });
}
