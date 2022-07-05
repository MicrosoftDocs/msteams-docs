---
title: TeamsFx SDK
author: MuyangAmigo
description:  About TeamsFx SDK
ms.author: nintan
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# TeamsFx SDK for TypeScript or JavaScript

TeamsFx aims to reduce tasks of implementing identity and access to cloud resources to single-line statements with zero configuration.

Use the library to:

- Access core functionalities in client and server environment in a similar way.
- Write user authentication code in a simplified way.
 
## Get started

TeamsFx SDK is pre-configured in scaffolded project using TeamsFx toolkit or CLI.
For more information, see [Teams app project](https://github.com/OfficeDev/TeamsFx/blob/main/packages/vscode-extension/README.md).

### Prerequisites

- Node.js version `10.x.x` or later.
- If your project has installed `botbuilder` related [packages](https://github.com/Microsoft/botbuilder-js#packages) as dependencies, ensure they are of the same version and the version is `>= 4.9.3`. ([Issue - all of the BOTBUILDER packages should be the same version](https://github.com/BotBuilderCommunity/botbuilder-community-js/issues/57#issuecomment-508538548))

For more information, see:
* [Source code](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk) 
* [Package (NPM)](https://www.npmjs.com/package/@microsoft/teamsfx) 
* [API reference documentation](https://aka.ms/teamsfx-sdk-help) 
* [Samples](https://github.com/OfficeDev/TeamsFx-Samples)

### Install the `@microsoft/teamsfx` package

Install the TeamsFx SDK for TypeScript or JavaScript with `npm`:

```bash
npm install @microsoft/teamsfx
```

### Create and authenticate `MicrosoftGraphClient`

To create graph client object for accessing Microsoft Graph API, you will need the credentials to authenticate. The SDK provides several credential classes to choose that meets various requirements. You need to load configuration before using any credentials.

- In browser environment, you need to explicitly pass in the configuration parameters. The scaffolded React project has provided environment variables to use.

```ts
loadConfiguration({
  authentication: {
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
    simpleAuthEndpoint: process.env.REACT_APP_TEAMSFX_ENDPOINT,
    clientId: process.env.REACT_APP_CLIENT_ID,
  },
});
```

- In NodeJS environment like Azure Function, you can just call `loadConfiguration`. It will load from environment variables by default.

```ts
loadConfiguration();
```

#### Using Teams app user credential

Use the following snippet:

```ts
loadConfiguration({
  authentication: {
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
    simpleAuthEndpoint: process.env.REACT_APP_TEAMSFX_ENDPOINT,
    clientId: process.env.REACT_APP_CLIENT_ID,
  },
});
const credential = new TeamsUserCredential();
const graphClient = createMicrosoftGraphClient(credential, ["User.Read"]); // Initializes MS Graph SDK using our MsGraphAuthProvider
const profile = await graphClient.api("/me").get();
```
> [!NOTE]
> You can use this credential class in browser application, such as Teams Tab App.

#### Using Microsoft 365 tenant credential

Microsoft 365 tenant credential doesn't require to interact with Teams App user. You can call Microsoft Graph as application.

Use the following snippet:

```ts
loadConfiguration();
const credential = new M365TenantCredential();
const graphClient = createMicrosoftGraphClient(credential);
const profile = await graphClient.api("/users/{object_id_of_another_people}").get();
```

## Core concepts and code structure

### Credentials

There are 3 credential classes located under [credential folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/credential) to help simplify authentication.

Credential classes implement `TokenCredential` interface that is broadly used in Azure library APIs. They are designed to provide access tokens for specific scopes. The following credential classes represent different identity under certain scenarios:

* `TeamsUserCredential` represent Teams current user's identity. Using this credential will request user consent at the first time.
* `M365TenantCredential` represent Microsoft 365 tenant identity. It is usually used when user is not involved like time-triggered automation job.
* `OnBehalfOfUserCredential` uses on-behalf-of flow. It needs an access token and you can get a new token for different scope. It's designed to be used in Azure Function or Bot scenarios.

### Bots

Bot related classes are stored under [bot folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/bot).

`TeamsBotSsoPrompt` can integrate with Bot framework. It simplifies the authentication process for developing bot application.

### Helper functions

TeamsFx SDK provides helper functions to ease the configuration for third-party libraries. They are located under [core folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/core).

### Error handling

API error response is `ErrorWithCode`, which contains error code and error message.

For example, to filter out specific error, you can use the following snippet:

```ts
try {
  const credential = new TeamsUserCredential();
  await credential.login("User.Read");
} catch (err: unknown) {
  if (err instanceof ErrorWithCode && err.code !== ErrorCode.ConsentFailed) {
    throw err;
  } else {
    // Silently fail because user cancels the consent dialog
    return;
  }
}
```

And if credential instance is used in other library such as Microsoft Graph, it's possible that error is caught and transformed.

```ts
try {
  const credential = new TeamsUserCredential();
  const graphClient = createMicrosoftGraphClient(credential, ["User.Read"]); // Initializes MS Graph SDK using our MsGraphAuthProvider
  const profile = await graphClient.api("/me").get();
} catch (err: unknown) {
  // ErrorWithCode is handled by Graph client
  if (err instanceof GraphError && err.code?.includes(ErrorCode.UiRequiredError)) {
    this.setState({
      showLoginBtn: true,
    });
  }
}
```

## Scenarios

The following section provides several code snippets for common scenarios:

### Use Graph API in tab app

Use `TeamsUserCredential` and `createMicrosoftGraphClient`.

```ts
loadConfiguration({
  authentication: {
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
    simpleAuthEndpoint: process.env.REACT_APP_TEAMSFX_ENDPOINT,
    clientId: process.env.REACT_APP_CLIENT_ID,
  },
});
const credential: any = new TeamsUserCredential();
const graphClient = createMicrosoftGraphClient(credential, ["User.Read"]);
const profile = await graphClient.api("/me").get();
```

### Call Azure Function in tab app

Use `axios` library to make HTTP request to Azure Function.

```ts
loadConfiguration({
  authentication: {
    initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
    simpleAuthEndpoint: process.env.REACT_APP_TEAMSFX_ENDPOINT,
    clientId: process.env.REACT_APP_CLIENT_ID,
  },
});
const credential: any = new TeamsUserCredential();
const token = credential.getToken(""); // Get SSO token for the user
// Call API hosted in Azure Functions on behalf of user
const apiConfig = getResourceConfiguration(ResourceType.API);
const response = await axios.default.get(apiConfig.endpoint + "api/httptrigger1", {
  headers: {
    authorization: "Bearer " + token,
  },
});
```

### Access SQL database in Azure Function

Use `tedious` library to access SQL and leverage `DefaultTediousConnectionConfiguration` that manages authentication.
Apart from `tedious`, you can also compose connection config of other SQL libraries based on the result of `sqlConnectionConfig.getConfig()`.

```ts
loadConfiguration();
const sqlConnectConfig = new DefaultTediousConnectionConfiguration();
const config = await sqlConnectConfig.getConfig();
const connection = new Connection(config);
connection.on("connect", (error) => {
  if (error) {
    console.log(error);
  }
});
```

### Use certificate-based authentication in Azure Function

```ts
loadConfiguration({
  authentication: {
    clientId: process.env.M365_CLIENT_ID,
    certificateContent: "The content of a PEM-encoded public/private key certificate",
    authorityHost: process.env.M365_AUTHORITY_HOST,
    tenantId: process.env.M365_TENANT_ID,
  },
});
```

### Use Graph API in Bot application

Add `TeamsBotSsoPrompt` to dialog set.

```ts
const { ConversationState, MemoryStorage } = require("botbuilder");
const { DialogSet, WaterfallDialog } = require("botbuilder-dialogs");
const { TeamsBotSsoPrompt } = require("@microsoft/teamsfx");

const convoState = new ConversationState(new MemoryStorage());
const dialogState = convoState.createProperty("dialogState");
const dialogs = new DialogSet(dialogState);

loadConfiguration();
dialogs.add(
  new TeamsBotSsoPrompt("TeamsBotSsoPrompt", {
    scopes: ["User.Read"],
  })
);

dialogs.add(
  new WaterfallDialog("taskNeedingLogin", [
    async (step) => {
      return await step.beginDialog("TeamsBotSsoPrompt");
    },
    async (step) => {
      const token = step.result;
      if (token) {
        // ... continue with task needing access token ...
      } else {
        await step.context.sendActivity(`Sorry... We couldn't log you in. Try again later.`);
        return await step.endDialog();
      }
    },
  ])
);
```

### Integration with Microsoft Graph Toolkit
The [Microsoft Graph Toolkit (mgt)](https://aka.ms/mgt) library is a collection of authentication providers and UI components powered by Microsoft Graph. 

The `@microsoft/mgt-teamsfx-provider` package exposes the `TeamsFxProvider` class which uses `TeamsFx` class to sign in users and acquire tokens to use with Microsoft Graph.

1.Install the packages


```bash
npm install @microsoft/mgt-element @microsoft/mgt-teamsfx-provider @microsoft/teamsfx
```

2.Initialize the provider inside your component.

```ts
// Import the providers and credential at the top of the page
import {Providers} from '@microsoft/mgt-element';
import {TeamsFxProvider} from '@microsoft/mgt-teamsfx-provider';
import {TeamsUserCredential} from "@microsoft/teamsfx";

