---
title: Integrate existing third-party APIs
author: MuyangAmigo
description: Learn how toolkit allows bootstrap sample access to existing APIs. List of different authentication types.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: Overview
ms.date: 05/20/2022
---

# Integrate existing third-party APIs

Teams Toolkit allows you to access and use existing APIs for building Teams apps. Your organization or a third-party might have developed these APIs. When you use Teams Toolkit to connect to an existing API, Teams Toolkit performs the following functions:

* Generate sample code in the `./bot` or `./api` folder.
* Add a reference to the `@microsoft/teamsfx` package to `package.json`.
* Add app settings for your API in  `.env.teamsfx.local` that configures local debugging.

Teams Toolkit allows you bootstrap sample code to access the APIs, if you don't have language appropriate SDKs to access these APIs.

## Configure API connection

You can add an existing third-party API to your Teams app using:

* [Teams Toolkit](#add-api-connection-using-teams-toolkit)
* [TeamsFx CLI commands](#add-api-connection-using-teamsfx-cli)

### Add API connection using Teams Toolkit

Add a connection to an existing third-party API using the following steps:

1. Open your Teams app project in **Visual Studio Code**.
1. Select **Teams Toolkit** from the Visual Studio Code activity bar.
1. Select **View How-to Guides** in the **DEVELOPMENT** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/manual/select-feature123_1.png" alt-text="Screenshot showing the selection of View How to guides. ":::

1. Select **API Connection**.

1. From the dropdown list that appears, select the API connection you want to add to your app. You'll be redirected to the respective How-to Guide.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="api select features":::

      |**Development** | **How-to Guide** |
      |----------|----------|
      |Connect to an API | [How to Integrate API Connection with your Teams app](https://github.com/OfficeDev/TeamsFx/wiki/Integrate-API-Connection-with-your-Teams-app) |
      |Automate CI/CD Pipelines | [How to automate CI/CD pipelines](https://github.com/OfficeDev/TeamsFx/wiki/How-to-automate-cicd-pipelines) |
      |Run and Debug on Mobile Client | [How to Run and debug your Teams application on iOS or Android client](https://github.com/OfficeDev/TeamsFx/wiki/Run-and-debug-your-Teams-application-on-iOS-or-Android-client) |

# [Basic](#tab/basic)

For implementing basic authentication using username and password:

* Select **Basic**.
* Enter the username for basic Auth.

Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Certification](#tab/certification)

* Select **Certification** to authenticate requests using certificates.

Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Azure Active Directory (Azure AD)](#tab/AAD)

* Select **Azure Active Directory (Azure AD)** to authenticate requests using Azure AD access tokens.

Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [API Key](#tab/apikey)

* Select **API Key** to implement authentication using an API key.
* Select the required API key position in request.
* Enter an API key name.

Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Custom Auth Implementation](#tab/CustomAuthImplementation)

* Select **Custom Auth Implementation** to customize authentication according to your app requirement.

Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

---

You've successfully added a connection in your Teams app to an existing API.

## Add API connection using TeamsFx CLI

The base command of this feature is `teamsfx add api-connection [authentication type]`. The following table provides a list of different authentication types and their corresponding sample commands:

 > [!TIP]
 > You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |**Basic**|teamsfx add api-connection basic--endpoint <https://example.com> --component bot--alias example--user-name example user--interactive false|
   |**API Key**|teamsfx add api-connection apikey--endpoint <https://example.com> --component bot--alias example--key-location header--key-name example-key-name--interactive false|
   |**Azure AD**|teamsfx add api-connection aad--endpoint <https://example.com> --component bot--alias example--app-type custom--tenant-id your_tenant_id--app-id your_app_id--interactive false|
   |**Certificate**|teamsfx add api-connection cert--endpoint <https://example.com> --component bot--alias example--interactive false|
   |**Custom**|teamsfx add api-connection custom--endpoint <https://example.com> --component bot--alias example--interactive false|

---

## Directory structure updates to your project

 Teams Toolkit modifies `bot` or `api` folder based on your selection:

1. Generate `{your_api_alias}.js\ts` file. The file initializes an API client for your API and exports the API client.

2. Add `@microsoft\teamsfx` package to `package.json`. The package provides support for the common API authentication methods.

3. Add environment variables to `.env.teamsfx.local`. You must configure environment variables for the selected authentication type. The generated code reads values from the environment variables.

## Steps to add API Connection

The following steps help you to add API connection manually:

* Add SDK to project
* Provide ApiClient for project
* Add Configuration for local debugging
* Add Configuration for Azure

1. Add SDK to project

Add a reference to the `@microsoft/teamsfx` package to `package.json`.

1. Provide ApiClient for project

The TeamsFx SDK supports five different ways to connect to the API. You can create a module to connect your API and export the `apiClient` to provide for your project.

# [Basic Auth](#tab/basicauth1)

Sample code for Basic Auth:

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");

// Initialize a new axios instance to call your API
const authProvider = new teamsfxSdk.BasicAuthProvider(
  process.env.TEAMSFX_API_USERNAME,
  process.env.TEAMSFX_API_PASSWORD
);
const apiClient = teamsfxSdk.createApiClient(
  process.env.TEAMSFX_API_ENDPOINT,
  authProvider
);
module.exports.apiClient = apiClient;
```

# [Certification](#tab/certification1)

Sample code for Certification

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");

// Initialize a new axios instance to call your API
const authProvider = new teamsfxSdk.CertificateAuthProvider(
  // TODO: 
  // 1. Add code to read your certificate and private key.
  // 2. Replace "<your-cert>" and "<your-private-key>" with your actual certificate and private key values
  // If you have a .pfx certificate, you can use the `createPfxCertOption` function to initialize your certificate
  teamsfxSdk.createPemCertOption("<your-cert>", "<your-private-key>")
);
const apiClient = teamsfxSdk.createApiClient(
  process.env.TEAMSFX_API_ENDPOINT,
  authProvider
);
module.exports.apiClient = apiClient;
```

# [Azure Active Directory](#tab/azureactivedirectory1)

Below are the two scenarios:

* Scenario 1 is reusing the project AAD app, make sure your project contains an existing AAD app.

* Scenario 2 is using an existing AAD App.

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");
// There are 2 scenarios here, please choose one of them. This sample uses the client credential flow to acquire a token for your API.
// Scenario 1. reuse the project AAD app.
const appAuthConfig: AppCredentialAuthConfig = {
  authorityHost: process.env.AAD_APP_OAUTH_AUTHORITY_HOST,
  clientId: process.env.TEAMSFX_API_CLIENT_ID,
  tenantId: process.env.TEAMSFX_API_TENANT_ID,
  clientSecret: process.env.TEAMSFX_API_CLIENT_SECRET,
};
// Scenario 2. use an existing AAD App.
const appAuthConfig: AppCredentialAuthConfig = {
  authorityHost: "https://login.microsoftonline.com",
  clientId: process.env.TEAMSFX_API_CLIENT_ID,
  tenantId: process.env.TEAMSFX_API_TENANT_ID,
  clientSecret: process.env.TEAMSFX_API_CLIENT_SECRET,
};
const appCredential = new AppCredential(appAuthConfig);
// Initialize a new axios instance to call your API
const authProvider = new teamsfxSdk.BearerTokenAuthProvider(
  // TODO: Replace '<your-api-scope>' with your required API scope
  async () => (await appCredential.getToken("<your-api-scope>")).token
);
const apiClient= teamsfxSdk.createApiClient(
  process.env.TEAMSFX_API_ENDPOINT,
  authProvider
);
module.exports.apiClient= apiClient;
```

# [API Key](#tab/apikey1)

Sample code for API Key:

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");

// Initialize a new axios instance to call kudos, store API key in request header.
const authProvider = new teamsfxSdk.ApiKeyProvider(
  "{API-KEY-name}",
  process.env.TEAMSFX_API_API_KEY,
  teamsfxSdk.ApiKeyLocation.Header
);
// or store API key in request params.
const authProvider = new teamsfxSdk.ApiKeyProvider(
  "{API-KEY-name}",
  process.env.TEAMSFX_API_API_KEY,
  teamsfxSdk.ApiKeyLocation.QueryParams
);
const apiClient = teamsfxSdk.createApiClient(
  process.env.TEAMSFX_API_ENDPOINT,
  authProvider
);
module.exports.apiClient = apiClient;
```

# [Custom Auth Implementation](#tab/CustomAuthImplementation1)

Sample code for Custom Auth Implementation:

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");

// A custom authProvider implements the `AuthProvider` interface.
// This sample authProvider implementation will set a custom property in the request header
class CustomAuthProvider {
  customProperty;
  customValue;

  constructor(customProperty, customValue) {
    this.customProperty = customProperty;
    this.customValue = customValue;
  }

  // Replace the sample code with your own logic.
  AddAuthenticationInfo = async (config) => {
    if (!config.headers) {
      config.headers = {};
    }
    config.headers[this.customProperty] = this.customValue;
    return config;
  };
}

const authProvider = new CustomAuthProvider(
  // You can also add configuration to the file `.env.teamsfx.local` and use `process.env.{setting_name}` to read the configuration. For example:
  //  process.env.TEAMSFX_API_CUSTOM_PROPERTY,
  //  process.env.TEAMSFX_API_CUSTOM_VALUE
  "customPropery",
  "customValue"
);
// Initialize a new axios instance to call your API
const apiClient = teamsfxSdk.createApiClient(
  process.env.TEAMSFX_API_ENDPOINT,
  authProvider
);
module.exports.apiClient = apiClient;
```

You can import the apiClient (an Axios instance) in another file and call the APIs and authentication is now handled for you automatically.

Example for a GET request to "relative_path_of_target_api":

```javascript
const { apiClient } = require("relative_path_to_this_file");
const response = await apiClient.get("relative_path_of_target_api");
// You only need to enter the relative path for your API.
// For example, if you want to call api https://my-api-endpoint/test and you configured https://my-api-endpoint as the API endpoint,
// your code will be: const response = await kudosClient.get("test");

const responseBody = response.data;
```

---

1. Add Configuration for local debugging

According to the `apiClient` created in Step 2, select the corresponding type to configure your API for local debugging.

# [Basic Auth](#tab/basicauth2)

Append your Api connection configuration to `env/.env.local`

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
TEAMSFX_API_USERNAME =
TEAMSFX_API_PASSWORD =
```

# [Certification](#tab/certification2)

Append your Api connection configuration to `env/.env.local`

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
```

# [Azure Active Directory](#tab/azureactivedirectory2)

Below are the two scenarios:

* Scenario 1 is reusing the project AAD app, make sure your project contains an existing AAD app.

* Scenario 2 is using an existing AAD App.

Append your Api connection configuration to `env/.env.local`

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
// Scenario 1
TEAMSFX_API_TENANT_ID = 
TEAMSFX_API_CLIENT_ID = 
TEAMSFX_API_CLIENT_SECRET = 
AAD_APP_OAUTH_AUTHORITY_HOST = 
// Scenario 2
TEAMSFX_API_TENANT_ID =
TEAMSFX_API_CLIENT_ID =
TEAMSFX_API_CLIENT_SECRET =
```

> [!NOTE]
>You can use `common` as tenant id if necessary.

# [API Key](#tab/apikey2)

Append your Api connection configuration to `./env/.env.local`

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
TEAMSFX_API_API_KEY =
```

# [Custom Auth Implementation](#tab/CustomAuthImplementation2)

Append your Api connection configuration to `env/.env.local`

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT=
```

---

1. Add Configuration for Azure

Before provision, make sure the project has *Azure Function* or *Bot Service* to host your API connection. Then add the apiClient to the correspoing service according to your design.

If hosting in the *Azure Function*, please append following appSettings to `infra/azure.bicep`

If hosting in the Bot Service, please append following appSettings to `infra/botRegistration/azurebot.bicep`

# [Basic Auth](#tab/basicauth3)

Host in the *Azure Function*, append following values to `infra/azure.bicep`

```javascript
...
// Azure Functions that hosts your function code
resource functionApp 'Microsoft.Web/sites@2021-02-01' = {
  ...
  appSettings: [
    {
      name: 'TEAMSFX_API_ENDPOINT',
      value: ''
    }
    {
      name: 'TEAMSFX_API_USERNAME',
      value: ''
    }
    {
      name: 'TEAMSFX_API_USERNAME',
      value: ''
    }
  ...
```

* Host in the Bot Service, append following values to `infra/botRegistration/azurebot.bicep`

```javascript
...
// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  ...
  properties: {
    TEAMSFX_API_ENDPOINT: ''
    TEAMSFX_API_USERNAME: ''
    TEAMSFX_API_USERNAME: ''
    ...
  }
```

# [Certification](#tab/Certification3)

* Host in the *Azure Function*, append following values to `infra/azure.bicep`

```javascript
...
// Azure Functions that hosts your function code
resource functionApp 'Microsoft.Web/sites@2021-02-01' = {
  ...
      appSettings: [
        {
          name: 'TEAMSFX_API_ENDPOINT',
          value: ''
        }
        ...
```

* Host in the *Bot Service*, append following values to `infra/botRegistration/azurebot.bicep`

```javascript
...
// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  ...
  properties: {
    TEAMSFX_API_ENDPOINT: ''
    ...
  }
```

# [Azure Active Directory](#tab/azureactivedirectory3)

* Host in the *Azure Function*, append following values to `infra/azure.bicep`

```javascript
...
// Azure Functions that hosts your function code
resource functionApp 'Microsoft.Web/sites@2021-02-01' = {
  ...
  appSettings: [
    {
      name: 'TEAMSFX_API_ENDPOINT',
      value: ''
     }
     // Scenario 1
    {
        name: 'TEAMSFX_API_TENANT_ID',
       value: ''
    }
    {
       name: 'TEAMSFX_API_CLIENT_ID',
       value: ''
    }
    {
        name: 'TEAMSFX_API_CLIENT_SECRET',
       value: ''
    }
    {
      name: 'AAD_APP_OAUTH_AUTHORITY_HOST',
      value: ''
    }

    // Scenario 2
    {
      name: 'TEAMSFX_API_TENANT_ID',
      value: ''
    }
    {
      name: 'TEAMSFX_API_CLIENT_ID'
      value: '' 
    }
    {
      name: 'TEAMSFX_API_CLIENT_SECRET',
      value: ''
    }
   ...
```

* Host in the *Bot Service*, append following values to `infra/botRegistration/azurebot.bicep`

```javascript
...
// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  ...
  properties: {
    TEAMSFX_API_ENDPOINT: ''
    // Scenario 1
    TEAMSFX_API_TENANT_ID = 
    TEAMSFX_API_CLIENT_ID = 
    TEAMSFX_API_CLIENT_SECRET = 
    AAD_APP_OAUTH_AUTHORITY_HOST = 
    // Scenario 2
    TEAMSFX_API_TENANT_ID =
    TEAMSFX_API_CLIENT_ID =
    TEAMSFX_API_CLIENT_SECRET =
    ...
  }
```

>[!NOTE]
> You can use `common` as tenant id if necessary.

# [API Key](#tab/apikey3)

* Host in the *Azure Function*, append following values to `infra/azure.bicep`

```javascript
...
// Azure Functions that hosts your function code
resource functionApp 'Microsoft.Web/sites@2021-02-01' = {
  ...
  appSettings: [
    {
      name: 'TEAMSFX_API_ENDPOINT',
      value: ''
    }
    {
      name: 'TEAMSFX_API_API_KEY',
      value: ''
    }
        ...
```

* Host in the *Bot Service*, append following values to `infra/botRegistration/azurebot.bicep`

```javascript
...
// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  ...
  properties: {
    TEAMSFX_API_ENDPOINT: ''
    TEAMSFX_API_API_KEY: ''
    ...
  }
```

# [Custom Auth Implementation](#tab/CustomAuthImplementation3)

* Host in the *Azure Function*, append following values to `infra/azure.bicep`

```javascript
...
// Azure Functions that hosts your function code
resource functionApp 'Microsoft.Web/sites@2021-02-01' = {
  ...
   appSettings: [
     {
      name: 'TEAMSFX_API_ENDPOINT',
      value: ''
     }
        ...
```

* Host in the *Bot Service*, append following values to `infra/botRegistration/azurebot.bicep`

```javascript
...
// Register your web service as a bot with the Bot Framework
resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
  ...
  properties: {
    TEAMSFX_API_ENDPOINT: ''
    ...
  }
```

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
