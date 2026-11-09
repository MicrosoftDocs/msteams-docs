---
title: Connect an agent to Teams without an SDK
description: Learn how to connect your agent to Teams without an SDK.
ms.localizationpriority: high
ms.date: 11/06/2026
ms.topic: article
---

# Connect an agent to Teams without an SDK

> [!Warning]
>
> Socket mode is in public preview. It's recommended for developing and testing agents. For agents in production, use an HTTPS endpoint. Preview features can change before general availability.

> [!Note]
>
> We recommend that using the Teams SDK, which implements everything in this article. You can see the configuring guide with Teams SDK, [here](configure-delivery-methods-for-agents.md).

 This article describes the protocol used by the SDK, so you can implement it in another language or framework, or understand what the SDK does. Every agent, whichever delivery method it uses, needs to send requests to Agent Communication Service (ACS). An agent then receives activities either at an HTTPS endpoint or over socket mode.

## Implement ACS request construction

Your agent sends messages and other requests to ACS with the ACS REST API, whichever delivery method it uses.

1. **Get a token.** Use the client credentials of the agent's Microsoft Entra app registration and request the scope `https://api.botframework.com/.default`:

```bash
curl -X POST "https://login.microsoftonline.com/<tenant-id>/oauth2/v2.0/token" \
  -d "grant_type=client_credentials" \
  -d "client_id=<app-id>" \
  -d "client_secret=<client-secret>" \
  -d "scope=https://api.botframework.com/.default"
```

Use your app registration's tenant ID, or `botframework.com` for a multi-tenant registration. Cache the token until shortly before it expires. In socket mode, the same token also authenticates the connect request.

2. **Call the API.** Send requests to the `serviceUrl` of the activity you're responding to, with the token in the `Authorization` header. For example, to reply in a conversation:

```bash
curl -X POST "<serviceUrl>/v3/conversations/<conversation-id>/activities" \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{ "type": "message", "text": "Hello from my agent" }'
```

| To | Call |
| --- | --- |
| Send a message to a conversation | `POST {serviceUrl}/v3/conversations/{conversationId}/activities` |
| Reply to an activity | `POST {serviceUrl}/v3/conversations/{conversationId}/activities/{activityId}` |
| Update a message | `PUT {serviceUrl}/v3/conversations/{conversationId}/activities/{activityId}` |
| Delete a message | `DELETE {serviceUrl}/v3/conversations/{conversationId}/activities/{activityId}` |

For authentication details, see [REST API authentication](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication). For every operation, see the [REST API reference](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference).

## Implement HTTP endpoint activity delivery

With an HTTPS endpoint, ACS sends each activity as an HTTPS `POST` with a JSON [activity](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference) body to the messaging endpoint in your bot registration.

1. **Validate the request.** Every request has an `Authorization: Bearer <token>` header. Before you act on the activity, check that:
   - The token is signed by a key from the OpenID metadata at `https://login.botframework.com/v1/.well-known/openidconfiguration`.
   - The issuer is `https://api.botframework.com`.
   - The audience is your agent's app ID.
   - The token hasn't expired.
   - The token's `serviceUrl` claim matches the activity's `serviceUrl`.

   Reject a request that fails any check with `401 Unauthorized`. For the full procedure, see [Authenticate requests to your bot](/azure/bot-service/rest-api/bot-framework-rest-connector-authentication).
