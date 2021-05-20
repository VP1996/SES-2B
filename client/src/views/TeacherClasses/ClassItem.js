import React, { Component } from 'react';
import 'react-big-scheduler/lib/css/style.css';
import './styles.css';
import Card from "react-bootstrap/Card";
import CameraIcon from '../../images/cameraIcon.png'
import RoundArrowsIcon from '../../images/roundArrowsIcon.png'
import PinCodeIcon from '../../images/pinCodeIcon.png'
import GreenTickIcon from '../../images/greenTickIcon.png'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Alert from 'react-bootstrap/Alert'
import FormControl from 'react-bootstrap/FormControl'
import cryptoRandomString from 'crypto-random-string';
import InteractiveModal from '../../components/Interactiveauth/Interactive.js';
import WebcamCapture from '../../components/WebcamCapture'
import axios from 'axios';


class ClassItem extends Component {
    constructor(props) {
        super(props);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        // this.handlePicture = this.handlePicture.bind(this);
        // this.handlePin = this.handlePin.bind(this);
        this.handleCaptcha = this.handleCaptcha.bind(this);
        this.showInteractiveModal = this.showInteractiveModal.bind(this);
        this.hideInteractiveModal = this.hideInteractiveModal.bind(this);
        this.handleVerifyImage = this.handleVerifyImage.bind(this);

        this.state = {
            show: false,
            showModal: false,
            pin: '**********',
            pinOutput: '',
            checkBoxChecked: false,
            teacherAuthObj: {},
            isUserMultiAuthenticated: false
        };
    }

