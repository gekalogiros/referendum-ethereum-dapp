var Referendum = artifacts.require("./Referendum.sol");

contract('Referendum contract', function(accounts){

    var underTest;

    beforeEach(async function() {
        underTest = await Referendum.new();
    });

    it('should provide the total number of votes for candidate', async() => {
        // given:
        let candidate = 1;
        let referendumEndDate = new Date(now() + days(2)).getTime();
        let referendumEndDateInSeconds = Math.floor(referendumEndDate / 1000);

        // when:
        await underTest.setReferendumDate(referendumEndDateInSeconds);
        let totalVotesForCandidate = await underTest.getVotesForCandidate(candidate);

        // then:
        assert.equal(totalVotesForCandidate.toNumber(), 0);
    })

    it('should set a referendum date', async() => {
        // given:
        let referendumEndDate = new Date(now() + days(2)).getTime();
        let referendumEndDateInSeconds = Math.floor(referendumEndDate / 1000);

        // when:
        await underTest.setReferendumDate(referendumEndDateInSeconds);
        let referendumDate = await underTest.getReferendumDate();

        // then:
        assert.equal(referendumDate.toNumber(), referendumEndDateInSeconds);
    })

    it('should fail if someone who is not the owner tries to set referendum date', async() => {
        await expectThrow(underTest.setReferendumDate(new Date().getTime(), {"from" : accounts[1]} ));
    })

    function days(x){
        return 1000 * 60 * 60 * 24 * x;
    }

    function now() {
        return new Date().getTime();
    }

    var expectThrow = async promise => {

        try {
            await promise;
        } catch (error) {
            const invalidOpcode = error.message.search('invalid opcode') >= 0;
            const outOfGas = error.message.search('out of gas') >= 0;
            const revert = error.message.search('revert') >= 0;
            assert(invalidOpcode || outOfGas || revert, 'Expected throw, got \'' + error + '\' instead');
            return;
        }
        assert.fail('Expected throw not received');

    }

});