2. **Respond.** For an invoke activity (`"type": "invoke"`), return the invoke response as the HTTP response, with its status code and JSON body. For any other activity, return `200 OK` once you've handled it. Respond within 25 seconds.
3. **Send.** To post messages, use the ACS REST API (see the [previous section](#implement-acs-request-construction)).

## Implement socket mode (WebSocket) activity delivery

In socket mode, your agent opens sockets to ACS and receives activities over them. This section walks through the protocol step by step. The snippets together make a complete Node.js agent.

**What you need:**

- Socket mode turned on in the agent's bot registration (see [Configure the agent's bot registration](configure-delivery-methods-for-agents.md#configure-the-agents-bot-registration)).
- A [SignalR client](/aspnet/core/signalr/client-features) that supports **client results**, that is, returning a value from a handler: [`@microsoft/signalr`](https://www.npmjs.com/package/@microsoft/signalr) for JavaScript, or [`Microsoft.AspNetCore.SignalR.Client`](https://www.nuget.org/packages/Microsoft.AspNetCore.SignalR.Client) for .NET, version 7.0 or later. There's no Microsoft-supported SignalR client for Python. For Python, use the Teams SDK. You can't use a plain WebSocket library unless you implement the SignalR hub protocol yourself.

| Step | What your agent does |
| --- | --- |
| 1 | Calls connect for a region to get a socket URL and token. |
| 2 | Opens the socket with a SignalR client. |
| 3 | Waits for `SocketReady`. |
| 4 | Handles each `Activity` and returns a reply. |
| 5 | Replaces the socket before its token expires. |
| 6 | Reconnects when a socket closes. |
| 7 | Does all of this independently in every region. |

### 1. Call connect

Call the connect endpoint for a region with the agent's token (see [Get a token](#implement-acs-request-construction)):

```http
POST https://botapi.skype.com/{region}/v3/websockets/connect
Authorization: Bearer <token>
Content-Length: 0
```

`{region}` is `amer`, `emea`, or `apac`. A successful response is `200 OK`:

```json
{
  "url": "https://<instance>.service.signalr.net/client/?hub=bothub&asrs.op=...",
  "accessToken": "eyJ0eXAiOiJKV1QiLCJhbGciOi...",
  "expiresIn": 3600,
  "protocolVersion": 1
}
```

| Field | Description |
| --- | --- |
| `url` | The URL to open the socket on. It's different each time; don't store it. |
| `accessToken` | The token for opening **one** socket. Call connect again for every socket, including every reconnect. |
| `expiresIn` | Seconds until the token expires. The socket closes then, so replace it before then (step 5). |
| `protocolVersion` | The version of the socket protocol described here: `1`. |

If the request fails, see the status codes in [Configure delivery method for an agent](configure-delivery-methods-for-agents.md#error-codes). Stop retrying on `401` or `403`, which you need to fix; wait for `Retry-After` on `429`; and retry `503` with backoff.

```javascript
// Node.js 18 or later, as an ES module. npm install @microsoft/signalr
import * as signalR from "@microsoft/signalr";

const APP_ID = process.env.BOT_ID;
const TENANT_ID = process.env.BOT_TENANT_ID;
const CLIENT_SECRET = process.env.BOT_PASSWORD;
const REGIONS = ["amer", "emea", "apac"];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));

async function getToken() {
  // Cache this token until shortly before it expires. It's also used to send messages.
  const res = await fetch(`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: APP_ID,
      client_secret: CLIENT_SECRET,
      scope: "https://api.botframework.com/.default",
    }),
  });
  if (!res.ok) throw new Error(`Token request failed: ${res.status}`);
  return (await res.json()).access_token;
}

