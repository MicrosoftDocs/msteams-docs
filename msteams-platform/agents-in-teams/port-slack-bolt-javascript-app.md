---
title: Migrate a Slack Bolt for JavaScript App to Teams with Teams SDK
description: Migration & port guide from Slack Bolt to Teams SDK, highlighting the key changes and upgrade steps.
ms.topic: how-to
ms.date: 07/27/2026
---

# Migrate a Slack Bolt for JavaScript app to Teams with Teams SDK

This guide will help you use Teams SDK to migrate an existing JavaScript Slack Bolt application to Teams.

## Introduction

Similar to Slack Bolt, the Teams SDK is designed to interface with the Teams backend APIs for building conversational applications. Both SDKs provide abstractions for handling incoming events, messages, and interactions, as well as sending responses back to users. If you already have a Slack bot, the concepts should feel familiar.

However, there are some key differences, such as app installation. In Slack, apps are installed to workspaces via OAuth, whereas in Teams they are installed via the Teams App Store. Additionally, Teams apps can be installed personally by individual users, or to collaborative scopes like group chats, channels, and meetings.

Let's take a look at some similarities and differences between Slack and Teams concepts:

| Concept | Teams | Slack |
| --- | --- | --- |
| **Installation** | Installed via app store on per-scope basis | Installed via OAuth to Workspace |
| **Quickstart** | New projects created via Teams developer CLI | New projects created via Slack CLI. |
| **App manifest** | Create and register an agent and its app manifest with Teams developer CLI. | Authored via JSON, YAML, or app management page. |
| **Messaging endpoint** | Set in Teams Developer Portal bot configuration or Azure AI Bot Service resource. | Set in Slack app manifest. |
| **App authentication** | Entra App Registration is authorized during Teams app installation. Teams SDK fetches Entra app token internally when sending messages. Core app features like messaging use this auth type internally within the SDK. | App stores Slack bot token after user authorizes application-delegated scopes (e.g.,`incoming-webhook,commands`). Core app features like messaging use this auth type internally within the SDK. |
| **User authentication for REST APIs** | User Entra tokens can be obtained using Teams SSO. Graph REST APIs are integrated into the Teams SDK. Tokens are stored and refreshed by Azure Bot Token service. | User Slack tokens can be obtained using OAuth 2.0. Slack REST APIs are integrated into Slack Bolt. Tokens must be stored and refreshed by application. |
| **Authentication with external services** | Obtain user access tokens for external services using OAuth 2.0. Tokens are stored and refreshed by Azure Bot Token service. | Users authenticate to external services using OAuth 2.0, perhaps initiated via account binding (see below). Tokens must be stored and refreshed by application. |
| **Account linking** | `Activity` events include `Activity.from.id`, which is the user's AAD object ID. If you authenticate your external service with OAuth 2.0, these accounts are implicitly bound via the Azure Token Service, but you can also follow a similar flow as what Slack recommends. | Slack recommends following their [Binding accounts across services](https://docs.slack.dev/authentication/binding-accounts-across-services) guide. |
| **Cards** | Rich UI elements in messages using Adaptive Cards. | Rich UI elements in messages using Block Kit. |
| **Files** | Files can be attached or downloaded using SharePoint / OneDrive Graph APIs. | Files can be attached or downloaded via Slack's files APIs. |
| **Private messages in group conversations** | t[Targeted messages](targeted-messages.md) | Ephemeral messages. |
| **Slash commands** | [Slash commands](agent-slash-commands.md), declared in the app manifest and made discoverable via an autocomplete menu. Commands can be sent as private targeted messages, or visible to all users in a conversation via @mention. Commands are sent as messages: listen for commands with an `app.message` handler, either via `app.message('/command')` or `app.message(regexp)`. | Slack Bolt has a dedicated `app.command` handler for commands in the Slack app manifest. Slash commands are not displayed to other users in collaborative contexts. |
| **Workflows** | Teams integrates with Power Automate for workflows. Workflows are not a component of Teams SDK. | Slack Workflows are integrated with Slack Bolt. |
| **UI dialogs** | Adaptive Cards can include actions that open UI dialogs with an embedded website or another adaptive card. Dialogs must be opened via an adaptive card action and thus cannot be opened directly via a slash command. | Block Kit UI modals can be opened via slash commands (using `client.views.open`) or Block Kit actions. |
| **AI strategy** | Teams has unique AI-native features for things like user feedback, AI-generated labels, prompt suggestions, streaming, and citations. We also feature an optional `ChatPrompt` class to simplify integrating LLMs into your bot. Leverage grounded search via the [Microsoft 365 Copilot Retrieval Graph API](/microsoft-365-copilot/extensibility/api/ai-services/retrieval/overview). AI features are generally designed for use in any conversation type. | Slack has a dedicated `Assistant` class for AI interactions in a dedicated agent side panel view, which differs from Teams's strategy of using existing bot interaction patterns. Can still use AI in other conversation types using standard bot APIs. Can use Slack Data Access API for grounded search. |
| **AI user feedback** | User feedback buttons are natively rendered in Teams with dedicated APIs for handling feedback. After user gives positive or negative feedback, a modal is opened where additional information (e.g., plain text response) can be captured. | Slack uses a dedicated `feedback_buttons` Block Kit element type and `app.action('feedback')` for attaching user feedback (positive vs. negative) to messages. |

