import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { TextField, CircularProgress, Autocomplete } from "@mui/material";
// components
import axios from "../../axios";
import PageTitle from "../../components/PageTitle/PageTitle";
import PlayerCard from "../../components/Players/PlayerCard";

export default function PlayersStatistics() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState([]);

    const loading = open && options.length === 0;

    useEffect(() => {
        let active = true;

        if (!loading) {
            return undefined;
        }

        (async () => {
            if (active) {
                setOptions([...options]);
            }
        })();

        return () => {
            active = false;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading]);

    useEffect(() => {
        const fetchPlayers = async () => {
            axios.get("/players").then((data) => {
                setOptions(data.data);
            });
        };

        fetchPlayers();
    }, []);

    return (
        <>
            {options && (
                <Autocomplete
                    id="autocomplete-players"
                    sx={{ width: 800 }}
                    open={open}
                    onOpen={() => {
                        setOpen(true);
                    }}
                    onClose={() => {
                        setOpen(false);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option.firstName === value.firstName
                    }
                    getOptionLabel={(option) => option.firstName}
                    options={options}
                    loading={loading}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Player"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <React.Fragment>
                                        {loading ? (
                                            <CircularProgress
                                                color="inherit"
                                                size={20}
                                            />
                                        ) : null}
                                        {params.InputProps.endAdornment}
                                    </React.Fragment>
                                ),
                            }}
                        />
                    )}
                />
            )}

            <PageTitle title="Players" />
            <Grid container spacing={2}>
                {options &&
                    options.map((player) => {
                        return (
                            <Grid item md key={player.id}>
                                <PlayerCard player={player} />
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    );
}
