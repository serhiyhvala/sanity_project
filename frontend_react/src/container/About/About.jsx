import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import images from '../../constants/images'

import './About.scss'

const About = () => {
	const abouts = [
		{
			title: 'Web Development',
			description: 'I am good a Web Developer',
			imgUrl: images.about01
		},
		{
			title: 'Web Design',
			description: 'I am good a Web Design',
			imgUrl: images.about02
		},
		{
			title: 'Web Animation',
			description: 'I am good a Web Animation',
			imgUrl: images.about03
		}
	]
	return (
		<>
			<h2 className='head-text'>
				I Know That <span>Good Dev</span>
				<br /> means <span>Good Business</span>
			</h2>
			<div className='app__profiles'>
				{abouts.map(item => (
					<motion.div
						key={uuidv4()}
						whileInView={{ opacity: 1 }}
						whileHover={{ scale: 1.1 }}
						transition={{ duration: 0.5, type: 'tween' }}
						className='app__profile-item'
					>
						<img src={item.imgUrl} alt={item.title} />
						<h2 className='bold-text' style={{ marginTop: 20 }}>
							{item.title}
						</h2>
						<p className='p-text' style={{ marginTop: 10 }}>
							{item.description}
						</p>
					</motion.div>
				))}
			</div>
		</>
	)
}

export default About
