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
 //    it.describe("#createRule", function (it) {

 //        it.describe("with strings", function (it) {
 //            it.should("create for string", function () {
 //                var rule = rules.createRule("My Rule", ["String", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, String);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for String", function () {
 //                var rule = rules.createRule("My Rule", ["string", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, String);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });


 //            it.should("create for number", function () {
 //                var rule = rules.createRule("My Rule", ["number", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Number);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Number", function () {
 //                var rule = rules.createRule("My Rule", ["Number", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Number);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for date", function () {
 //                var rule = rules.createRule("My Rule", ["date", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Date);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Date", function () {
 //                var rule = rules.createRule("My Rule", ["Date", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Date);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });


 //            it.should("create for array", function () {
 //                var rule = rules.createRule("My Rule", ["array", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Array);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Array", function () {
 //                var rule = rules.createRule("My Rule", ["Array", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Array);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for boolean", function () {
 //                var rule = rules.createRule("My Rule", ["boolean", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Boolean);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Boolean", function () {
 //                var rule = rules.createRule("My Rule", ["Boolean", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Boolean);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for regexp", function () {
 //                var rule = rules.createRule("My Rule", ["regexp", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, RegExp);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Regexp", function () {
 //                var rule = rules.createRule("My Rule", ["RegExp", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, RegExp);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for object", function () {
 //                var rule = rules.createRule("My Rule", ["object", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Object);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Object", function () {
 //                var rule = rules.createRule("My Rule", ["Object", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Object);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for hash", function () {
 //                var rule = rules.createRule("My Rule", ["hash", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Object);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //            it.should("create for Hash", function () {
 //                var rule = rules.createRule("My Rule", ["Hash", "s"], cb);
 //                assert.isNotNull(rule);
 //                assert.lengthOf(rule, 1);
 //                rule = rule[0];
 //                assert.equal(rule.name, "My Rule");
 //                assert.isNotNull(rule.pattern);
 //                var pattern = rule.pattern;
 //                assert.equal(pattern.alias, "s");
 //                assert.lengthOf(pattern.constraints, 2);
 //                assert.instanceOf(pattern.constraints[0], constraints.ObjectConstraint);
 //                assert.equal(pattern.constraints[0].constraint, Object);
 //                assert.instanceOf(pattern.constraints[1], constraints.TrueConstraint);
 //                assert.strictEqual(rule.cb, cb);
 //            });

 //        });
	// });

	// it.describe("nools", function (it) {
	//     it.describe(".flow", function (it) {
	//         it.should("create a flow", function () {
	//             var flow = nools.flow("nools flow");
	//             assert.isNotNull(flow);
	//             assert.instanceOf(flow, nools.Flow);
	//             assert.equal("nools flow", flow.name);
	//             assert.equal(nools.getFlow("nools flow"), flow);
	//         });
	//     });

	//     it.describe(".deleteFlow", function (it) {
	//         it.should("delete a flow by name", function () {
	//             var flow = nools.flow("delete nools flow");
	//             assert.isNotNull(flow);
	//             assert.instanceOf(flow, nools.Flow);
	//             assert.equal("delete nools flow", flow.name);
	//             assert.equal(nools.getFlow("delete nools flow"), flow);

	//             assert.equal(nools.deleteFlow("delete nools flow"), nools);
	//             assert.isUndefined(nools.getFlow("delete nools flow"));

	//         });

	//         it.should("delete a flow using a Flow instance", function () {
	//             var flow = nools.flow("delete nools flow");
	//             assert.isNotNull(flow);
	//             assert.instanceOf(flow, nools.Flow);
	//             assert.equal("delete nools flow", flow.name);
	//             assert.equal(nools.getFlow("delete nools flow"), flow);

	//             assert.equal(nools.deleteFlow(flow), nools);
	//             assert.isUndefined(nools.getFlow("delete nools flow"));

	//         });
	//     });

	//     it.describe(".hasFlow", function (it) {

	//         it.should("return true if the flow exists", function () {
	//             var name = "has flow";
	//             nools.flow(name);
	//             assert.isTrue(nools.hasFlow(name));
	//         });

	//         it.should("return false if the flow does not exists", function () {
	//             assert.isFalse(nools.hasFlow(new Date().toString()));
	//         });
	//     });

	//     it.describe(".deleteFlows", function (it) {

	//         it.should("deleteAllFlows", function () {
	//             var name = "delete nools flows";
	//             nools.flow(name);
	//             assert.isTrue(nools.hasFlow(name));
	//             assert.equal(nools.deleteFlows(), nools);
	//             assert.isFalse(nools.hasFlow(name));
	//         });

	//     });
	// });


});

