const { providers, Wallet } = require('ethers')
const hre = require('hardhat')
const ethers = require('ethers')
const {
  L1ToL2MessageGasEstimator,
} = require('@arbitrum/sdk/dist/lib/message/L1ToL2MessageGasEstimator')
const { requireEnvVariables, arbLog } = require('../index.js')
const { L1TransactionReceipt, L1ToL2MessageStatus } = require('@arbitrum/sdk')
const { getBaseFee } = require('@arbitrum/sdk/dist/lib/utils/lib')
requireEnvVariables(['TESTNET_PRIVKEY', 'L2RPC', 'L1RPC'])
const RETRYABLE_DASHBOARD = 'https://retryable-dashboard.arbitrum.io/tx/'
const ETHERSCAN_TX = 'https://etherscan.io/tx/'
/**
 * Set up: instantiate L1 / L2 wallets connected to providers
 */
const walletPrivateKey = process.env.TESTNET_PRIVKEY

const l1Provider = new providers.JsonRpcProvider(process.env.L1RPC)
const l2Provider = new providers.JsonRpcProvider(process.env.L2RPC)

const l1Wallet = new Wallet(walletPrivateKey, l1Provider)
const l2Wallet = new Wallet(walletPrivateKey, l2Provider)

const l1GreeterAddress = '0x32C052014a877B82381ce95e195A9a87DE3DBA5C' //the address of the L1 Greeter
const l2GreeterAddress = '0x71475de8207485Af46b0B13F592588c18726531B' //the address of the L2 Greeter

const main = async () => {
  await arbLog()

  const l1Greeter = await (
    await hre.ethers.getContractAt('GreeterL1', l1GreeterAddress)
  ).connect(l1Wallet)
  const l2Greeter = await (
    await hre.ethers.getContractAt('GreeterL2', l2GreeterAddress)
  ).connect(l2Wallet)

  /**
   * Let's log the L2 greeting string
   */
  const currentL2Greeting = await l2Greeter.greet()
  console.log(`Current L2 greeting: "${currentL2Greeting}"`)

  console.log('Updating greeting from L1 to L2:')

  /**
   * Here we define a new greeting message that we want to set as the L2 greeting; we'll be setting it by sending it as a message from layer 1!!!
   */

  // DO!!

  /**
   * To be able to estimate the gas related params for our L1-L2 message, we need to know how many bytes of calldata our retryable ticket will require
   * i.e., we need to calculate the calldata for the function being called (setGreeting())
   */

  // DO!

  /**
   * Now we need to figure out the proper gas params for sending a succesful L1-L2 message
   * We query the these params using the a helper method "estimateAll" in Arbitrum SDK (https://github.com/OffchainLabs/arbitrum-sdk)
   * The estimateAll method gives us the following values for sending an L1->L2 message
   *  (1) maxSubmissionCost: The maximum cost to be paid for submitting the transaction
   *  (2) gasLimit: The L2 gas limit
   *  (3) deposit: The total amount to deposit on L1 to cover L2 gas and L2 call value
   */

  // DO!

  /* console.log(
    `Current retryable base submission price is: ${L1ToL2MessageGasParams.maxSubmissionCost.toString()}`
  ) */

  /**
   * For the L2 gas price, we simply query it from the L2 provider, as we would when using L1
   */

  // DO!!

  //console.log(`L2 gas price: ${gasPriceBid.toString()}`)

  /**
   * With these values, we can send our L1-L2 message
   * But first let's try and see how one would fail in doing so!
   * To create a failed retryable ticket, we hardcode a very low number for gasLimit (e.g., 10) which leads to a failed auto-redeem on L2
   */

  // DO!!

  // console.log(
  //   `Sending greeting to L2 with ${gasLimit} gasLimit for L2 fees:`
  // )

  // DO!
  // console.log(
  //   `Greeting txn confirmed on L1 but will fail to auto-redeem on L2!\nYou can check the ticket's status here: ${RETRYABLE_DASHBOARD + setGreetingRec.transactionHash}`
  // )

  /**
   * Now let's do it the right way and create a successful L1-L2 message!
   */

  // DO!

  /* console.log(
    `Sending greeting to L2 with ${L1ToL2MessageGasParams.deposit.toString()} callValue for L2 fees:`
  ) */

  // DO!
  /**
   * Now when we call greet again, we should see our new string on L2!
   */
  // const newGreetingL2 = await l2Greeter.greet()
  // console.log(`Updated L2 greeting: "${newGreetingL2}" 🥳`)
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