async function connect(region, replacesConnectionId) {
  const headers = { authorization: `Bearer ${await getToken()}`, "content-length": "0" };
  if (replacesConnectionId) headers["x-ms-socket-replaces-connection-id"] = replacesConnectionId; // see step 5
  const res = await fetch(`https://botapi.skype.com/${region}/v3/websockets/connect`, { method: "POST", headers });
  if (!res.ok) {
    const error = new Error(`Connect failed: ${res.status} ${await res.text()}`);
    error.status = res.status;
    error.retryAfterSeconds = Number(res.headers.get("retry-after")) || undefined;
    throw error;
  }
  return res.json(); // { url, accessToken, expiresIn, protocolVersion }
}
```

### 2. Open the socket

Open a SignalR connection to `url`, with `accessToken` as its access token. Use the JSON hub protocol, which is the default; MessagePack isn't supported. Turn off the client's automatic reconnect: a reconnect needs a new connect call (step 6).

### 3. Wait for SocketReady

When the socket is ready to receive activities, ACS calls the client method `SocketReady`:

```json
{ "protocolVersion": 1, "botKey": "<app-id>", "connectionId": "7lPN6NbfHjL..." }
```

Save `connectionId`; you need it to replace the socket (step 5). If `SocketReady` doesn't arrive within 30 seconds, stop the socket and connect again.

### 4. Handle activities and reply

ACS calls the client method `Activity` with an **envelope** for each activity, and waits for your handler's return value. That return value, the **reply frame**, goes back to ACS on the same call.

```json
{
  "protocolVersion": 1,
  "type": "invoke",
  "envelopeId": "pod-59ceeb2a:e118ef0dde1f40ebb215369ec9cfda28",
  "botKey": "<app-id>",
  "cv": "2cd725c4867b46b8ac980e8e76b3c855",
  "deadlineMs": 25000,
  "headers": { "x-ms-tenant-id": ["<tenant-id>"], "x-ms-conversation-id": ["19:..."] },
  "payload": { "type": "invoke", "name": "adaptiveCard/action", "value": { "...": "..." }, "serviceUrl": "https://smba.trafficmanager.net/amer/...", "...": "..." }
}
```

| Envelope field | Description |
| --- | --- |
| `protocolVersion` | `1`. |
| `type` | `invoke` for an invoke activity; `activity` for any other activity. |
| `envelopeId` | The ID of this delivery. Return it in your reply. |
| `botKey` | Your agent's app ID. |
| `cv` | A correlation ID. Include it when you report a problem. |
| `deadlineMs` | How long ACS waits for your reply, in milliseconds. |
| `ackRequired` | `true` for any activity that isn't an invoke: return an acknowledgment once you've handled it. Absent for invokes. |
| `headers` | The HTTP headers ACS would send to an HTTPS endpoint (each value is an array), except `Authorization`. |
| `payload` | The activity, exactly as ACS would send it to an HTTPS endpoint. |

You don't need to validate activities on the socket: ACS authenticated your agent when it connected, and only ACS can send on the socket.

Return a reply frame for every envelope, within `deadlineMs`:

```json
{
  "protocolVersion": 1,
  "envelopeId": "pod-59ceeb2a:e118ef0dde1f40ebb215369ec9cfda28",
  "status": 200,
  "body": { "statusCode": 200, "type": "application/vnd.microsoft.activity.message", "value": "Done!" }
}
```

| Reply field | Description |
| --- | --- |
| `protocolVersion` | Required. `1`. |
| `envelopeId` | Required. The `envelopeId` from the envelope. |
| `status` | Required. An HTTP status code. For an invoke, the status of your invoke response. For any other activity, `200` once you've handled it, or `500` if handling failed. |
| `body` | For an invoke, the invoke response body, the JSON your HTTPS endpoint would return. Omit it for other activities. |
| `botKey` | Optional. If you include it, it must be your agent's app ID. |
| `recvAt`, `ts` | Optional. When you received the envelope and when you replied, in milliseconds since the Unix epoch. ACS uses them to measure your agent's processing time. |

ACS treats the delivery as failed if the reply is missing or late, if `protocolVersion` isn't `1`, if `envelopeId` doesn't match, if `botKey` names another agent, or if `status` isn't a valid HTTP status code (100-599). For an invoke, the user then sees an error.

ACS doesn't wait for one reply before sending the next activity on the same socket, so handle activities concurrently.

```javascript
async function openSocket(region, handleActivity, replacesConnectionId) {
  const session = await connect(region, replacesConnectionId);
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(session.url, { accessTokenFactory: () => session.accessToken })
    .build(); // JSON protocol; default keep-alive (15 s) and server timeout (30 s); no automatic reconnect

  let inFlight = 0;
  let onReady;
  const ready = new Promise((resolve) => (onReady = resolve));
  const closed = new Promise((resolve) => connection.onclose(resolve));

  connection.on("SocketReady", (frame) => onReady(frame.connectionId));

  // The return value is the reply frame. SignalR sends it back to ACS on the same call.
  connection.on("Activity", async (envelope) => {
    const recvAt = Date.now();
    inFlight++;
    try {
      const result = await handleActivity(envelope.payload);
      return envelope.type === "invoke"
        ? reply(envelope, result?.status ?? 200, result?.body, recvAt)
        : reply(envelope, 200, undefined, recvAt);
    } catch {
      return reply(envelope, 500, undefined, recvAt);
    } finally {
      inFlight--;
    }
  });

  connection.on("SocketClosing", (notice) => console.log(`[${region}] ACS is closing the socket: ${notice.code} ${notice.reason}`));

  await connection.start();
  const connectionId = await Promise.race([ready, sleep(30_000)]);
  if (!connectionId) {
    await connection.stop();
    throw new Error("No SocketReady within 30 seconds");
  }
  return { connection, connectionId, closed, inFlight: () => inFlight, expiresAt: Date.now() + session.expiresIn * 1000 };
}

