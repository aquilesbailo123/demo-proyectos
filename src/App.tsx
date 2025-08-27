import { Routes, Route } from "react-router-dom"
import { Toaster, ToastBar, toast } from "react-hot-toast"
import ScrollToTop from "./components/ScrollToTop/ScrollToTop"

import routes from "./routes/routes"
import Main from "./pages/Main/Main"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail"
import NotFound from "./pages/NotFound/NotFound"
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail"
import Donations from "./pages/Donations/Donations"
import Projects from "./pages/Projects/Projects"
import CreateProject from "./pages/CreateProject/CreateProject"
import Profile from "./pages/Profile/Profile"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import ChangePassword from "./pages/ChangePassword/ChangePassword"

import './App.css'

function App() {
    // The new AuthStore no longer needs initialization as it
    // checks token validity on creation
    return (
        <div className="App">
            <ScrollToTop />
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                    success: { className: "toast-success" },
                    error: { className: "toast-error" },
                    style: {
                        zIndex: 20
                    }
                }}
                children={(toasts) => (
                    <ToastBar toast={toasts}>
                        {({ icon, message }) => (
                            <div
                              onClick={() => toast.dismiss()}
                              style={{ cursor: "pointer", display: "flex"}}
                            >
                                {icon}
                                {message}
                            </div>
                        )}
                    </ToastBar>
                )}
            />
            <Routes>
                <Route path={routes.login} element={<Login />} />
                <Route path={routes.register} element={<Register />} />
                <Route path={routes.forgotPassword} element={<ForgotPassword />} />
                <Route path={routes.verifyEmail} element={<VerifyEmail />} />
                <Route path={routes.changePassword} element={<ChangePassword />} />

                <Route path={routes.main} element={<Main />}>
                    <Route path={routes.home} element={<Home />} />
                    <Route path={routes.projects} element={<Projects />} />
                    <Route path={routes.projectDetail} element={<ProjectDetail />} />
                    <Route path={routes.donations} element={<Donations />} />
                    <Route path={routes.createProject} element={<CreateProject />} />
                    <Route path={routes.profile} element={<Profile />} />
                </Route>

                <Route path={routes.notFound} element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
