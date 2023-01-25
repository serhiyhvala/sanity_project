import { motion } from 'framer-motion'
import { useState } from 'react'
import { HiMenuAlt4, HiX } from 'react-icons/hi'
import { v4 as uuidv4 } from 'uuid'

import images from '../../constants/images'

import './Navbar.scss'

const Navbar = () => {
	const [toggle, setToggle] = useState(false)
	const navMenu = ['home', 'about', 'contact', 'work', 'skills']
	return (
		<nav className='app__navbar'>
			<div className='app__navbar-logo'>
				<img src={images.logo} alt='logo' />
			</div>
			<ul className='app__navbar-links'>
				{navMenu.map(item => (
					<li key={uuidv4()} className='app__flex p-text'>
						<div />
						<a href={`#${item}`}>{item}</a>
					</li>
				))}
			</ul>
			<div className='app__navbar-menu'>
				<HiMenuAlt4 onClick={() => setToggle(true)} />
				{toggle && (
					<motion.div
						whileInView={{ x: [300, 0] }}
						transition={{ duration: 0.85, ease: 'easeOut' }}
					>
						<HiX onClick={() => setToggle(false)} />
						<ul>
							{navMenu.map(item => (
								<li key={uuidv4()}>
									<a onClick={() => setToggle(false)} href={`#${item}`}>
										{item}
									</a>
								</li>
							))}
						</ul>
					</motion.div>
				)}
			</div>
		</nav>
	)
}

export default Navbar
