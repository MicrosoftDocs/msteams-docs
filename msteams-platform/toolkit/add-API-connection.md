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

     The **View How-to Guides** dropdown list appears.

1. Select **API Connection**.

1. From the dropdown list that appears, select the API connection you want to add to your app. You'll be redirected to the detailed page.

    :::image type="content" source="../assets/images/teams-toolkit-v2/add-API/api-select-features_1.png" alt-text="api select features":::

      |**Development** | **How-to Guide** |
      |----------|----------|
      | Develop Single Sign-on Experience in Teams | [How to Develop single sign-on experience in Teams](https://github.com/OfficeDev/TeamsFx/wiki/Develop-single-sign-on-experience-in-Teams) |
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

## See also

* [Teams Toolkit Overview](teams-toolkit-fundamentals.md)
* [Publish Teams apps using Teams Toolkit](publish.md)
