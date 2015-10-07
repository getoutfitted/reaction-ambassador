describe('getoutfitted:reaction-ambassador methods', function() {
  describe('ambassadorEnabled', function() {
    beforeEach(function() {
      return ReactionCore.Collections.Packages.remove({});
    });
    it('should correctly return the status of the ambsssador pacakge', function() {
      var ambassador = Factory.create('packages');
      expect(Meteor.call('ambassadorEnabled')).toEqual(false);

      ReactionCore.Collections.Packages.update( {name: ambassador.name},
        {$set: { enabled: true}
      });
      expect(Meteor.call('ambassadorEnabled')).toEqual(true);
    });
  });
});
