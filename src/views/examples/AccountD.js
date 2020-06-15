import React from "react";
import { withRouter } from "react-router-dom";

// reactstrap components
import {
  FormGroup,
  Form,
  Input,
  Container,
  Card,
  CardBody,
  CardHeader,
  Table,
  Row,
  Col,
} from "reactstrap";

import Transaction from "components/TransactionList/Transaction.js";

class AccountD extends React.Component {
  constructor(props) {
    super(props);
    this.clientName = this.props.match.params.clientName;
    this.accountID = this.props.match.params.accID;
    this.state = {
      account: {},
      transactions: [],
      numaccC: "",
    };
  }

  async componentDidMount() {
    await this.fetchAccount();
    await this.fetchTransaction();
  }

  async fetchAccount() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/accounts/${this.accountID}`
      );
      const data = await response.json();
      this.setState({ numaccC: data.account.numacc });
      console.log(data.account.numacc);
      if (!response.ok) throw new Error(data.message);
      this.setState({ account: data.account });
    } catch (error) {
      console.log(error.message);
    }
  }
  async fetchTransaction() {
    try {
      const response = await fetch(
        `http://localhost:5000/api/trans/${this.state.numaccC}`
      );
      const data = await response.json();

      if (!response.ok) throw new Error(data.message);

      this.setState({ transactions: data.trans });
      console.log(this.state.transactions);
    } catch (error) {
      console.log(error.message);
    }
  }

  render() {
    const { account } = this.state;
    return (
      <>
        <div className="header bg-dark pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body"></div>
          </Container>
        </div>
        <Container className="mt--7" fluid>
          <Row className="justify-content-center">
            <Col className="order-xl-1" xl="12">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">
                        {" "}
                        {this.clientName || ""}'s Account detail{" "}
                      </h3>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            N° Account
                          </label>
                          <Input
                            disabled
                            placeholder="N° Account"
                            type="text"
                            value={account.numacc || ""}
                          />
                        </FormGroup>
                      </Col>

                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Type of account
                          </label>
                          <Input
                            id="exampleFormControlInput1"
                            disabled
                            placeholder="Type of account"
                            type="email"
                            value={account.typeofaccount || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Status
                          </label>
                          <Input
                            disabled
                            placeholder="Status"
                            type="text"
                            value={account.status || ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Date Opened
                          </label>
                          <Input
                            disabled
                            placeholder="Date Opned"
                            type="text"
                            value={account.dateop || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Date Funded
                          </label>
                          <Input
                            disabled
                            placeholder="Date Funded"
                            type="text"
                            value={account.datefund || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Date Closed
                          </label>
                          <Input
                            disabled
                            placeholder="Date Closed"
                            type="text"
                            value={account.dateclosed || ""}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Last Transaction
                          </label>
                          <Input
                            disabled
                            placeholder="Last Transaction "
                            type="text"
                            value={account.lasttrans || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col md="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-firstname"
                          >
                            Overall amount
                          </label>
                          <Input
                            disabled
                            placeholder="Overall amount "
                            type="text"
                            value={account.overallAmount || 0}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <div className="col">
              <Table className="align-items-center" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">N°Transaction </th>
                    <th scope="col">Type</th>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Debit</th>
                    <th scope="col">Credit</th>
                    <th scope="col">Balance</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <Transaction
                    Transactions={this.state.transactions}
                  ></Transaction>
                </tbody>
              </Table>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(AccountD);
