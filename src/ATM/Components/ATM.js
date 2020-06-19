import React, { useContext } from "react";
import { useHistory} from "react-router-dom";
import { Button } from "@material-ui/core/";
import { ATMStyles, BtnStyles } from "./Styles";
import { Withdraw } from "./MoneyTextfield";
import Transfer from "./TransferTextField";
import { AuthContext } from "../../components/Context/auth-context.js";
import clsx from "clsx";

import { CSSTransition } from "react-transition-group";

export default function ATM() {
  const ctx = useContext(AuthContext);
  const history = useHistory();
  //console.log(ctx.atm);
  const styles = ATMStyles();
  const btnstyle = BtnStyles();

  const [value, setValue] = React.useState(0);
  const [show, setShow] = React.useState(false);

  function ShowIntro() {
    return (
      <div>
        <div className={styles.introtxt} id="focus-in-expand-fwd">
          <div id="heartbeat">How may we help you?</div>
        </div>
      </div>
    );
  }

  function ShowWithdraw() {
    return <Withdraw account={ctx.atm.clientAccount} />;
  }

  function ShowTransfer() {
    return <Transfer account={ctx.atm.clientAccount} />;
  }

  function ToggleTextField() {
    if (value === 1) {
      return ShowWithdraw();
    } else if (value === 2) {
      return ShowTransfer();
    } else {
      return ShowIntro();
    }
  }

  React.useEffect(() => {
    setShow(true);
  }, []);

  function showATM() {
    return (
      <div>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img
              id="banklogo"
              src="https://i.imgur.com/I77DF63.png"
              alt="banklogo"
            />
          </div>
          PACIFIC STANDARD PUBLIC BANK
        </div>
        <div className={styles.container}>
          <div id="containerleft" className={styles.contleft}>
            <div className={styles.customercont} id="tracking-in-expand">
              Welcome...
              <div className={styles.customername} id="typewriter">
                {ctx.atm.client.firstname + " " + ctx.atm.client.lastname}
              </div>
              <div className={styles.customerinfo} id="typewriter2">
                <b>Balance:</b> {"$" + ctx.atm.clientAccount.overallAmount}
              </div>
            </div>
            <div className={styles.textfield}>{ToggleTextField()}</div>
          </div>
          <div id="containerright" className={styles.contright}>
            <Button
              variant="contained"
              color="inherit"
              className={clsx(btnstyle.withdraw, value === 1 ? "selected" : "")}
              onClick={() => setValue(1)}
              id="button"
            >
              Withdraw
            </Button>
            <br />
            <Button
              variant="contained"
              color="inherit"
              onClick={() => setValue(2)}
              className={clsx(btnstyle.transfer, value === 2 ? "selected" : "")}
              id="button"
            >
              Transfer
            </Button>
          </div>
        </div>
        <div className={styles.footer}>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => ctx.exitATM()}
            id="button"
          >
            Exit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <CSSTransition
      in={show}
      timeout={10000}
      classNames="atm"
      mountOnEnter
      unmountOnExit
    >
      {showATM()}
    </CSSTransition>
  );
}
