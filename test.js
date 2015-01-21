"use strict";
var it 			= require("it"),
    assert 		= require("assert"),
    patterns 	= require("nools/lib/pattern"),
    constraints = require("nools/lib/constraint"),
    declare 	= require("nools/docs/examples/browser/assets/declare.js"),
    rules 		= require("nools/lib/rule"),
    nools		= require("nools");

var cb = function () {

};

it.describe("Rule", function (it) {
	it.describe("simple rule", function (it) {

	    var called = 0;
	    var HelloFact = declare({
	        instance: {
	            value: true
	        }
	    });

	    var flow = nools.flow("hello world flow", function (flow) {
	        flow.rule("hello rule", [HelloFact, "h"], function () {
	            called++;
	        });
	    });

	    it.should("call hello world rule", function () {
	        var session = flow.getSession();
	        session.assert(new HelloFact());
	        return session.match().then(function () {
	            assert.equal(called, 1);
	        });
	    });

	});

	it.describe("flow#rule", function (it) {
	    var called = 0;
	    var flow = nools.flow("test flow");
	    it.should("create a rule", function () {
	        flow.rule("test rule", [String, "s", "s == 'hello'"], function () {
	            called++;
	        });
	        assert.isTrue(flow.containsRule("test rule"));
	    });

	    it.should("create a rule with joins properly", function () {
	        flow.rule("test rule2", [
	            [String, "s", "s == 'hello'"],
	            [String, "s2", "s2 == 'world'"],
	            [String, "s3", "s3 == 'Hi'"]
	        ], function () {
	            called++;
	        });
	        assert.isTrue(flow.containsRule("test rule2"));
	    });

	    it.should("create a rules that are dependent on eachother properly", function () {
	        flow.rule("test rule3", [
	            [String, "s", "s == 'hello'"],
	            [String, "s2", "s2 == 'world'"],
	            [String, "s3", "s3 == 'Hi'"]
	        ], function () {
	            called++;
	        });
	        assert.isTrue(flow.containsRule("test rule3"));

	        flow.rule("test rule4", [
	            [String, "s1"],
	            [String, "s2", "s2 == 'world' && s1 == 'hello' "],
	            [String, "s3", "s3 == 'Hi'"],
	            [String, "s4", "s4 == 'what'"],
	            [String, "s5", "s5 == 'for'"]
	        ], function () {
	            called++;
	        });
	        assert.isTrue(flow.containsRule("test rule4"));
	    });

	});

});

