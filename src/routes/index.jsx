import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import NLPComponent from "./NLPComponent";
import Login from './auth/Login';
import Register from './auth/Register';
import Success from './Success';
import NotFound from "./404";

export default function Router() {
  const location = useLocation();
  const currentURL = location.pathname;

  const isCategoryPath = matchPath({ path: "/", exact: true, strict: true }, currentURL);
  const isProductPath = matchPath({ path: "/category/:id", exact: true, strict: false }, currentURL);
  
  return (
    <>
      {
        (isCategoryPath || isProductPath) ? (
          <NLPComponent />
        ) : (
          <Routes>
            <Route exact path={'/auth/login'} element={<Login />} />
            <Route exact path={'/auth/register'} element={<Register />} />
            <Route exact path={'/success'} element={<Success />} />
            <Route exact path={'*'} element={<NotFound />} />
          </Routes>
        )
      }
    </>
  )
}