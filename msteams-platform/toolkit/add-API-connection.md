---
title: Connect to existing APIs
author: MuyangAmigo
description:  Describes connection to existing APIs
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/13/2022
---

# Connect to existing APIs

While developing a Teams application, you'll frequently wish to use existing APIs that could be internal or third-party APIs. If you don't have language appropriate SDKs to access these APIs. Teams Toolkit helps you in bootstrapping sample code to use these APIs if you don't have the proper SDKs.

> [!NOTE]
> This feature is currently under [public developer preview](../resources/dev-preview/developer-preview-intro.md). Report any issues to us [here](https://github.com/OfficeDev/TeamsFx/issues/new/choose).

## Connect to the API

If you link Teams Toolkit to an existing API, it will:

 1. Generate sample code under `./bot` or `./api` folder.
 2. Add a reference to the `@microsoft/teamsfx` package to `package.json`.
 3. Add application settings for your API in  `.env.teamsfx.local` that configures local debugging.

### API connection in Visual Studio Code

* You can add API connection using Teams Toolkit in Visual Studio Code:

    1. Open **Microsoft Visual Studio Code**.
    2. Select **Teams Toolkit** from left navigation bar.
    3. Select **Add features** under **DEVELOPMENT** or open command palette and select **Teams: Add features**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features.png" alt-text="api add features":::

    4. Select **API Connection** under **Add features**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features.png" alt-text="api select features":::

    5. Input endpoint for the API. The endpoint should be a valid http(s) url. It's added to the project's local application settings and it's the base url for API requests.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-endpoint.png" alt-text="api endpoint":::

    6. Select the component that will access the API.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-invoke.png" alt-text="api invoke":::

    7. Input an alias for the API. The alias  generates an application setting name for the API that is added to the project's local application setting.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias.png" alt-text="api alias":::

    8. Select how you want to authenticate the API request from the **API authentication type**. We'll generate appropriate sample code and add corresponding local application settings based on your selection.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-auth.png" alt-text="api auth":::

    > [!NOTE]
    > There will be some additional configuration required based on the authentication type selected.

### API connection in TeamsFx CLI

The base command of this feature is `teamsfx add api-connection [authentication type]`. Here's the list of the different authentication types and corresponding sample commands. You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |Basic|teamsfx add api-connection basic --[endpoint] (https://example.com) --component bot --alias example --user-name exampleuser --interactive false|
   |API Key|teamsfx add api-connection apikey --[endpoint] (https://example.com) --component bot --alias example --key-location header --key-name example-key-name --interactive false|
   |Azure AD|teamsfx add api-connection aad --[endpoint] (https://example.com) --component bot --alias example --app-type custom --tenant-id your_tenant_id --app-id your_app_id --interactive false|
   |Certificate|teamsfx add api-connection cert --[endpoint] (https://example.com) --component bot --alias example --interactive false|
   |Custom|teamsfx add api-connection custom --[endpoint] (https://example.com) --component bot --alias example --interactive false|

## Understanding updates to the project

 Teams Toolkit does the following modifications to the `bot` or `api` folder based on your selections:

1. Generate `{your_api_alias}.js/ts` file. The file initializes an API client for your API and exports the API client.

2. Add `@microsoft/teamsfx` package to `package.json`. The package provides support for the common API authentication methods.
 
3. Add environment variables to `.env.teamsfx.local`. These are the configurations for the selected authentication type. The generated code reads values from the environment variables.

## Test API connection in local environment
    
Follow the steps to test the API connection in the Teams Toolkit local environment:

 1. **Run npm install**
 
    Run `npm install` under `bot` or `api` folder to install added packages.

 2. **Add API credentials to the local application settings**
 
    Teams Toolkit does't ask for credentials but it will leave placeholders in the local application settings file. Substitute these placeholders with the appropriate credentials to access the API. The local application settings file is the `.env.teamsfx.local` file in the bot or `api` folder.
 
 3. **Use the API client to make API requests**
 
    Import the API client from the source code that needs access to the API:

```

import { yourApiClient } from '{relative path to the generated file}'

```

 4. **Generate http(s) requests to target API (with Axios)**
 
    The generated API client is an Axios API client. Use the Axios client to make requests to the API.

[Axios](https://www.npmjs.com/package/axios) is a popular nodejs package that helps you make http(s) requests. For more information, see [Axios example documentation](https://axios-http.com/docs/example) to learn how to make http(s) requests with it.

## Deploy your application to Azure

To deploy your application to Azure, you'll need to add the authentication configuration to the application settings for the appropriate environment. For example, your API might have different credentials for `dev` and `prod`. You can configure Teams Toolkit appropriately based on your environment needs.

Teams Toolkit configures your local environment. The bootstrapped sample code contains comments that tell you what app settings you need to configure. For more information on application settings, see [Add app settings](https://github.com/OfficeDev/TeamsFx/wiki/%5BDocument%5D-Add-app-settings).
 
## Advanced scenarios

### Custom authentication provider

Besides the authentication provider included in `@microsoft/teamsfx` package, you can also implement customized authentication provider that implements `AuthProvider` interface and use it in `createApiClient(..)` function:

```

import { AuthProvider } from '@microsoft/teamsfx'

class CustomAuthProvider implements AuthProvider {
    constructor() {
        // You can add necessary parameters for your customized logic in constructor
    }

    AddAuthenticationInfo: (config: AxiosRequestConfig) => Promise<AxiosRequestConfig> = async (
        config
    ) => {
        /*
        * The config parameter contains all the request information and can be updated to include extra authentication info.
        * Refer https://axios-http.com/docs/req_config for detailed document for the config object.
        * 
        * Add your customized logic that returns updated config
        */
    };
}

```

### Connecting to APIs for AAD permissions

Some services are authenticated by Microsoft Azure Active Directory (Azure AD). To access these services, there are two common ways to configure the API permissions:

  * Use Access Control Lists (ACLs)
  * Use Azure AD application permissions

Obtaining a token with the right resource scopes for your API depends on the implementation of the API.

You can follow the steps to access these APIs while using:

####  Azure AD application permissions
 
  1. Open `templates/appPackage/aad.template.json`, add following content to `requiredResourceAccess` property:
  
```

  {
     "resourceAppId": "The AAD App Id for the service providing the API you are connecting to",
     "resourceAccess": [
         {
             "id": "Target API's application permission Id",
             "type": "Role"
         }
     ]
 }

```
   2. Start local debug a cloud environment for your project. It will create an Azure AD Application Registration your Teams application.
   
   3. Open `.fx/states/state.{env}.json` and note the value of `clientId` under `fx-resource-aad-app-for-teams` property. It's the application client ID.
   
   4. See Grant admin consent in App registrations to get admin consent for the required application permission. You'll need your application client ID.
   
#### Access Control Lists (ACsL)

   1. Start local debug a cloud environment for your project. It creates an Azure AD Application Registration your Teams application.
  
   2. Open `.fx/states/state.{env}.json`, and note the value of `clientId` under `fx-resource-aad-app-for-teams` property.
   
   3. Provide the client ID to the API provider to configure ACLs on the API service.





























|