## Register a Teams agent

First, complete the [quickstart](quickstart-create-agent-teams-sdk.md) to register a new Teams agent, so you can use it from Teams as soon as you have added the Teams SDK implementation to your code.

## Install Teams SDK

Install the Teams SDK into your Slack Bolt project alongside any existing packages:

```console
npm install @microsoft/teams.apps
```

## Copy authentication configuration

Copy the settings from the `.env` file that the Teams developer CLI created in the quickstart starter application to your Slack Bolt implementation. These settings are credentials for authenticating a Teams SDK app so it can communicate with Teams.

## Initialize the runtime

Add or replace code in your implementation to start up the Teams SDK application runtime using the `App` class. This is equivalent to Slack Bolt's `App` class.

# [Teams SDK](#tab/teams)

```typescript
import { App } from '@microsoft/teams.apps';

const app = new App();

app.start(process.env.PORT || 3978).catch(console.error);
```

# [Slack Bolt equivalent](#tab/slack)

```ts
const app = new App({
    signingSecret: process.env.SLACK_SIGNING_SECRET,
    clientId: process.env.SLACK_CLIENT_ID,
    clientSecret: process.env.SLACK_CLIENT_SECRET,
    scopes: [
        "channels:manage",
        "channels:read",
        "chat:write",
        "groups:read",
        "incoming-webhook",
    ],
    installerOptions: {
        authVersion: "v2",
        directInstall: false,
        installPath: "/slack/install",
        metadata: "",
        redirectUriPath: "/slack/oauth_redirect",
        stateVerification: "true",
        /**
        * Example pages to navigate to on certain callbacks.
        */
        callbackOptions: {
            success: (installation, installUrlOptions, req, res) => {
                res.send("The installation succeeded!");
            },
            failure: (error, installUrlOptions, req, res) => {
                res.send("Something strange happened...");
            },
        },
        /**
        * Example validation of installation options using a random state and an
        * expiration time between requests.
        */
        stateStore: {
            generateStateParam: async (installUrlOptions, now) => {
                const state = randomStringGenerator();
                const value = { options: installUrlOptions, now: now.toJSON() };
                await database.set(state, value);
                return state;
            },
            verifyStateParam: async (now, state) => {
                const value = await database.get(state);
                const generated = new Date(value.now);
                const seconds = Math.floor(
                    (now.getTime() - generated.getTime()) / 1000,
                );
                if (seconds > 600) {
                    throw new Error("The state expired after 10 minutes!");
                }
                return value.options;
            },
        },
    },
});

// App starts local server with route for /slack/events
(async () => {
    await app.start();
})();
```

---

## Migrate message handlers

In Slack, there are message handlers for events with different subtypes (e.g., undefined subtype is a regular message, `event.subtype == 'file_share'` is a file share message, etc.). In Teams, there are different `Activity` handers for different types of events that are enumerated via the `ActivityTypes` enum (e.g., `app.activity(ActivityTypes.Message)`), with some `Activity` types having tailored APIs within the SDK (e.g., `app.message`). These concepts are roughly similar, though the naming conventions and syntax differ.

# [Teams SDK](#tab/teams)

```ts
// triggers when user sends "hi" or "@bot hi"
app.message("hi", async ({ send, activity }) => {
    await send(`Hello, ${activity.from.name}!`);
});
// listen for ANY message to be received
app.on('message', async ({ send, activity }) => {
    // echo back users request
    await send(`you said: ${activity.text}`);
});
```

