import '../../components/Interactiveauth/Interactive.css';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import ScriptTag from 'react-script-tag';
import Button from 'react-bootstrap/Button';

const Modal = ({ handleClose, show }) => {
	<ScriptTag src='https://www.google.com/recaptcha/api.js' />;

	const showHideClassName = show ? 'modal display-block' : 'modal display-none';

	function onChange(value) {
		console.log('Captcha value:', value);
		axios
			.post('http://localhost:5000/recaptcha/', { value })
			.then(function (response) {
				console.log(response);
				if (response.data == 'the user is a HUMAN :)') {
					alert(' u Verified');
				} else {
					alert('Not verified');
				}
			});
	}

	return (
		<div className={showHideClassName}>
			<section className='modal-main' align='center'>
				<h4 class='headingauth'>Please verify your account</h4>
				<ReCAPTCHA
					class='g-recaptcha'
					align='center'
					sitekey='6Lcz5bUaAAAAAF6ew5_om_b4nw1CJB99QOScA9pa'
					onChange={onChange}
				/>
				<Button
					type='button'
					align='center'
					className='buttonauth'
					onClick={handleClose}
				>
					Close
				</Button>
			</section>
		</div>
	);
};

export default Modal;