function reply(envelope, status, body, recvAt) {
  return { protocolVersion: 1, envelopeId: envelope.envelopeId, status, body, recvAt, ts: Date.now() };
}
```

### 5. Replace the socket before its token expires

The socket closes when its access token expires. To replace it without a gap, start about 60 seconds before `expiresIn` runs out:

1. Call connect again, with the header `x-ms-socket-replaces-connection-id` set to the old socket's `connectionId`.
2. Open the new socket and wait for its `SocketReady`. From then on, ACS sends new activities to the new socket.
3. Keep the old socket open for another 5 seconds, and until it has replied to every activity it already received. Then stop it.

The header tells ACS that the new socket replaces the old one, so the replacement doesn't count against the socket limit, and ACS stops sending new activities to the old socket. If the old socket is still open 60 seconds after the new one is ready, ACS closes it.

### 6. Handle disconnects

Expect sockets to close. When one closes unexpectedly, connect again, with a **new** connect call (each access token works for one socket only). Retry with backoff: 1, 2, 4, and 8 seconds, then every 15 seconds, with some random jitter.

Before ACS closes a socket on purpose, it calls the client method `SocketClosing`:

```json
{
  "protocolVersion": 1,
  "botKey": "<app-id>",
  "connectionId": "7lPN6NbfHjL...",
  "code": "SocketModeDisabled",
  "reason": "Socket mode is no longer enabled for this bot.",
  "reconnect": false
}
```

| `code` | Why ACS closes the socket | `reconnect` | What to do |
| --- | --- | --- | --- |
| `SocketModeDisabled` | Socket mode was turned off for the agent. | `false` | Stop. A new connect request gets `403`. |
| `Replaced` | A newer socket replaced this one (step 5), and this one was still open 60 seconds later. | `false` | Nothing. The newer socket is already open. |
| `TokenReused` | Another socket already used this socket's access token. | `true` | Call connect again, once for every socket. |
| `NoIdentity` | The access token has no agent identity. | `true` | Call connect again. |

Act on `code`; `reason` is for people and can change. For a `code` you don't recognize, follow `reconnect`. Many closes have no notice, for example when the socket's token expires or an ACS service instance restarts. Treat any close without a notice as temporary, and reconnect.

> [!Note]
> `SocketClosing` ships with ACS PR 1598105, which isn't merged yet.*

### 7. Connect in every region

Run steps 1-6 for each region on its own, so a problem in one region doesn't affect the others:

```javascript
async function openWithRetry(region, handleActivity, replacesConnectionId) {
  for (let attempt = 0; ; attempt++) {
    try {
      return await openSocket(region, handleActivity, replacesConnectionId);
    } catch (error) {
      if (error.status === 401 || error.status === 403) throw error; // fix the cause; retrying won't help
      const delay = error.retryAfterSeconds ? error.retryAfterSeconds * 1000 : Math.min(1000 * 2 ** attempt, 15_000);
      await sleep(delay * (0.8 + Math.random() * 0.4));
    }
  }
}

async function retire(socket) {
  await sleep(5_000);
  const giveUpAt = Date.now() + 25_000;
  while (socket.inFlight() > 0 && Date.now() < giveUpAt) await sleep(250);
  await socket.connection.stop();
}

async function runRegion(region, handleActivity) {
  let socket = await openWithRetry(region, handleActivity);
  for (;;) {
    const refreshDue = sleep(socket.expiresAt - Date.now() - 60_000).then(() => "refresh");
    if ((await Promise.race([socket.closed, refreshDue])) === "refresh") {
      const next = await openWithRetry(region, handleActivity, socket.connectionId);
      retire(socket); // finishes in the background
      socket = next;
    } else {
      socket = await openWithRetry(region, handleActivity);
    }
  }
}

// Your agent's logic. Invokes return { status, body }; for other activities the return value is ignored.
async function handleActivity(activity) {
  if (activity.type === "message") {
    const serviceUrl = activity.serviceUrl.replace(/\/?$/, "/");
    await fetch(`${serviceUrl}v3/conversations/${activity.conversation.id}/activities`, {
      method: "POST",
      headers: { authorization: `Bearer ${await getToken()}`, "content-type": "application/json" },
      body: JSON.stringify({ type: "message", text: `You said: ${activity.text}` }),
    });
  }
}

await Promise.all(REGIONS.map((region) => runRegion(region, handleActivity)));
```

### Recommended client settings

These values match the Teams SDK. The SignalR client's other settings can keep their defaults.

| Setting | Recommended value |
| --- | --- |
| Hub protocol | JSON (the default) |
| Keep-alive interval | 15 seconds (the SignalR default) |
| Server timeout | 30 seconds (the SignalR default) |
| SignalR automatic reconnect | Off. Every reconnect needs a new connect call. |
| Wait for `SocketReady` | 30 seconds |
| Reconnect backoff | 1, 2, 4, 8, then 15 seconds, repeating, with jitter |
| Replace a socket | 60 seconds before its token expires |
| Keep a replaced socket open | 5 seconds after the new socket's `SocketReady`, and until its in-flight replies are sent |
| Sockets per instance | One per region |

| Sample name | Description | Node.js |
| --- | --- | --- |
| Socket mode sample | This sample shows how to receive activites from ACS via socket mode without using an SDK | [View](**NEED TO MOVE PREMS SAMPLE AND PAST LINK**<https://github.com/premkaretimsft/prkare-default-mode-socket-bot>) |
