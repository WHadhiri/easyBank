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
  InputGroupAddon,
  InputGroupText,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem,
  FormFeedback,
} from "reactstrap";

//import StatusAlert, { StatusAlertService } from "react-status-alert";

// core components

import AccountHeader from "components/Headers/AccountHeader.js";
import UserHeader from "components/Headers/UserHeader.js";
class Operation extends React.Component {
  state={
    dropdownOpen : false,

  }
  toggle = () => this.setState({dropdownOpen:!this.state.dropdownOpen});

  render() {
    return (
      <>
        <UserHeader/>
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
                      </Row>
                      <Row>
                        <Col lg="6">
                        <label
                              className="form-control-label"
                              htmlFor="input-cin"
                            >
                              Choose operation
                            </label>
                      <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                      <DropdownToggle caret color="primary">
                        Text
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem disabled>Action</DropdownItem>
                        <DropdownItem>Another Action</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>Another Action</DropdownItem>
                      </DropdownMenu>
                    </ButtonDropdown>
                    </Col>
                    </Row>
                  <Row>
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
