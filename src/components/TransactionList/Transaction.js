import React from "react";
// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
  } from "reactstrap";

  class Transaction extends React.Component{
    constructor(props) {
        super(props);
        this.Transactions = this.props.Transactions;
      }
    
    
     
    
      render() {
        if (this.Transactions.length === 0) {
          return (
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <span className="mb-0 text-sm">No Transaction Found.</span>
                </Media>
              </th>
            </tr>
          );
        }
    
        return this.Transactions.map((Transaction) => {
          return (
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <span className="mb-0 text-sm">{Transaction.ntransaction}</span>
                </Media>
              </th>
              <td>{Transaction.type}</td>
              <td>
               {Transaction.date}
              </td>
    
              <td>
               {Transaction.name}
              </td>
              <td>
               {Transaction.debit}
              </td>
              <td>
               {Transaction.credit}
              </td>
              <td>
               {Transaction.balance}
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
                    <DropdownItem onClick={(e) => e.preventDefault()}>
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
  export default Transaction;