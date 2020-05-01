import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import AddClient from "views/examples/AddClient.js";
import Clients from "views/examples/Clients.js";
import Accounts from "views/examples/Accounts.js";

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
    path: "/login",
    name: "Login",
    icon: "ni ni-tv-2 text-primary",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/accounts/:userCin/",
    name: "Accounts",
    component: Accounts,
    layout: "/admin",
    exact: true
  },
];
export default routes;
