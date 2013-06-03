var config = module.exports;

config["Tests"] = (function () {

    return {
        environment: "node",
        rootPath: "./",
        tests: [
            "**/*-test.js"
        ]
    };
    
}());
