
// Karma configuration
module.exports = function(config) {
    config.set({

        basePath: '',
        frameworks: ['jasmine'],

        files: [
            'spec/*.spec.js'
        ],

        exclude: [
        ],

        preprocessors: {
        },

        plugins: [
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-spec-reporter'),
            require('karma-jasmine-html-reporter')
        ],

        reporters: ['spec','kjhtml'],

        port: 9876,

        colors: true,

        logLevel: config.LOG_DISABLE,

        autoWatch: true,

        browsers: ['Chrome'],

        client: {
            clearContext: false
        },

        singleRun: false,

        concurrency: Infinity,
    })
}

