describe('getoutfitted:reaction-ambassador methods', function () {
  describe('ambassadorEnabled', function () {
    beforeEach(function () {
      return ReactionCore.Collections.Packages.remove({});
    });
    it('should correctly return the status of the ambsssador pacakge', function () {
      let ambassador = Factory.create('packages');
      expect(Meteor.call('ambassadorEnabled')).toEqual(false);

      ReactionCore.Collections.Packages.update({name: ambassador.name},
        {$set: { enabled: true}
      });
      expect(Meteor.call('ambassadorEnabled')).toEqual(true);
    });
  });

  describe('addRefererToAccounts', function () {
    beforeEach(function () {
      return ReactionCore.Collections.Accounts.remove({});
    });
    it('should update accounts when all arguments are valid', function () {
      account = Factory.create('account');
      spyOn(ReactionCore.Collections.Accounts, 'update');
      let accountId = account.userId;
      let mbsy = 'A1234';
      let campaignId = '12345';
      let mbsySource = '1234_1234_1234_1234';
      let expireTime = new Date();
      let time = expireTime.getTime();
      time += 180 * 24 * 60 * 60 * 1000;
      expireTime.setTime(time);
      let expirationDate = JSON.stringify(expireTime.toUTCString());
      spyOn(Meteor, 'userId').and.returnValue(accountId);
      Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
      expect(ReactionCore.Collections.Accounts.update).toHaveBeenCalled();
    });

    it('should not upddate account when userid is not equal to account id', function () {
      account = Factory.create('account');
      spyOn(ReactionCore.Collections.Accounts, 'update');
      let accountId = account.userId;
      let mbsy = 'A1234';
      let campaignId = '12345';
      let mbsySource = '1234_1234_1234_1234';
      let expireTime = new Date();
      let time = expireTime.getTime();
      time += 180 * 24 * 60 * 60 * 1000;
      expireTime.setTime(time);
      let expirationDate = JSON.stringify(expireTime.toUTCString());
      spyOn(Meteor, 'userId').and.returnValue('invalidUserId');
      expect(function () {
        return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
      }).toThrow(new Meteor.Error(403, 'Access Denied'));
      expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
    });

    describe('with checks', function () {
      it('should not update account if accountid is not a string', function () {
        account = Factory.create('account');
        spyOn(ReactionCore.Collections.Accounts, 'update');
        let accountId = 1234;
        let mbsy = 'A1234';
        let campaignId = '12345';
        let mbsySource = '1234_1234_1234_1234';
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);
        let expirationDate = JSON.stringify(expireTime.toUTCString());
        spyOn(Meteor, 'userId').and.returnValue(accountId);
        expect(function () {
          return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
        }).toThrow();
        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
      });
      it('should not update account if mbsy is not a string', function () {
        account = Factory.create('account');
        spyOn(ReactionCore.Collections.Accounts, 'update');
        let accountId = account.userId;
        let mbsy = 1234;
        let campaignId = '12345';
        let mbsySource = '1234_1234_1234_1234';
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);
        let expirationDate = JSON.stringify(expireTime.toUTCString());
        spyOn(Meteor, 'userId').and.returnValue(accountId);
        expect(function () {
          return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
        }).toThrow();
        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
      });
      it('should not update account if campaignId is not a string', function () {
        account = Factory.create('account');
        spyOn(ReactionCore.Collections.Accounts, 'update');
        let accountId = account.userId;
        let mbsy = 'A1234';
        let campaignId = 12345;
        let mbsySource = '1234_1234_1234_1234';
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);
        let expirationDate = JSON.stringify(expireTime.toUTCString());
        spyOn(Meteor, 'userId').and.returnValue(accountId);
        expect(function () {
          return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
        }).toThrow();
        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
      });
      it('should not update account if mbsySource is not a string', function () {
        account = Factory.create('account');
        spyOn(ReactionCore.Collections.Accounts, 'update');
        let accountId = account.userId;
        let mbsy = 'A1234';
        let campaignId = '12345';
        let mbsySource = 1234;
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);
        let expirationDate = JSON.stringify(expireTime.toUTCString());
        spyOn(Meteor, 'userId').and.returnValue(accountId);
        expect(function () {
          return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
        }).toThrow();
        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
      });
      it('should not update account if Expiratiomdate is not a string', function () {
        account = Factory.create('account');
        spyOn(ReactionCore.Collections.Accounts, 'update');
        let accountId = account.userId;
        let mbsy = 'A1234';
        let campaignId = '12345';
        let mbsySource = '1234';
        let expireTime = new Date();
        let time = expireTime.getTime();
        time += 180 * 24 * 60 * 60 * 1000;
        expireTime.setTime(time);
        let expirationDate = expireTime;
        spyOn(Meteor, 'userId').and.returnValue(accountId);
        expect(function () {
          return Meteor.call('addRefererToAccounts', accountId, mbsy, campaignId, mbsySource, expirationDate);
        }).toThrow();
        expect(ReactionCore.Collections.Accounts.update).not.toHaveBeenCalled();
      });
    });
  });
});
