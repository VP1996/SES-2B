import React, { Component } from 'react';
import Scheduler, { SchedulerData, ViewTypes } from 'react-big-scheduler';
import withDragDropContext from './withDnDContext';
import 'react-big-scheduler/lib/css/style.css';
import NavBar from '../../components/Navbar/BlueNavBar';
import Card from "react-bootstrap/Card";
import ClassItem from "../TeacherClasses/ClassItem";

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

const classesMockData = [
    {
        classId: 1,
        className: 'Application Programming',
        startTime: '09:00',
        endTime: '11:00',
        flags: {
            facial: false,
            captcha: false,
            pin: false,
        }
    },
    {
        classId: 2,
        className: 'Internet Programming',
        startTime: '11:00',
        endTime: '13:00',
        flags: {
            facial: false,
            captcha: false,
            pin: false,
        }
    },
    {
        classId: 3,
        className: 'Software Studio 3A',
        startTime: '14:00',
        endTime: '16:00',
        flags: {
            facial: false,
            captcha: false,
            pin: false,
        }
    },
    {
        classId: 4,
        className: 'Database Fundamental',
        startTime: '16:00',
        endTime: '20:00',
        flags: {
            facial: false,
            captcha: false,
            pin: false,
        }
    },
];

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
        const { viewModel } = this.state;
        return (
            <div className="dashboard-view">
                <NavBar dashboardURL='/teacher/dashboard' profileURL='/teacher/profile' classesURL='/teacher/classes' />
                <Card style={{ width: '900px', margin: 'auto' }}>
                    <Card.Body>
                        <Card.Title>Class Calendar</Card.Title>
                        <Card.Text>
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
                        </Card.Text>
                    </Card.Body>
                </Card>
                <Card style={{ width: '900px', margin: ' 40px auto', backgroundColor: '#f6f6f6' }}>
                    <Card.Body>
                        <Card.Title>Today's Classes</Card.Title>
                        <Card.Text>
                            {classesMockData.map(c => <ClassItem classId={c.classId} name={c.className} flags={c.flags}
                                startTime={c.startTime} endTime={c.endTime} />)}
                        </Card.Text>
                    </Card.Body>
                </Card>
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
