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

TeamsFx helps to reduce the developer tasks of leveraging Teams SSO and access to cloud resources down to single line statements with zero configuration.

Use the library to:

* Access the core functionalities in client and server environment in a similar way.
* Write user authentication code in a simplified way.

## Get started

TeamsFx SDK is pre-configured in the scaffolded project using TeamsFx toolkit or CLI.
For more information, see [Teams app project](https://github.com/OfficeDev/TeamsFx/blob/main/packages/vscode-extension/README.md).

### Prerequisites

* Latest version of Node.js.
* If your project has installed `botbuilder` related [packages](https://github.com/Microsoft/botbuilder-js#packages) as dependencies, ensure they are of the same version and the version is `>= 4.15.0`. ([Issue - all of the BOTBUILDER packages should be of the same version](https://github.com/BotBuilderCommunity/botbuilder-community-js/issues/57#issuecomment-508538548)).

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

### Scenarios

TeamsFx SDK is built to be used in browser and Node.js environment. Common scenarios include:
- Teams tab application
- Azure Function
- Teams bot

### Create and authenticate a `MicrosoftGraphClient` service

To create a graph client object to access the Microsoft Graph API, you need the credentials to authenticate. The SDK provides APIs to configure for developers.The following steps helps you to choose the proper identity type:

#### Invoke Graph API without user (Application Identity)

It doesn't require the interaction with Teams user. You can call Microsoft Graph as application identity.
Use the following snippet:

```ts
// Equivalent to:
// const teamsfx = new TeamsFx(IdentityType.App, {
//   initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
//   clientId: process.env.REACT_APP_CLIENT_ID,
// });
const teamsfx = new TeamsFx(IdentityType.App);
const graphClient = createMicrosoftGraphClient(teamsfx);
const profile = await graphClient.api("/users/{object_id_of_another_people}").get(); // Get the profile of certain user
```

> [!NOTE]
> You can use this credential class in browser application, such as Teams Tab App.

## Core Concepts & Code Structure

### TeamsFx class
`TeamsFx` class instance access all TeamsFx settings from environment variables by default. You can also set customized configuration values to override the default values. Please check Override configuration for details.

When creating a TeamsFx instance, you also need to specify the identity type. 
There are 2 identity types:

#### User Identity
Using `new TeamsFx(IdentityType.User)` means the application is authenticated as current Teams user. This one is the default choice. You need to call `TeamsFx:setSsoToken()` when you use user identity in Node.js environment (without browser).

You can use `TeamsFx:getUserInfo()` to get user's basic information.
`TeamsFx:login()` is used to let user perform consent process, if you want to use SSO to get access token for certain OAuth scopes.

#### Application Identity
Using `new TeamsFx(IdentityType.App)` means the application is authenticated as an application. The permission usually needs administrator's approval.

`TeamsFx:getCredential()` provides credential instances automatically corresponding to identity type:
- User Identity: You can access resources on behalf of current Teams user.
- App Identity: You are acting as a managed app identity which needs admin consent for resources.

### Credential

Developers must choose identity type when initializing TeamsFx. 
SDK provides 2 types namely: User and App.
After developer has specified the identity type when initializing TeamsFx, SDK uses different kinds of credential class to represent the identity and get access token by corresponding auth flow.

There are 3 credential classes located under to help to simplify authentication.[credential folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/credential).

Credential classes implement `TokenCredential` interface, which is broadly used in Azure library APIs. They are designed to provide access tokens for specific scopes. Other APIs relies on credential call `TeamsFx:getCredential()` to get an instance of `TokenCredential`.

Here's the corresponding scenarios for each credential class targets.

### User Identity in browser environment
`TeamsUserCredential` represents Teams current user's identity. Using this credential will request user consent at the first time. It leverages the Teams SSO and On-Behalf-Of flow to do token exchange. SDK uses this credential when developer choose "User" identity in browser environment.

Required configuration: initiateLoginEndpoint, clientId.

#### User Identity in Node.js environment
`OnBehalfOfUserCredential` uses On-Behalf-Of flow and need Teams ssoToken. It's designed to be used in Azure Function or Bot scenarios. SDK uses this credential when developer choose "User" identity in Node.js environment.

Required configuration: authorityHost, tenantId, clientId, clientSecret / certificateContent.

#### Application Identity in Node.js environment
`AppCredential` represents the application identity. It is usually used when user is not involved like time-triggered automation job. SDK uses this credential when developer choose "App" identity in Node.js environment.

Required configuration: tenantId, clientId, clientSecret / certificateContent.

### Bot SSO

Bot related classes are stored under [bot folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/bot).

`TeamsBotSsoPrompt` has a good integration with Bot framework. It simplifies the authentication process when you develops bot application and want to leverage the Bot SSO.

Required configuration: initiateLoginEndpoint, tenantId, clientId, applicationIdUri.

### Helper functions

TeamsFx SDK provides several helper functions to ease the configuration for third-party libraries. They are located under [core folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/core).

#### Microsoft Graph Service
`createMicrosoftGraphClient` and `MsGraphAuthProvider` help to create authenticated Graph instance.

#### SQL
`getTediousConnectionConfig` returns a tedious connection config.

Required configuration:
- sqlServerEndpoint, sqlUsername, sqlPassword if you want to use user identity.
- sqlServerEndpoint, sqlIdentityId if you want to use MSI identity.

### Error handling

API error response is `ErrorWithCode`, which contains error code and error message.

For example, to filter out specific error, you can use the following snippet:

```ts
try {
  const teamsfx = new TeamsFx();
  await teamsfx.login("User.Read");
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
  const teamsfx = new TeamsFx();
  const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]); // Initializes MS Graph SDK using our MsGraphAuthProvider
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

Use `TeamsFx` and `createMicrosoftGraphClient`.

```ts
const teamsfx = new TeamsFx();
const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]);
const profile = await graphClient.api("/me").get();
```

### Call Azure Function in tab app

Use `axios` library to make HTTP request to Azure Function.

```ts
const teamsfx = new TeamsFx();
const token = teamsfx.getCredential().getToken(""); // Get SSO token for the use
// Call API hosted in Azure Functions on behalf of user
const apiEndpoint = teamsfx.getConfig("apiEndpoint");
const response = await axios.default.get(apiEndpoint + "api/httptrigger1", {
  headers: {
    authorization: "Bearer " + token,
  },
});
```

### Access SQL database in Azure Function

Use `tedious` library to access SQL and leverage `DefaultTediousConnectionConfiguration` that manages authentication.
Apart from `tedious`, you can also compose connection config of other SQL libraries based on the result of `sqlConnectionConfig.getConfig()`.

```ts
// Equivalent to:
// const sqlConnectConfig = new DefaultTediousConnectionConfiguration({
//    sqlServerEndpoint: process.env.SQL_ENDPOINT,
//    sqlUsername: process.env.SQL_USER_NAME,
//    sqlPassword: process.env.SQL_PASSWORD,
// });
const teamsfx = new TeamsFx();
// If there's only one SQL database
const config = await getTediousConnectionConfig(teamsfx);
// If there are multiple SQL databases
const config2 = await getTediousConnectionConfig(teamsfx "your database name");
const connection = new Connection(config);
connection.on("connect", (error) => {
  if (error) {
    console.log(error);
  }
});
```

### Use certificate-based authentication in Azure Function

```ts
const authConfig = {
  clientId: process.env.M365_CLIENT_ID,
  certificateContent: "The content of a PEM-encoded public/private key certificate",
  authorityHost: process.env.M365_AUTHORITY_HOST,
  tenantId: process.env.M365_TENANT_ID,
};
const teamsfx = new TeamsFx(IdentityType.App);
teamsfx.setCustomeConfig({
  certificateContent: "The content of a PEM-encoded public/private key certificate"
});
const token = teamsfx.getCredential().getToken();
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

