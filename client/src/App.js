import React, { Component } from "react";
import PostFactoryContract from "./contracts/PostFactory";
import getWeb3 from "./getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
        // web3.eth.sendTransaction({
        //     from:web3.eth.getCoinbase(),
        //     to: '0x299814032451fAA008C01744d2973F8800aa59EC',
        //     value: web3.utils.toWei('10', 'ether')
        // })


      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = PostFactoryContract.networks[networkId];
      const instance = new web3.eth.Contract(
        PostFactoryContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  runExample = async () => {
    const { accounts, contract } = this.state;

    console.log(accounts)
    console.log(contract.methods)
    // Stores a given value, 5 by default.
    // await contract.methods.set(5).send({ from: accounts[0] });
    // // Get the value from the contract to prove it worked.
    // const response = await contract.methods.get().call();

    const response = await contract.methods.testGet().call()
    console.log(response)

    contract.methods.test().send({from: accounts[0]})
        .then(() => {
          console.log("test put success")
          return contract.methods.getPosts().call()
        })
        .then((result) => {
          console.log("got here")
          console.log(result)
          this.setState({ posts: result})
        })

    // contract.methods.getPosts().call()
    //     .then((result) => {
    //       console.log(result)
    //       this.setState({ posts: result})
    //     })
    //let us test some endpoints
    //   const response = await contract.methods.getPosts().call()

    // console.log(response)

    // Update state with the result.
    // this.setState({ posts: 'yeet' });
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.posts}</div>
      </div>
    );
  }
}

export default App;
