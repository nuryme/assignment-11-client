import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home"
import MainLayout from "../layouts/Mainlayout"
import Register from "../pages/Register"
import Login from "../pages/Login"
import ErrorPage from "../pages/ErrorPage"
import PrivateRouter from "../private/PrivateRouter"
import AddItem from "../pages/AddItem"
import PostDetails from "../pages/PostDetails"
import AllItems from "../pages/AllItems"
import MyItems from "../pages/MyItems"
import UpdateItem from "../pages/UpdateItem"
import AllRecovery from "../pages/AllRecovery"

const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage></ErrorPage>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/addItems',
                element: <PrivateRouter><AddItem></AddItem></PrivateRouter>
            },
            {
                path: '/items/:id',
                element: <PrivateRouter><PostDetails></PostDetails></PrivateRouter>
            },
            {
                path: '/allItems',
                element: <AllItems></AllItems>
            },
            {
                path: 'myItems',
                element: <PrivateRouter><MyItems></MyItems></PrivateRouter>
            },
            {
                path: '/updateItems/:id',
                element: <PrivateRouter><UpdateItem></UpdateItem></PrivateRouter>
            },
            {
                path: '/allRecovered',
                element: <PrivateRouter><AllRecovery></AllRecovery></PrivateRouter>
            }
        ]
    }
])

export default routes