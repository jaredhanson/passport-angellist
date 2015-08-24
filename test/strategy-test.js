var vows = require('vows');
var assert = require('assert');
var util = require('util');
var AngelListStrategy = require('../lib/strategy');


vows.describe('AngelListStrategy').addBatch({
  
  'strategy': {
    topic: function() {
      return new AngelListStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
    },
    
    'should be named angellist': function (strategy) {
      assert.equal(strategy.name, 'angellist');
    },
  },
  
  'strategy when loading user profile': {
    topic: function() {
      var strategy = new AngelListStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        var body = '{ \
          "name": "Naval Ravikant", \
          "id": 155, \
          "bio": "Sweat - AngelList, Venture Hacks, Vast, Epinions; Money - Twitter, Heyzap, SnapLogic", \
          "blog_url": "http://startupboy.com/", \
          "online_bio_url": "http://startupboy.com/about/", \
          "twitter_url": "http://twitter.com/naval", \
          "facebook_url": "http://www.facebook.com/navalr", \
          "linkedin_url": "http://www.linkedin.com/in/navalr", \
          "follower_count": 13375, \
          "locations": [ \
            { \
              "id": 1692, \
              "tag_type": "LocationTag", \
              "name": "san francisco", \
              "display_name": "San Francisco", \
              "angellist_url": "http://angel.co/san-francisco" \
            } \
          ], \
          "roles": [ \
            { \
              "id": 9305, \
              "tag_type": "RoleTag", \
              "name": "seed funds", \
              "display_name": "Seed Fund", \
              "angellist_url": "http://angel.co/seed-funds" \
            }, \
            { \
              "id": 14725, \
              "tag_type": "RoleTag", \
              "name": "entrepreneur", \
              "display_name": "Entrepreneur", \
              "angellist_url": "http://angel.co/entrepreneur-1" \
            } \
          ], \
          "angellist_url": "http://angel.co/naval", \
          "image": "https://s3.amazonaws.com/photos.angel.co/users/155-medium?1308634544" \
        }';
        
        callback(null, body, undefined);
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should not error' : function(err, req) {
        assert.isNull(err);
      },
      'should load profile' : function(err, profile) {
        assert.equal(profile.provider, 'angellist');
        assert.equal(profile.id, '155');
        assert.equal(profile.displayName, 'Naval Ravikant');
      },
      'should set raw property' : function(err, profile) {
        assert.isString(profile._raw);
      },
      'should set json property' : function(err, profile) {
        assert.isObject(profile._json);
      },
    },
  },
  
  'strategy when loading user profile and encountering an error': {
    topic: function() {
      var strategy = new AngelListStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret'
      },
      function() {});
      
      // mock
      strategy._oauth2.get = function(url, accessToken, callback) {
        callback(new Error('something-went-wrong'));
      }
      
      return strategy;
    },
    
    'when told to load user profile': {
      topic: function(strategy) {
        var self = this;
        function done(err, profile) {
          self.callback(err, profile);
        }
        
        process.nextTick(function () {
          strategy.userProfile('access-token', done);
        });
      },
      
      'should error' : function(err, req) {
        assert.isNotNull(err);
      },
      'should wrap error in InternalOAuthError' : function(err, req) {
        assert.equal(err.constructor.name, 'InternalOAuthError');
      },
      'should not load profile' : function(err, profile) {
        assert.isUndefined(profile);
      },
    },
  },
  
}).export(module);
