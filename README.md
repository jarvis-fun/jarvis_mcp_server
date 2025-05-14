# 🧠 Jarvis MCP Server

**Jarvis MCP Server** is a custom [Model Context Protocol (MCP)](https://modelcontextprotocol.org) implementation built with **NestJS** and **Socket.IO**. It enables real-time blockchain analytics and tool access for local LLMs such as Claude.

---

## 🚀 Features

* 🔌 Real-time WebSocket communication
* 🧩 Seamless integration with Claude Desktop (Mac & Windows)
* ✅ Zod-based schema validation for tools
* 🔐 Supports public JWT token with built-in call limits (e.g., 50 calls max)

---

## 🛠️ Registered Tools

| Tool                          | Description                                          | Parameters                                                                                          |
| ----------------------------- | ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `getTokenPrice`               | Get the price of a token and circulating supply      | `accountId` *(string, required)*                                                                    |
| `getTokenReserve`             | Get the reserve and liquidity of a token             | `accountId` *(string, required)*                                                                    |
| `getTokenPriceChange`         | Get the price change of a token in the last 24 hours | `accountId` *(string, required)*                                                                    |
| `getLiquidityAddRemoveInPool` | Get the liquidity add/remove in pool of a token      | `poolAddress` *(string, optional)*, `limit` *(number, optional)*                                    |
| `getMostTradedToken`          | Get the most traded token in the last 24 hours       | `limit` *(number, optional)*                                                                        |
| `getWhalesBuySell`            | Get the whale buy/sell activity of a token           | `accountId` *(string, optional)*, `limit` *(number, optional)*, `timeInterval` *(number, optional)* |
| `getMostProfitableTrades`     | Get the most profitable trades                       | `limit` *(number, optional)*                                                                        |
| `getTradingVolume`            | Get the trading volume of a token                    | `limit` *(number, optional)*, `timeInterval` *(number, optional)*                                   |

---

## 🧩 Integration with Claude Desktop App

You don't need to know how to code. Just update the Claude configuration file to connect!

### 📦 macOS Example Configuration

Edit Claude’s `config.json` file (typically found in Claude app folder):

```json
{
  "mcpServers": {
    "jarvisMcpServer": {
      "command": "node",
      "args": [
        "/Users/yourUsername/path/to/dist/main.js"
      ],
      "port": 3000
    },
  }
}
```

### 🪟 Windows Example Configuration

Update with proper Windows paths in `config.json`:

```json
{
  "mcpServers": {
    "jarvisMcpServer": {
      "command": "node",
      "args": [
        "C:/Users/yourUsername/path/to/dist/main.js"
      ],
      "port": 3000
    }
  }
}
```

> 💡 Claude will automatically detect and list the tools registered in your Jarvis MCP server.

---

## ⚙️ Getting Started

```bash
# Clone the repository
$ git clone https://github.com/your-org/jarvis-mcp-server.git

# Navigate to the project directory
$ cd jarvis-mcp-server

# Install dependencies
$ npm install

# Build the project
$ npm run build

# Start the server
$ node dist/main.js
```

## Contact Us

If you're interested in purchasing a **monthly token** for **unlimited queries** or if you have any questions, feel free to contact us. Our support team is happy to assist you!

📧 **Email:** [support@jarvis.fun](mailto:support@jarvis.fun)

We will get back to you as soon as possible with the details for accessing the unlimited query plan.

Thank you for choosing **Jarvis MCP Server**!


---

## 🔐 Usage Token (Public JWT)

A JWT token is required to access the server. This token:

* Is provided publicly
* Allows up to **50 tool calls**
* Expires automatically after limit is reached

No setup required — just plug the token into your app and start asking questions!

---

