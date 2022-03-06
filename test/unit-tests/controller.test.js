const chai = require("chai");
const { expect } = chai;
const sinon = require("sinon");
const RecordController = require("../../controller/record.controller");
const recordValidation = require("../../validations/record.validation");
const RecordRepo =  require("../../repository/record.repo");
let record;
let mockResponse;
let mockRequest;
let recordRepo;

describe("controller function test starts",()=>{
    before("create record controller class object",()=>{
        record = new RecordController();
        mockRequest = (body) => {
            const req = {};
            req.body = body;
            return req;
          };
    })
    it("success, record controller fetch record service function",async()=>{
        const  body = {
            startDate:"2016-01-31",
            endDate:"2022-02-05",
            minCount:2700,
            maxCount:3000
        }
        mockResponse = () => {
            const res = {};
            res.status = sinon.mock().withArgs(200).once().returns(res);
            res.json = sinon.mock().once().returns(res);
            return res;
          };
        const req = mockRequest(body);
        const res = mockResponse();
        const validateRecord =  sinon.mock(recordValidation);
        validateRecord.expects("validateRecordBody").withArgs(req.body).once().returns({statusCode: 200,error:{message:"",details:[]}});
        const dbFetch = sinon.mock(RecordRepo.prototype);
        dbFetch.expects("fetchRecords").withArgs(req.body).once().returns({key:"abc", createdAt: "2022-03-06", totalCount: 100 });
        await record.fetchRecordService(req, res);
        validateRecord.verify();
        res.status.verify();
        res.json.verify();
        dbFetch.verify();
        validateRecord.restore();
        dbFetch.restore();
    })
    it("error, validation error",async()=>{
        const  body = {
            startDate: "2016-01-31",
            endDate: "2022-02-05",
            minCount: 2700,
        }
        mockResponse = () => {
            const res = {};
            res.status = sinon.mock().withArgs(400).once().returns(res);
            res.json = sinon.mock().once().returns(res);
            return res;
          };
        const req = mockRequest(body);
        const res = mockResponse();
        const validateRecord =  sinon.mock(recordValidation);
        validateRecord.expects("validateRecordBody").withArgs(req.body).once().returns({statusCode: 400,error:[{ message: "Invalid Input", details: [{target: "maxCount",message: "maxCount type is required"}] }]});
        await record.fetchRecordService(req, res);
        res.status.verify();
        validateRecord.verify();
        validateRecord.restore();
    })
    it("error, from repo call",async()=>{
        const  body = {
            startDate:"2016-01-31",
            endDate:"2022-02-05",
            minCount:2700,
            maxCount:3000
        }
        mockResponse = () => {
            const res = {};
            res.status = sinon.mock().withArgs(400).once().returns(res);
            res.json = sinon.mock().once().returns(res);
            return res;
          };
        const req = mockRequest(body);
        const res = mockResponse();
        const validateRecord =  sinon.mock(recordValidation);
        validateRecord.expects("validateRecordBody").withArgs(req.body).once().returns({statusCode: 200,error:{message:"",details:[]}});
        const dbFetch = sinon.mock(RecordRepo.prototype);
        dbFetch.expects("fetchRecords").withArgs(req.body).once().returns({error: "error from repo call"});
        await record.fetchRecordService(req, res);
        validateRecord.verify();
        res.status.verify();
        res.json.verify();
        dbFetch.verify();
        validateRecord.restore();
        dbFetch.restore();
    })
})