    async componentDidMount() {
        let response = await axios.post("http://localhost:5000/api/class/getTeacherAuth", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid, classID: this.props.classId });
        this.setState({ teacherAuthObj: response.data.teacherAuth[0].teachers[0] })
        // console.log(this.state.studentAuthObj);
        console.log(response.data.message);
    }

    showInteractiveModal = () => {
        this.setState({ show: true });
    };

    hideInteractiveModal = () => {
        this.setState({ show: false });
    };

    handleShow(id) {
        this.setState({ showModal: id });
    }
    handleClose() {
        this.setState({ showModal: null, pinEntered: '' });
    }

    handleGeneratePin = e => {
        e.preventDefault();
        let string = cryptoRandomString({ length: 10 });
        this.setState({
            pinOutput: string
        })
    }
    handleEmailClass = async () => {
        //send request to backend to generate and send the email to the class memebers. 
        const body = {
            teacherID: JSON.parse(localStorage.getItem("teacherData")).userid,
            classID: this.props.classId,
            secretPin: this.state.pinOutput
        }

        console.log(body.teacherID);
        console.log(`pin being sent : ${body.secretPin}`);

        //update flag in database
        try {
            let response = await axios.post('http://localhost:5000/api/teacher/sendEmail', body)
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }

        // update flag in state
        this.setState(prevState => ({
            teacherAuthObj: {
                ...prevState.teacherAuthObj,
                emailPinFlag: true
            }
        }))

        this.handleClose();
    }

    //teacher authentication first!!!
    b64toBlob(b64Data, contentType = '', sliceSize = 512) {
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

        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }

    async handleVerifyImage(src) {
        console.log(src)
        console.log('authenticating photo...')

        var block = src.split(";");
        var contentType = block[0].split(":")[1];
        var realData = block[1].split(",")[1];
        var blob = this.b64toBlob(realData, contentType);

        const userid = JSON.parse(localStorage.getItem("teacherData")).userid
        const formData = new FormData();
        formData.append('profile', blob, "userFace.jpeg")
        formData.append('username', userid)
        //console.log(formData)
        let response = await axios.post("http://localhost:5000/api/auth/verifyFace", formData, { headers: { 'Content-Type': 'multipart/form-data' } })

        console.log(response.data)
        if (response.data) {
            this.setState(prevState => ({
                teacherAuthObj: {
                    ...prevState.teacherAuthObj,
                    facialFlag: true
                }
            }))

            // set facialFlag in database to true
            let response = await axios.post("http://localhost:5000/api/class/updateTeacherFacialFlag", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid, classID: this.props.classId })
            console.log(response.data.message)

            //if its the third auth completed- then display snackbar
            if (this.state.teacherAuthObj.facialFlag && this.state.teacherAuthObj.recaptchaFlag) {
                this.setState({ isUserMultiAuthenticated: true });
            }

            // close modal
            this.handleClose()
        }
    }

    async handleCaptcha() {
        //update flag in database
        let response = await axios.post("http://localhost:5000/api/class/updateTeacherCaptchaFlag", { teacherID: JSON.parse(localStorage.getItem("teacherData")).userid, classID: this.props.classId })
        console.log(response.data.message)

        //if third auth completed- then display snackbar
        if (this.state.teacherAuthObj.facialFlag && this.state.teacherAuthObj.recaptchaFlag) {
            this.setState({ isUserMultiAuthenticated: true });
        }

        //close modal
        this.hideInteractiveModal()
    }

    render() {
        return (
            <Card style={{ margin: '10px' }}>
                {this.state.isUserMultiAuthenticated === true &&
                    (<Alert variant="success">
                        <p> You successfully multi-authenticated into this class, and now can access more functions.</p>
                    </Alert>)}
                <Card.Body>
                    <Card.Text>
                        <div className="class-name">{this.props.name}</div>
                        <div className="class-time">{this.props.startTime} - {this.props.endTime}</div>
                        <div className="class-button-group">

                            {/* if flag is false then show img which has an onClick event */}
                            {!this.state.teacherAuthObj.facialFlag && <img src={CameraIcon} onClick={() => this.handleShow('facial-recog')} />}

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
                                        (<WebcamCapture handleVerifyImage={this.handleVerifyImage} />) : ""}

                                </Modal.Footer>
                            </Modal>
                            {this.state.teacherAuthObj.facialFlag && <img src={GreenTickIcon} />}
                            {/* if flag is true then show green tick*/}

                            {/* if flag is false then show img which has an onClick event */}
                            {!this.state.teacherAuthObj.recaptchaFlag && <img src={RoundArrowsIcon} onClick={() => this.showInteractiveModal()} />}
                            <InteractiveModal show={this.state.show} handleClose={this.hideInteractiveModal} handleCaptcha={this.handleCaptcha}>
                                <p>Modal</p>
                            </InteractiveModal>
                            {this.state.teacherAuthObj.recaptchaFlag && <img src={GreenTickIcon} />}
                            {/* if flag is true then show green tick*/}

                            {/* only show the emial pin icon if teacher is multi-authenticated */}
                            {(this.state.teacherAuthObj.facialFlag && this.state.teacherAuthObj.recaptchaFlag && !this.state.teacherAuthObj.emailPinFlag) && <img src={PinCodeIcon} onClick={() => this.handleShow('email-pin')} />}
                            <Modal show={this.state.showModal === 'email-pin'} onHide={this.handleClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Generate a Pin</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>To allow students to authenticate via Email, create a pin and email it to students. Students will then enter the pin, if correct, they will then be authenticated in this one way.</Modal.Body>
                                <Modal.Footer>
                                    <InputGroup className="mb-3">
                                        <FormControl
                                            placeholder={this.state.pin}
                                            aria-label={this.state.pin}
                                            aria-describedby="basic-addon2"
                                            value={this.state.pinOutput}
                                        />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={this.handleGeneratePin}>Generate Pin</Button>
                                        </InputGroup.Append>
                                    </InputGroup>



                                    <Button variant="secondary" onClick={this.handleEmailClass}>
                                        Email Class
          </Button>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Close
          </Button>
                                </Modal.Footer>
                            </Modal>
                            {this.state.teacherAuthObj.emailPinFlag && <img src={GreenTickIcon} />}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ClassItem;
