import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../../client'

import './About.scss'

const About = () => {
	const [abouts, setAbouts] = useState([])
	useEffect(() => {
		const query = '*[_type=="abouts"]'
		const fetchData = async () => {
			try {
				return await client.fetch(query)
			} catch (e) {
				console.error(e)
			}
		}
		fetchData().then(data => setAbouts(data))
	}, [])
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
						<img src={urlFor(item.imgUrl)} alt={item.title} />
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
