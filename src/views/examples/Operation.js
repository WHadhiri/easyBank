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
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  FormFeedback,
} from "reactstrap";

//import StatusAlert, { StatusAlertService } from "react-status-alert";

// core components
import UserHeader from "components/Headers/UserHeader.js";
class Operation extends React.Component {
  state = {
    dropdownOpen: false,
    showOp: 0,
  };
  toggle = () => {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  };

  render() {
    return (
      <>
        <UserHeader />
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
                  <Form>
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
                            Operation
                          </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 1 });
                              }}
                            >
                              <h5>Deposit</h5>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 2 });
                              }}
                            >
                              <h5>Withdrawal</h5>
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem
                              onClick={(e) => {
                                this.setState({ showOp: 3 });
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
                            />
                            <FormFeedback>
                              Please input a valid Amount.
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
                            />
                            <FormFeedback>
                              Please input a valid Amount.
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
                            />
                            <FormFeedback>
                              Please input a valid Amount.
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
