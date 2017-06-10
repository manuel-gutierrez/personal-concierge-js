
let  chai = require('chai');
let  expect = chai.expect;
const keys = require('./../../keys.js');
const k = keys();
const test = require('./../../src/classes/first_test');
 

describe('#test  create a new object. ', () => {
	
	it('should create a new object with a', ()=>{
		let t = new test("sdasdad"); 
	    expect(t.hello).to.eql("sdasdad");
	})

	it("should return a new method", () => {
		let t = new test("sdasdasdsa");
		let a = t.hola();
		expect(a).to.not.be.undefined;
	})
});