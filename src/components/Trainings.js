import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import AddTraining from "./AddTraining"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-material.css"

function Trainings(){

	const [trainings, setTrainings] = useState([])

	useEffect(() => {
		fetchTrainings()
	}, [])

	const fetchTrainings = () => {
		fetch("https://customerrest.herokuapp.com/api/trainings")
		.then(response => response.json())
		.then(data => setTrainings(data.content))
	}

	const addTraining = (training) => {
		fetch("https://customerrest.herokuapp.com/api/trainings",{
			method: "POST",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(training)
		})
		.then(response => {
			if (response.ok){
				fetchTrainings()
			}else{
				alert("")
			}
		})
		.catch(err => console.error(err))
	}

	const deleteTrainings = (url) => {
		if (window.confirm("Are you sure?")){
			fetch(url, { method: "DELETE" })
			.then(response => {
				if (response.ok){
					fetchTrainings()
				}else{
					alert("Something went wrong!")
				}
			})
		}
	}

	const columns = [
		{field: "date", sortable: true, filter: true},
		{field: "duration", sortable: true, filter: true},
		{field: "activity", sortable: true, filter: true},
		{field: "content", sortable: true, filter: true, width: 120},
		{field: "links", sortable: true, filter: true, width: 120},
		{
		headerName: "",
		field: "_links.self.href",
		width: 100,
		cellRenderer: params => 
			<IconButton color="error" onClick={() => deleteTrainings(params.data.links.find((link) => link.rel === "trainings").href)}>
				<DeleteIcon />
			</IconButton>
		}
	]

	return(
		<>
			<AddTraining addTraining={addTraining} />
			<div className="ag-theme-material" style={{height: 600, width: "90%"}}>
				<AgGridReact 
					columnDefs={columns}
					rowData={trainings}
					pagination={true}
					paginationPageSize={10}
					suppressCellFocus={true}
				/>
			</div>
		
		</>
	)
}


export default Trainings