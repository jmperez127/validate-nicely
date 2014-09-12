module.exports = function(config) {
    config.set({
        frameworks: ['jasmine'],
        browsers: ['PhantomJS'],
        plugins : ['karma-jasmine', 'karma-phantomjs-launcher'],
        files: [
            '*.js'
        ]
    });
};