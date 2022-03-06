const chai = require("chai");
const { expect } = chai;
const { recordModel } = require("../../models/record");
const RecordRepo  = require("../../repository/record.repo");
const sinon = require("sinon");
const args = {
    startDate: "2016-01-31",
    endDate: "2022-02-05",
    minCount: 2700,
    maxCount: 3000
}
let recordRepo;


describe("repo call test cases", () => {
    before("before all", ()=>{
       recordRepo = new RecordRepo();
    })
    it("success, should fetch records", async () => {
        const output = await recordRepo.fetchRecords(args);
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["result"]);
    })

    it("error, should fetch records", async () => {
        const mock = sinon.mock(recordModel)
        mock.expects("aggregate").once().throws("catch error test");
        const output = await recordRepo.fetchRecords(args);
        mock.verify();
        expect(output).to.be.an("Object");
        expect(output).to.have.keys(["error"]);
    })
})