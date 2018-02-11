pragma solidity ^0.4.0;

contract Referendum {

    uint public referendumDate;

    address private chairPerson;

    uint private numberOfVoters;

    mapping (uint => uint) private votes;

    event VoteApplied(uint candidateID);

    modifier ownerOnly() {
        require(chairPerson == msg.sender);
        _;
    }

    modifier postReferendumOnly() {
        require(now * 1 seconds >= referendumDate);
        _;
    }

    modifier preReferendumOnly() {
        require(now * 1 seconds <= referendumDate);
        _;
    }

    function Referendum(uint _referendumDate) public {
        chairPerson = msg.sender;
        referendumDate = _referendumDate;
    }

    function vote(uint candidateID) public preReferendumOnly {
        ++numberOfVoters;
        votes[candidateID] = votes[candidateID] + 1;
        VoteApplied(candidateID);
    }

    function getVotesForCandidate(uint candidateID) public postReferendumOnly view returns (uint) {
        return votes[candidateID];
    }

    function getReferendumDate() public view returns (uint) {
        return referendumDate;
    }

    function getNumberOfVoters() public ownerOnly view returns (uint) {
        return numberOfVoters;
    }
}