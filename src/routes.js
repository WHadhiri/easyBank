import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import AddClient from "views/examples/AddClient.js";
import Clients from "views/examples/Clients.js";
import Operation from "views/examples/Operation";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-chart-pie-35 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/clients",
    name: "Clients List",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: Clients,
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
    path: "/closeAccount",
    name: "Account detail",
    icon: "ni ni-fat-delete text-red",
    component: Operation,
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
