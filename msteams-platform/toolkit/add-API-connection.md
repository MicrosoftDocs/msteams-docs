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

Teams Toolkit helps you to access existing APIs for building Teams apps. These APIs are developed by your organization or a third-party. When you use Teams Toolkit to connect to an existing API, Teams Toolkit performs the following functions:

* Generate sample code under `./bot` or `./api` folder.
* Add a reference to the `@microsoft/teamsfx` package to `package.json`.
* Add app settings for your API in  `.env.teamsfx.local` that configures local debugging.

## Advantages

Teams Toolkit helps you bootstrap sample code to access the APIs, if you don't have language appropriate SDKs to access these APIs.

## Steps to connect to API

You can add API connection using Microsoft Visual Studio Code and CLI command.

### Add API connection using Visual Studio Code

The following steps help you to add API connection using Visual Studio Code:

1. Open **Visual Studio Code**.
2. Select **Teams Toolkit** from the Visual Studio Code activity bar.
3. Select **Add features** under **DEVELOPMENT**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features_1.png" alt-text="api add features":::

4. In the pop-up window that appears, select the **API Connection** you want to add to your Teams app project.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="api select features":::

5. Enter endpoint for the API. It's added to the project's local app settings, and it's the base URL for API requests.

6. Press **Enter**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-endpoint_1.png" alt-text="api endpoint":::

     > [!NOTE]
     > Ensure that the endpoint is a valid http(s) URL.

7. Select the component that accesses the API.

8. Select **OK**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-invoke_1.png" alt-text="api invoke":::

9. Enter an alias for the API. The alias generates an app setting name for the API that is added to the project's local app setting.

10. Press **Enter**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias_1.png" alt-text="api alias":::

11. Select the required authentication for the API request from the **API authentication type**. It generates appropriate sample code and adds corresponding local application settings based on your selection.

     :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/myAPI connection.png" alt-text="api auth":::

     Based on the authentication type selected, the following steps are required to complete extra configuration:

# [Basic](#tab/basic)

* Enter the username for basic Auth.

  The sample code has been generated to call your API at bot\myAPI.js.

# [Certification](#tab/certification)

   The sample code has been generated to call your API at bot\myAPI.js.

# [Azure Active Directory (Azure AD)](#tab/AAD)

  The sample code has been generated to call your API at bot\myAPI.js.

# [API Key](#tab/apikey)

* Select the required API key position in request.

* Enter an API key name.

  The sample code has been generated to call your API at bot\myAPI.js.

# [Custom Auth Implementation](#tab/CustomAuthImplementation)

  The sample code has been generated to call your API at bot\myAPI.js.

---

## Add API connection using CLI

The base command of this feature is `teamsfx add api-connection [authentication type]`. The following table provides list of different authentication types and their corresponding sample commands:

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

3. Add environment variables to `.env.teamsfx.local`. They're the configurations for the selected authentication type. The generated code reads values from the environment variables.

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
