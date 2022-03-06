const Joi = require("@hapi/joi");

/**
 * Method to validate request body
 * @param {string} firstName
 * @param {string} lastName
 * @returns {Object} error
 */
exports.validateRecordBody = ({startDate, endDate, minCount, maxCount})=>{
    const responseObj = {statusCode: 200,error:{message:"",details:[]}};
    const joiSchema = Joi.object({
        startDate: Joi.date().iso().required().messages({
            "string.base": `startDate type should be a string`,
            "any.required": `startDate type is required`,
        }),
        endDate: Joi.date().iso().required().messages({
            "string.base": `endDate type should be a string`,
            "any.required": `endDate type is required`,
        }),
        minCount: Joi.number().required().messages({
            "number.base": `minCount type should be a number`,
            "any.required": `minCount type is required`,
        }),
        maxCount: Joi.number().required().messages({
            "number.base": `maxCount type should be a number`,
            "any.required": `maxCount type is required`,
        }),
    }).options({
        abortEarly: false,
        allowUnknown: false,
      });

    const {error} = joiSchema.validate({startDate, endDate, minCount, maxCount});

    if(error){
        responseObj.statusCode=400;
        responseObj.error.message="Invalid Input";
        error.details.forEach((item)=>{
            const errorDetails = {};
            errorDetails.target = item.context.label;
            errorDetails.message = item.message.replace(/"/g, "'");
            responseObj.error.details.push(errorDetails);
        })
    }

    return responseObj;
}
