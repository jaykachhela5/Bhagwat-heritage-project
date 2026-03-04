import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi,
} from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

extendZodWithOpenApi(z);

import { signupSchema, loginSchema } from "../schemas/auth.schemas";
import { contactSchema } from "../schemas/contact.schemas";
import { donationSchema } from "../schemas/donation.schemas";
import { donorSchema } from "../schemas/donor.schemas";
import { volunteerCreateSchema, volunteerStatusSchema } from "../schemas/volunteer.schemas";
import { bookSchema } from "../schemas/book.schemas";
import { issueSchema } from "../schemas/issue.schemas";
import { memberSchema } from "../schemas/member.schemas";
import { devoteeSchema } from "../schemas/devotee.schemas";
import { joinSchema } from "../schemas/involved.schemas";
import { admissionSchema } from "../schemas/pathshala.schemas";

const registry = new OpenAPIRegistry();

/* ─── Security ─────────────────────────────────────────────────────────────── */

const bearerAuth = registry.registerComponent("securitySchemes", "bearerAuth", {
  type: "http",
  scheme: "bearer",
  bearerFormat: "JWT",
});

/* ─── Shared response schemas ───────────────────────────────────────────────── */

const MessageResponse = z.object({ message: z.string() });
const IdParam = z.object({ id: z.string().min(1).describe("MongoDB ObjectId") });

/* ─── Auth ──────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/auth/signup",
  summary: "Register a new user",
  tags: ["Auth"],
  request: {
    body: { content: { "application/json": { schema: signupSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Signup successful",
      content: { "application/json": { schema: MessageResponse } },
    },
    400: { description: "User already exists" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/auth/login",
  summary: "Login and receive JWT token",
  tags: ["Auth"],
  request: {
    body: { content: { "application/json": { schema: loginSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Login result",
      content: {
        "application/json": {
          schema: z.union([
            z.object({ success: z.literal(false) }),
            z.object({
              success: z.literal(true),
              name: z.string(),
              token: z.string(),
              role: z.string(),
            }),
          ]),
        },
      },
    },
  },
});

/* ─── Contact ───────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/contact",
  summary: "Submit a contact message",
  tags: ["Contact"],
  request: {
    body: { content: { "application/json": { schema: contactSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Message sent",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Donations ─────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/donations",
  summary: "Record a donation",
  tags: ["Donations"],
  request: {
    body: { content: { "application/json": { schema: donationSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Donation saved",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/donations",
  summary: "Get all donations",
  tags: ["Donations"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: {
      description: "List of donations",
      content: {
        "application/json": {
          schema: z.array(donationSchema.extend({ _id: z.string(), status: z.string(), createdAt: z.string() })),
        },
      },
    },
  },
});

/* ─── Donor ─────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/donor/donor",
  summary: "Submit donor details",
  tags: ["Donor"],
  request: {
    body: { content: { "application/json": { schema: donorSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Donor record saved",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Volunteers ─────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/volunteers/create",
  summary: "Submit volunteer application",
  tags: ["Volunteers"],
  request: {
    body: { content: { "application/json": { schema: volunteerCreateSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Application submitted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/volunteers/all",
  summary: "Get all volunteer applications",
  tags: ["Volunteers"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "List of volunteers" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/volunteers/{id}",
  summary: "Get volunteer by ID",
  tags: ["Volunteers"],
  request: { params: IdParam },
  responses: {
    200: { description: "Volunteer record" },
    404: { description: "Not found" },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/volunteers/status/{id}",
  summary: "Update volunteer application status",
  tags: ["Volunteers"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    params: IdParam,
    body: { content: { "application/json": { schema: volunteerStatusSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Status updated",
      content: { "application/json": { schema: MessageResponse } },
    },
    404: { description: "Not found" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/volunteers/delete/{id}",
  summary: "Soft-delete a volunteer application",
  tags: ["Volunteers"],
  security: [{ [bearerAuth.name]: [] }],
  request: { params: IdParam },
  responses: {
    200: {
      description: "Deleted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Books ─────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "get",
  path: "/api/books",
  summary: "Get all books",
  tags: ["Library"],
  responses: {
    200: { description: "List of books" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/books",
  summary: "Add a book to the library",
  tags: ["Library"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: { content: { "application/json": { schema: bookSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Book added",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/books/{id}",
  summary: "Delete a book",
  tags: ["Library"],
  security: [{ [bearerAuth.name]: [] }],
  request: { params: IdParam },
  responses: {
    200: {
      description: "Book deleted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Issue (Book lending) ───────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/issue",
  summary: "Issue a book to a student",
  tags: ["Library"],
  request: {
    body: { content: { "application/json": { schema: issueSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Book issued",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/issue",
  summary: "Get all issued books",
  tags: ["Library"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "List of issued books" },
  },
});

/* ─── Members ───────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/members",
  summary: "Register a new member",
  tags: ["Members"],
  request: {
    body: { content: { "application/json": { schema: memberSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Member added",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/members",
  summary: "Get all members",
  tags: ["Members"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "List of members" },
  },
});

/* ─── Devotee ───────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/devotee",
  summary: "Submit devotee seva form",
  tags: ["Devotee"],
  request: {
    body: { content: { "application/json": { schema: devoteeSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Form submitted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Get Involved ──────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/involved/join",
  summary: "Submit a join / get-involved application",
  tags: ["Involved"],
  request: {
    body: { content: { "application/json": { schema: joinSchema } }, required: true },
  },
  responses: {
    200: {
      description: "Application saved",
      content: {
        "application/json": {
          schema: z.object({ success: z.boolean(), message: z.string() }),
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/involved",
  summary: "Get all join applications",
  tags: ["Involved"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "List of applications" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/involved/{id}",
  summary: "Delete a join application",
  tags: ["Involved"],
  security: [{ [bearerAuth.name]: [] }],
  request: { params: IdParam },
  responses: {
    200: {
      description: "Deleted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Pathshala ─────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/pathshala",
  summary: "Submit Pathshala admission form",
  tags: ["Pathshala"],
  request: {
    body: { content: { "application/json": { schema: admissionSchema } }, required: true },
  },
  responses: {
    201: {
      description: "Admission submitted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/pathshala",
  summary: "Get all Pathshala students",
  tags: ["Pathshala"],
  security: [{ [bearerAuth.name]: [] }],
  responses: {
    200: { description: "List of students" },
  },
});

/* ─── Events ─────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "get",
  path: "/api/events",
  summary: "Get all events",
  tags: ["Events"],
  responses: {
    200: { description: "List of events" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/events",
  summary: "Create an event (with image upload)",
  tags: ["Events"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            title: z.string().min(1),
            peopleServed: z.string().optional().describe("Number of people served"),
            image: z.string().describe("Image file (binary)"),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: "Event created" },
  },
});

registry.registerPath({
  method: "post",
  path: "/api/events/register",
  summary: "Register for an event",
  tags: ["Events"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({ eventId: z.string(), name: z.string(), email: z.string().email() }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: {
      description: "Registered",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Gallery ────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/gallery/upload",
  summary: "Upload an image to the gallery",
  tags: ["Gallery"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({ image: z.string().describe("Image file (binary)") }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: "Uploaded successfully" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/gallery",
  summary: "Get all gallery images",
  tags: ["Gallery"],
  responses: {
    200: { description: "List of images" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/gallery/{id}",
  summary: "Delete a gallery image",
  tags: ["Gallery"],
  security: [{ [bearerAuth.name]: [] }],
  request: { params: IdParam },
  responses: {
    200: {
      description: "Deleted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Media ──────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "post",
  path: "/api/media/upload",
  summary: "Upload media files (multi-image)",
  tags: ["Media"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        "multipart/form-data": {
          schema: z.object({
            images: z.array(z.string()).describe("Image files (binary, max 10)"),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: "Media uploaded" },
  },
});

registry.registerPath({
  method: "get",
  path: "/api/media/media",
  summary: "Get paginated media list",
  tags: ["Media"],
  request: {
    query: z.object({
      page: z.string().optional().describe("Page number (default 1)"),
      search: z.string().optional().describe("Search by filename"),
    }),
  },
  responses: {
    200: { description: "Paginated media response" },
  },
});

registry.registerPath({
  method: "delete",
  path: "/api/media/{id}",
  summary: "Delete a media file",
  tags: ["Media"],
  security: [{ [bearerAuth.name]: [] }],
  request: { params: IdParam },
  responses: {
    200: {
      description: "Deleted",
      content: { "application/json": { schema: MessageResponse } },
    },
  },
});

/* ─── Mandir ─────────────────────────────────────────────────────────────────── */

