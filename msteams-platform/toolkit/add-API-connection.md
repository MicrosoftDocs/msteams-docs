---
title: Integrate existing third party APIs
author: MuyangAmigo
description: Learn how toolkit helps bootstrap sample access to existing APIs. List of different authentication types.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: Overview
ms.date: 05/20/2022
---

# Integrate existing third party APIs

Teams Toolkit allows you to access and use existing APIs for building Teams apps. Your organization or a third-party may have developed these APIs. When you use Teams Toolkit to connect to an existing API, Teams Toolkit performs the following functions:

* Generate sample code under `./bot` or `./api` folder.
* Add a reference to the `@microsoft/teamsfx` package to `package.json`.
* Add app settings for your API in  `.env.teamsfx.local` that configures local debugging.

## Advantages

Teams Toolkit helps you bootstrap sample code to access the APIs, if you don't have language appropriate SDKs to access these APIs.

## Steps to connect to API

You can add an existing third-party API connection using Microsoft Visual Studio Code or TeamsFx CLI commands.

### Add API connection using Visual Studio Code

The following steps help you to add API connection using Visual Studio Code:

1. Open your Teams app project in **Visual Studio Code**.
2. Select **Teams Toolkit** from the Visual Studio Code activity bar.
3. Select **Add features** in the **DEVELOPMENT** section.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features_1.png" alt-text="api add features":::

4. From the drop-down that appears, select **API Connection**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="api select features":::

5. Enter endpoint for the API. It's added to the project's local app settings, and it's the base URL for API requests, and then press Enter .

6. Ensure that the endpoint is a valid http(s) URL.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-endpoint_1.png" alt-text="api endpoint":::

7. Select the component that accesses the API, and then select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-invoke_1.png" alt-text="api invoke":::

9. Enter an alias for the API, and then press Enter.

10. The alias generates an app setting name for the API that is added to the project's local app setting.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias_1.png" alt-text="api alias":::

11. Select the required authentication for the API request from the **API authentication type**. Teams Toolkit generates appropriate sample code and adds corresponding local application settings based on authentication.

     :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/myAPI connection.png" alt-text="api auth":::

     Based on the authentication type selected, the following steps are required to complete extra configuration:

# [Basic](#tab/basic)

For implementing basic authentication using username and password:

* Select Basic.
* Enter the username for basic Auth.

  Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Certification](#tab/certification)

* Select Certification to authenticate requests using certificates.

  Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Azure Active Directory (Azure AD)](#tab/AAD)

* Select Azure Active Directory (Azure AD) to authenticate requests using Azure AD access tokens.

  Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [API Key](#tab/apikey)

* Select API Key to implement authentication using an API key.
* Select the required API key position in request.
* Enter an API key name.

  Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

# [Custom Auth Implementation](#tab/CustomAuthImplementation)

* Select Custom Auth Implementation to customize authentication according to your app requirement.

  Teams Toolkit generates the sample code to call your API at bot\myAPI.js.

You have successfully added a connection in your Teams app to an existing API.

---

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

 Teams Toolkit modifies `bot` or `api` folder based on your selections:

1. Generate `{your_api_alias}.js\ts` file. The file initializes an API client for your API and exports the API client.

2. Add `@microsoft\teamsfx` package to `package.json`. The package provides support for the common API authentication methods.

3. Add environment variables to `.env.teamsfx.local`. Environment variables are required to configure the selected authentication type. The generated code reads values from the environment variables.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
