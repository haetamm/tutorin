import React from 'react'
import ProfilePageComp from '../component/ProfilePageComp'
import { Helmet } from "react-helmet-async"
import { useSelector } from "react-redux"

const Profile = () => {
    const {name} = useSelector((state) => state.user)
    return (
        <>
            <Helmet>
                <title>Profile | {name}</title>
                <meta name="description" content="Profile page" />
            </Helmet>
            <div className="h-[50px]"></div>
            <div className="ml-16 lg:ml-[210px]">
                <ProfilePageComp />
            </div>
        </>
  )
}

export default Profile


