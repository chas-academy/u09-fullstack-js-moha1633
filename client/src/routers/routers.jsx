import {createBrowserRouter, useParams} from "react-router-dom";
import Home from "../home/Home";
import App from "../App";
import Shop from "../shop/Shop";
import { About } from "../components/About";
import { Blog } from "../components/Blog";
import { SingleBook } from "../components/SingleBook";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import Dashboard from "../dashboard/Dashboard";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        { path: "/",
            element: <Home/>,

        },
        {
            path: "/shop",
            element: <Shop/>,
        },
        {
          path: "/about",
          element: <About/>,

        },
        {
          path: "/blog",
          element: <Blog/>,

        },
        {
          path: "/book/:id",
          element: <SingleBook/>,
          loader: ({ params }) => fetch(`http://localhost:4000/book/${params.id}`),
        }
        
      
        
        
      ]
   },
  {
    path: "/admin/dashboard",
    element: <DashboardLayout/>,
    children:[
      {
        path: "/admin/dashboard",
        element: <Dashboard/>
      },
      {
        path: "/admin/dashboard/upload",
        element: <UploadBook/>
      },
      {
        path: "/admin/dashboard/manage",
        element: <ManageBooks/>

      },
      {
        path: "/admin/dashboard/edit-books/:id",
        element: <EditBooks/>,
        loader:({params}) => fetch(`http://localhost:4000/book/${params.id}`),
      }

    ]
  } 
  ]);

  export default router