# [Slack Bolt equivalent](#tab/slack)

```ts
// triggers when user sends a message containing "hi"
app.message("hi", async ({ message, say }) => {
    // Handle only newly posted messages here
    if (message.subtype) return;
    await say(`Hello, <@${message.user}>`);
});
// listen for ANY message
app.message(async ({ message, say }) => {
    // Handle only newly posted messages here
    if (message.subtype) return;
    // echo back users request
    await say(`you said: ${message.text}`);
});
```

---

## Migrate Block Kit to Adaptive Cards

To include rich UI in messages sent by your agent, Teams's Adaptive Cards are equivalent to Slack's Block Kit.

# [Teams SDK](#tab/teams)

```typescript
import { Card, TextBlock } from '@microsoft/teams.cards';

app.message('/card', async ({ send }) => {
    await send(
        new Card(new TextBlock('Hello, world!', { wrap: true, isSubtle: false }))
            .withOptions({
                width: 'Full',
            })
    );
});
```

# [Slack Bolt equivalent](#tab/slack)

```typescript
app.message('card', async (client) => {
    await say({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: 'Hello, world!',
                },
            },
        ],
    });
});
```

---

## Implement user authentication

There are two primary types of user authentication for Teams and Slack: authentication for Slack & Graph REST APIs, and authentication for external services. Let's take a look at each of these in turn.

### User-delegated REST APIs

In Slack, if you want to use Slack REST APIs that require user-delegated scopes, you need to implement an OAuth 2.0 installation flow in your application to obtain and store Slack user tokens, even if the app was already installed by another user. In Teams, you can leverage Teams SSO to obtain user Entra tokens for calling Graph REST APIs. The Teams SDK integrates with Teams SSO and Azure Bot Token Service to handle token acquisition, storage, and refresh automatically for you.

First, follow the instructions in the [Teams SSO guide](../teams/user-authentication/sso-setup.md). Then, configure authentication in your code.

# [Slack Bolt](#tab/slack)

```typescript
// TODO: Configure App class with user OAuth permissions and install app for user

app.message('me', async ({ client, message }) => {
    const me = await client.users.info({ user: message.user });
    await client.send(JSON.stringify(me));
});
```

# [Teams SDK](#tab/teams)

```ts
const app = new App({
    // ... rest of App config
    oauth: {
        // The key here should match the OAuth Connection setting
        // defined in your Azure Bot resource.
        defaultConnectionName: 'graph',
    },
});

app.message('me', async ({ signin, userGraph, send }) => {
    if (!await signin()) {
        return;
    }
    const me = await userGraph.call(endpoints.me.get);
    await send(JSON.stringify(me));
});
```

---

### User authentication for external services

In Slack, you can access external services by implementing an account binding flow using OAuth 2.0 as documented [here](https://docs.slack.dev/authentication/binding-accounts-across-services). In Teams, you can access external services by implementing an OAuth 2.0 flow, with the Azure Bot Token Service handling token acquisition, storage, and refresh for you.

First, setup your OAuth 2.0 connection settings in the [Azure Portal](https://portal.azure.com/) for your Azure Bot resource.

:::image type="content" source="../assets/images/abs-custom-oauth-connection.png" alt-text="Screenshot showing Azure Bot custom OAuth connection settings." lightbox="../assets/images/abs-custom-oauth-connection.png" :::

Then, add the authentication code to your application to get the relevant user token and call your external service.

```ts
import
{ App } from '@microsoft/teams.apps';

const app = new App({
    // ... rest of App config
    oauth: {
        // The key here should match the OAuth Connection setting
        // defined in your Azure Bot resource.
        defaultConnectionName: 'custom',
    },
});

app.message('me', async ({ activity, signin, token, send }) => {
    // In production, it is probably better to implement a local cache.
    // (e.g. \`activity.from.id\` <-> token).
    // Otherwise this triggers an API call to Azure Token Service on every inbound message.
    if (!await signin()) {
        return;
    }

    // Call external API
    const response = await fetch('https://example.com/api/helloworld', {
        method: 'POST',
        headers: {
            "Authorization": token,
        },
    });
    const result = await response.json();
    await send(JSON.stringify(result));
});

```
