import request from "supertest";
import app from "../app";
import { testSuccessCreateHabit } from "../constants/testData";
import statusCodes from "../utils/statusCodes";
import { version } from "uuid";

describe("create habit by post method in /habits route", () => {
  /**
   * Test case for sucessful habit creationg
   */

  it("should create a new habit and return 201 status", async () => {
    const response = await request(app)
      .post("/habits")
      .send(testSuccessCreateHabit);

    // Check for success status code and other porperty

    expect(response.status).toBe(statusCodes.CREATED.code);
    expect(version(response.body.id)).toBe(4);
    expect(response.body.name).toBe(testSuccessCreateHabit.name);
    expect(response.body.description).toBe(testSuccessCreateHabit.description);
    expect(response.body.target_days_per_week).toBe(
      testSuccessCreateHabit.target_days_per_week
    );
    expect(response.body.message).toBe("Habit created successfully.");
  });

  /**
   * Test case for failure habit creation
   * when all fields are missing
   */

  it("400 Bad Request: Invalid input data.fields datatype is wrong ", async () => {
    const response = await request(app).post("/habits").send({});

    // Check for failure 400 status code

    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);
    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid input data",
      errors: [
        {
          path: ["name"],
          message: "Required",
        },
        {
          path: ["description"],
          message: "Required",
        },
        {
          path: ["target_days_per_week"],
          message: "Required",
        },
      ],
    });
  });

  /**
   * Test case for failure habit creation
   * when one of the fields is missing
   */

  it("400 Bad Request: Invalid input data. fields are missing ", async () => {
    const { target_days_per_week, ...remainingHabitData } =
      testSuccessCreateHabit;

    const response = await request(app)
      .post("/habits")
      .send(remainingHabitData);

    // Check for failure 400 status code

    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);
    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid input data",
      errors: [
        {
          path: ["target_days_per_week"],
          message: "Required",
        },
      ],
    });
  });

  /**
   * Test case for failure habit creation
   * when one of the fields datatype is wrong
   */

  it("400 Bad Request: Invalid input data.fields datatype is wrong   ", async () => {
    const invalidHabitData = { ...testSuccessCreateHabit, description: 5 };
    const response = await request(app).post("/habits").send(invalidHabitData);

    // Check for failure 400 status code

    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);
    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid input data",
      errors: [
        {
          path: ["description"],
          message: "Expected string, received number",
        },
      ],
    });
  });

  /**
   * Test case for failure habit creation
   * when one of the fields exceeds the limit
   */

  it("400 Bad Request: Invalid input data. fields length exceed  ", async () => {
    const lengthExceedHabitData = {
      ...testSuccessCreateHabit,
      name: "lenght exceed".repeat(100),
    };
    const response = await request(app)
      .post("/habits")
      .send(lengthExceedHabitData);

    // Check for failure 400 status code

    expect(response.status).toBe(statusCodes.BAD_REQUEST.code);
    expect(response.body).toMatchObject({
      success: false,
      message: "Invalid input data",
      errors: [
        {
          path: ["name"],
          message: "Name must not exceed 100 characters",
        },
      ],
    });
  });
});
