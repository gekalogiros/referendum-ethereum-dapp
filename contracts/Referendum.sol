pragma solidity ^0.4.0;

contract Referendum {

    uint public referendumDate;

    address private chairPerson;

    mapping (uint => uint) private votes;

    modifier ownerOnly() {
        require(chairPerson == msg.sender);
        _;
    }

    modifier postReferendumOnly() {
        require(now * 1 seconds >= referendumDate);
        _;
    }

    function Referendum() public {
        chairPerson = msg.sender;
    }

    function vote(uint candidateID) public {
        votes[candidateID] = votes[candidateID] + 1;
    }

    function getVotesForCandidate(uint candidateID) public view returns (uint) {
        return votes[candidateID];
    }

    function setReferendumDate(uint _referendumDate) public ownerOnly {
        require(now * 1 seconds <= _referendumDate);
        referendumDate = _referendumDate;
    }

    function getReferendumDate() public view returns (uint) {
        return referendumDate;
    }
}