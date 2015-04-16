var expect = require("expect.js");
var jsonHandler = require(__filename.replace(/test/, "src").replace(/-test.js$/, ".js"));

describe("jsonHandler", function () {

    it("getExtension", function () {
        var actual = jsonHandler.getExtension();
        var expected = "json";
        
        expect(actual).to.be(expected);
    });

    it("findMatch object", function () {
        var requestJSON = {
            "foo": "foo",
            "bar": true
        };
        
        var expected = {
            "foo": "foo",
            "bar": "bar"
        };
        
        
        var request = JSON.stringify(requestJSON);
        
        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);
        expect(response.response).to.eql(JSON.stringify(expected));
    });

    it("empty query string", function () {
        var requestJSON = "";

        var expected = {
            "foo": "foo",
            "bar": "bar"
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);
        expect(response.response).to.eql(JSON.stringify(expected));        
    });

    it("query string", function () {
        var requestJSON = "a=b&c=d";

        var expected = "true";

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);
        expect(response.response).to.eql(JSON.stringify(expected));        
    });

    it("wildcard request", function () {
        var requestJSON = {
            "wildcard": true
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);
        expect(response.response).to.eql(request);        
    });

    it("complex wildcard request", function () {
        var requestJSON = {
            "household": {
                "children": 1,
                "alimonyBenefit": 102.83333333333333,
                "alimony": 1000
            },
            "contactPerson": "Tomas Andersson",
            "notes": {"value" : 1000}
        };

        var expected = {
            "value" : 1000,
            "object" : {"value" : 1000}
        };

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);

        expect(response.response).to.eql(JSON.stringify(expected));        
    });

    it("array request", function () {
        var requestJSON = [];

        var expected = "match";

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);

        expect(response.response).to.eql(JSON.stringify(expected));        
    });

    it("complex array request", function () {
        var requestJSON = [
            {
                a: 1,
                b: [
                    1, 2, {}
                ]
            }
        ];

        var expected = "match";

        var request = JSON.stringify(requestJSON);

        var response = jsonHandler.findMatch("test", "/handler/regexp/testFiles", request);

        expect(response.response).to.eql(JSON.stringify(expected));        
    });

});
