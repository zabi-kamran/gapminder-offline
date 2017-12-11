'use strict';

exports.config = {
  seleniumAddress: 'http://localhost:9515/',

  specs: [
    './e2e/**/*.e2e-spec.ts'
  ],

  framework: 'jasmine',

  allScriptsTimeout: 60000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 60000,
    print: function () {}
  },

  multiCapabilities: [
    {
      browserName: 'chrome',
      chromeOptions: {
        binary: '/home/vs/Downloads/GapminderOffline/Gapminder Offline-linux/Gapminder Offline', // path to GOffline executable
        args: ['no-sandbox', 'disable-infobars']
      }
    }
  ],

  onPrepare: function() {
    browser.waitForAngularEnabled(false);

    require('ts-node').register({ project: './e2e' });

    let SpecReporter = require('jasmine-spec-reporter').SpecReporter;

    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));
  }
};
