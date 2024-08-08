import React from 'react'
import PropTypes from 'prop-types'

const Hero = ({ heroImg, name }) => {
    return (
        <>
            <div className={`${name === "login" ? 'h-[430px]' : 'h-[560px]'} bg-slate-400 hidden lg:block w-full md:w-[50%] tab:w-[70%] xl:w-[73%] `}
                style={{
                    backgroundImage: `url(${heroImg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </div>
        </>
    )
}

Hero.propTypes = {
    heroImg: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
}

export default Hero