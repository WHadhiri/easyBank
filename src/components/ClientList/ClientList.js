import React from "react";
import { Link } from "react-router-dom";

// reactstrap components
import {
  Badge,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Button,
} from "reactstrap";

class ClientList extends React.Component {
  state = {
    clients: this.props.clients,
    clientAccounts: this.props.clientAcc,
  };

  selectedClient = (client) => {
    this.props.onShowModal(client);
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.clientAcc !== state.clientAccounts &&
      props.clients !== state.clients
    ) {
      return {
        clients: props.clients,
        clientAccounts: props.clientAcc,
      };
    }

    // Return null to indicate no change to state.
    return null;
  }

  render() {
    const { clients, clientAccounts } = this.state;
    if (clients.length === 0) {
      return (
        <tr>
          <th scope="row">
            <Media className="align-items-center">
              <span className="mb-0 text-sm">No Clients Found.</span>
            </Media>
          </th>
        </tr>
      );
    }
    return clients.map((client) => {
      return (
        <tr key={client.id}>
          <th scope="row">
            <Media className="align-items-center">
              <span className="mb-0 text-sm">
                {client.firstname + " " + client.lastname}
              </span>
            </Media>
          </th>
          <td>{client.cin}</td>
          <td>
            {clientAccounts.length !== 0 ? (
              <Button
                outline
                color="info"
                type="button"
                tag={Link}
                to={`/admin/accounts/${client.cin}/`}
              >
                Show Account
              </Button>
            ) : (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                Not Available
              </Badge>
            )}
          </td>

          <td>
            {client.accounts.map((acc) => acc.typeofaccount === "Courant") ? (
              <Button
                outline
                color="info"
                type="button"
                tag={Link}
                to={`/admin/accounts/${client.cin}/`}
              >
                Show Account
              </Button>
            ) : (
              <Badge color="" className="badge-dot mr-4">
                <i className="bg-danger" />
                Not Available
              </Badge>
            )}
          </td>
          <td className="text-right">
            <UncontrolledDropdown>
              <DropdownToggle
                className="btn-icon-only text-light"
                href="#pablo"
                role="button"
                size="sm"
                color=""
                onClick={(e) => e.preventDefault()}
              >
                <i className="fas fa-ellipsis-v" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-arrow" right>
                <DropdownItem onClick={(e) => this.selectedClient(client)}>
                  <i className="ni ni-zoom-split-in" /> Update Informations
                </DropdownItem>
                <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                  <i className="ni ni-fat-remove text-red" /> Delete Client
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </td>
        </tr>
      );
    });
  }
}

export default ClientList;
