import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"

function Trainings(){

	const [trainings, setTrainings] = useState([])

	useEffect(() => {
		fetch("https://customerrest.herokuapp.com/api/trainings")
		.then(response => response.json())
		.then(data => setTrainings(data.content))
	}, [])

	const columns = [
		{field: "date", sortable: true, filter: true},
		{field: "duration", sortable: true, filter: true},
		{field: "activity", sortable: true, filter: true},
		{field: "content", sortable: true, filter: true, width: 120},
		{field: "links", sortable: true, filter: true, width: 120}
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