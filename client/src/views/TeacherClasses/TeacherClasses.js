import React, {Component} from 'react';
import Scheduler, {SchedulerData, ViewTypes} from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/Navbar';

const DemoData = {
	resources: [{
		id: 'r1',
		name: 'UTS-001'
	}, {
		id: 'r2',
		name: 'UTS-002'
	}],
	events: [
		{
			id: 1,
			start: '2021-04-04 09:30:00',
			end: '2021-04-04 11:30:00',
			resourceId: 'r1',
			title: 'Software Development',
			showPopover: true
		},
		{
			id: 2,
			start: '2021-04-04 12:30:00',
			end: '2021-04-04 14:30:00',
			resourceId: 'r2',
			title: 'Database',
			showPopover: true
		}
	]
}

class Teacher extends Component {
	constructor(props) {
		super(props);

		let schedulerData = new SchedulerData(new Date(), ViewTypes.Week, false, false, {
			startResizable: false,
			endResizable: false,
			movable: false,
			creatable: false,
		});
		schedulerData.localeMoment.locale('en');
		schedulerData.setResources(DemoData.resources);
		schedulerData.setEvents(DemoData.events);
		schedulerData.config.schedulerWidth = '800';
		this.state = {
			viewModel: schedulerData
		}
	}

	render() {
		const {viewModel} = this.state;
		return (
			<div className='container'>
				<NavBar/>
				<Scheduler schedulerData={viewModel}
						   prevClick={this.prevClick}
						   nextClick={this.nextClick}
						   onSelectDate={this.onSelectDate}
						   onViewChange={this.onViewChange}
						   eventItemClick={this.eventClicked}
						   viewEventClick={this.ops1}
						   viewEventText="Ops 1"
						   viewEvent2Text="Ops 2"
						   viewEvent2Click={this.ops2}
						   toggleExpandFunc={this.toggleExpandFunc}
				/>
			</div>

		)
	}

	prevClick = (schedulerData) => {
		schedulerData.prev();
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData
		})
	}

	nextClick = (schedulerData) => {
		schedulerData.next();
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData
		})
	}

	onViewChange = (schedulerData, view) => {
		schedulerData.setViewType(view.viewType, view.showAgenda, view.isEventPerspective);
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData
		})
	}

	onSelectDate = (schedulerData, date) => {
		schedulerData.setDate(date);
		schedulerData.setEvents(DemoData.events);
		this.setState({
			viewModel: schedulerData
		})
	}

	eventClicked = (schedulerData, event) => {
		alert(`You just clicked an event: {id: ${event.id}, title: ${event.title}}, will jump to class detail page.`);
	};

	ops1 = (schedulerData, event) => {
		alert(`You just executed ops1 to event: {id: ${event.id}, title: ${event.title}}`);
	};

	ops2 = (schedulerData, event) => {
		alert(`You just executed ops2 to event: {id: ${event.id}, title: ${event.title}}`);
	};

	toggleExpandFunc = (schedulerData, slotId) => {
		schedulerData.toggleExpandStatus(slotId);
		this.setState({
			viewModel: schedulerData
		});
	}
}


export default withDragDropContext(Teacher)
