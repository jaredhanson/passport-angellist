# Passport-AngelList

[Passport](https://github.com/jaredhanson/passport) strategy for authenticating
with [AngelList](http://angel.co/) using the OAuth 2.0 API.

This module lets you authenticate using AngelList in your Node.js applications.
By plugging into Passport, AngelList authentication can be easily and
unobtrusively integrated into any application or framework that supports
[Connect](http://www.senchalabs.org/connect/)-style middleware, including
[Express](http://expressjs.com/).

## Install

    $ npm install passport-angellist

## Usage

#### Configure Strategy

The AngelList authentication strategy authenticates users using an AngelList
account and OAuth 2.0 tokens.  The strategy requires a `verify` callback, which
accepts these credentials and calls `done` providing a user, as well as
`options` specifying a client ID, client secret, and callback URL.

    passport.use(new AngelListStrategy({
        clientID: ANGELLIST_CLIENT_ID,
        clientSecret: ANGELLIST_CLIENT_SECRET,
        callbackURL: "http://127.0.0.1:3000/auth/angellist/callback"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ angellistId: profile.id }, function (err, user) {
          return done(err, user);
        });
      }
    ));

#### Authenticate Requests

Use `passport.authenticate()`, specifying the `'angellist'` strategy, to
authenticate requests.

For example, as route middleware in an [Express](http://expressjs.com/)
application:

    app.get('/auth/angellist',
      passport.authenticate('angellist'));

    app.get('/auth/angellist/callback', 
      passport.authenticate('angellist', { failureRedirect: '/login' }),
      function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
      });

## Examples

For a complete, working example, refer to the [login example](https://github.com/jaredhanson/passport-angellist/tree/master/examples/login).

## Tests

    $ npm install --dev
    $ make test

[![Build Status](https://secure.travis-ci.org/jaredhanson/passport-angellist.png)](http://travis-ci.org/jaredhanson/passport-angellist)

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2011-2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>
