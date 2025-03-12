export enum HttpCode {
    OK = 200,
    CREATED = 201,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
}

export enum Message {
    ADMIN_IS_UNIQUE = "Only one Admin exists",
    SOMETHING_WENT_WRONG = "Something went wrong!",
    NO_DATA_FOUND = "No data been found!",
    CREATE_FAILED = "Create is failed!",
    UPDATE_FAILED = "Update got failed!",
    NO_MEMBER_NICK = "No member found under this nick!",
    BLOCKED_USER = "You have been blocked, please contact restaurant!",
    USED_NICK_PHONE = "Already inserted nick or number!",
    WRONG_PASSWORD = "Wrong password, please try again!",
    NOT_AUTHENTICATED = "You are not authenticated, Please login first!",
    TOKEN_CREATION_FAILED = "Token creation error!",
}

class Errors extends Error {
    public code: HttpCode;
    public message: Message;

    static standard = {
        code: HttpCode.INTERNAL_SERVER_ERROR,
        message: Message.SOMETHING_WENT_WRONG,
    }

    constructor(statusCode: HttpCode, statusMessage: Message) {
        super();
        this.code = statusCode;
        this.message = statusMessage;
    }
}

export default Errors;