import React, { useState, useEffect } from "react"
import { AgGridReact } from "ag-grid-react"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import Snackbar from "@mui/material/Snackbar"
import AddCustomer from "./AddCustomer"
import EditCustomer from "./EditCustomer"

import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-material.css"

function Customer(){

	const [customers, setCustomers] = useState([])
	const [open, setOpen] = useState(false)
	const [message, setMessage] = useState("")

	useEffect(() => {
		fetchCustomers()
	}, [])

	const fetchCustomers = () => {
		fetch("https://customerrest.herokuapp.com/api/customers")
		.then(response => response.json())
		.then(data => setCustomers(data.content))
	}

	const deleteCustomer = (url) => {
		if (window.confirm("Are you sure?")){
			fetch(url, { method: "DELETE" })
			.then(response => {
				if (response.ok){
					setMessage("Deleted")
					setOpen(true)
					fetchCustomers()
				}else{
					alert("Something went wrong!")
				}
			})
		}
	}

	const addCustomer = (customer) => {
		fetch("https://customerrest.herokuapp.com/api/customers",{
			method: "POST",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(customer)
		})
		.then(response => {
			if (response.ok){
				fetchCustomers()
			}else{
				alert("")
			}
		})
		.catch(err => console.error(err))
	}

	const updateCustomer = (updatedCustomer, link) => {
		fetch(link, {
			method: "PUT",
			headers: {"Content-type": "application/json"},
			body: JSON.stringify(updatedCustomer)
		})
		.then(response => {
			if(response.ok){
				setMessage("Edited")
				setOpen(true)
				fetchCustomers()
			}else{
				alert("Could not be edited!")
			}
		})
		.catch(err => console.error(err))
	}

	const columns = [
		{field: "firstname", sortable: true, filter: true},
		{field: "lastname", sortable: true, filter: true},
		{field: "streetaddress", sortable: true, filter: true},
		{field: "postcode", sortable: true, filter: true, width: 120},
		{field: "city", sortable: true, filter: true, width: 120},
		{field: "email", sortable: true, filter: true, width: 120},
		{field: "phone", sortable: true, filter: true, width: 120},
		{
			headerName: "",
			width: 100,
			field: "_links.self.href",
			cellRenderer: params => <EditCustomer updateCustomer={updateCustomer} params={params} />

		},
		{
		headerName: "",
		field: "_links.self.href",
		width: 100,
		cellRenderer: params => 
			<IconButton color="error" onClick={() => deleteCustomer(params.data.links.find((link) => link.rel === "customer").href)}>
				<DeleteIcon />
			</IconButton>
		}
	]

	return(
		<>
			<AddCustomer addCustomer={addCustomer} />
			<div className="ag-theme-material" style={{height: 600, width: "90%"}}>
				<AgGridReact 
					columnDefs={columns}
					rowData={customers}
					pagination={true}
					paginationPageSize={10}
					suppressCellFocus={true}
				/>
			</div>
			<Snackbar
				open={open}
				message={message}
				autoHideDuration={3000}
				onClose={() => setOpen(false)}
			/>
		</>
	)
}


export default Customer