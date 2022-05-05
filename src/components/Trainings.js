import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"


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

	const dateFormatter = ({data}) => {
		return new Date(data.date).toLocaleDateString()
	}

	const columns = [
		{field: "date", sortable: true, filter: true, valueFormatter: dateFormatter,},
		{field: "duration", sortable: true, filter: true},
		{field: "activity", sortable: true, filter: true},
		{
		headerName: "",
		field: "_links.self.href",
		width: 100,
		cellRenderer: params => 
			<IconButton color="error" onClick={() => deleteTrainings(params.data.links.find((link) => link.rel === "training").href)}>
				<DeleteIcon />
			</IconButton>
		}
	]

	return(
		<>
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