import GuestLayout from "./layout/GuestLayout"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import { createBrowserRouter, Navigate } from "react-router-dom"
import RegisterTutor from "./pages/RegisterTutor"
import RegisterStudent from "./pages/RegisterStudent"
import AuthLayout from "./layout/AuthLayout"
import Home from "./pages/Home"
import JobDetail from "./pages/JobDetail"
import JobDetailMobile from "./pages/JobDetailMobile"
import Student from "./pages/Student"
import { Profile } from "./pages/Profile"

const routerConfig = [
    {
        path: '/',
        element: <LandingPage />
    },
    {
        path: '/in',
        element: <AuthLayout />,
        children: [
            {
                path: '',
                element: <Navigate to='student' replace />,
            },
            {
                path: 'home',
                element: <Home />,
                children: [
                    {
                        path: '',
                        element: <Navigate to='job/1' replace />,
                    },
                    {
                        path: 'job/:id',
                        element: <JobDetail />,
                    },
                ],
            },
            {
                path: 'student',
                element: <Student />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    }
                ]
            }
        ],
    },
    {
        path: '/m/tutorin/:id',
        element: <JobDetailMobile />
    },
    {
        path: '/auth',
        element: <GuestLayout />,
        children: [
            {
                path: '/auth',
                element: <Navigate to="login" />
            },
            {
                path: "login",
                element: <Login />
            },
            {
                path: "register/tutor",
                element: <RegisterTutor />
            },
            {
                path: "register/student",
                element: <RegisterStudent />
            }
        ]
    },
    {
        path: '*',
        element: <NotFound />
    }
]

const router = createBrowserRouter(routerConfig)

export default router