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
import Profile from "./pages/Profile"
import Message from "./pages/Message"
import MessageDetail from "./pages/MessageDetail"
import StudentMessageDetailMobile from "./pages/StudentMessageDetailMobile"
import Tutor from "./pages/Tutor"
import CreateJob from "./pages/CreateJob"
import Application from "./pages/Application"
import TutorMessageDetailMobile from "./pages/TutorMessageDetailMobile"

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
                path: 'tutor',
                element: <Tutor />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'applications',
                        element: <Application />
                    },
                    {
                        path: 'notifications',
                        element: <Message />,
                        children: [
                            {
                                path: '', 
                                element: <Navigate to='1' replace />, 
                            },
                            {
                                path: ':id', 
                                element: <MessageDetail />,
                            },
                        ]
                    }
                ]
            },
            {
                path: 'student',
                element: <Student />,
                children: [
                    {
                        path: 'profile',
                        element: <Profile />
                    },
                    {
                        path: 'notifications',
                        element: <Message />,
                        children: [
                            {
                                path: '', 
                                element: <Navigate to='1' replace />, 
                            },
                            {
                                path: ':id', 
                                element: <MessageDetail />,
                            },
                        ]
                    },
                    {
                        path: 'create/job',
                        element: <CreateJob />
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
        path: '/m/student/notifications/:id',
        element: <StudentMessageDetailMobile />
    },
    {
        path: '/m/tutor/notifications/:id',
        element: <TutorMessageDetailMobile />
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