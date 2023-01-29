import { motion } from 'framer-motion'
import { useState } from 'react'

import { client } from '../../client'
import images from '../../constants/images'
import AppWrap from '../../wrapper/AppWrap'
import MotionWrapper from '../../wrapper/MotionWrapper'

import './Footer.scss'

const Footer = () => {
	const [input, setInput] = useState({
		name: '',
		email: '',
		message: ''
	})
	const [loading, setLoading] = useState(false)
	const [isFormSubmited, setIsFormSubmited] = useState(false)
	const { name, email, message } = input
	const handelChangeInput = e => {
		setInput({ ...input, [e.target.name]: e.target.value })
	}
	const handleSubmit = () => {
		setLoading(true)
		const contact = {
			_type: 'contact',
			name: name,
			email: email,
			message: message
		}
		client.create(contact).then(() => {
			setIsFormSubmited(true)
			setLoading(false)
		})
	}
	return (
		<>
			<h2 className='head-text'>Take a Coffee & chat with me</h2>
			<div className='app__footer-cards'>
				<div className='app__footer-card'>
					<img src={images.email} alt='email' />
					<a href='mailto:hello@micael.com' className='p-text'>
						hello@micael.com
					</a>
				</div>
				<div className='app__footer-card'>
					<img src={images.mobile} alt='mobile' />
					<a href='tel:+380961612571' className='p-text'>
						+380961612571
					</a>
				</div>
			</div>
			{!isFormSubmited ? (
				<div className='app__footer-form app__flex'>
					<div className='app__flex'>
						<input
							type='text'
							className='p-text'
							placeholder='Your Name'
							value={name}
							onChange={handelChangeInput}
							name='name'
						/>
					</div>
					<div className='app__flex'>
						<input
							type='text'
							className='p-text'
							placeholder='Your Email'
							value={email}
							onChange={handelChangeInput}
							name='email'
						/>
					</div>
					<div>
						<textarea
							className='p-text'
							placeholder='Your Message'
							value={message}
							name='message'
							onChange={handelChangeInput}
						/>
					</div>
					<button type='button' onClick={handleSubmit}>
						{loading ? 'Sending' : 'Send Message'}
					</button>
				</div>
			) : (
				<div>
					<h3 className='head-text'>Thank You for getting in touch</h3>
				</div>
			)}
		</>
	)
}

export default AppWrap(
	MotionWrapper(Footer, 'app__footer'),
	'contact',
	'app__whitebg'
)
