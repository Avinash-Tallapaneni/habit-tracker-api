import request from "supertest";
import app from "../app";
import {
  testSuccessCreateHabit,
  testSuccessUpdateHabit,
} from "../constants/testData";

import { v4 as uuidv4 } from "uuid";
import statusCodes from "../utils/statusCodes";

let habitId: string | undefined = undefined;

beforeAll(async () => {
  const response = await request(app)
    .post("/habits")
    .send(testSuccessCreateHabit);

  habitId = response.body.id;
});

describe("update habit by post method in /habits/:id/log route", () => {
  /**
   * Test case for successful habit updating
   */

  it("201 Created: Completion logged successfully.", async () => {
    const response = await request(app)
      .post(`/habits/${habitId}/log`)
      .send(testSuccessUpdateHabit.validDate);

    expect(response.status).toBe(statusCodes.CREATED.code);
    expect(response.body).toMatchObject({
      id: habitId,
      date: testSuccessUpdateHabit.validDate.date,
      message: "Completion logged successfully.",
    });
  });

  /**
   * Test case for failure in habit updating
   */

  it("400 Bad Request: Invalid date format.", async () => {
    const response = await request(app)
      .post(`/habits/${habitId}/log`)
      .send(testSuccessUpdateHabit.invalidDate);

    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);

    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid input data",
      errors: [
        {
          path: ["date"],
          message: "Invalid date format! Use YYYY-MM-DD.",
        },
      ],
    });
  });

  /**
   * Test case for failure in habit updating
   */

  it("404 Not Found: Habit not found.", async () => {
    const invalidHabitID = uuidv4();
    const response = await request(app)
      .post(`/habits/${invalidHabitID}/log`)
      .send(testSuccessUpdateHabit.validDate);

    expect(response.status).toBe(statusCodes.NOT_FOUND.code);
    expect(response.body).toMatchObject({
      message: "Habit not found",
    });
  });

  /**
   * Test case for failure in habit updating
   */

  it("409 Conflict: Completion already logged for this date.", async () => {
    await request(app)
      .post(`/habits/${habitId}/log`)
      .send(testSuccessUpdateHabit.validDate);

    const response = await request(app)
      .post(`/habits/${habitId}/log`)
      .send(testSuccessUpdateHabit.validDate);

    expect(response.status).toBe(statusCodes.CONFLICT.code);
    expect(response.body.message).toBe(statusCodes.CONFLICT.message);
  });
});
