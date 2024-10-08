import {createBrowserRouter, useParams} from "react-router-dom";
import Home from "../home/Home";
import App from "../App";
import { Shop } from "../shop/Shop";
import { About } from "../components/About";
import { Blog } from "../components/Blog";
import { SingleBook } from "../components/SingleBook";

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
          element: <SingleBook />,
          loader: ({ params }) => fetch(`http://localhost:4000/book/${params.id}`)
      }
      
        
        
      ]
    },
  ]);

  export default router