#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const API_BASE = process.env.POSTVAULT_API_BASE ?? "http://localhost:3000/api/v1";
const API_KEY = process.env.POSTVAULT_API_KEY;

if (!API_KEY) {
  console.error(
    "Missing POSTVAULT_API_KEY. Generate one at /app/developer in your PostVault account and set it as an env var."
  );
  process.exit(1);
}

async function callApi(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      ...(init?.headers ?? {}),
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`PostVault API error ${res.status}: ${body}`);
  }
  return res.json();
}

const server = new McpServer({ name: "postvault", version: "0.1.0" });

server.registerTool(
  "search_saved_posts",
  {
    title: "Search saved posts",
    description: "Full-text search across the user's saved LinkedIn posts library.",
    inputSchema: {
      query: z.string().optional().describe("Free-text search query"),
      limit: z.number().int().min(1).max(200).optional(),
    },
  },
  async ({ query, limit }) => {
    const params = new URLSearchParams();
    if (query) params.set("query", query);
    if (limit) params.set("limit", String(limit));
    const data = await callApi(`/posts?${params.toString()}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.registerTool(
  "get_post",
  {
    title: "Get a saved post",
    description: "Fetch a single saved post by its id.",
    inputSchema: { postId: z.string().uuid() },
  },
  async ({ postId }) => {
    const data = await callApi(`/posts/${postId}`);
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

server.registerTool(
  "create_draft",
  {
    title: "Create a draft",
    description: "Create a new post draft in the user's PostVault composer.",
    inputSchema: { content: z.string().min(1).max(3000) },
  },
  async ({ content }) => {
    const data = await callApi(`/drafts`, { method: "POST", body: JSON.stringify({ content }) });
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  }
);

const transport = new StdioServerTransport();
await server.connect(transport);
