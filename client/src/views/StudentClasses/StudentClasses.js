import React, { Component } from 'react';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import Card from 'react-bootstrap/Card';
import ClassItem from './ClassItem';
import CameraIcon from '../../images/cameraIcon.png';
import RoundArrowsIcon from '../../images/roundArrowsIcon.png';
import PinCodeIcon from '../../images/pinCodeIcon.png';
import axios from 'axios';

const DemoData = {
	resources: [
		{
			id: 'r1',
			name: 'UTS-001',
		},
		{
			id: 'r2',
			name: 'UTS-002',
		},
	],
	events: [
		{
			id: 1,
			start: '2021-04-04 09:30:00',
			end: '2021-04-04 11:30:00',
			resourceId: 'r1',
			title: 'Software Development',
			showPopover: true,
		},
		{
			id: 2,
			start: '2021-04-04 12:30:00',
			end: '2021-04-04 14:30:00',
			resourceId: 'r2',
			title: 'Database',
			showPopover: true,
		},
	],
};


class Student extends Component {
	constructor(props) {
		super(props);

		// this.getClasses = this.getClasses.bind(this);

		this.state = {
			classes: []
		}

		let schedulerData = new SchedulerData(
			new Date(),
			ViewTypes.Week,
			false,
			false,
			{
				startResizable: false,
				endResizable: false,
				movable: false,
				creatable: false,
			},
		);
		schedulerData.localeMoment.locale('en');
		schedulerData.setResources(DemoData.resources);
		schedulerData.setEvents(DemoData.events);
		schedulerData.config.schedulerWidth = '800';
		this.state = {
			viewModel: schedulerData,
		};
	}

	async componentDidMount() {
		let classesRes = await axios.post("http://localhost:5000/api/class/student-classes", { studentID: JSON.parse(localStorage.getItem("studentData")).userid });
		this.setState({ classes: classesRes.data.classes });
		console.log(this.state.classes);
	}

	// async getClasses() {

	// }

	render() {
		const { viewModel } = this.state;
		return (
			<div className='dashboard-view'>
				<NavBar
					dashboardURL='/student/dashboard'
					profileURL='/student/profile'
					classesURL='/student/classes'
				/>
				<Card style={{ width: '900px', margin: 'auto' }}>
					<Card.Body>
						<Card.Title>Class Calendar</Card.Title>
						<Card.Text>
							<Scheduler
								schedulerData={viewModel}
								prevClick={this.prevClick}
								nextClick={this.nextClick}
								onSelectDate={this.onSelectDate}
								onViewChange={this.onViewChange}
								eventItemClick={this.eventClicked}
								viewEventClick={this.ops1}
								viewEventText='Ops 1'
								viewEvent2Text='Ops 2'
								viewEvent2Click={this.ops2}
								toggleExpandFunc={this.toggleExpandFunc}
							/>
						</Card.Text>
					</Card.Body>
				</Card>
				<Card
					style={{
						width: '900px',
						margin: ' 40px auto',
						backgroundColor: '#f6f6f6',
					}}
				>
					<Card.Body>
						<div style={{ marginBottom: '40px' }}>
							<Card.Title style={{ float: 'left' }}>All Classes</Card.Title>
							<div style={{ float: "right", fontSize: 'small', display: 'flex', marginRight: '30px' }}>
								<img src={CameraIcon} style={{ width: '30px', height: '30px', marginLeft: '15px', marginRight: '15px' }} />
								<img src={RoundArrowsIcon} style={{ width: '30px', height: '30px', marginLeft: '15px', marginRight: '15px' }} />
								<img src={PinCodeIcon} style={{ width: '30px', height: '30px', marginLeft: '15px', marginRight: '15px' }} />
							</div>
						</div>

						<Card.Text>
							{console.log(this.state.classes)}
							{this.state.classes ? this.state.classes.map(aClass => (
								<ClassItem
									classId={aClass.classID}
									name={aClass.className}
									startTime={aClass.startTime}
									endTime={aClass.endTime}
									studentAuth={aClass.students}
								/>
							)) : console.log("there are no classes")}
						</Card.Text>
					</Card.Body>
				</Card>
				<div></div>
			</div>
		);
	}

	prevClick = (schedulerData) => {
		schedulerData.prev();
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	nextClick = (schedulerData) => {
		schedulerData.next();
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	onViewChange = (schedulerData, view) => {
		schedulerData.setViewType(
			view.viewType,
			view.showAgenda,
			view.isEventPerspective,
		);
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	onSelectDate = (schedulerData, date) => {
		schedulerData.setDate(date);
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData,
		});
	};

	eventClicked = (schedulerData, event) => {
		alert(
			`You just clicked an event: {id: ${event.id}, title: ${event.title}}, will jump to class detail page.`,
		);
	};

	ops1 = (schedulerData, event) => {
		alert(
			`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`,
		);
	};

	ops2 = (schedulerData, event) => {
		alert(
			`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`,
		);
	};

	toggleExpandFunc = (schedulerData, slotId) => {
		schedulerData.toggleExpandStatus(slotId);
		this.setState({
			viewModel: schedulerData,
		});
	};
}

export default withDragDropContext(Student);
