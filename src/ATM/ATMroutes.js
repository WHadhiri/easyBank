import ATM from "./Components/ATM";

var ATMroutes = [
  {
    path: "/ATM",
    name: "ATM",
    component: ATM,
    layout: "/atm",
    exact: true,
  },
];

export default ATMroutes;
