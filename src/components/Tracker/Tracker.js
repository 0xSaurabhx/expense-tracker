import React, { Component } from "react";
import "./Tracker.css";
import fire from "../../config/Fire";
import Transaction from "./Transaction/Transaction";

class Tracker extends Component {
  
  state = {
    transactions: [],
    money: 0,

    transactionName: "",
    transactionDate: "",
    transactionType: "",
    price: "",
    date: "",
    currentUID: fire.auth().currentUser.uid,
  };

  // logout function
  logout = () => {
    fire.auth().signOut();
  };

  handleChange = (input) => (e) => {
    this.setState({
      [input]: e.target.value !== "0" ? e.target.value : "",
    });
  };

  // add transaction
  addNewTransaction = () => {
    const {
      transactionName,
      transactionDate,
      transactionType,
      price,
      currentUID,
      money,
    } = this.state;

    // validation
    if (transactionName && transactionType && price) {
      const BackUpState = this.state.transactions;
      BackUpState.push({
        id: BackUpState.length + 1,
        name: transactionName,
        date: transactionDate,
        type: transactionType,
        price: price,
        user_id: currentUID,
      });

      fire
        .database()
        .ref("Transactions/" + currentUID)
        .push({
          id: BackUpState.length,
          name: transactionName,
          date: transactionDate,
          type: transactionType,
          price: price,
          user_id: currentUID,
        })
        .then((data) => {
          //success callback
          console.log("success callback");
          console.log(transactionDate)
          this.setState({
            transactions: BackUpState,
            money:
              transactionType === "deposit"
                ? money + parseFloat(price)
                : money - parseFloat(price),
            transactionName: "",
            transactionDate: "",
            transactionType: "",
            price: "",
          });
        })
        .catch((error) => {
          //error callback
          
          console.log("error ", error);
        });
    }
  };

  deleteAllTransactionsFromFirebase = () => {
    const { currentUID } = this.state;
    fire
      .database()
      .ref("Transactions/" + currentUID)
      .remove()
      .then(() => {
        console.log("All transactions deleted from Firebase");
        this.setState({ transactions: [] });
      })
      .catch((error) => {
        console.log("Error deleting transactions from Firebase: ", error);
      });
      window.location.reload(false);
  };

  componentWillMount() {
    const { currentUID, money } = this.state;
    let totalMoney = money;
    const BackUpState = this.state.transactions;
    fire
      .database()
      .ref("Transactions/" + currentUID)
      .once("value", (snapshot) => {
        // console.log(snapshot);
        snapshot.forEach((childSnapshot) => {
          totalMoney =
            childSnapshot.val().type === "deposit"
              ? parseFloat(childSnapshot.val().price) + totalMoney
              : totalMoney - parseFloat(childSnapshot.val().price);

          BackUpState.push({
            id: childSnapshot.val().id,
            name: childSnapshot.val().name,
            type: childSnapshot.val().type,
            price: childSnapshot.val().price,
            date: childSnapshot.val().date,
            user_id: childSnapshot.val().user_id,
          });
          // console.log(childSnapshot.val().name);
        });
        this.setState({
          transactions: BackUpState,
          money: totalMoney,
          date: BackUpState.date,
        });
      });
  }
  
  

  render() {
    var currentUser = fire.auth().currentUser;
    
    return (
      <div className="trackerBlock">
        <div className="welcome">
          <span>Hi, {currentUser.displayName}!👋</span>
          <button className="exit" onClick={this.logout}>
            Sign Out
          </button>
          <button
            className="exit"
            onClick={this.deleteAllTransactionsFromFirebase}
          >
            Delete All
          </button>
        </div>
        <div className="totalMoney">₹{this.state.money}</div>

        <div className="newTransactionBlock">
          <div className="newTransaction">
            <form>
              <input
                onChange={this.handleChange("transactionName")}
                value={this.state.transactionName}
                placeholder="Transaction Name"
                type="text"
                name="transactionName"
              />
              <div className="inputGroup">
                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <input
                    type="date"
                    id="indate"
                    name="date"
                    value={this.state.transactionDate}
                    onChange={this.handleChange("transactionDate")}
                    required
                  />
                </div>
                <select
                  name="type"
                  onChange={this.handleChange("transactionType")}
                  value={this.state.transactionType}
                >
                  <option value="0">Type</option>
                  <option value="expense">Expense</option>
                  <option value="deposit">Deposit</option>
                </select>
                <input
                  onChange={this.handleChange("price")}
                  value={this.state.price}
                  placeholder="Price"
                  type="text"
                  name="price"
                />
              </div>
            </form>
            <button
              onClick={() => this.addNewTransaction()}
              className="addTransaction"
              style={{marginTop: '20px'}}
            >
              + Add Transaction
            </button>
          </div>
        </div>

        <div className="latestTransactions">
          <p>🕔 Latest Transactions</p>
          <ul>
            {Object.keys(this.state.transactions).map((id) => (
              <Transaction
                key={id}
                id={id}
                type={this.state.transactions[id].type}
                name={this.state.transactions[id].name}
                price={this.state.transactions[id].price}
                transactionDate={this.state.transactions[id].transactionDate}
                user_id={this.state.transactions[id].user_id}
              />
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Tracker;
