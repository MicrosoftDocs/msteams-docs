---
title: Add API connection to Your Teams apps
author: MuyangAmigo
description:  Describes Add API connection
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/10/2022
---

# Add API connection

You usually want to access data or information when building Teams application. If you do not have an appropriate SDK that helps you make an API request, Teams Toolkit is here to help you bootstrap sample code which handles authentication for your API requests.

## Connect to an API

Teams Toolkit helps you connect to an API easily from a computing resource (Azure Functions or Bot). By adding an API connection, Teams Toolkit will:

* Generate sample code under `./bot` or `./api` folder
* Add the appropriate version of `@microsoft/teamsfx` package to `package.json` if this does not exist
* Add new app settings for your API to `.env.teamsfx.local`, which is used during local debugging

### Add API connection using Visual Studio Code

* You can add API connection using Teams Toolkit in Visual Studio Code

    1. Open **Microsoft Visual Studio Code**
    2. Select **Teams Toolkit** from left panel
    3. Select **Add features** or open command palette and select **Teams: Add features**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/sso-add features.png" alt-text="API add features":::

    4. Select **API Connection**

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/API-select features.png" alt-text="API select":::

    5. Input endpoint for your API. The endpoint should be a valid http(s) url. It will be added to your project's local app setting and used as base url when making requests. This means you don't need to input full api url for every request.

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/API-endpoint.png" alt-text="API endpoint":::

    6. Choose which component needs to invoke the API.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/API-invoke.png" alt-text="API invoke":::

    7. Input alias for your API. The alias is used to generate app setting names for your API, which will be added to your project's local app setting.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/API-alias.png" alt-text="API alias":::

    8. Select how you want to authenticate the API requests. We will generate appropriate sample code and add corresponding local app settings based on your selection.
    
        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/API-auth.png" alt-text="sso auth":::

    9. There will be some additional questions based on your selection of an authentication type. Provide information for each question to complete the flow.

### Add API connection using TeamsFx CLI in command window

The base command of this feature is `teamsfx add api-connection [authentication type]`. Here is the list of available authentication type and corresponding sample command. You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |Basic|teamsfx add api-connection basic --endpoint (https://example.com) --component bot --alias example --user-name exampleuser --interactive false|
   |ModAPI Keyify|teamsfx add api-connection apikey --endpoint (https://example.com) --component bot --alias example --key-location header --key-name example-key-name --interactive false|
   |AAD|teamsfx add api-connection aad --endpoint (https://example.com) --component bot --alias example --app-type custom --tenant-id your_tenant_id --app-id your_app_id --interactive false|
   |Certificate|teamsfx add api-connection cert --endpoint (https://example.com) --component bot --alias example --interactive false|
   |Custom|teamsfx add api-connection custom --endpoint (https://example.com) --component bot --alias example --interactive false|

## How this feature changes your project

After you successfully triggered the command, the tooling will make following changes to `bot` or `api` folder based on selected component(s):

1. Generate `{your_api_alias}.js/ts`. The file demostrates how to initialize an API client for your API with support of `@microsoft/teamsfx` package, as well as exported the API client to be consumed in other source code files.

2. Add `@microsoft/teamsfx` package to `package.json` if your project does not have this package. The package provides support for common API authentication methods.
 
3. Add several environment variables to `.env.teamsfx.local` to provide necessary information for selected authentication type. The generated code will read values from these environment variables. You can rename the environment variables and update generated code to use your favorite names.

## Invoke API in local environment
    
After the command updated your project, please follow the instructions displayed by the tooling to invoke your APIs. Generally, you need to do following things. You can visit the generated file to get more details for these action items.

 1. Run npm install
 
You need to run `npm install` under `bot` or `api` folder to install added packages. This ensures you can have Intellisense support when coding. 

 2. Add your API credentials to local app settings
 
The command will not ask any credentials when generating sample code and adding local app settings. But it will leave some placeholders for you to fill your credentials. Please fill your API credentials to `.env.teamsfx.local` under `bot` or `api` folder to avoid authentication failures for your API requests.
 
 3. Reference the generated API client
 
The sample code initializes an API client instance for you and exports it. So in your source code, you can import the API client instance and use it:

```JavaScript

import { yourApiClient } from '{relative path to the generated file}'

```

 4. Make http(s) requests to target API (with axios)
 
The generated API client is an axios instance. [Axios](https://www.npmjs.com/package/axios) is a popular nodejs package that helps you make http(s) requests. You can visit axios [documentation](https://axios-http.com/docs/example) to learn how to make http(s) requests with it.

## Invoke the API in remote environment

Please add app settings for your hosting environments if you are ready to move your application to the cloud.

Teams Toolkit only sets up app settings for your local environment to help you debug your code. Before you deploy your code to your hosting environments, you need to add necessary app settings to your hosting environments. The bootstrapped sample code contains comments that tell you what app settings you need to configure.

If you're using Azure to host your application, you can visit this [documentation](https://github.com/OfficeDev/TeamsFx/wiki/%5BDocument%5D-Add-app-settings) to learn how to add app settings.
 
## Advanced scenarios

### Custom authentication provider

Besides the authentication provider included in `@microsoft/teamsfx` package, you can also implement your customized authentication provider that implements `AuthProvider` interface and use it in `createApiClient(..)` function:

```JavaScript

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

### Gain API permission for your Teams app's AAD app registration

When using AAD app to authenticate service to service requests, there're 2 common ways to configure the API permissions: using Access Control List (ACL) or using AAD application permission. How to gain permission for your target API depends on the actual implementation of the API server. Here're the common steps to gain permission for your Teams app's AAD app registration.

#### Steps to gain permission for APIs that use AAD application permission for access control
 
  1. Open `templates/appPackage/aad.template.json`, add following content to `requiredResourceAccess` property:
  
```JavaScript

 {
     "resourceAppId": "fill your target API's app id",
     "resourceAccess": [
         {
             "id": "fill the id of target API's application permission",
             "type": "Role"
         }
     ]
 }

```
   2. Start local debug or provision an cloud environment for your project. This step created AAD app for your Teams app.
   
   3. Go to `.fx/states/state.{env}.json`, record the value of `clientId` under `fx-resource-aad-app-for-teams` property.
   
   4. Follow this document to gain admin consent for the required application permission. You need step 3's client id when following the [document](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/grant-admin-consent#grant-admin-consent-in-app-registrations) to find AAD app registration.
   
#### Steps to gain permission for APIs that use AAD application permission for access control

   1. Start local debug or provision an cloud environment for your project. This step created AAD app for your Teams app.
  
   2. Go to `.fx/states/state.{env}.json`, record the value of `clientId` under `fx-resource-aad-app-for-teams` property. 
   
   3. Provide the client id to your API provider to configure permissions from server side.





























|
