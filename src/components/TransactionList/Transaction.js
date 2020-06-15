import React from "react";
// reactstrap components
import {
    Media,
  } from "reactstrap";

  class Transaction extends React.Component{
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {
          Transactions : this.props.Transactions,
        };
       
      }
      static getDerivedStateFromProps(props, state) {
        if (props.Transactions !== state.Transactions) {
          return {
            Transactions: props.Transactions,
          };
        }
        // Return null to indicate no change to state.
        return null;
      }
      
    
     
    
      render() {
        const {Transactions}=this.state;
       if (Transactions.length === 0) {
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
        
    
        return Transactions.map((Transaction) => {
          return (
            <tr>
              <th scope="row">
                <Media className="align-items-center">
                  <span className="mb-0 text-sm">{Transaction.numTrans}</span>
                </Media>
              </th>
              <td>{Transaction.typeofTrans}</td>
              <td>
               {Transaction.dateTrans}
              </td>
    
              <td>
               {Transaction.nameTrans}
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
            </tr>
          );
        });
      }
    }
  export default Transaction;