import { z } from "zod";

const dateSchema = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
  message: "Invalid date format! Use YYYY-MM-DD.",
});

const status = z.enum(["completed", "not_completed"]);

/**
 * Schema for the Habit, used for map(localdb)
 */

const habitSchema = z.object({
  id: z.string().uuid(),
  name: z
    .string()
    .min(1, {
      message: "Name is required",
    })
    .max(100, {
      message: "Name must not exceed 100 characters",
    }),
  description: z
    .string()
    .min(3, {
      message: "Description is required",
    })
    .max(4000, {
      message: "Description must not exceed 4000 characters",
    }),
  target_days_per_week: z
    .number()
    .int()
    .min(1, {
      message: "Target days per week must be at least 1",
    })
    .max(7, {
      message: "Target days per week must not exceed 7",
    }),
  completed_days: z.number(),
  completions: z.array(dateSchema),
  status: status,
});

/**
 * Schema for Creating the Habit
 */
const createHabitSchema = habitSchema.omit({
  id: true,
  completed_days: true,
  completions: true,
  status: true,
});

/**
 * Schema for Updating the Habit
 */

const updateHabitSchema = z.object({
  date: dateSchema,
});

/**
 * Schema Types for the various habit posts
 */

type typeHabitSchema = z.infer<typeof habitSchema>;
type typeCreateHabitSchema = z.infer<typeof createHabitSchema>;
type typeUpdateHabitSchema = z.infer<typeof updateHabitSchema>;

export {
  habitSchema,
  createHabitSchema,
  updateHabitSchema,
  typeHabitSchema,
  typeCreateHabitSchema,
  typeUpdateHabitSchema,
};
