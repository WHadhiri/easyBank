import React from "react";
import "react-status-alert/dist/status-alert.css";
import { withRouter } from "react-router-dom";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";

//import StatusAlert, { StatusAlertService } from "react-status-alert";

// core components
import AccountHeader from "components/Headers/AccountHeader.js";

class Accounts extends React.Component {
  Clients = [
    {
      fullName: "Test 1",
      cin: "12456789",
      cptEp: false,
      cptCrt: true,
      balance: 1000,
    },
    {
      fullName: "Test 2",
      cin: "05795456",
      cptEp: true,
      cptCrt: false,
      balance: 500,
    },
    {
      fullName: "Test 3",
      cin: "215645",
      cptEp: false,
      cptCrt: false,
      balance: null,
    },
  ];

  getClientBalance = () => {
    const userCin = this.props.match.params.userCin;
    let balance = null;
    this.Clients.forEach((client) => client.cin === userCin ? balance = client.balance : null );
    return balance;
  };

  render() {
    return (
      <>
        <AccountHeader balance={this.getClientBalance()} />
        {/* Page content */}
        {/*<StatusAlert />*/}
        <Container className="mt--5" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="10">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Add Client</h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody></CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(Accounts);
