import { NextFunction, Request, Response } from "express";
import {
  createHabitSchema,
  typeCreateHabitSchema,
  typeHabitSchema,
  updateHabitSchema,
} from "../validators/habitValidator";
import statusCodes from "../utils/statusCodes";
import { v4 as uuidv4 } from "uuid";
import serverConfig from "../config/config";

const habitsDBLocal: Map<string, typeHabitSchema> = new Map();

/**
 * creating the habit with  name, description, target_days_per_week
 */

const createHabit = (req: Request, res: Response, next: NextFunction) => {
  try {
    // Validating and parse the request body

    const habitData: typeCreateHabitSchema = createHabitSchema.parse(req.body);
    const id = uuidv4();

    // Creating new habit

    const newHabit: typeHabitSchema = {
      id,
      ...habitData,
      completed_days: 0,
      completions: [],
      status: "not_completed",
    };

    // Adding habit to inmmemory storage

    habitsDBLocal.set(id, newHabit);

    //removing completed_days, completions, status , as its not required in response

    const { completed_days, completions, status, ...habitResponse } = newHabit;

    console.log("habitsDBLocalCreate", habitsDBLocal);

    res.status(statusCodes.CREATED.code).json({
      ...habitResponse,
      message: "Habit created successfully.",
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling

    next(error);
  }
};

/**
 * updating the habit with id and required body
 */

const updateHabit = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params.id, "req.params");
    const { id } = req.params;
    const { date } = updateHabitSchema.parse(req.body);

    const habit = habitsDBLocal.get(id);

    //checking if habit exists

    if (!habit) {
      return res.status(statusCodes.NOT_FOUND.code).json({
        message: statusCodes.NOT_FOUND.message,
      });
    }

    //checking if the date in habit exists

    if (habit.completions.includes(date)) {
      return res.status(statusCodes.CONFLICT.code).json({
        message: statusCodes.CONFLICT.message,
      });
    }

    // pushing the date  and updating the  completed days

    habit.completions.push(date);
    habit.completed_days += 1;

    //if completed days is greater or eqal then setting status to completed

    if (habit.completed_days >= habit.target_days_per_week) {
      habit.status = "completed";
    }

    // Saving the updated habit back to the local database

    habitsDBLocal.set(id, habit);

    // console.log("habitsDBLocal", habitsDBLocal);

    return res.status(statusCodes.CREATED.code).json({
      id: habit.id,
      date,
      message: "Completion logged successfully.",
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling

    next(error);
  }
};

/**
 * deleteing the habit with id
 */

const deleteHabit = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const habit = habitsDBLocal.get(id);

    //checking if habit exists

    if (!habit) {
      return res.status(statusCodes.NOT_FOUND.code).json({
        message: statusCodes.NOT_FOUND.message,
      });
    }

    habitsDBLocal.delete(id);

    console.log("habitsDBLocalDelete", habitsDBLocal);

    return res.status(statusCodes.NO_CONTENT.code).json({
      message: statusCodes.NO_CONTENT.message,
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling

    next(error);
  }
};

/**
 * get all habits
 */

const getHabit = (req: Request, res: Response, next: NextFunction) => {
  try {
    /**
     * Converting the string query params into Number
     */

    const {
      page = serverConfig.page,
      limit = serverConfig.limit,
      status,
      name,
    } = req.query;

    const validatePage = Number(page);
    const validateLimit = Number(limit);

    if (
      !validatePage ||
      validatePage < 1 ||
      !validateLimit ||
      validateLimit < 1
    ) {
      return res.status(statusCodes.BAD_REQUEST.code).json({
        message: statusCodes.BAD_REQUEST.message,
      });
    }

    const habitsArray = Array.from(habitsDBLocal.values());

    const filteredHabits = habitsArray.filter((habit) => {
      const nameMatch =
        !name ||
        habit.name.toLowerCase().includes(name.toString().toLowerCase());
      const statusMatch = !status || habit.status === status;
      return nameMatch && statusMatch;
    });

    /**
     * pagination and limiting
     * for simplicity habit array limit is set to 2
     */

    const startPage = validatePage
      ? (validatePage - 1) * (validateLimit || 2)
      : 0;
    const endPage = startPage + (validateLimit || 2);

    const pagedHabits = filteredHabits.slice(startPage, endPage);

    console.log("pagedHabits", pagedHabits);

    return res.status(statusCodes.OK.code).json({
      habit: pagedHabits,
      total: habitsArray.length,
      page: validatePage,
      limit: validateLimit,
    });
  } catch (error) {
    // Pass the error to the next middleware for centralized error handling

    next(error);
  }
};

export { createHabit, updateHabit, deleteHabit, getHabit };
