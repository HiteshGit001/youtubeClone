import { FC, lazy } from "react"
import { Paths } from "./pats"

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/Signup"));
const Search = lazy(() => import("../pages/Search"));
const Watch = lazy(() => import("../pages/Watch"));
const Subscribe = lazy(() => import("../pages/Subscribe"));
const LikedVideos = lazy(() => import("../pages/LikedVideos"));

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
  routeObjectGenerator(Subscribe, Paths.SUBSCRIPTION, "SIGNUP", true),
  routeObjectGenerator(Search, Paths.SEARCH, "SEARCH", true),
  routeObjectGenerator(Watch, Paths.WATCH, "WATCH", true),
  routeObjectGenerator(LikedVideos, Paths.LIKED_VIDEOS, "LIKED", true)
]