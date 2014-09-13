module.exports = function(config) {
    config.set({
        basePath: './',
        files: [
            {pattern: 'spec/fixtures/*.html', included: true},
            {pattern: 'spec/karma-dependencies/jquery-2.1.1.min.js', included: true},
            {pattern: 'spec/karma-dependencies/jasmine-jquery.js', included: true},
            {pattern:  'src/*.js', included: true},
            {pattern:  'spec/*.js', included: true}
        ],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher']
    });
};