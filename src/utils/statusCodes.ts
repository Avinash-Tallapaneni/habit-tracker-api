interface StatusCode {
  code: number;
  message: string;
}

const statusCodes: Record<string, StatusCode> = {
  OK: { code: 200, message: "OK" },
  CREATED: { code: 201, message: "Created" },
  NO_CONTENT: { code: 204, message: "Habit deleted successfully" },
  BAD_REQUEST: { code: 400, message: "Bad Request" },
  NOT_FOUND: { code: 404, message: "Habit not found" },
  CONFLICT: { code: 409, message: "Completion already logged for this date" },
  INTERNAL_SERVER_ERROR: { code: 500, message: "Internal Server Error" },
};

export default statusCodes;
