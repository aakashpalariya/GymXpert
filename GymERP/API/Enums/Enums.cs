namespace API.Constants
{

    public enum StatusCodeEnum
    {
        // Success Codes
        OK = 200,
        Created = 201,
        Accepted = 202,
        NoContent = 204,

        // Client Error Codes
        BadRequest = 400,
        Unauthorized = 401,
        Forbidden = 403,
        NotFound = 404,
        MethodNotAllowed = 405,

        // Server Error Codes
        InternalServerError = 500,
        NotImplemented = 501,
        BadGateway = 502,
        ServiceUnavailable = 503
    }

}
