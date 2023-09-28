import { FC, lazy } from "react"
import { Paths } from "./pats"

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/Signup"));

const routeObjectGenerator = (element: FC, path: string, name: string, isPrivate: boolean) => {
  return {
    element,
    path,
    name,
    isPrivate,
  }
}

export const routes = [
  routeObjectGenerator(Home, Paths.HOME, "HOME", true),
  routeObjectGenerator(Login, Paths.LOGIN, "LOGIN", false),
  routeObjectGenerator(SignUp, Paths.SIGN_UP, "SIGNUP", false),
  routeObjectGenerator(SignUp, Paths.SHORTS, "SIGNUP", true),
  routeObjectGenerator(SignUp, Paths.SUBSCRIPTION, "SIGNUP", true),
]