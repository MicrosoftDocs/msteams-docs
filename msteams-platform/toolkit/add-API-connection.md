---
title: Connect to existing APIs
author: MuyangAmigo
description:  Describes connection to existing APIs
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/12/2022
---

# Connect to existing APIs

While developing a Teams application, you'll frequently wish to use existing APIs that could be internal or third-party APIs. The Teams Toolkit helps you in bootstrapping sample code to use these APIs if you don't have the proper SDKs.

## Connect to the API

If you link Teams Toolkit to an existing API, it will:

* Generate sample code under `./bot` or `./api` folder
* Add a reference to the `@microsoft/teamsfx` package to `package.json`
* Add application settings for your API in  `.env.teamsfx.local` that configures local debugging

### API connection in Visual Studio Code

* You can add API connection using Teams Toolkit in Visual Studio Code:

    1. Open **Microsoft Visual Studio Code**.
    2. Select **Teams Toolkit** from left navigation bar.
    3. Select **Add features** or open command palette and select **Teams: Add features**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features.png" alt-text="api add features":::

    4. Select **API Connection**.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features.png" alt-text="api select features":::

    5. You can use a valid http (s) URL as the input endpoint for the API. It's the base URL for API requests that is added to the project's local application settings.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-endpoint.png" alt-text="api endpoint":::

    6. Select the component that will access the API.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-invoke.png" alt-text="api invoke":::

    7. Enter an alias for the API. The alias  generates an application setting names for the API that is added to the project's local application setting.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias.png" alt-text="api alias":::

    8. Select how the API requests will be authenticated. Depending on your pick, we'll produce the required sample code and add the corresponding local application settings.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-auth.png" alt-text="api auth":::

    9. Depending on the authentication type selected, additional configuration is required.

### API connection in TeamsFx CLI

The base command of this feature is `teamsfx add api-connection [authentication type]`. Here's the list of the different authentication types and corresponding sample commands. You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |Basic|teamsfx add api-connection basic --[endpoint] (https://example.com) --component bot --alias example --user-name exampleuser --interactive false|
   |API Key|teamsfx add api-connection apikey --[endpoint] (https://example.com) --component bot --alias example --key-location header --key-name example-key-name --interactive false|
   |Azure AD|teamsfx add api-connection aad --[endpoint] (https://example.com) --component bot --alias example --app-type custom --tenant-id your_tenant_id --app-id your_app_id --interactive false|
   |Certificate|teamsfx add api-connection cert --[endpoint] (https://example.com) --component bot --alias example --interactive false|
   |Custom|teamsfx add api-connection custom --[endpoint] (https://example.com) --component bot --alias example --interactive false|

## Understanding your project's updates

 Teams Toolkit does the following modifications to the `bot` or `api` folder based on your selections:

1. Create `{your_api_alias}.js/ts` file. The file initializes and exports the API client for your API.

2. Add `@microsoft/teamsfx` package to `package.json`. The package provides support for common API authentication methods.
 
3. Add environment variables to `.env.teamsfx.local`. They are the configurations for the selected authentication type. The generated code reads values from these environment variables.

## Testing API connection
    
Follow the steps to test the API connection in the Teams Toolkit local environment, after adding an API connection:

 1. Run npm install.
 
Run `npm install` under `bot` or `api` folder to install added packages.

 2. Add API credentials to the local application settings.
 
Teams Toolkit does't ask for credentials but it will leave placeholders in the local application settings file. Substitute these placeholders with the appropriate credentials to access the API. The local application settings file is the `.env.teamsfx.local` file in the bot or `api` folder.
 
 3. Use the API client to make API requests
 
Import the API client from the source code that needs access to the API:

```

import { yourApiClient } from '{relative path to the generated file}'

```

 4. Create http(s) requests to target API (with Axios)
 
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

### Connecting to APIs for Microsoft Azure Active Directory (Azure AD) permissions

Some services are authenticated by Azure AD. To access these services, there are two common ways to configure the API permissions:

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
   2. Start local debug or provision a cloud environment for your project. It will create an Azure AD Application Registration your Teams application.
   
   3. Open `.fx/states/state.{env}.json` and note the value of `clientId` under `fx-resource-aad-app-for-teams` property. It is the application client id.
   
   4. See [Grant admin consent in App registrations](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent#grant-admin-consent-in-app-registrations) to get admin consent for the required application permission. You'll need your application client id.
   
#### Access Control Lists (ACsL)

   1. Start local debug or provision a cloud environment for your project. It creates an Azure AD Application Registration your Teams application.
  
   2. Open `.fx/states/state.{env}.json`, and note the value of `clientId` under `fx-resource-aad-app-for-teams` property.
   
   3. Provide the client id to the API provider to configure ACLs on the API service.





























|
