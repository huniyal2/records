const { recordModel } = require("../models/record");


class RecordRepo {

  constructor(){

  }
/**
 * Method to validate request body
 * @param {Object} req
 * @param {Object} res
 * @returns {Object} response
 */
async fetchRecords({ startDate, endDate, minCount, maxCount }) {
    try {
      const result = await recordModel.aggregate([
        { $addFields: { totalCount: { $sum: "$counts" }, } },
        {
          $match: {
            $and: [
              {
                createdAt: {
                  $gte: new Date(startDate),
                  $lte: new Date(endDate)
                }
              },
              {
                totalCount: {
                  $gte: minCount,
                  $lte: maxCount
                }
              }
            ]
          },
        },
        {
          $project: {
            _id: 0,
            key: 1,
            createdAt: 1,
            totalCount: 1
          }
        }
      ])
      return { result: result };
    }
    catch (error) {
      return { error: error }
    }
  }
}

module.exports =  RecordRepo;