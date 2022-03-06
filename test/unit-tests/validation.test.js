const chai = require("chai");
const { expect } = chai;
const { validateRecordBody } = require("../../validations/record.validation");


describe("repo call test cases", () => {
    it("success, validate request body", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            minCount: 2700,
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(200);
        expect(output.error).to.deep.equal( { message: '', details: [] });
    })

    it("error, start date should be in ISO format", async () => {
        const args = {
            startDate: "",
            endDate: "2022-02-05",
            minCount: 2700,
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "startDate",message: "'startDate' must be in ISO 8601 date format"}] });
    })
    it("error, start date is required", async () => {
        const args = {
            endDate: "2022-02-05",
            minCount: 2700,
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "startDate",message: "startDate type is required"}] });
    })
    it("error, end date should be in ISO format", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "abc",
            minCount: 2700,
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "endDate",message: "'endDate' must be in ISO 8601 date format"}] });
    })
    it("error, end date is required", async () => {
        const args = {
            startDate: "2016-01-31",
            minCount: 2700,
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "endDate",message: "endDate type is required"}] });
    })
    it("error, minCount should be a number", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            minCount: "abc",
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "minCount",message: "minCount type should be a number"}] });
    })
    it("error, min count is required", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            maxCount: 3000
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "minCount",message: "minCount type is required"}] });
    })
    it("error, max Count should be a number", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            minCount: 2700,
            maxCount: "abc"
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "maxCount",message: "maxCount type should be a number"}] });
    })
    it("error, max count is required", async () => {
        const args = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            minCount: 2700,
        }
        const output = await validateRecordBody(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["statusCode","error"]);
        expect(output.statusCode).to.equals(400);
        expect(output.error).to.deep.equal( { message: "Invalid Input", details: [{target: "maxCount",message: "maxCount type is required"}] });
    })

})