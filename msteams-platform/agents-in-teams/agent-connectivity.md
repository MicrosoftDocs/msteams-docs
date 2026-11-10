---
title: Agent Connectivity in Teams
description: Choose how agents receive activity data from Teams
ms.localizationpriority: high
ms.date: 11/06/2026
ms.topic: article
---

# Choose how your agent receives activity data from Teams

> [!Note]
> Socket mode is in public preview. It's recommended for developing and testing agents. For agents in production, use an HTTPS endpoint. Preview features can change before general availability.

Teams agents do most of their work with Teams, especially chat, through Agent Communication Service (ACS), the service that connects agents to Teams. The connection between an agent and ACS is bidirectional. ACS sends data to your agent to tell it about activity in Teams in real time: messages, card actions, installs, reactions, meeting events, and more. Your agent sends data to ACS to act on that activity: reply, post a card, update a message, and so on.

Your agent always uses HTTPS requests to send data to ACS. You choose how ACS sends data to your agent:

| Delivery method | Description |
| --- | --- |
| **HTTPS endpoint** | Your agent hosts an HTTPS endpoint that's reachable from the internet. You set the endpoint URL in the agent's bot registration. ACS sends each activity as an HTTPS request to that endpoint. |
| **Socket mode** | You turn on socket mode in the agent's bot registration; no endpoint is needed. When your agent starts, it opens outbound WebSocket connections to ACS. ACS sends each activity over one of those connections, and your agent's response goes back over HTTPS. |

With either delivery method, your agent sends messages and other requests to ACS the same way, with the ACS [REST API](/azure/bot-service/rest-api/bot-framework-rest-connector-api-reference), and receives the same activities with the same payloads. You can change the delivery method at any time. This article helps you decide which one to use.

## Choose a delivery method

| | HTTPS endpoint | Socket mode |
| --- | --- | --- |
| **How activities reach your agent** | ACS sends an HTTPS POST for each activity. | ACS sends each activity over a WebSocket that your agent opened. |
| **Network** | A public HTTPS endpoint. For local development, you need a tunnel such as dev tunnels or ngrok. | Outbound connections only, on port 443. No inbound connectivity, no tunnel, no public URL. |
| **Authentication** | Your agent validates the token on every incoming request. | ACS authenticates your agent once, when it connects. Activities on the socket don't need validation. |
| **Connection** | A short-lived request per activity. | Long-lived connections, replaced at least once an hour. Your agent keeps them open and reconnects when one closes. |
| **Scale** | Any number of instances behind a load balancer. | Up to 4 open connections per agent in each region, so up to 4 connected instances. |
| **When your agent is offline** | Requests to your endpoint fail. | Activities aren't delivered. ACS doesn't fall back to an HTTPS endpoint. |
| **Status** | Generally available. | Public preview. |
| **Teams Store** | Supported. | Not supported. |

**Use socket mode when:**

- **You're developing and testing locally.** Run your agent on your own machine without exposing a public endpoint or setting up a tunnel. Restarting your agent doesn't change any URL.

**Use an HTTPS endpoint when:**

- **Your agent is in production**, especially at scale. There are fewer moving parts: you don't maintain long-lived connections, and you can run any number of instances.
- **You need more than 4 instances receiving activities in a region.**

The choice isn't permanent. Many developers use socket mode while building an agent and switch to an HTTPS endpoint when they deploy it. Switching is a registration change plus a configuration change in your agent's code; the agent's logic doesn't change.

## Getting started

**HTTPS**

During your agent creation in Teams Developer Portal or Teams CLI, you'll be asked to provide an HTTPS endpoint. If you are using HTTP mode you supply the endpoint and no further steps are needed.

**Socket mode**

It's recommended to use the Teams SDK with socket mode. Teams SDK can handle the web socket connections for you. Steps to connecting your agent to Teams via socket mode with Teams SDK can be found in the *Configure delivery methods for agents* guide, [here](configure-delivery-methods-for-agents.md).

If you prefer to use another language or framework with socket mode, steps to connecting your agent to Teams without an SDK can be found in the *Connect an agent to Teams without an SDK* guide, [here](connect-agent-without-sdk.md).

## Architectural considerations

This section explains what happens under the hood in socket mode, so you can assess its effect on your system and choose the right settings. If you use the Teams SDK, it handles all of this for you.

### How socket mode works

Socket mode is built on [Azure SignalR Service](/azure/azure-signalr/signalr-overview). Your agent never sees an inbound connection:

:::image type="content" source="../assets/images/agents-in-teams/socket-mode/agent-socket-mode.png" alt-text="Image shows sequence diagram showing how socket mode works.":::

