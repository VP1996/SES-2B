import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import './styles.css';
import Card from "react-bootstrap/Card";
import CameraIcon from '../../images/cameraIcon.png'
import RoundArrowsIcon from '../../images/roundArrowsIcon.png'
import PinCodeIcon from '../../images/pinCodeIcon.png'
import GreenTickIcon from '../../images/greenTickIcon.png'
import { toast } from 'react-toastify';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'


class ClassItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            pin: '**********',
            pinEntered: ''
        };
    }

    handleChange = e => {
        e.preventDefault();
        this.setState({
            pinEntered: e.target.value
        })
    }

    render() {
        return (
            <Card style={{ margin: '10px'}}>
                <Card.Body>
                    <Card.Text>
                        <div className="class-name">{this.props.name}</div>
                        <div className="class-time">{this.props.startTime} - {this.props.endTime}</div>
                        <div className="class-button-group">
                            {!this.props.flags.facial && <img src={CameraIcon} onClick={()=>toast.success('You have successfully passed the facial check.')}/>}
                            {this.props.flags.facial && <img src={GreenTickIcon} />}
                            {!this.props.flags.captcha && <img src={RoundArrowsIcon}  onClick={()=>toast.error('Captcha check failed.')}/>}
                            {this.props.flags.captcha && <img src={GreenTickIcon} />}
                            {!this.props.flags.pin && <img src={PinCodeIcon} onClick={() => this.setState({ show: true })} />}
                            <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
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

                                    <Button variant="primary" onClick={() => this.setState({ show: false, pinEntered: '' })}>
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
