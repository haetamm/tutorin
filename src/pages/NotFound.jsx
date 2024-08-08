import React from 'react'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 Not Found . Tutorin</title>
        <meta name="description" content="404 | Notfound page" />
      </Helmet>
      <div className="text-center text-gray-500 flex items-center justify-center h-screen text-3xl font-bold p-4">
        <p>404 | Not Found</p>
      </div>
    </>
  )
}

export default NotFound