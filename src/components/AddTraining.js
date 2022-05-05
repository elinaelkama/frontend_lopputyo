import React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddIcon from "@mui/icons-material/Add"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"

function AddTraining(){

    const [open, setOpen] = React.useState(false)
	const [training, setTraining] = React.useState({
        date: "",
        duration: "",
        activity: "",
    })

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false)
    }

    const addTraining = (training) => {
		fetch("https://customerrest.herokuapp.com/api/trainings",{
			method: "POST",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(training)
		})
		.then(response => {
			if (response.ok){
			}else{
				alert("training could not be added")
			}
		})
		.catch(err => console.error(err))
	}

    const handleSave = () => {
        addTraining(training)
        setOpen(false)
        setTraining({
			date: "",
			duration: "",
			activity: "",
        })
    }

    const inputChanged = (event) => {
        setTraining({...training, [event.target.name]: event.target.value})
    }

    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                <AddIcon color="success" />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New training</DialogTitle>
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