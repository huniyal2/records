class ResponseStruture {
    api = {
        code: "",
        msg: "",
    };
}

class errorResponse extends ResponseStruture {
    constructor(result, res) {
        super();
        this.api.code = result.statusCode || 400;
        this.api.msg = result.error;
        res.status(result.statusCode);

        return res.json(this.api);
    }
}

class successResponse extends ResponseStruture {
    constructor(result, res) {
        super();
        this.api.code = result.statusCode;
        this.api.msg = "Success";
        this.api.records = result.records;
        res.status(result.statusCode);

        return res.json(this.api);
    }
}

exports.responseFactory = class responseFactory {
    createResponse(result, res) {
        if (result.statusCode == 200) {
            return new successResponse(result, res);
        }

        return new errorResponse(result, res);
    }
}

