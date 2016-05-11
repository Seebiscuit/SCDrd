({
    //baseUrl: "js/",
    mainConfigFile: "main.js",
    name: "main",
    out: "main.min.js",

    optimizeCss: 'standard',

    // Wraps all scripts in an IIFE (Immediately Invoked Function Expression)
    // (function() { + content + }());
    wrap: true,
    preserveLicenseComments: false,
    // Uses uglify.js for minification
    optimize: "uglify",
    uglify: {
        toplevel: true,
        ascii_only: true,
        beautify: false,
        max_line_length: 1000
    },
    inlineText: true,
    text: { removeWhitespace: true },
    tpl: { removeWhitespace: true },

    //useStrict: false,
    skipPragmas: false,
    skipModuleInsertion: false,

    stubModules: ['text'],
    optimizeAllPluginResources: false,
    findNestedDependencies: true,
    removeCombined: false,
    fileExclusionRegExp: /^\./,
    logLevel: 0
})
