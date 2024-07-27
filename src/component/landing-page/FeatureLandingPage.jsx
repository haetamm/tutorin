function FeatureLandingPage () {

    return (
        <>
            <section id="ourfeatures" className="text-center text-2xl text-purple-500">
            <div>
            <h1>Our Features</h1>
            <div className="flex mt-20 text-black">
                <div className="flex-1">
                <h1 >Art</h1>
                <ul className="font-extralight mt-3 text-sm">
                    <li className="mt-2 hover:text-purple-300">Culture</li>
                    <li className="mt-2 hover:text-purple-300">Literature</li>
                    <li className="mt-2 hover:text-purple-300">Music</li>
                    </ul>
                </div>
                <div className="flex-1">
                <h1 >Computer Languange</h1>
                <ul className="font-extralight mt-3 text-sm">
                    <li className="mt-2 hover:text-purple-300">Javascript</li>
                    <li className="mt-2 hover:text-purple-300">Java</li>
                    <li className="mt-2 hover:text-purple-300">Golang</li>
                    </ul>
                </div>
                <div className="flex-1">
                <h1 >Languange</h1>
                <ul className="font-extralight mt-3 text-sm">
                    <li className="mt-2 hover:text-purple-300">English</li>
                    <li className="mt-2 hover:text-purple-300">Spanish</li>
                    <li className="mt-2 hover:text-purple-300">Mandarin</li>
                    <li></li>
                </ul>
                </div>
            </div>
                <h1 className="mt-40 mb-40">Coming Soon</h1>

            </div>
            </section>
        </>
    )
}

export default FeatureLandingPage