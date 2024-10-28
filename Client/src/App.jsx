import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApiProvider } from "./api/apiContext";

import Root from "./layouts/Root";
import History from "./layouts/History";
import Inspection from "./layouts/Inspection";
import Result from "./layouts/Result";
import Edit from "./layouts/Edit";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '/', element: <History /> },
      { path: '/inspection', element: <Inspection /> },
      { path: '/result', element: <Result /> },
      { path: '/edit', element: <Edit /> }
    ]
  }
]);

function App() {
  return (
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  );
}

export default App;
