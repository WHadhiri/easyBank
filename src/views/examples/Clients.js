import React from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,
} from "reactstrap";
// core components

import ClientList from "components/ClientList/ClientList.js";
import Modals from "./Modals.js";

class Clients extends React.Component {
  state = {
    visible: false,
    selectedClient: {
      fullName: "",
      cin: "",
      cptEp: false,
      cptCrt: false,
    },
  };

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
      balance: -200,
    },
  ];

  showModal = (client) => {
    const { selectedClient } = this.state;
    selectedClient.fullName = client.fullName;
    selectedClient.cin = client.cin;
    selectedClient.cptEp = client.cptEp;
    selectedClient.cptCrt = client.cptCrt;
    this.setState({ selectedClient });
    this.setState({ visible: true });
  };

  closeModal = () => {
    this.setState({ visible: false });
  };

  render() {
    return (
      <>
        <Modals show={this.state.visible} handleClose={this.closeModal} client={this.state.selectedClient}/>
        <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
          <Container fluid>
            <div className="header-body"></div>
          </Container>
        </div>
        {/* Page content */}
        <Container className="mt--7" fluid>
          {/* Table */}
          <Row>
            <div className="col">
              <Card className="shadow">
                <CardHeader className="border-0">
                  <h3 className="mb-0">Client List</h3>
                </CardHeader>
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Full Name</th>
                      <th scope="col">CIN</th>
                      <th scope="col">Compte Epargne</th>
                      <th scope="col">Compte Courant</th>
                      <th scope="col" />
                    </tr>
                  </thead>
                  <tbody>
                    <ClientList
                      clients={this.Clients}
                      onShowModal={this.showModal}
                    />
                  </tbody>
                </Table>
                <CardFooter className="py-4">
                  <nav aria-label="...">
                    <Pagination
                      className="pagination justify-content-end mb-0"
                      listClassName="justify-content-end mb-0"
                    >
                      <PaginationItem className="disabled">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                          tabIndex="-1"
                        >
                          <i className="fas fa-angle-left" />
                          <span className="sr-only">Previous</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem className="active">
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          2 <span className="sr-only">(current)</span>
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          3
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-angle-right" />
                          <span className="sr-only">Next</span>
                        </PaginationLink>
                      </PaginationItem>
                    </Pagination>
                  </nav>
                </CardFooter>
              </Card>
            </div>
          </Row>
        </Container>
      </>
    );
  }
}

export default Clients;
