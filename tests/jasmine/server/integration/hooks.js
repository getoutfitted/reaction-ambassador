describe('getoutfitted:reaction-ambassador hooks', function() {
  describe('on OrderCompleted', function() {
    beforeEach(function() {
      return ReactionCore.Collections.Orders.remove({});
    });

    it('should not post to ambassador if ambassador pacakage is not enabled', function() {
      spyOn(HTTP, 'call');
      var order = Factory.create('orderWithInvoice');
      spyOn(orderCompleted).and.returnValue(order);
      Meteor.call('orderCompleted');
      expect(HTTP.call).not.toHaveBeenCalled();
      expect(true).toEqual(true);
    });
  });
});
