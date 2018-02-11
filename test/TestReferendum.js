var Referendum = artifacts.require("./Referendum.sol");

contract('Referendum', function(accounts){

    var underTest;

    describe('taking place in the future', async => {

        let referendumEndDate = new Date(now() + days(2)).getTime();

        let referendumEndDateInSeconds = Math.floor(referendumEndDate / 1000);

        beforeEach(async function() {
            underTest = await Referendum.new(referendumEndDateInSeconds);
        });

        it('should forbid people knowing the current referendum status before the end date', async() => {
            // given:
            let candidate = 1;

            // then:
            await expectThrow(underTest.getVotesForCandidate(candidate))
        })

        it('should provide a referendum date', async() => {

            // when:
            let referendumDate = await underTest.getReferendumDate();

            // then:
            assert.equal(referendumDate.toNumber(), referendumEndDateInSeconds);
        })

        it('should provide to chairman only the total number of votes so far', async() => {
            // when:
            let totalVotes = await underTest.getNumberOfVoters();

            // then:
            assert.equal(totalVotes.toNumber(), 0)
        })

        it('should forbid anyone but chairman to know the total number of voters while referendum is still active', async() => {
            await expectThrow(underTest.getNumberOfVoters({"from" : accounts[1]}))
        })
    })

    describe('already completed', async => {

        let referendumEndDate = new Date(now() - days(2)).getTime();

        let referendumEndDateInSeconds = Math.floor(referendumEndDate / 1000);

        beforeEach(async function() {
            underTest = await Referendum.new(referendumEndDateInSeconds);
        });

        it('should provide the total number of votes for candidate', async() => {
            // given:
            let candidate = 1;

            // when:
            let totalVotesForCandidate = await underTest.getVotesForCandidate(candidate);

            // then:
            assert.equal(totalVotesForCandidate.toNumber(), 0);
        })

        it('should provide a referendum date', async() => {

            // when:
            let referendumDate = await underTest.getReferendumDate();

            // then:
            assert.equal(referendumDate.toNumber(), referendumEndDateInSeconds);
        })
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