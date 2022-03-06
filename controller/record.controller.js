const  RecordRepo = require("../repository/record.repo");
const recordValidation  = require("../validations/record.validation");
const { responseFactory } = require("../common/response");



class RecordController {

    /**
 * Method to validate request body
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} response
 */

    async fetchRecordService(req, res) {
        const response = new responseFactory();
        const recordRepo = new RecordRepo();
        const dberror = { statusCode: 400, error: { message: "Invalid Input", details: [] } };
        try {
            const responseResult = { statusCode: 200};
            const validateRequest = recordValidation.validateRecordBody(req.body); 
            if(validateRequest.statusCode == 400){
                return response.createResponse(validateRequest, res);
            }
            const result = await recordRepo.fetchRecords(req.body);
            if (result.error) {
                dberror.statusCode = 400;
                dberror.error.message = result.error;
                return response.createResponse(dberror, res);
            }
            responseResult.records = result.result;
            return response.createResponse(responseResult, res);
        }
        catch (error) {
            dberror.statusCode = 500;
            dberror.error.message = error;
            return response.createResponse(dberror, res);
        }
    }
}
module.exports = RecordController;