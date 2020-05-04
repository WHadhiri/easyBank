import React  from "react";
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
  Col
} from "reactstrap";

import Transaction from "components/TransactionList/Transaction.js";


class Operation extends React.Component {


  Transactions = [
    {
      ntransaction: "45751",
      type: "mondat",
      date: "22/12/2015",
      name: "bourse",
      Debit:"1520",
      Credit:"0",
      balance:"1520"
    },
  ];
  render() {
    return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
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
                      <h3 className="mb-0"> Account detail </h3>
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
                <Input disabled placeholder="N° Account" type="text" />
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
                  disabled placeholder="Type of account"
                  type="email"
                />
              </FormGroup>
            </Col>
           
            <Col md="4">
              <FormGroup>
              <label
                 className="form-control-label"
                 htmlFor="input-firstname"
                >
                E-mail
                </label>
                <Input disabled placeholder="E-mail" type="text" />
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
                Name
                </label>
                <Input disabled placeholder="Name" type="text" />
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
              <label
                 className="form-control-label"
                 htmlFor="input-firstname"
                >
                Address
                </label>
                <Input disabled placeholder="Address" type="text" />
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
                <Input disabled placeholder="Status" type="text" />
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
                Date Opned
                </label>
                <Input disabled placeholder="Date Opned" type="text" />
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
                <Input disabled placeholder="Date Funded" type="text" />
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
                <Input disabled placeholder="D-ate Funded" type="text" />
              </FormGroup>
            </Col>
          </Row>
          <Row>
          <Col md="4">
              <FormGroup>
              
              </FormGroup>
            </Col>
            <Col md="4">
              <FormGroup>
              <label
                 className="form-control-label"
                 htmlFor="input-firstname"
                >
                Last Transaction 
                </label>
                <Input disabled placeholder="Last Transaction " type="text" />
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
                <Input disabled placeholder="Overall amount " type="text" />
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
           Transactions={this.Transactions}           
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

export default Operation;