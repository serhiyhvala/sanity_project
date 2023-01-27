import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { AiFillEye, AiFillGithub } from 'react-icons/ai'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../../client'
import AppWrap from '../../wrapper/AppWrap'

import './Work.scss'

const Work = () => {
	const [works, setWorks] = useState([])
	const [activeFilter, setActiveFilter] = useState('All')
	const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 })
	const [filterWork, setFilterWork] = useState([])
	useEffect(() => {
		const query = '*[_type=="works"]'
		const fetchData = async () => {
			try {
				return await client.fetch(query)
			} catch (e) {
				console.error(e)
			}
		}
		fetchData().then(data => {
			setWorks(data)
			setFilterWork(data)
		})
	}, [])
	const handleWorkFilter = item => {
		setActiveFilter(item)
		setAnimateCard({ y: 100, opacity: 0 })
		setTimeout(() => {
			setAnimateCard({ y: 0, opacity: 1 })
			if (item === 'All') {
				setFilterWork(works)
			} else {
				setFilterWork(works.filter(works => works.tags.includes(item)))
			}
		}, 500)
	}
	return (
		<>
			<h2 className='head-text'>
				My Creative <span>Portfolio</span>
			</h2>
			<div className='app__work-filter'>
				{['UI/UX', 'Web App', 'Mobile App', 'React JS', 'All'].map(item => (
					<div
						key={uuidv4()}
						onClick={() => handleWorkFilter(item)}
						className={`app__work-filter-item app__flex p-text ${
							activeFilter === item ? 'item-active' : null
						}`}
					>
						{item}
					</div>
				))}
			</div>
			<motion.div
				animate={animateCard}
				transition={{ duration: 0.5, delayChildren: 0.5 }}
				className='app__work-portfolio'
			>
				{filterWork.map(item => (
					<div className='app__work-item app__flex' key={uuidv4()}>
						<div className='app__work-img app__flex'>
							<img src={urlFor(item.imgUrl)} alt={item.title} />
							<motion.div
								whileHover={{ opacity: [0, 1] }}
								transition={{
									duration: 0.25,
									ease: 'easeInOut',
									staggerChildren: 0.5
								}}
								className='app__work-hover app__flex'
							>
								<a href={item.projectLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillEye />
									</motion.div>
								</a>
								<a href={item.codeLink} target='_blank' rel='noreferrer'>
									<motion.div
										whileInView={{ scale: [0, 1] }}
										whileHover={{ scale: [1, 0.9] }}
										transition={{ duration: 0.25 }}
										className='app__flex'
									>
										<AiFillGithub />
									</motion.div>
								</a>
							</motion.div>
						</div>
						<div className='app__work-content app__flex'>
							<h4 className='bold-text'>{item.title}</h4>
							<p className='p-text' style={{ marginTop: 10 }}>
								{item.description}
							</p>
							<div className='app__work-tag app__flex'>
								<p className='p-text'>{item.tags[0]}</p>
							</div>
						</div>
					</div>
				))}
			</motion.div>
		</>
	)
}

export default AppWrap(Work, 'work')
