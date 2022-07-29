---
title: Integrate existing third party APIs
author: MuyangAmigo
description:  In this article, learn how toolkit helps you bootstrap sample access to existing APIs. It provides list of different authentication types.
ms.author: zhany
ms.localizationpriority: medium
ms.topic: Overview
ms.date: 05/20/2022
---

# Integrate existing third party APIs to Teams app

Teams Toolkit helps you to access existing APIs for building Teams applications. These APIs are developed by your organization or third-party.When you use Teams Toolkit to connect to an existing API, Teams Toolkit performs the following function:

* Generate sample code under `./bot` or `./api` folder.
* Add a reference to the `@microsoft/teamsfx` package to `package.json`.
* Add application settings for your API in  `.env.teamsfx.local` that configures local debugging.

## Steps to connect to API

You can add API connection using Teams Toolkit in Visual Studio Code and CLI command.

# [Visual Studio Code](#tab/vscode)

* The following steps help you can to add API connection using Visual Studio Code:

    1. Open Microsoft Visual Studio Code.
    2. Select Teams Toolkit :::image type="icon" source="../assets/images/teams-toolkit-v2/add-API/api-add-icon.png" alt-text="api icon"::: from the Visual Studio Code toolbar.
    3. Select **Add features** under **DEVELOPMENT**:

        :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-add-features.png" alt-text="api add features":::

       * You can also open the command palette and enter **Teams: Add cloud resources**.

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

    9. Enter an alias for the API. The alias generates an application setting name for the API that is added to the project's local application setting.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-alias.png" alt-text="api alias":::

    10. Select required authentication for the API request from the **API authentication type**. It generates appropriate sample code and adds corresponding local application settings based on your selection.

         :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-auth.png" alt-text="api auth":::

         > [!NOTE]
         > Based on the authentication type selected, additional configuration is needed.

# [CLI](#tab/CLI)

The base command of this feature is `teamsfx add api-connection [authentication type]`. The following table provides list of different authentication types and their corresponding sample commands:

 > [!Tip]
 > You can use `teamsfx add api-connection [authentication type] -h` to get help document.

   |**Authentication type**|**Sample command**|
   |-----------------------|------------------|
   |Basic|teamsfx add api-connection basic --endpoint <https://example.com> --component bot --alias example--user-name exampleuser --interactive false|
   |API Key|teamsfx add api-connection apikey --endpoint <https://example.com> --component bot --alias example --key-location header --key-name example-key-name --interactive false|
   |Azure AD|teamsfx add api-connection aad --endpoint <https://example.com> --component bot --alias example --app-type custom --tenant-id your_tenant_id --app-id your_app_id --interactive false|
   |Certificate|teamsfx add api-connection cert --endpoint <https://example.com> --component bot --alias example --interactive false|
   |Custom|teamsfx add api-connection custom --endpoint <https://example.com> --component bot --alias example --interactive false|

---

## Understand Toolkit updates to your project

 Teams Toolkit modifies `bot` or `api` folder based on your selections:

1. Generate `{your_api_alias}.js/ts` file. The file initializes an API client for your API and exports the API client.

2. Add `@microsoft/teamsfx` package to `package.json`. The package provides support for the common API authentication methods.

3. Add environment variables to `.env.teamsfx.local`. They're the configurations for the selected authentication type. The generated code reads values from the environment variables.

## Advantages

Teams Toolkit helps you bootstrap sample code to access the APIs, if you don't have language appropriate SDKs to access these APIs.

## Limitations

## See also
