import { Routes, Route } from "react-router-dom"
import { Toaster, ToastBar, toast } from "react-hot-toast"

import routes from "@/routes/routes"
import Main from "@/pages/Main/Main"
import Home from "@/pages/Home/Home"
import Login from "@/pages/Login/Login"
import NotFound from "@/pages/NotFound/NotFound"

import './App.css'

function App() {
    return (
        <div className="App">
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

                <Route path={routes.main} element={<Main />}>
                    <Route path={routes.home} element={<Home />} />
                </Route>

                <Route path={routes.notFound} element={<NotFound />} />
            </Routes>
        </div>
    )
}

export default App
