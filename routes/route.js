const { REQUEST_METHOD } = require("../common/constants");
const RecordController = require("../controller/record.controller");


class RouteManager{
    static recordController = new RecordController();

    static getAppRoutes(){
        return[
            {
                path: '/records',
                method: REQUEST_METHOD.POST,
                action: this.recordController.fetchRecordService
            }
        ]
    }
}

module.exports = RouteManager;

