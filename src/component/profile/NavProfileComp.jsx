import React from 'react'
import PropTypes from 'prop-types'
import '../../styles/component/profile/nav-profile-comp.scss'

const NavProfileComp = ({activeTab, setActiveTab}) => {
    return (
        <>
            <div className="note-nav">
                <ul>
                    <li onClick={() => setActiveTab(1)} className={`nav ${activeTab === 1 ? 'active' : ''}`}>Profile</li>
                    <li onClick={() => setActiveTab(2)} className={`nav ${activeTab === 2 ? 'active' : ''}`}>Security</li>
                </ul>
            </div>
        </>
    )
}

NavProfileComp.propTypes = {
    setActiveTab: PropTypes.func.isRequired,
    activeTab: PropTypes.number.isRequired,
}

export default NavProfileComp