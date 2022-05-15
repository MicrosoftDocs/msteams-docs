---
title: Connect to existing APIs
author: MuyangAmigo
description:  Describes connection to existing APIs
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 05/15/2022
---

# Connect to existing APIs

Teams Toolkit helps you to access existing APIs for building Teams applications. These APIs are developed by your organization or even third-party.

## Advantage

The advantage to access the existing APIs is as follows:

* Teams Toolkit helps you bootstrap sample code to access the APIs if you don't have language appropriate SDKs to access these APIs.

## Connect to the API

Access Teams Toolkit to an existing API to:

* Generate sample code under `./bot` or `./api` folder
* Add a reference to the `@microsoft/teamsfx` package to `package.json`
* Add application settings for your API in  `.env.teamsfx.local` that configures local debugging

### Connect to API in Visual Studio Code

* You can add API connection using Teams Toolkit in Visual Studio Code:

    1. Open Microsoft Visual Studio Code.
    2. Select Teams Toolkit from left navigation bar.
    3. Select **Add features** under **DEVELOPMENT**:

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features.png" alt-text="api add features":::

       You can also open the command palette and enter **Teams: Add cloud resources**.

    4. From the pop-up, select the **API Connection** you want to add to your Teams app project:

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features.png" alt-text="api select features":::

    5. Select **OK**.

    6. Enter endpoint for the API. It's added to the project's local application settings and it's the base URL for API requests.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-endpoint.png" alt-text="api endpoint":::

    > [!NOTE]
    > Ensure the endpoint is a valid http(s) URL.

    7. Select the component that accesses the API.

    8. Select **OK**.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-invoke.png" alt-text="api invoke":::

    9. Enter an alias for the API. The alias  generates an application setting name for the API that is added to the project's local application setting.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias.png" alt-text="api alias":::

    10. Select required authentication for the API request from the **API authentication type**. It generates appropriate sample code and adds corresponding local application settings based on your selection.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-auth.png" alt-text="api auth":::

    > [!NOTE]
    > Based on the authentication type selected, additional configuration is needed.

### API connection in TeamsFx CLI

The base command of this feature is `teamsfx add api-connection [authentication type]`. You can see list of the different authentication types and corresponding sample commands in the following table.

 > [!Tip]
 > You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |Basic|teamsfx add api-connection basic --endpoint <https://example.com> --component bot --alias example --user-name exampleuser --interactive false|
   |API Key|teamsfx add api-connection apikey --endpoint <https://example.com> --component bot --alias example --key-location header --key-name example-key-name --interactive false|
   |Azure AD|teamsfx add api-connection aad --endpoint <https://example.com> --component bot --alias example --app-type custom --tenant-id your_tenant_id --app-id your_app_id --interactive false|
   |Certificate|teamsfx add api-connection cert --endpoint <https://example.com> --component bot --alias example --interactive false|
   |Custom|teamsfx add api-connection custom --endpoint <https://example.com> --component bot --alias example --interactive false|

## Understand Toolkit updates to the project

 Teams Toolkit does the following modifications to the `bot` or `api` folder based on your selections:

1. Generate `{your_api_alias}.js/ts` file. The file initializes an API client for your API and exports the API client.

2. Add `@microsoft/teamsfx` package to `package.json`. The package provides support for the common API authentication methods.

3. Add environment variables to `.env.teamsfx.local`. They are the configurations for the selected authentication type. The generated code reads values from the environment variables.

## Test API connection in local environment

Follow the steps to test the API connection in the Teams Toolkit local environment:

 1. **Run npm install**

    Run `npm install` under `bot` or `api` folder to install added packages.

 2. **Add API credentials to the local application settings**

    Teams Toolkit does't ask for credentials but it leaves placeholders in the local application settings file. Replace the placeholders with the appropriate credentials to access the API. The local application settings file is the `.env.teamsfx.local` file in the `bot` or `api` folder.

 3. **Use the API client to make API requests**

    Import the API client from the source code that needs access to the API:

    ```BASH
    import { yourApiClient } from '{relative path to the generated file}'
    ```

 4. **Generate http(s) requests to target API (with Axios)**

    The generated API client is an Axios API client. Use the Axios client to make requests to the API.

     > [!Note]
     >[Axios](https://www.npmjs.com/package/axios) is a popular nodejs package that helps you make http(s) requests. For more information, see [Axios example documentation](https://axios-http.com/docs/example) to learn how to make http(s) requests with it.

## Deploy your application to Azure

To deploy your application to Azure, you need to add the authentication to the application settings for the appropriate environment. For example, your API might have different credentials for `dev` and `prod`. Based on environment needs, configure Teams Toolkit.

Teams Toolkit configures your local environment. The bootstrapped sample code contains comments that tell you what app settings you need to configure. For more information on application settings, see [Add app settings](https://github.com/OfficeDev/TeamsFx/wiki/%5BDocument%5D-Add-app-settings).

## Advanced scenarios

  You can see the following section for advanced scenarios:

### Custom authentication provider

Besides the authentication provider included in `@microsoft/teamsfx` package, you can also implement customized authentication provider that implements `AuthProvider` interface and use it in `createApiClient(..)` function:

```Bash
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

### Connect to APIs for Azure AD permissions

Some services are authenticated by Microsoft Azure Active Directory (Azure AD). To access these services, there are two ways to configure the API permissions:

* [Use Access Control Lists (ACLs)](#access-control-lists-acls)
* [Use Azure AD application permissions](#azure-ad-application-permissions)

Obtaining a token with the right resource scopes for your API depends on the implementation of the API.

You can follow the steps to access these APIs while using:

#### Access Control Lists (ACLs)

   1. Start local debug a cloud environment for your project. It creates an Azure AD Application Registration your Teams application.
  
   2. Open `.fx/states/state.{env}.json`, and note the value of `clientId` under `fx-resource-aad-app-for-teams` property.

   3. Provide the client ID to the API provider to configure ACLs on the API service.

#### Azure AD application permissions

  1. Open `templates/appPackage/aad.template.json` and add following content to `requiredResourceAccess` property:

```JSON
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

   2. Start local debug on cloud environment for your project. It creates an Azure AD Application Registration your Teams application.

   3. Open `.fx/states/state.{env}.json` and note the value of `clientId` under `fx-resource-aad-app-for-teams` property. It's the application client ID.

   4. Grant admin consent for the required application permission, for more information, see [grant admin consent](/azure/active-directory/manage-apps/grant-admin-consent#grant-admin-consent-in-app-registrations).

   > [!NOTE]
   > For application permission use your client ID.
