---
title: Integrate API Connection
author: surbhigupta
description: Learn how to integrate an API connection into your Teams app with Microsoft Teams Toolkit for Visual Studio Code.
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: reference
ms.date: 01/03/2025
---

# Integrate API connection with your Teams app

Microsoft Teams Toolkit helps you seamlessly integrate existing APIs with Microsoft Teams apps. You can integrate APIs built by your organization or third-party providers. Before your begin, ensure that your Teams app contains a backend service, such as [Microsoft Azure Functions](/azure/azure-functions/functions-overview?pivots=programming-language-javascript) or [Azure Bot Service](/azure/bot-service/bot-service-overview?view=azure-bot-service-4.0&preserve-view=true) to host your API connection.

## Add API connection to your Teams app

You can configure an API connection to your app with the following steps:

* [Add TeamsFx SDK to project](#add-teamsfx-sdk-to-project)
* [Create an `apiClient` instance](#create-an-apiclient-instance)
* [Add configuration for local debug](#add-configuration-for-local-debug)
* [Add configuration for Azure](#add-configuration-for-azure)

### Add TeamsFx SDK to project

Go to `package.json` in your project and add a reference to the `@microsoft/teamsfx` package.

### Create an `apiClient` instance

TeamsFx SDK supports five methods to connect your app to an API. Create a new module to handle the API connection. The module must export an `apiClient` instance that you can use throughout your project.

# [Basic authentication](#tab/basic)

The following code snippet uses a basic authentication method, such as username and password, to connect your app to an API:

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

# [Certification](#tab/certification)

The following code snippet shows how to use a certificate to connect your app to an API:

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

# [Microsoft Entra](#tab/entra)

You can use a Microsoft Entra app to connect your app to an API in the following ways:

* Reuse your project's Microsoft Entra app, if your project contains an existing Microsoft Entra app.
* Use a separate Microsoft Entra app.

The following code snippet shows both scenarios:

```javascript
const teamsfxSdk = require("@microsoft/teamsfx");
// There are 2 scenarios here, please choose one of them. This sample uses the client credential flow to acquire a token for your API.
// Scenario 1. reuse the project Microsoft Entra app.
const appAuthConfig: AppCredentialAuthConfig = {
  authorityHost: process.env.AAD_APP_OAUTH_AUTHORITY_HOST,
  clientId: process.env.TEAMSFX_API_CLIENT_ID,
  tenantId: process.env.TEAMSFX_API_TENANT_ID,
  clientSecret: process.env.TEAMSFX_API_CLIENT_SECRET,
};
// Scenario 2. use an existing Microsoft Entra App.
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

# [API key](#tab/apikey)

The following code snippet shows how to use an API key to connect your app to an API:

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

# [Custom authentication](#tab/custom)

The following code snippet shows how to implement a custom authentication logic to connect your app to an API:

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

---

You can import the `apiclient` instance in another file to make a call to an API. Teams handles the authentication for you automatically. The following code snippet is an example of a GET request to an API:

```javascript
const { apiClient } = require("relative_path_to_this_file");
const response = await apiClient.get("relative_path_of_target_api");
// You only need to enter the relative path for your API.
// For example, if you want to call api https://my-api-endpoint/test and you configured https://my-api-endpoint as the API endpoint,
// your code will be: const response = await kudosClient.get("test");

const responseBody = response.data;
```

### Add configuration for local debug

Based on the authentication method you select in the previous step, use the corresponding code snippet to configure your API for local debug. Add your API connection configuration code under `env/.env.local`.

# [Basic authentication](#tab/basic)

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
TEAMSFX_API_USERNAME =
TEAMSFX_API_PASSWORD =
```

# [Certification](#tab/certification)

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
```

# [Microsoft Entra](#tab/entra)

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

# [API key](#tab/apikey)

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT =
TEAMSFX_API_API_KEY =
```

# [Custom authentication](#tab/custom)

```javascript
...
// set up environment variables required by teamsfx
TEAMSFX_API_ENDPOINT=
```

---

### Add configuration for Azure

Before provision, ensure that the project has Azure Functions or Bot Service to host your API connection. Add the `apiClient` instance to the corresponding service based on the authentication method you previously selected.

* If you're hosting your app in Azure Functions, add an `appSettings` array under `infra/azure.bicep`.

* If you're hosting in the Bot Service, add an `appSettings` array under `infra/botRegistration/azurebot.bicep`.

# [Basic authentication](#tab/basic)

* **Azure Functions**

    ```bicep
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

* **Bot Service**

    ```bicep
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

# [Certification](#tab/certification)

* **Azure Functions**

    ```bicep
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

* **Bot Service**

    ```bicep
    ...
    // Register your web service as a bot with the Bot Framework
    resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
      ...
      properties: {
        TEAMSFX_API_ENDPOINT: ''
        ...
      }
    ```

# [Microsoft Entra](#tab/entra)

* **Azure Functions**

    ```bicep
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

* **Bot Service**

    ```bicep
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

> [!TIP]
> You can use `common` as the value for `TEAMSFX_API_TENANT_ID`, if needed.

# [API key](#tab/apikey)

* **Azure Functions**

    ```bicep
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

* **Bot Service**

    ```bicep
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

# [Custom authentication](#tab/custom)

* **Azure Functions**

    ```bicep
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

* **Bot Service**

    ```bicep
    ...
    // Register your web service as a bot with the Bot Framework
    resource botService 'Microsoft.BotService/botServices@2021-03-01' = {
      ...
      properties: {
        TEAMSFX_API_ENDPOINT: ''
        ...
      }
    ```

---

## Next step

> [!div class="nextstepaction"]
> [Add cloud resources and API connection](add-resource.md)
