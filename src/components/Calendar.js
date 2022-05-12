import React, { useState, useEffect } from "react"
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import "react-big-calendar/lib/css/react-big-calendar.css"

function Calendar(){
	const [trainings, setTrainings] = useState([])
	const [participants, setParticipants] = useState({})
	const [events, setEvents] = useState([])

	useEffect(() => {
		fetch("https://customerrest.herokuapp.com/api/trainings")
			.then(response => response.json())
			.then(data => setTrainings(data.content))
		
	}, [])

	useEffect(() =>{
		const fetches = {}
		trainings.map(training => {
			const url = training.links.find(link => link.rel === "customer").href
			fetch(url).then(response => response.json()).then(({firstname, lastname}) => {
				fetches[url] = `${firstname} ${lastname}`
			})
		})
		setParticipants(fetches)
	}, [trainings])

	useEffect(() => {
		setEvents(trainings.map(({date, activity, duration, links}) => {
			const start = new Date(date)
			const end = new Date(start.getTime())
			const displayTime = `${start.getHours()}:${start.getMinutes()}`
			end.setMinutes(end.getMinutes()+duration)
			const customerLink = links.find(link => link.rel === "customer").href
			const participant = participants[customerLink] ? participants[customerLink] : "Ladataan..."
			return{
				title: `${displayTime} ${activity} | ${participant}`,
				start: start,
				end: end
			}
		}))
	}, [trainings, participants, events])

	const localizer = momentLocalizer(moment)

	return (
		<BigCalendar
			localizer={localizer}
			events={events}
			startAccessor="start"
			endAccessor="end"
			style={{ height: "90vh" }}
   		 />
	)
}

export default Calendar