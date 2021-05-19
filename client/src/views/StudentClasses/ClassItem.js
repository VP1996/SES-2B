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
import axios from 'axios';
import WebcamCapture from '../../components/WebcamCapture'
import { ContextBuilder } from 'express-validator/src/context-builder';

class ClassItem extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handlePicture = this.handlePicture.bind(this);
        this.handlePin = this.handlePin.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.showInteractiveModal = this.showInteractiveModal.bind(this);
        this.hideInteractiveModal = this.hideInteractiveModal.bind(this);
        this.handleVerifyImage = this.handleVerifyImage.bind(this);

        this.state = {
            show: false,
            showModal: null,
            pin: '**********',
            pinEntered: '',
            checkBoxChecked: false,
            studentAuthObj: {}
        };
    }

    async componentDidMount() {
        let response = await axios.post("http://localhost:5000/api/class/getStudentAuth", { studentID: JSON.parse(localStorage.getItem("studentData")).userid, classID: this.props.classId });
        this.setState({ studentAuthObj: response.data.studentAuth[0].students[0] })
        // console.log(this.state.studentAuthObj);
        console.log(response.data.message);
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
        this.setState({ showModal: null, pinEntered: '', checkBoxChecked: false });
    }
    async handlePicture() {
        //take picture using user webcam - use a package?
        this.setState(prevState => ({
            studentAuthObj: {
                ...prevState.studentAuthObj,
                facialFlag: true
            }
        }))

        // set facialFlag in database to true
        let response = await axios.post("http://localhost:5000/api/class/updateFacialFlag", { studentID: JSON.parse(localStorage.getItem("studentData")).userid, classID: this.props.classId })
        console.log(response.data.message)

        //if third auth completed- then display snackbar


        // close modal
        this.handleClose()
    }

    b64toBlob(b64Data, contentType='', sliceSize=512) {
        const byteCharacters = atob(b64Data);
        const byteArrays = [];
     
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
     
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
     
            const byteArray = new Uint8Array(byteNumbers);
     
            byteArrays.push(byteArray);
        }
     
        const blob = new Blob(byteArrays, {type: contentType});
        return blob;
    }

    async handleVerifyImage(src) {
        console.log(src)
        console.log('authenticate photo')

        var block = src.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = this.b64toBlob(realData, contentType);
        
        const userid = JSON.parse(localStorage.getItem("studentData")).userid
        const formData = new FormData();
        formData.append('profile', blob, "userFace.jpeg")
        formData.append('username', userid)
        //console.log(formData)
        let response = await axios.post("http://localhost:5000/api/auth/verifyFace", formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        
        //console.log(response.data)
    }

    async handlePin() {
        // check pin with pin stored

        // update flag in state
        this.setState(prevState => ({
            studentAuthObj: {
                ...prevState.studentAuthObj,
                emailPinFlag: true
            }
        }))

        //update flag in database
        let response = await axios.post("http://localhost:5000/api/class/updatePinFlag", { studentID: JSON.parse(localStorage.getItem("studentData")).userid, classID: this.props.classId })
        console.log(response.data.message)

        //if third auth completed- then display snackbar


        //close modal
        this.handleClose()
    }

    async handleCaptcha() {
        //update flag in database
        let response = await axios.post("http://localhost:5000/api/class/updateCaptchaFlag", { studentID: JSON.parse(localStorage.getItem("studentData")).userid, classID: this.props.classId })
        console.log(response.data.message)

        //if third auth completed- then display snackbar


        //close modal
        this.hideInteractiveModal()
    }

    render() {
        return (
            <Card style={{ margin: '10px' }}>
                <Card.Body>
                    <Card.Text>
                        <div className="class-name">{this.props.name}</div>
                        <div className="class-time">{this.props.startTime} - {this.props.endTime}</div>
                        <div className="class-button-group">

                            {/* if flag is false then show img which has an onClick event */}
                            {!this.state.studentAuthObj.facialFlag && <img src={CameraIcon} onClick={() => this.handleShow('facial-recog')} />}

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
                                    <WebcamCapture handleVerifyImage={this.handleVerifyImage} />
                                    {this.state.checkBoxChecked === true ?
                                        (<Button variant="primary" onClick={this.handlePicture}>
                                            Take a Picture!
                                        </Button>) : (<Button variant="primary" disabled>
                                            Take a Picture!
                                        </Button>)}

                                </Modal.Footer>
                                {/* onClick={() => toast.success('You have successfully passed the facial check.')} - throw toast when facial recog is done correct and only throw once all three are done */}
                            </Modal>
                            {this.state.studentAuthObj.facialFlag && <img src={GreenTickIcon} />}
                            {/* if flag is true then show green tick*/}

                            {/* if flag is false then show img which has an onClick event */}
                            {!this.state.studentAuthObj.recaptchaFlag && <img src={RoundArrowsIcon} onClick={() => this.showInteractiveModal()} />}
                            <InteractiveModal show={this.state.show} handleClose={this.hideInteractiveModal} handleCaptcha={this.handleCaptcha}>
                                <p>Modal</p>
                            </InteractiveModal>
                            {this.state.studentAuthObj.recaptchaFlag && <img src={GreenTickIcon} />}
                            {/* if flag is true then show green tick*/}

                            {/* if flag is false then show img which has an onClick event */}
                            {!this.state.studentAuthObj.emailPinFlag && <img src={PinCodeIcon} onClick={() => this.handleShow('email-pin')} />}
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

                                    <Button variant="primary" onClick={this.handlePin}>
                                        ok
          </Button>
                                </Modal.Footer>
                            </Modal>
                            {this.state.studentAuthObj.emailPinFlag && <img src={GreenTickIcon} />}
                            {/* if flag is true then show green tick*/}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ClassItem;
