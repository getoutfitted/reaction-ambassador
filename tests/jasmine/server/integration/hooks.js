describe('getoutfitted:reaction-ambassador hooks', function() {
  describe('on OrderCompleted', function() {
    beforeEach(function() {
      return ReactionCore.Collections.Orders.remove({});
    });



    // xit('should call the ambassador on successful completion oforder', function() {
    //   spyOn(HTTP, 'call');
    //   var order = Factory.create('order');
    //   // var account = Factory.create('ambassadorPackageWithSettings', {enabled: true});

    //   // spyOn(orderCompleted).and.returnValue(order);
    //   expect(true).toEqual(true);
    // });

    // it('should not post to ambassador if ambassador pacakage is not enabled', function() {
    //   spyOn(HTTP, 'call');
    //   var order = Factory.create('orderWithInvoice');
    //   spyOn(orderCompleted).and.returnValue(order);
    //   Meteor.call('orderCompleted');
    //   expect(HTTP.call).not.toHaveBeenCalled();

    // });
  });
});
