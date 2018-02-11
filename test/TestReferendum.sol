pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/testing-contracts/ThrowProxy.sol";
import "../contracts/Referendum.sol";

contract TestReferendum {

//    function testThrowWhenRequestedResultsBeforeTheEndOfTheReferendum() public {
//
//        var endOfReferendum = now + 10 days;
//
//        Referendum underTest = Referendum(DeployedAddresses.Referendum());
//        underTest.setReferendumDate(endOfReferendum);
//
//        ThrowProxy throwProxy = new ThrowProxy(address(underTest));
//
//        Referendum(address(throwProxy)).getVotesForCandidate(1);
//
//        bool r = throwProxy.execute.gas(200000)();
//
//        Assert.isFalse(r, "Should be false as the referendum has not finished yet");
//    }
//
//    function testProvideResultsAfterThenEndOfReferendum() public {
//
//        var endOfReferendum = now - 10 days;
//
//        Referendum underTest = Referendum(DeployedAddresses.Referendum());
//        underTest.setReferendumDate(endOfReferendum);
//
//        ThrowProxy throwProxy = new ThrowProxy(address(underTest));
//
//        Referendum(address(throwProxy)).getVotesForCandidate(1);
//
//        bool r = throwProxy.execute.gas(200000)();
//
//        Assert.isTrue(r, "Should be true as the referendum has finished, thus, totalVotesForCandidate can be called");
//    }
}