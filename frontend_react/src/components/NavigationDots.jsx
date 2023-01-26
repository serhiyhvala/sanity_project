import { v4 as uuidv4 } from 'uuid'

const NavigationDots = ({ active }) => {
	const navMenu = ['home', 'about', 'work', 'skills', 'testimonials', 'contact']
	return (
		<div className='app__navigation'>
			{navMenu.map(item => (
				<a
					key={uuidv4()}
					className='app__navigation-dot'
					href={`#${item}`}
					style={active === item ? { backgroundColor: '#313BAC' } : null}
				/>
			))}
		</div>
	)
}

export default NavigationDots
