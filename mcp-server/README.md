# postvault-mcp

MCP server exposing your PostVault library to AI agents (Claude, ChatGPT, Cursor, Codex) over stdio.

## Setup

```bash
cd mcp-server
npm install
npm run build
```

Generate an API key at `/app/developer` in your PostVault account, then add this to your MCP
client config (e.g. Claude Desktop `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "postvault": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"],
      "env": {
        "POSTVAULT_API_KEY": "pv_live_...",
        "POSTVAULT_API_BASE": "https://your-deployed-site.netlify.app/api/v1"
      }
    }
  }
}
```

## Tools

- `search_saved_posts({ query?, limit? })`
- `get_post({ postId })`
- `create_draft({ content })`
