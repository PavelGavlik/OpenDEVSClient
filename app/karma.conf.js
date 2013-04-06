// Testacular configuration


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../test/vendor/es5-shim.js',
  'scripts/vendor/angular.js',
  'scripts/vendor/codemirror.js',
  '../test/vendor/angular-mocks.js',
  '../test/vendor/test-helpers.js',
  '../.tmp/scripts/templates.js',
  'scripts/app.js',
  'scripts/*.js',
  'scripts/**/*.js',
  '../test/spec/**/*.js'
];


// list of files to exclude
exclude = [
  'scripts/**/*.min.js'
];


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;


// enable / disable colors in the output (reporters and logs)
colors = true;


// level of logging
// possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
logLevel = LOG_INFO;


// enable / disable watching file and executing tests whenever any file changes
autoWatch = true;


// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['PhantomJS'];


// Continuous Integration mode
// if true, it capture browsers, run tests and exit
singleRun = false;


// test results reporter to use
// possible values: dots || progress
//reporter = 'progress';
reporters = ['dots', 'coverage'];

coverageReporter = {
   type : 'html',
   dir : '../test/coverage/'
};

preprocessors = {
//  '**/*.html': 'html2js',
  '**/scripts/*.js': 'coverage',
  '**/scripts/controllers/*.js': 'coverage',
  '**/scripts/directives/*.js': 'coverage',
  '**/scripts/services/*.js': 'coverage'
};
