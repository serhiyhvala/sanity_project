import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { v4 as uuidv4 } from 'uuid'

import { client, urlFor } from '../../client'
import AppWrap from '../../wrapper/AppWrap'
import MotionWrapper from '../../wrapper/MotionWrapper'

import './Testimonial.scss'

const Testimonial = () => {
	const [brands, setBrands] = useState([])
	const [testimonials, setTestimonials] = useState([])
	const [currentIndex, setCurrentIndex] = useState(0)
	useEffect(() => {
		const testimonialsQuery = '*[_type=="testimonials"]'
		const brandsQuery = '*[_type=="brands"]'
		const fetchData = async arg => {
			try {
				return await client.fetch(arg)
			} catch (e) {
				console.error(e)
			}
		}
		fetchData(testimonialsQuery).then(data => setTestimonials(data))
		fetchData(brandsQuery).then(data => setBrands(data))
	}, [])
	const handleClick = index => {
		setCurrentIndex(index)
	}
	const testimonial = testimonials[currentIndex]
	return (
		<>
			{testimonials.length > 0 && (
				<>
					<div className='app__testimonial-item app__flex'>
						<img src={urlFor(testimonial.imgurl)} alt='testimonial' />
						<div className='app__testimonial-content'>
							<p className='p-text'>{testimonial.feedback}</p>
							<div>
								<h4 className='bold-text'>{testimonial.name}</h4>
								<h5 className='p-text'>{testimonial.company}</h5>
							</div>
						</div>
					</div>
					<div className='app__testimonial-btns app__flex'>
						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === 0
										? testimonials.length - 1
										: currentIndex - 1
								)
							}
						>
							<HiChevronLeft />
						</div>
						<div
							className='app__flex'
							onClick={() =>
								handleClick(
									currentIndex === testimonials.length - 1
										? 0
										: currentIndex + 1
								)
							}
						>
							<HiChevronRight />
						</div>
					</div>
				</>
			)}
			<div className='app__testimonial-brands app__flex'>
				{brands.map(item => (
					<motion.div
						whileInView={{ opacity: [0, 1] }}
						transition={{ duration: 0.5, type: 'tween' }}
						key={uuidv4()}
					>
						<img src={urlFor(item.imgUrl)} alt={item.name} />
					</motion.div>
				))}
			</div>
		</>
	)
}

export default AppWrap(
	MotionWrapper(Testimonial, 'app__testimonial'),
	'testimonials',
	'app__primarybg'
)
