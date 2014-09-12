module.exports = function(config) {
    config.set({
        basePath: './',
        files: [
            {pattern: 'spec/jquery-2.1.1.min.js', included: true},
            {pattern:  'spec/jasmine-jquery.js', included: true},
            {pattern:  'src/jquery.validate-nicely.js', included: true},
            {pattern:  'spec/jquery.validate-nicely.js', included: true}

        ],
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher']
    });
};