const teamsfx = new TeamsFx();
dialogs.add(
  new TeamsBotSsoPrompt(teamsfx, "TeamsBotSsoPrompt", {
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

## Advanced Customization

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

### Override configuration
You can pass custom config when creating `TeamsFx` instance to override default configuration or set required fields when environment variables are missing.

- If you have created tab project using VS Code toolkit, the following config values will be used from pre-configured environment variables:
  * authorityHost (REACT_APP_AUTHORITY_HOST)
  * tenantId (REACT_APP_TENANT_ID)
  * clientId (REACT_APP_CLIENT_ID)
  * initiateLoginEndpoint (REACT_APP_START_LOGIN_PAGE_URL)
  * applicationIdUri (REACT_APP_START_LOGIN_PAGE_URL)
  * apiEndpoint (REACT_APP_FUNC_ENDPOINT)
  * apiName (REACT_APP_FUNC_NAME)

- If you have created Azure Function / Bot project using VS Code toolkit, the following config values will be used from pre-configured environment variables:
  * initiateLoginEndpoint (INITIATE_LOGIN_ENDPOINT)
  * authorityHost (M365_AUTHORITY_HOST)
  * tenantId (M365_TENANT_ID)
  * clientId (M365_CLIENT_ID)
  * clientSecret (M365_CLIENT_SECRET)
  * applicationIdUri (M365_APPLICATION_ID_URI)
  * apiEndpoint (API_ENDPOINT)
  * sqlServerEndpoint (SQL_ENDPOINT)
  * sqlUsername (SQL_USER_NAME)
  * sqlPassword (SQL_PASSWORD)
  * sqlDatabaseName (SQL_DATABASE_NAME)
  * sqlIdentityId (IDENTITY_ID)

## How to fix the breaking change if upgraded from previous SDK version

If you are using the version of SDK that has `loadConfiguration()`, you can follow these steps to upgrade to the latest SDK version.
1. Remove `loadConfiguration()` and pass customized settings using `new TeamsFx(IdentityType.User, { ...customConfig })`.
2. Replace `new TeamsUserCredential()` with `new TeamsFx()`.
3. Replace `new M365TenantCredential()` with `new TeamsFx(IdentityType.App)`.
4. Replace `new OnBehalfOfUserCredential(ssoToken)` with `new TeamsFx().setSsoToken(ssoToken)`.
5. Pass the instance of `TeamsFx` to helper functions to replace credential instance.

Also see [TeamsFx class](#teamsfx-class) for furthur description.

## Next steps

Please take a look at the [Samples](https://github.com/OfficeDev/TeamsFx-Samples) project for detailed examples on how to use this library.

## See also

[Microsoft TeamsFx sample gallery](https://github.com/OfficeDev/TeamsFx-Samples)
