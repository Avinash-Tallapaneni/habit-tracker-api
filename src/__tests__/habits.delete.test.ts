import request from "supertest";
import app from "../app";
import { v4 as uuidv4 } from "uuid";
import statusCodes from "../utils/statusCodes";
import { testSuccessCreateHabit } from "../constants/testData";

let habitId: string | undefined = undefined;

beforeAll(async () => {
  const response = await request(app)
    .post("/habits")
    .send(testSuccessCreateHabit);

  habitId = response.body.id;
});

describe("delete habit by delete method in /habits/:id route", () => {
  /**
   * Test case for successful habit deleting
   */

  it("Status 204 No Content:", async () => {
    const response = await request(app).delete(`/habits/${habitId}`);

    expect(response.status).toBe(statusCodes.NO_CONTENT.code);
  });

  /**
   * Test case for failure in deleting habit
   */

  it("404 Not Found: Habit not found.", async () => {
    const invalidHabitID = uuidv4();
    const response = await request(app).delete(`/habits/${invalidHabitID}`);

    expect(response.status).toBe(statusCodes.NOT_FOUND.code);
    expect(response.body.message).toBe(statusCodes.NOT_FOUND.message);
  });
});
