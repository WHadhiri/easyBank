import Index from "views/Index.js";
import Login from "views/examples/Login.js";
import AddClient from "views/examples/AddClient.js";
import Clients from "views/examples/Clients.js";
import AccountD from "views/examples/AccountD";
import Accounts from "views/examples/Accounts";
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
    path: "/account-detail",
    name: "Account detail",
    icon: "ni ni-credit-card text-red",
    component: AccountD,
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
  {
    path: "/operation",
    name: "Operation",
    icon: "ni ni-money-coins",
    component: Operation,
    layout: "/admin",
    exact: true
  },

];
export default routes;