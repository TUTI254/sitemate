import { z } from 'zod';

// Zod schema for issue validation
const IssueSchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
  });

  export default IssueSchema;