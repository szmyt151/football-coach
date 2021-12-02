import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import {
    useLayoutState,
    useLayoutDispatch,
    toggleMatchModal,
} from "../../context/LayoutContext";
import Form from "../Form/Form";
import Typography from "@mui/material/Typography";

const style = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, 0%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
};

export default function MatchModal() {
    // global
    var { showMatchModal } = useLayoutState();
    var layoutDispatch = useLayoutDispatch();

    const handleClose = () => toggleMatchModal(layoutDispatch);
    const handleSubmit = (e) => {
        console.log("form submiited", e);
    };

    const FormOptions = {
        title: "New match",
        handleSubmit: handleSubmit,
        fields: [
            {
                type: "input",
                name: "match",
                label: "field 1",
            },
        ],
    };
    return (
        <div>
            <Modal
                aria-labelledby="match-modal-title"
                aria-describedby="match-modal-description"
                open={showMatchModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={showMatchModal}>
                    <Box sx={style}>
                        <Typography variant="h4" component="h4">
                            New match
                        </Typography>
                        <br />
                        <Form {...FormOptions} />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
