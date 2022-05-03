import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

function AddTraining({ addTraining }){

    const [open, setOpen] = React.useState(false)
	const [training, setTraining] = React.useState({
        date: "",
        duration: "",
        activity: "",
        customer: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSave = () => {
        addTraining(training)
        setOpen(false)
        setTraining({
			date: "",
			duration: "",
			activity: "",
			customer: "",
        })
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <DialogContent>
                <TextField
                    name="date"
                    value={training.date}
                    onChange={inputChanged}
                    margin="dense"
                    label="Date"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="duration"
                    value={training.duration}
                    onChange={inputChanged}
                    margin="dense"
                    label="Duration"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="activity"
                    value={training.activity}
                    onChange={inputChanged}
                    margin="dense"
                    label="Activity"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    name="customer"
                    value={training.customer}
                    onChange={inputChanged}
                    margin="dense"
                    label="Customer"
                    fullWidth
                    variant="standard"
                />
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default AddTraining