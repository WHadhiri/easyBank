import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import AddClient from "views/examples/AddClient.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/addClient",
    name: "Add Client",
    icon: "ni ni-circle-08 text-green",
    component: AddClient,
    layout: "/admin"
  },
  {
    path: "/openAccount",
    name: "Open Account",
    icon: "ni ni-fat-add text-blue",
    component: Register,
    layout: "/admin"
  },
  {
    path: "/closeAccount",
    name: "Close Account",
    icon: "ni ni-fat-delete text-red",
    component: Register,
    layout: "/admin"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth"
  },
];
export default routes;
