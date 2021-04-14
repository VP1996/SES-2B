import React, {Component} from 'react';
import 'react-big-scheduler/lib/css/style.css';
import './styles.css';
import Card from "react-bootstrap/Card";
import CameraIcon from '../../images/cameraIcon.png'
import RoundArrowsIcon from '../../images/roundArrowsIcon.png'
import PinCodeIcon from '../../images/pinCodeIcon.png'
import GreenTickIcon from '../../images/greenTickIcon.png'
class ClassItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Card style={{ margin: '10px'}}>
                <Card.Body>
                    <Card.Text>
                        <div className="class-name">{this.props.name}</div>
                        <div className="class-time">{this.props.startTime} - {this.props.endTime}</div>
                        <div className="class-button-group">
                            {!this.props.flags.facial && <img src={CameraIcon} onClick={()=>alert('Go to facial check page')}/>}
                            {this.props.flags.facial && <img src={GreenTickIcon} />}
                            {!this.props.flags.captcha && <img src={RoundArrowsIcon}  onClick={()=>alert('Go captcha page')}/>}
                            {this.props.flags.captcha && <img src={GreenTickIcon} />}
                            {!this.props.flags.pin &&  <img src={PinCodeIcon} onClick={()=>alert('Go pin page')}/>}
                            {this.props.flags.pin && <img src={GreenTickIcon} />}
                        </div>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

export default ClassItem;
