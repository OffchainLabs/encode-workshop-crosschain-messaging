## Demystifying Arbitrum L1 To L2 Messaging

> DISCLAIMER: For workshop / demo / testnet purposes only; has not been audited, don't use this on mainnet, etc.

### What we'll do today?

we write up a simple demo of Arbitrum's L1-to-L2 message passing system (aka "retryable tickets"). we'll be using Goerli / Arbitrum Goerli Rollup Testnet. Throughout the workshop, we'll learn the concepts of interacting with contracts on different layers, retryable tickets, and how to handle potential issues that might arise during the process. The script and contracts will demonstrate how to interact with Arbitrum's core bridge contracts, enabling us to create these retryable messages effectively. We'll delve into the intricacies of calculating and forwarding the appropriate fees from L1 to L2, ensuring smooth and seamless transactions across layers. Moreover, we'll explore how to utilize Arbitrum's L1-to-L2 message address aliasing feature to simplify message communication between layers.

By the end of the session, you'll not only be proficient in managing messages between layers and performing retryable transactions confidently but also gain a comprehensive understanding of Arbitrum's unique functionalities. Let's have some fun while exploring the fascinating world of L1 and L2 interactions!

## Flow

**1- Deployment of Contracts:**

- We start by deploying two contracts: L1 Greeter on Layer 1 and L2 Greeter on Layer 2. Each contract has a unique "greeting" message set.

**2- Modifying L2 Greeting from L1:**

- We proceed to modify the greeting message on L2 Greeter directly from L1 by sending a specific message.

**3- First Approach - Demonstrating Potential Failure:**

- As a learning experience, we first attempt to modify the L2 greeting using one approach.
- I'll show you how providing the wrong parameters when submitting the retryable data can lead to a failed transaction.
- We'll then verify the status of our L1-L2 message on the Arb retryable dashboard to see the failed attempt.

**4- Second Approach - Correct Method:**

- Now, we'll follow the correct approach to modify the L2 greeting.
- I'll demonstrate the proper way of submitting retryable data to ensure a successful transaction this time.

## Setup / Commands

1. `git clone` this repo
1. `yarn install`
1. Add env variables (i.e., to a .env file):

   ```
   TESTNET_PRIVKEY=xyzxyz
   L1RPC=https://goerli.infura.io/v3/<your_infura_key>
   ```

1. Complete function bodies in scripts (i.e., do all the `"// DO!"` things)
1. Deploy contracts:
   ```
   yarn run deploy
   ```
1. Test out a L1-L2 message:
   ```
   yarn run greet
   ```

## Useful links

- Arbitum L1-L2 messaging documentation - https://docs.arbitrum.io/arbos/l1-to-l2-messaging
- Arbitrum retryables transaction panel - https://retryable-dashboard.arbitrum.io/tx
- Arbitrum SDK - https://github.com/OffchainLabs/arbitrum-sdk
