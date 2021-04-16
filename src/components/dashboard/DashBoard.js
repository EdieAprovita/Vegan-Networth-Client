import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import DashboardActions from './DashboardActions'
import Experience from './Experience'
import Education from './Education'
import { getCurrentProfile, deleteAccount } from '../../redux/profileDucks'

const DashBoard = ({ auth: { user } }) => {
	const dispatch = useDispatch()

	const userProfile = useSelector(state => state.userProfile)
	const { profile } = userProfile

	useEffect(() => {
		dispatch(getCurrentProfile())
	}, [dispatch])

	return (
		<Fragment>
			<h1 className='large text-primary'>Dashboard</h1>
			<p className='lead'>
				<i className='fas fa-user' /> Welcome {user && user.name}
			</p>
			{profile !== null ? (
				<Fragment>
					<DashboardActions />
					<Experience experience={profile.experience} />
					<Education education={profile.education} />

					<div className='my-2'>
						<button
							className='btn btn-danger'
							onClick={() => dispatch(deleteAccount())}>
							<i className='fas fa-user-minus' /> Delete My Account
						</button>
					</div>
				</Fragment>
			) : (
				<Fragment>
					<p>You have not yet setup a profile, please add some info</p>
					<Link to='/create-profile' className='btn btn-primary my-1'>
						Create Profile
					</Link>
				</Fragment>
			)}
		</Fragment>
	)
}

DashBoard.propTypes = {
	getCurrentProfile: PropTypes.func.isRequired,
	deleteAccount: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
}

export default DashBoard