<!--
::: mermaid
sequenceDiagram
    participant Agent as Your agent
    participant Entra as Microsoft Entra ID
    participant ACS as ACS
    participant Socket as ACS socket service (Azure SignalR)
    Agent->>Entra: Get a bot token (the agent's app credentials)
    Agent->>ACS: POST connect for a region, with the bot token
    ACS-- >>Agent: Socket URL and a socket access token
    Agent->>Socket: Open the WebSocket (outbound, port 443)
    Socket-- >>Agent: SocketReady
    Note over ACS,Agent: A user sends the agent a message
    ACS- >>Agent: Activity, over the socket
    Agent-- >>ACS: Reply frame, on the same call (an ack, or the invoke response)
    Agent->>ACS: Send messages with the REST API (HTTPS)
:::
-->

1. **Connect.** Your agent gets a token for its own app registration, the same token it uses to send messages, and calls the ACS connect endpoint for a region. ACS checks that socket mode is on for the agent and returns a URL and an access token for one socket.
2. **Open the socket.** Your agent opens a WebSocket to that URL. Once ACS is ready to deliver to it, ACS sends a `SocketReady` message.
3. **Receive activities.** ACS sends each activity to the agent over the socket. The activity is the same JSON your HTTPS endpoint would receive.
4. **Respond.** Your agent's handler returns a reply on the same call: for an invoke (such as a card action), the invoke response; for any other activity, an acknowledgment once the agent has handled it. ACS waits for this reply, just as it waits for the HTTP response from an HTTPS endpoint.
5. **Send.** To post messages, reply in a thread, update cards, and so on, your agent calls the ACS REST API over HTTPS, exactly as with an HTTPS endpoint.

### Regions

Teams handles each conversation in one region, `amer`, `emea`, or `apac`, and ACS delivers its activities only to sockets connected in that region. Your agent must connect one socket in **each** region where its users' conversations are handled. To cover all users, connect to all three. The Teams SDK does this by default. If your agent has no socket in a region, activities from conversations in that region aren't delivered.

### Multiple instances and load distribution

Each instance of your agent opens its own sockets, one per region. ACS sends each activity to **one** of the agent's sockets in the region, never to all of them, and favors the socket with the fewest activities waiting for a reply. ACS doesn't keep a conversation on the same socket: two messages in one conversation can go to different instances, just as two HTTPS requests can land on different instances behind a load balancer. Keep conversation state in shared storage, as you would for an HTTPS agent.

ACS doesn't wait for one activity's reply before it sends the next on the same socket. Handle activities concurrently, and don't block the handler while waiting on slow work.

### Delivery and timing

- **Time limit.** ACS waits for your reply for the same time as with HTTPS delivery: currently 25 seconds, given in each delivery as `deadlineMs`. After that, the delivery fails. For an invoke, the user sees an error. If your work takes longer, acknowledge the activity and finish the work in the background, then send the result with the ACS REST API.
- **No retry on the socket.** ACS sends each activity once, to one socket. If the reply doesn't arrive (the agent was too slow, the socket closed, or the reply was invalid), ACS doesn't resend it on another socket or to an HTTPS endpoint.
- **Duplicates.** As with HTTPS delivery, the sender of an activity can retry a delivery that failed, so your agent might occasionally see an activity twice. Use the activity `id` to detect duplicates.
- **Ordering.** Activities can arrive concurrently and on different instances, so don't rely on their order.

### Connection lifecycle

Sockets are long-lived but not permanent:

- **Token expiry.** Each socket's access token expires after a set lifetime, currently 60 minutes (given as `expiresIn` when you connect), and the socket closes when its token expires. Replace each socket shortly before its token expires to avoid a gap. The Teams SDK does this automatically.
- **Other closes.** Sockets can also close at any time: during ACS service updates, after a network problem, or when ACS closes them on purpose (for example, when socket mode is turned off for the agent). Your agent should reconnect right away, with backoff.
- **Redundancy.** While a socket is reconnecting, activities for that region go to the agent's other sockets in the region. If there are none, they aren't delivered. Running two or more instances keeps delivery going while one reconnects.

### Limits

| Limit | Value |
| --- | --- |
| Open sockets per agent, per region | 4. A socket that's being replaced by a refresh doesn't count. |
| Time to reply to an activity | 25 seconds (`deadlineMs`) |
| Reply size, from your agent to ACS | 1 MB |
| Socket access token lifetime | 60 minutes (`expiresIn`) |
| Sockets per access token | 1 |
| Regions | `amer`, `emea`, `apac` |

When an agent already has the maximum number of sockets in a region, the connect request fails with `429 Too Many Requests` and a `Retry-After` header.

### Security

- **Outbound only.** Your agent opens every connection. It needs no inbound ports, public IP address, or public DNS name.
- **Authenticated with the agent's own identity.** To connect, your agent proves its identity with the token from its Microsoft Entra app registration, the same token it uses to send messages. ACS only gives a socket to the agent the token belongs to.
- **Scoped, short-lived socket tokens.** Each socket token works for one socket, for that agent only, and expires. ACS delivers only that agent's activities on the socket. Treat the token as a secret: don't log it or share it.
- **Encrypted.** All connections use TLS.

### For IT admins

- **Network requirements.** Socket mode needs these outbound HTTPS (port 443) connections. No inbound connection is needed.

  | Destination | Used for |
  | --- | --- |
  | `login.microsoftonline.com` | Getting the agent's token. Every agent needs this, whichever delivery method it uses. |
  | `botapi.skype.com` | The connect request |
  | `*.service.signalr.net` | The socket. Proxies and firewalls must allow WebSocket upgrades and long-lived connections. |
  | The `serviceUrl` hosts in incoming activities (for example, `smba.trafficmanager.net`) | Sending messages with the ACS REST API. Every agent needs this, whichever delivery method it uses. |

- **Turning it off.** When socket mode is turned off for an agent, ACS closes the agent's open sockets within about a minute and refuses new ones.
