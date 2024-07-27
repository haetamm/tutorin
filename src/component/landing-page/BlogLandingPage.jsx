import HeaderLandingPage from "../component/HeaderLandingPage";
import FooterLandingPage from "../component/FooterLandingPage";
import Logo from "../assets/logo-tutorin.png"

function BlogLandingPage() {

    const blog = [
        {
          name: 'Why Choose TutorIn?',
          description: 'TutorIn offers tutoring services across more than 300 subjects. From mathematics and sciences to humanities and languages, there’s an expert tutor available for every area of study.',
          imageSrc: `${Logo}`,
          imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
          href: '#',
        },
    ]

    return <div className="">
    <HeaderLandingPage />
    <section className="flex flex-col justify-center pt-24 p-40 gap-5 bg-purple-500 text-white">
    <h1 className="text-2xl text-center">Blogs</h1>
    
    <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0">
            {blog.map((blog) => (
              <div key={blog.name} className="group relative">
                <div className="relative h-80 w-full overflow-hidden rounded-lg bg-black sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64">
                  <img
                    alt={blog.imageAlt}
                    src={blog.imageSrc}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <h3 className="mt-6 text-sm text-white">
                  <a href={blog.href}>
                    <span className="absolute inset-0" />
                    {blog.name}
                  </a>
                </h3>
                <p className="text-base font-semibold text-gray-900">{blog.description}</p>
              </div>
            ))}
          </div>

    </section>
    <FooterLandingPage />
    </div>
}

export default BlogLandingPage;