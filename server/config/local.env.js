'use strict';

// Use local.env.js for environment variables that grunt will set when the server starts locally.
// Use for your api keys, secrets, etc. This file should not be tracked by git.
//
// You will need to set these on the server you deploy to.

module.exports = {
  DOMAIN: 'http://localhost:9000',
  SESSION_SECRET: "serveme-secret",

  FACEBOOK_ID: '1580418822200809',
  FACEBOOK_SECRET: '6c7418d383b205502fcfb8fe8fae443c',

  TWITTER_ID: 'ZccOO7Qs84J3YEcvuz4eU8otp',
  TWITTER_SECRET: 's93zkajrAoh4Ns3p0dlLc9ZsQJOQrpsqE5lrIiFLEDDnC6Wwth',

  GOOGLE_ID: '899206423047-92p8u7nlnb7kcdras020mn6fjfe66ln0.apps.googleusercontent.com',
  GOOGLE_SECRET: '6Qe8ZZYcWuxMKT0HH__kFCgQ',

  // Control debug level for modules using visionmedia/debug
  DEBUG: ''
};
