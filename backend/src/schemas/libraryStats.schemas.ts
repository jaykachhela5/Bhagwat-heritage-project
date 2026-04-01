import { z } from "zod";

export const libraryStatsSchema = z.object({
  totalBooks: z.number().int().nonnegative().optional(),
  totalUsers: z.number().int().nonnegative().optional(),
  studentsBenefited: z.number().int().nonnegative().optional(),
  activeMembers: z.number().int().nonnegative().optional(),
});
