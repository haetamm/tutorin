function Logo() {
    return (
        <>
        <div className="container flex items-center justify-center h-full max-w-6xl px-8 mx-auto sm:justify-between xl:px-0">
                
                {/* Logo and Site Name */}
                <a href="/" className="relative flex items-center inline-block h-5 h-full font-black leading-none">
                    <span className="-ml-10 mt-6 text-2xl flex flex-row text-purple-700"><h1 className='text-purple-700'>T</h1>utorin<span className="text-pink-500">.</span></span>
                </a>
        </div>
        </>
    )
}

export default Logo;