const scope = ["User.Read"];
const teamsfx = new TeamsFx();
const provider = new TeamsFxProvider(teamsfx, scope);
Providers.globalProvider = provider;
```

3.Use the `teamsfx.login(scopes)` method to get the required access token.

```ts
// Put these code in a call-to-action callback function to avoid browser blocking automatically showing up pop-ups. 
await teamsfx.login(this.scope);
Providers.globalProvider.setState(ProviderState.SignedIn);
```

4.Now you can add any component in your HTML page or in your `render()` method when using React and it will use the TeamsFx context to access Microsoft Graph.

```html
<!-- Using HTML -->
<mgt-person query="me" view="threeLines"></mgt-person>
```

```ts
// Using React
public render(): void {
return (
    <div>
        <Person personQuery="me" view={PersonViewType.threelines}></Person>
    </div>
);
}
```

For a sample that shows you how to initialize the TeamsFx provider, see the [Contacts Exporter sample](https://github.com/OfficeDev/TeamsFx-Samples/tree/dev/hello-world-tab-with-backend).


## Troubleshooting

### Configure log

You can set customer log level and redirect outputs when using this library. Logging is turned off by default, you can turn it on by setting log level.

#### Enable log by setting log level

Logging is enabled only when you set log level. By default, it prints log information to console.

Set log level using the following snippet:

```ts
// Only need the warning and error messages.
setLogLevel(LogLevel.Warn);
```

You can redirect log output by setting custom logger or log function.

##### Redirect by setting custom logger

```ts
setLogLevel(LogLevel.Info);
// Set another logger if you want to redirect to Application Insights in Azure Function
setLogger(context.log);
```

##### Redirect by setting custom log function

> [!NOTE]
> Log function will not take effect, if you set a custom logger.

```ts
setLogLevel(LogLevel.Info);
// Only log error message to Application Insights in bot application.
setLogFunction((level: LogLevel, message: string) => {
  if (level === LogLevel.Error) {
    this.telemetryClient.trackTrace({
      message: message,
      severityLevel: Severity.Error,
    });
  }
});
```

## See also

[Microsoft TeamsFx sample gallery](https://github.com/OfficeDev/TeamsFx-Samples)