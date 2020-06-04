import React from "react";
import "react-status-alert/dist/status-alert.css";

// reactstrap components
import {
  Container,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
  Modal,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
} from "reactstrap";

//import StatusAlert, { StatusAlertService } from "react-status-alert";
import StatusAlert, { StatusAlertService } from "react-status-alert";
// core components
import UserHeader from "components/Headers/UserHeader.js";

class Operation extends React.Component {
  state = {
    dropdownOpen: false,
    dropDownValue: "Operation",
    showOp: 0,
    defaultModal: false,
    test: false,
    alertId: "",
    typeOp: "",
    amount: "",
    Operation: {
      numacc: "",
      amount: "",
    },
    deposit: {
      nameTrans: "",
    },
    withdrawl: {
      nameTrans: "",
    },
    transfer: {
      numaccDis: "",
      nameTrans: "",
    },
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };
  toggleModal = (state) => {
    this.setState({
      [state]: !this.state[state],
    });
  };
  NOTorVER = () => {
    if (this.state.test === false) this.toggleModal("defaultModal");
    else this.toggleModal("notificationModal");
  };
  changeDropdownValue = (e) => {
    this.setState({ dropDownValue: e.currentTarget.textContent });
  };

  send = async (e) => {
    e.preventDefault();
    const {
      Operation,
      deposit,
      withdrawl,
      transfer,
      //typeOp,
      showOp,
      //amount,
    } = this.state;

    try {
      if (showOp === 1) {
        const response = await fetch(
          `http://localhost:5000/api/accounts/${Operation.numacc}/deposit`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numacc: Operation.numacc,
              amount: Operation.amount,
              nameTrans: deposit.nameTrans,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        console.log(data);
        this.setState({ amount: data.accounts.overallAmount });
        this.NOTorVER();
      }
      if (showOp === 2) {
        const response = await fetch(
          `http://localhost:5000/api/accounts/${Operation.numacc}/withdrawl`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numacc: Operation.numacc,
              amount: Operation.amount,
              nameTrans: withdrawl.nameTrans,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        console.log(data);
        this.setState({ amount: data.accounts.overallAmount });
        this.NOTorVER();
      }
      if (showOp === 3) {
        const response = await fetch(
          `http://localhost:5000/api/accounts/${Operation.numacc}/transfer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              numacc: Operation.numacc,
              amount: Operation.amount,
              numaccDis: transfer.numaccDis,
              nameTrans: transfer.nameTrans,
            }),
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        console.log(data);
        this.setState({ amount: data.accounts.overallAmount });
        this.NOTorVER();
      }

      const alertId = StatusAlertService.showSuccess(
        "Operation added Succefully!"
      );
      this.setState({ alertId: alertId });
    } catch (error) {
      console.log(error.message);
      const alertId = StatusAlertService.showError(error.message);
      this.setState({ alertId: alertId });
    }
  };

  render() {
    return (
      <>
        <UserHeader />
        <StatusAlert />
        <Container className="mt--6" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Operation</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.send}>
                    <Row>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin"
                          >
                            N°Account
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin"
                            placeholder="N°Account"
                            type="text"
                            value={this.state.Operation.numacc}
                            onChange={(e) => {
                              const { Operation } = this.state;
                              Operation.numacc = e.target.value;
                              this.setState({ Operation });
                            }}
                          />
                          <FormFeedback>
                            Please input a correct CIN.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-cin"
                          >
                            CIN Number
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-cin"
                            placeholder="CIN Number"
                            type="text"
                          />
                          <FormFeedback>
                            Please input a correct CIN.
                          </FormFeedback>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6" className="mb-5">
                        <label
                          className="form-control-label mx-3"
                          htmlFor="opt"
                        >
                          Choose operation :
                        </label>
                        <ButtonDropdown
                          id="opt"
                          direction="right"
                          isOpen={this.state.dropdownOpen}
                          toggle={this.toggle}
                        >
                          <DropdownToggle caret color="primary">
                            {this.state.dropDownValue}
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 1 });
                                this.setState({ TypeOp: "deposit" });
                                this.changeDropdownValue(e);
                              }}
                            >
                              <h5>Deposit</h5>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 2 });
                                this.setState({ TypeOp: "withdrawl" });
                                this.changeDropdownValue(e);
                              }}
                            >
                              <h5>Withdrawal</h5>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 3 });
                                this.setState({ TypeOp: "transfer" });
                                this.changeDropdownValue(e);
                              }}
                            >
                              <h5>Transfer</h5>
                            </DropdownItem>
                          </DropdownMenu>
                        </ButtonDropdown>
                      </Col>
                    </Row>
                    {this.state.showOp === 1 && (
                      <Row>
                        <Col lg="6">
                          <FormGroup className="mb-4">
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Amount"
                              type="number"
                              value={this.state.Operation.amount}
                              onChange={(e) => {
                                const { Operation } = this.state;
                                Operation.amount = e.target.value;
                                this.setState({ Operation });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Amount.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="mb-4">
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Name Transaction
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Name Transaction"
                              value={this.state.deposit.nameTrans}
                              onChange={(e) => {
                                const { deposit } = this.state;
                                deposit.nameTrans = e.target.value;
                                this.setState({ deposit });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Name.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6"></Col>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                          <Button
                            block
                            size="md"
                            className="btn btn-info outline "
                            type="submit"
                          >
                            Deposit
                          </Button>
                        </Col>

                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.defaultModal}
                          toggle={() => this.toggleModal("defaultModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-default"
                            >
                              Information
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-cin"
                                >
                                  Account balance
                                </label>
                                <Input
                                  disabled
                                  placeholder="Name"
                                  type="text"
                                  value={this.state.amount}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="modal-footer">
                            <Button color="primary" type="button">
                              GOT it
                            </Button>
                            <Button
                              className="ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>

                        <Modal
                          className="modal-dialog-centered modal-danger"
                          contentClassName="bg-gradient-danger"
                          isOpen={this.state.notificationModal}
                          toggle={() => this.toggleModal("notificationModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-notification"
                            >
                              Your attention is required
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="py-3 text-center">
                              <i className="ni ni-bell-55 ni-3x" />
                              <h4 className="heading mt-4">
                                You should read this!
                              </h4>
                              <p>
                                you should verify your account status before you
                                can pass this transaction
                              </p>
                            </div>
                          </div>
                          <div className="modal-footer">
                            <Button
                              className="btn-white"
                              color="default"
                              type="button"
                            >
                              Ok, Got it
                            </Button>
                            <Button
                              className="text-white ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() =>
                                this.toggleModal("notificationModal")
                              }
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                      </Row>
                    )}
                    {this.state.showOp === 2 && (
                      <Row>
                        <Col lg="6">
                          <FormGroup className="mb-4">
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Amount"
                              type="number"
                              value={this.state.Operation.amount}
                              onChange={(e) => {
                                const { Operation } = this.state;
                                Operation.amount = e.target.value;
                                this.setState({ Operation });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Amount.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="mb-4">
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Name Transaction
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Name Transaction"
                              value={this.state.withdrawl.nameTrans}
                              onChange={(e) => {
                                const { withdrawl } = this.state;
                                withdrawl.nameTrans = e.target.value;
                                this.setState({ withdrawl });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Name.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6"></Col>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                          <Button
                            block
                            size="md"
                            className="btn btn-info outline "
                            type="submit"
                          >
                            Withdrawal
                          </Button>
                        </Col>
                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.defaultModal}
                          toggle={() => this.toggleModal("defaultModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-default"
                            >
                              Information
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-cin"
                                >
                                  Account balance
                                </label>
                                <Input
                                  disabled
                                  placeholder="Name"
                                  type="text"
                                  value={this.state.amount}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="modal-footer">
                            <Button color="primary" type="button">
                              GOT it
                            </Button>
                            <Button
                              className="ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                      </Row>
                    )}
                    {this.state.showOp === 3 && (
                      <Row>
                        <Col lg="6" className="mb-4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-account-dest"
                            >
                              Destination's Account Number
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-account-dest"
                              placeholder="Destination's Account Number"
                              type="text"
                              value={this.state.transfer.numaccDis}
                              onChange={(e) => {
                                const { transfer } = this.state;
                                transfer.numaccDis = e.target.value;
                                this.setState({ transfer });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Account Number.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Transfer Amount
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Amount"
                              type="number"
                              value={this.state.Operation.amount}
                              onChange={(e) => {
                                const { Operation } = this.state;
                                Operation.amount = e.target.value;
                                this.setState({ Operation });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Amount.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup className="mb-4">
                            <label
                              className="form-control-label"
                              htmlFor="input-amount"
                            >
                              Name Transaction
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-amount"
                              placeholder="Name Transaction"
                              value={this.state.transfer.nameTrans}
                              onChange={(e) => {
                                const { transfer } = this.state;
                                transfer.nameTrans = e.target.value;
                                this.setState({ transfer });
                              }}
                            />
                            <FormFeedback>
                              Please input a valid Name.
                            </FormFeedback>
                          </FormGroup>
                        </Col>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                          <Button
                            block
                            size="md"
                            className="btn btn-info outline "
                            type="submit"
                          >
                            Transfer
                          </Button>
                        </Col>
                        <Modal
                          className="modal-dialog-centered"
                          isOpen={this.state.defaultModal}
                          toggle={() => this.toggleModal("defaultModal")}
                        >
                          <div className="modal-header">
                            <h6
                              className="modal-title"
                              id="modal-title-default"
                            >
                              Information
                            </h6>
                            <button
                              aria-label="Close"
                              className="close"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              <span aria-hidden={true}>×</span>
                            </button>
                          </div>
                          <div className="modal-body">
                            <Row>
                              <Col>
                                <label
                                  className="form-control-label"
                                  htmlFor="input-cin"
                                >
                                  Account balance
                                </label>
                                <Input
                                  disabled
                                  placeholder="Name"
                                  type="text"
                                  value={this.state.amount}
                                />
                              </Col>
                            </Row>
                          </div>
                          <div className="modal-footer">
                            <Button color="primary" type="button">
                              GOT it
                            </Button>
                            <Button
                              className="ml-auto"
                              color="link"
                              data-dismiss="modal"
                              type="button"
                              onClick={() => this.toggleModal("defaultModal")}
                            >
                              Close
                            </Button>
                          </div>
                        </Modal>
                      </Row>
                    )}
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default Operation;
