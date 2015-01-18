var nools 			= require ('nools');
var ruleFilePath 	= __dirname + "/rules/rules.nools";
var flow 			= nools.compile (ruleFilePath);
var session 		= flow.getSession ();
 
var Payment = flow.getDefined ("payment");
 
session.assert (new Payment ("physical product"));
session.assert (new Payment ("book"));
session.assert (new Payment ("membership"));
session.assert (new Payment ("upgrade"));
session.assert (new Payment ("video", "Learning to Ski"));
 
session.match();