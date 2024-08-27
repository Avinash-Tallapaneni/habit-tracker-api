import request from "supertest";
import app from "../app";
import statusCodes from "../utils/statusCodes";

describe("get habits by get method in /habits route", () => {
  /**
   * Test case for successful return of habits
   */

  it("200 OK: return all habits", async () => {
    const response = await request(app).get("/habits");
    expect(response.status).toBe(statusCodes.OK.code);
  });

  /**
   * Test case for failure return of habits
   */

  it("400 Bad Request: Invalid query parameters.", async () => {
    const response = await request(app).get(
      "/habits?limit=2&page=1&status=not_completeds"
    );
    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);
    expect(response.body.message).toBe(statusCodes.BAD_REQUEST.message);
  });
});