registry.registerPath({
  method: "get",
  path: "/api/mandir",
  summary: "Get Mandir content",
  tags: ["Mandir"],
  responses: {
    200: { description: "Mandir content" },
  },
});

registry.registerPath({
  method: "put",
  path: "/api/mandir",
  summary: "Update Mandir content",
  tags: ["Mandir"],
  security: [{ [bearerAuth.name]: [] }],
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            title: z.string().optional(),
            subtitle: z.string().optional(),
            about: z.string().optional(),
            morningTime: z.string().optional(),
            afternoonTime: z.string().optional(),
            eveningTime: z.string().optional(),
          }),
        },
      },
      required: true,
    },
  },
  responses: {
    200: { description: "Mandir content updated" },
  },
});

/* ─── Cultural & Spiritual ───────────────────────────────────────────────────── */

const contentSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
});

for (const [tag, basePath] of [
  ["Cultural", "/api/cultural"],
  ["Spiritual", "/api/spiritual"],
] as const) {
  registry.registerPath({
    method: "get",
    path: basePath,
    summary: `Get all ${tag.toLowerCase()} content`,
    tags: [tag],
    responses: { 200: { description: `${tag} content list` } },
  });

  registry.registerPath({
    method: "post",
    path: basePath,
    summary: `Add ${tag.toLowerCase()} content`,
    tags: [tag],
    security: [{ [bearerAuth.name]: [] }],
    request: {
      body: { content: { "application/json": { schema: contentSchema } }, required: true },
    },
    responses: { 200: { description: "Content added" } },
  });
}

/* ─── Generate ───────────────────────────────────────────────────────────────── */

export function generateOpenAPI() {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      title: "Bhagwat Heritage Service Foundation Trust — API",
      version: "1.0.0",
      description:
        "Complete REST API for the Bhagwat Heritage project. " +
        "Authentication uses Bearer JWT tokens obtained from POST /api/auth/login.",
      contact: {
        name: "Bhagwat Heritage",
        email: "info@bhagwatheritage.org",
      },
    },
    servers: [
      { url: "http://localhost:5000", description: "Local development" },
    ],
  });
}
