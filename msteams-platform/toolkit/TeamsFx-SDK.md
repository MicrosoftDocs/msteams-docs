---
title: TeamsFx SDK
author: MuyangAmigo
description: In this module, learn about TeamsFx SDK, core concepts and code structure, advanced Customization and scenarios
ms.author: nintan
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# TeamsFx SDK

TeamsFx helps to reduce the developer tasks by using Teams SSO and accessing cloud resources down to single line statements with zero configuration. TeamsFx SDK is built to be used in browser and Node.js environment, common scenarios include:

* Teams tab application
* Azure Function
* Teams bot

You can use the TeamsFx SDK to:

* Access the core functionalities in client and server environment.
* Write user authentication code in a simplified way.

## Prerequisites

Install the following tools and set up your development environment:

* Latest version of Node.js
* If your project has installed `botbuilder` related [packages](https://github.com/Microsoft/botbuilder-js#packages) as dependencies, ensure they are of the same version. Currently, the required version is 4.15.0 or later, for more information, see [bot builder packages should be of the same version](https://github.com/BotBuilderCommunity/botbuilder-community-js/issues/57#issuecomment-508538548).

You must have working knowledge of the following:

* [Source code](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk)
* [Package (NPM)](https://www.npmjs.com/package/@microsoft/teamsfx)
* [API reference documentation](https://aka.ms/teamsfx-sdk-help)
* [Samples](https://github.com/OfficeDev/TeamsFx-Samples)

## Get started

TeamsFx SDK is pre-configured in the scaffolded project using TeamsFx Toolkit or CLI.
For more information, see [Teams app project](https://github.com/OfficeDev/TeamsFx/blob/main/packages/vscode-extension/README.md).

### Install the `@microsoft/teamsfx` package

Install the TeamsFx SDK for TypeScript or JavaScript with `npm`:

```bash
npm install @microsoft/teamsfx
```

### Create `MicrosoftGraphClient` service

To create a graph client object and to access the Microsoft Graph API, you need the credentials to authenticate. The SDK provides APIs to configure for developers.

<br>

<details>
<summary><b>Invoke Graph API on behalf of Teams User (User Identity)</b></summary>

Use the following snippet:

```ts
// Equivalent to:
// const teamsfx = new TeamsFx(IdentityType.User, {
//   initiateLoginEndpoint: process.env.REACT_APP_START_LOGIN_PAGE_URL,
//   clientId: process.env.REACT_APP_CLIENT_ID,
// }
const teamsfx = new TeamsFx();
const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]); // Initializes MS Graph SDK using our MsGraphAuthProvider
const profile = await graphClient.api("/me").get(); // Get the profile of current user
```

</details>

<br>

<details>
<summary><b>Invoke Graph API without user (Application Identity)</b></summary>

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

</details>

<br>

## Core concepts and code structure

### TeamsFx class

TeamsFx class instance access all TeamsFx settings from environment variables by default. You can also set customized configuration values to override the default values. Check [override configuration](#override-configuration) for details.
When creating a TeamsFx instance, you also need to specify the identity type.
There are two identity types:

* User Identity
* Application Identity

#### User Identity

| Command | Description |
|----------------|-------------|
| `new TeamsFx(IdentityType.User)`| Application is authenticated as current Teams user. |
| `TeamsFx:setSsoToken()`| User identity in Node.js environment (without browser). |
| `TeamsFx:getUserInfo()` | To get user's basis information. |
| `TeamsFx:login()` | It's used to let user perform consent process, if you want to use SSO to get access token for certain OAuth scopes. |

> [!NOTE]
> You can access resources on behalf of current Teams user.

#### Application Identity

| Command | Description |
|----------------|-------------|
| `new TeamsFx(IdentityType.App)`| Application  is authenticated as an application. The permission usually needs administrator's approval.|
| `TeamsFx:getCredential()`| Its provides credential instances automatically corresponding to identity type. |

> [!NOTE]
> You need admin consent for resources.

### Credential

You must choose identity type when initializing TeamsFx. After you've specified the identity type when initializing TeamsFx, SDK uses different kinds of credential class to represent the identity and get access token by corresponding auth flow.

There are three credential classes to simplify authentication. [credential folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/credential). Credential classes implement `TokenCredential` interface, which is broadly used in Azure library APIs, designed to provide access tokens for specific scopes. Other APIs rely on credential call `TeamsFx:getCredential()` to get an instance of `TokenCredential`.

Here's the corresponding scenarios for each credential class target.

#### User Identity in browser environment

`TeamsUserCredential` represents Teams current user's identity. Using this credential will request user consent at the first time. It leverages the Teams SSO and On-Behalf-Of flow to do token exchange. SDK uses this credential when developers choose user identity in browser environment.

Required configuration: `initiateLoginEndpoint`, `clientId`.

#### User Identity in Node.js environment

`OnBehalfOfUserCredential` uses On-Behalf-Of flow and need Teams SSO token. It's designed to be used in Azure Function or bot scenarios. SDK uses this credential when developers choose user identity in Node.js environment.

Required configuration: `authorityHost`, `tenantId`, `clientId`, `clientSecret` or `certificateContent`.

#### Application Identity in Node.js environment

`AppCredential` represents the application identity. It's used when user isn't involved like time-triggered automation job. SDK uses this credential when developers choose App identity in Node.js environment.

Required configuration: `tenantId`, `clientId`, `clientSecret` or `certificateContent`.

### Bot SSO

Bot related classes are stored under [bot folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/bot).

`TeamsBotSsoPrompt` has a good integration with bot framework. It simplifies the authentication process when you develop bot application and want to leverage the bot SSO.

Required configuration: `initiateLoginEndpoint`, `tenantId`, `clientId`, and `applicationIdUri`.

### Supported functions

TeamsFx SDK provides several functions to ease the configuration for third-party libraries. They're located under [core folder](https://github.com/OfficeDev/TeamsFx/tree/main/packages/sdk/src/core).

* Microsoft Graph Service:`createMicrosoftGraphClient` and `MsGraphAuthProvider` help to create authenticated Graph instance.
* SQL:`getTediousConnectionConfig` returns a tedious connection config.

Required configuration:

* `sqlServerEndpoint`, `sqlUsername`, `sqlPassword` if you want to use user identity.
* `sqlServerEndpoint`, `sqlIdentityId` if you want to use MSI identity.

### Error handling

API error response is `ErrorWithCode`, which contains error code and error message. For example, to filter out specific error, you can use the following snippet:

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

If credential instance is used in other library such as Microsoft Graph, it's possible that error is caught and transformed.

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

<br>

<details>
<summary><b>Use Graph API in tab app</b></summary>

Use `TeamsFx` and `createMicrosoftGraphClient`.

```ts
const teamsfx = new TeamsFx();
const graphClient = createMicrosoftGraphClient(teamsfx, ["User.Read"]);
const profile = await graphClient.api("/me").get();
```

</details>

<br>

<details>
<summary><b>Create API client to call existing API in Bot or Azure Function</b></summary>

:::image type="content" source="~/assets/images/teams-toolkit-v2/teams toolkit fundamentals/createapi-client.PNG" alt-text="Screenshot describes how to create API client.":::

</details>

<br>

<details>
<summary><b>Call Azure Function in tab app</b></summary>

Use `axios` library to make HTTP request to Azure Function.

```ts
const teamsfx = new TeamsFx();
const credential = teamsfx.getCredential(); //Create an API Client that uses SSO token to authenticate requests
const apiClient = CreateApiClient(teamsfx.getConfig("apiEndpoint")),
new BearerTokenAuthProvider(async () =>  (await credential.getToken(""))!.token);// Call API hosted in Azure Functions on behalf of user
const response = await apiClient.get("/api/" + functionName);
```

</details>

<br>

<details>
<summary><b>Access SQL database in Azure Function</b></summary>

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

</details>

<br>

<details>
<summary><b>Use certificate-based authentication in Azure Function</b></summary>

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

</details>

<br>

<details>
<summary><b>Use Graph API in bot application</b></summary>

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

</details>

<br>

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

#### Redirect by setting custom logger

```ts
setLogLevel(LogLevel.Info);
// Set another logger if you want to redirect to Application Insights in Azure Function
setLogger(context.log);
```

#### Redirect by setting custom log function

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

## Override configuration

You can pass custom config when creating TeamsFx instance to override default configuration or set required fields when environment variables are missing.

* If you have created tab project using VS Code Toolkit, the following config values will be used from pre-configured environment variables:
  * authorityHost (REACT_APP_AUTHORITY_HOST)
  * tenantId (REACT_APP_TENANT_ID)
  * clientId (REACT_APP_CLIENT_ID)
  * initiateLoginEndpoint (REACT_APP_START_LOGIN_PAGE_URL)
  * applicationIdUri (REACT_APP_START_LOGIN_PAGE_URL)
  * apiEndpoint (REACT_APP_FUNC_ENDPOINT)
  * apiName (REACT_APP_FUNC_NAME)

* If you have created Azure Function / bot project using VS Code Toolkit, the following config values will be used from pre-configured environment variables:
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

## Upgrade latest SDK version

If you're using the version of SDK that has `loadConfiguration()`, you can follow these steps to upgrade to the latest SDK version.

1. Remove `loadConfiguration()` and pass customized settings using `new TeamsFx(IdentityType.User, { ...customConfig })`
2. Replace `new TeamsUserCredential()` with `new TeamsFx()`
3. Replace `new M365TenantCredential()` with `new TeamsFx(IdentityType.App)`
4. Replace `new OnBehalfOfUserCredential(ssoToken)` with `new TeamsFx().setSsoToken(ssoToken)`
5. Pass the instance of `TeamsFx` to helper functions to replace credential instance

For more information, see [TeamsFx class](#teamsfx-class).

## Next step

[Samples](https://github.com/OfficeDev/TeamsFx-Samples) project for detailed examples on how to use TeamsFx SDK.

## See also

[Microsoft TeamsFx sample gallery](https://github.com/OfficeDev/TeamsFx-Samples).