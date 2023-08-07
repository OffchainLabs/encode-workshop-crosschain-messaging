// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.11;

import "@arbitrum/nitro-contracts/src/bridge/Inbox.sol";
import "@arbitrum/nitro-contracts/src/bridge/Outbox.sol";

contract GreeterL1 {
    address public l2Target;
    IInbox public inbox;
    string public greeting;

    event RetryableTicketCreated(uint256 indexed ticketId);

    constructor(string memory _greeting, address _l2Target, address _inbox) {
        l2Target = _l2Target;
        inbox = IInbox(_inbox);
        greeting = _greeting;
    }

    function updateL2Target(address _l2Target) public {
        l2Target = _l2Target;
    }

    function setGreetingInL2(
        string memory _greeting,
        uint256 maxSubmissionCost, //Max gas deducted from user's L2 balance to cover base submission fee
        uint256 gasLimit, //Max gas deducted from user's L2 balance to cover L2 execution
        uint256 maxFeePerGas //price bid for L2 execution
    ) public payable returns (uint256) {
        bytes memory data = abi.encodeWithSelector(this.setGreeting.selector, _greeting); //ABI encoded data of L2 message
        uint256 ticketID = inbox.createRetryableTicket{ value: msg.value }(
            l2Target,
            0,
            maxSubmissionCost,
            msg.sender,
            msg.sender,
            gasLimit,
            maxFeePerGas,
            data
        );

        emit RetryableTicketCreated(ticketID);
        return ticketID;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}
