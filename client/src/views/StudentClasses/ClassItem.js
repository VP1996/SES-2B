import React, { Component } from 'react';
import 'react-big-scheduler/lib/css/style.css';
import './styles.css';
import Card from 'react-bootstrap/Card';
import CameraIcon from '../../images/cameraIcon.png';
import RoundArrowsIcon from '../../images/roundArrowsIcon.png';
import PinCodeIcon from '../../images/pinCodeIcon.png';
import GreenTickIcon from '../../images/greenTickIcon.png';
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import InteractiveModal from '../../components/Interactiveauth/Interactive.js';

class ClassItem extends Component {
    constructor(props) {
        super(props);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePicture = this.handlePicture.bind(this);
        this.showInteractiveModal = this.showInteractiveModal.bind(this);
		this.hideInteractiveModal = this.hideInteractiveModal.bind(this);

        this.state = {
            show: false,
            showModal: null,
            pin: '**********',
            pinEntered: '',
            checkBoxChecked: false
        };
    }

    showInteractiveModal = () => {
		this.setState({ show: true });
	};

	hideInteractiveModal = () => {
		this.setState({ show: false });
	};

    handleChange = e => {
        e.preventDefault();
        this.setState({
            pinEntered: e.target.value
        })
    }

    handleShow(id) {
        this.setState({ showModal: id });
    }
    handleClose() {
        this.setState({ showModal: null, pinEntered: '' });
    }
    handlePicture() {
        //take picture using user webcam - use a package?
        this.setState({ showModal: null, pinEntered: '', checkBoxChecked: false });// close modal
    }

    render() {
        return (
            <Card style={{ margin: '10px' }}>
                <Card.Body>
                    <Card.Text>
                        <div className="class-name">{this.props.name}</div>
                        <div className="class-time">{this.props.startTime} - {this.props.endTime}</div>
                        <div className="class-button-group">

                            {!this.props.flags.facial && <img src={CameraIcon} onClick={() => this.handleShow('facial-recog')} />}

                            <Modal show={this.state.showModal === 'facial-recog'} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Facial Recognition</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>Take a photo and submit it to authenticate using the facial recognition method.</Modal.Body>
                                <Modal.Footer style={{ justifyContent: 'space-between' }}>
                                    <InputGroup.Prepend>
                                        <InputGroup.Checkbox aria-label="Checkbox for web cam use" onClick={() => this.setState({ checkBoxChecked: true })} />
                                        <InputGroup.Text>Allow webcam use</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    {this.state.checkBoxChecked === true ?
                                        (<Button variant="primary" onClick={this.handlePicture}>
                                            Take a Picture!
                                        </Button>) : (<Button variant="primary" disabled>
                                            Take a Picture!
                                        </Button>)}

                                </Modal.Footer>
                                {/* onClick={() => toast.success('You have successfully passed the facial check.')} - throw toast when facial recog is done correct and only throw once all three are done */}
                            </Modal>
                            {this.props.flags.facial && <img src={GreenTickIcon} />}
    
                            {!this.props.flags.captcha && <img src={RoundArrowsIcon} onClick={() => this.showInteractiveModal()} />}
                            <InteractiveModal show={this.state.show} handleClose={this.hideInteractiveModal}>
								<p>Modal</p>
							</InteractiveModal>
                            {this.props.flags.captcha && <img src={GreenTickIcon} />}

                            {!this.props.flags.pin && <img src={PinCodeIcon} onClick={() => this.handleShow('email-pin')} />}
                            <Modal show={this.state.showModal === 'email-pin'} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Enter a Pin</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>To be authenticated through this email-pin method, you must enter the pin emailed to you by your teacher. This will be your student email address with which your account was created.</Modal.Body>
                                <Modal.Footer>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder={this.state.pin}
                                            aria-label={this.state.pin}
                                            aria-describedby="basic-addon2"
                                            value={this.state.pinEntered}
                                            onChange={this.handleChange}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={this.onEnterPin}>Check pin</Button>
                                        </InputGroup.Append>
                                    </InputGroup>

                                    <Button variant="primary" onClick={this.handleClose}>
                                        ok
          </Button>
                                </Modal.Footer>
                            </Modal>
                            {this.props.flags.pin && <img src={GreenTickIcon} />}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ClassItem;
