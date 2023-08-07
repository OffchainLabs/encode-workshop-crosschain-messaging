// SPDX-License-Identifier: Apache-2.0
pragma solidity >=0.6.11;

import "@arbitrum/nitro-contracts/src/precompiles/ArbSys.sol";

contract GreeterL2 {
    ArbSys constant arbsys = ArbSys(address(100));
    address public l1Target;
    string greeting;

    event L2ToL1TxCreated(uint256 indexed withdrawalId);

    constructor(string memory _greeting, address _l1Target) {
        l1Target = _l1Target;
        greeting = _greeting;
    }

    function updateL1Target(address _l1Target) public {
        l1Target = _l1Target;
    }

    function setGreetingInL1(string memory _greeting) public returns (uint256) {
        bytes memory data = abi.encodeWithSelector(this.setGreeting.selector, _greeting);

        uint256 withdrawalId = arbsys.sendTxToL1(l1Target, data);

        emit L2ToL1TxCreated(withdrawalId);
        return withdrawalId;
    }

    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }

    function greet() public view returns (string memory) {
        return greeting;
    }
}
