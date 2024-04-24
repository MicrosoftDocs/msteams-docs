---
title: Create API-based message extension
author: v-ypalikila
description: Learn how to create or build an API-based message extension using Teams Toolkit for Visual Studio, Visual Studio Code, and CLI.
ms.localizationpriority: medium
ms.topic: overview
ms.author: anclear
ms.date: 04/08/2024
---
# Create an API-based message extension

You can create an API-based message extension using Developer Portal for Teams and Teams Toolkit for Visual Studio Code, command line interface (CLI), or Visual Studio.

# [Developer Portal for Teams](#tab/developer-portal-for-teams)

To create an API-based message extension using Developer Portal for Teams, follow these steps:

1. Go to **[Teams Developer Portal](https://dev.teams.microsoft.com/home)**.
1. Go to **Apps**.
1. Select **+ New apps**.
1. Enter a name of the app and select the **Manifest version** as **Latest prerelease (devPreview)**.
1. Select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-manifest-version.png" alt-text="Screenshot shows the app name and the manifest version selected as Latest prerelease (devPreview) in Developer Portal.":::

1. In the left pane, under **Configure**, update the following **Basic information**:

   1. Full name
   1. Short description
   1. Long description
   1. Developer or company name
   1. Website (must be a valid HTTPS URL)
   1. Privacy policy
   1. Terms of use

1. Select **Save**.

1. Select **App features**.
1. Select **Messaging extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-app-feature.png" alt-text="Screenshot shows the message extension option in Teams Developer Portal.":::

1. Under **Message extension type**, select **API**.

   1. If you get a disclaimer, which reads **Bot message extension is already in use by users. Would you like to change message extension type to API?**. Select **Yes, change**.

1. Under **OpenAPI spec**, select **Upload now**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-upload.png" alt-text="Screenshot shows the Upload now option in Teams Developer Portal.":::

1. Select the OpenAPI Description document in the JSON or YAML format and select **Open**.

1. Select **Save**. A pop-up appears with the message **API spec saved successfully**.
1. Select **Got it**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-api-saved.png" alt-text="Screenshot shows an example of the API spec saved successfully message and Got it button.":::

**Add commands**

> [!NOTE]
> Message extensions built from an API only support a single parameter.

You can add commands and parameters to your message extension, to add commands:

1. Under **Message extension type**, select **Add**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-add-commands.png" alt-text="Screenshot shows the add option to add commands in Teams Developer Portal.":::

   An **Add command** pop-up appears with a list of all the available APIs from the OpenAPI Description document.

1. Select an API from the list and select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-commands-api-list.png" alt-text="Screenshot shows the list of APIs from the OpenAPI Description Document in the Add a command pop-up window.":::

   A **Command details** appears.

1. Under **Command details**, go to **Adaptive card template** and select **Upload now**.

    :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-adaptive-card-template.png" alt-text="Screenshot shows the Upload now option to add the Adaptive Card template in for the command.":::

   > [!NOTE]
   > If you have more than one API, ensure that you upload the **Adaptive card template** for each API.

1. Select the Adaptive Card template file in JSON format and select **Open**.

   The following attributes are updated automatically from the Adaptive Card template:
   * Command Type
   * Command ID
   * Command title
   * Parameter name
   * Parameter description

   :::image type="content" source="../assets/images/Copilot/api-based-me-tdp-command-details.png" alt-text="Screenshot shows the fields available in the command details page.":::

1. Under **Details**, update the **Command description**.

   1. If you want to launch a command using a trigger in Microsoft 365 chat, turn on the **Automatically run the command when a user opens the extension** toggle.

1. Select **Add**. The command is added successfully.

1. Select **Save**.

An API-based message extension is created.

:::image type="content" source="../assets/images/Copilot/api-based-me-tdp-plugin-copilot.png" alt-text="Screenshot shows the plugin for Copilot app created in the app features page in Teams Developer Portal.":::

To test your API-based message extension created in the Developer Portal for Teams, you can use the following methods:

* **Preview in Teams**: In Developer Portal, open your message extension and select **Preview in Teams** in the upper-right corner. You're redirected to Teams, where you can add the app to Teams to preview the app.

* **Download app package**: On the message extension page, select **App package** from the left pane and then, in the upper-left corner of the window, select **Download app package**. The app package is downloaded to your local machine in a .zip file. You can upload the app package to teams and test the message extension.

# [Visual Studio Code](#tab/visual-studio-code)

> [!NOTE]
> Teams Toolkit support for API-based message extension is available only in Teams Toolkit pre-release version. Before you get started, ensure that you've installed a [Teams Toolkit pre-release version](../toolkit/install-Teams-Toolkit.md#install-a-pre-release-version)

To build an API-based message extension using Teams Toolkit for Visual Studio Code, follow these steps:

1. Open **Visual Studio Code**.
1. From the left pane, Select **Teams Toolkit**.
1. Select **Create a New App**.
1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot.png" alt-text="Screenshot shows the message extension option in Team Toolkit.":::

1. Select **Custom Search Results**.

1. Select one of the following options:
    1. To build from the beginning, select **Start with a new API**.
    1. If you already have an OpenAPI description document, select **Start with an OpenAPI Description Document**.

     :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-options.png" alt-text="Screenshot shows the options to create a search based message extension.":::

1. Based on the options selected in **step 6**, select the following:

   # [New API](#tab/new-api)


   > [!NOTE]
   > The authentication flow for Microsoft Entra is only functional in remote environments. You can't test it in a local environment due to the lack of authentication support in Azure Function core tools. The repair API can be invoked anonymously in a local environment.

   1. Select the authentication type:
      * **None**: Select if you don't want any authentication for the user to access the API.
      * **API Key**: Select if you want to authenticate using an API key.
      * **Microsoft Entra**: Select if you want to authenticate using app user's Teams identity.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-auth-type.png" alt-text="Screenshot shows the authentication options for API-based message extension.":::

   1. Select a programming language.

       :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-programming language.png" alt-text="Screenshot shows the programming language options.":::

   1. Select **Default folder**.

   1. Enter the name of your app and select **Enter**. Teams Toolkit creates a new plugin with API from Azure functions.
   1. To get started, you must update the source code in the following files:

        |File  |Contents |
        |---------|---------|
        |`repair/function.json`    |A configuration file that defines the function’s trigger and other settings. For more information, see [Azure Functions](/azure/azure-functions/functions-bindings-http-webhook-trigger?tabs=python-v2%2Cisolated-process%2Cnodejs-v4%2Cfunctionsv2&pivots=programming-language-csharp)        |
        |`repair/index.ts`     | The main file of a function in Azure Functions.        |
        |`appPackage/apiSpecificationFiles/repair.yml`     |  A file that describes the structure and behavior of the repair API.       |
        |`appPackage/responseTemplates/repair.json`     |  A generated Adaptive Card that used to render API response.       |
        |`repairsData.json`    |  The data source for the repair API.       |

   1. Based on the options selected in **step a**, follow these steps:
   
      * If you've selected **none** or **Microsoft Entra**, skip to the next step.

      * If you've selected API key, follow these steps:

         Generate and set up your API key as follows:

        1. In Visual Studio Code, go to **View** > **Terminal**.
        2. Run the following command to install dependency packages:

           ```
           npm install
           ```

        3. Run the following command to generate your API key:

           ```
           npm run keygen
           ```

           The API key is generated as **Generated a new API Key: xxx...**. The generated API key is registered and recorded in the [API key registration tool](https://dev.teams.microsoft.com/api-key-registration) in Developer portal for Teams. For more information on API key registration, see [Register an API key](build-api-based-message-extension.md#register-an-api-key).

        4. Enter the generated API key into your `env/.env.*.user` file. Replace `<your-api-key>` with the actual key:

           ```
           SECRET_API_KEY=<your-api-key>
           ```
      </details>

   # [OpenAPI Description](#tab/openapi-specification)

   1. Enter or browse the OpenAPI Description document location.

      :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-plugin-copilot-openapi-spec-location.png" alt-text="Screenshot shows the option to select OpenAPI Description document location.":::

   1. From the API list, select the required APIs and select **OK**.

      > [!NOTE]
      > GET and POST APIs are supported for API-based message extensions.

   1. Select **Default folder**.
   1. Enter the name of your app and select **Enter**. Teams Toolkit scaffolds the OpenAPI Description document and created an API-based message extension.
   1. Under **LIFECYCLE**, select **Provision**.
   1. If your OpenAPI specification document has a security scheme `bearerAuth`, which uses the HTTP bearer scheme, enter the API key in the command window and select **Enter**.

        :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-api-key.png" alt-text="Screenshot shows the Enter API key command that appears in Teams Toolkit for Visual Studio Code.":::

      > [!NOTE]
      > The API key must be a string with 10 to 128 characters.

    ---

     > [!NOTE]
     > Teams toolkit source file includes a security check to ensure that an incoming request is authorized. It uses a function `isApiKeyValid(req)` to verify if the request contains a valid API key. If the API key isn't valid, the code returns an 401 HTTP status code, indicating an Unauthorized response. 

1. From the left pane, select **Teams Toolkit**.
1. Under **ACCOUNTS**, sign in with your [Microsoft 365 account](/microsoftteams/platform/toolkit/accounts) and Azure account if you haven't already.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-accounts.png" alt-text="Screenshot shows the Microsoft 365 and Azure sign in option in Teams Toolkit.":::

1. From the left pane, Select **Run and Debug (Ctrl+Shift+D)**.
1. From the launch configuration dropdown, select `Preview in Teams (Edge)` or `Preview in Teams (Chrome)`. Teams Toolkit launches Teams web client in a browser window.
1. Go to a chat message and select the **Actions and apps** icon. In the flyout menu, search for your app.
1. Select your message extension from the list and enter a search command in the search box.
1. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.

   :::image type="content" source="../assets/images/Copilot/api-based-me-ttk-invoke-teams.png" alt-text="Screenshot shows that a message extension app is invoked from the plus icon in the chat and the app is displayed in the message extension flyout menu.":::

1. Select **Send**. Teams sends the search result as an Adaptive Card in the chat message.

:::image type="content" source="../assets/images/Copilot/api-based-me-ttk-sbs-result.png" alt-text="Screenshot shows the Adaptive Card with the search results in the chat message in Teams.":::

# [Teams Toolkit CLI](#tab/teams-toolkit-cli)

To create an API-based message extension using Teams Toolkit CLI, follow these steps:

1. Go to **Command Prompt**.

1. Enter the following command:

   ```
   npm install -g @microsoft/teamsfx-cli@beta
   ```

1. Type `teamsfx new` in the terminal

1. Select **Message Extension**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-new-project-me.png" alt-text="Screenshot shows Teams capabilities as options in the CLI interface.":::

1. Select **Custom Search Results**.

1. Select **Start from an OpenAPI Description Document**.

1. Enter a valid URL or local path of your OpenAPI Description document.

1. Select the APIs from the list and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-CLI-API-options-me.png" alt-text="Screenshot shows the list of API extracted from the OprnOpenAPI Description document in the command prompt.":::

1. Enter the location for your project and select **Enter**.

1. Enter the name of your application and select **Enter**.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-project-done-me.png" alt-text="Screenshot shows the message that the project is created in the required project folder.":::

1. Go to the folder path where your project is created and enter the following command to provision your app in Azure:

   ```teamsfx provision --env dev```
   Teams Toolkit CLI opens a browser window and requests you to sign in to your Microsoft Account.

1. Sign in to your Microsoft account. Teams Toolkit CLI executes validation and provisions your app on Azure.

   :::image type="content" source="../assets/images/Copilot/api-based-CLI-provision-me.png" alt-text="Screenshot shows the sign in request and the provision stages in the command prompt window.":::

1. In the command prompt window, enter the following command to preview your app in Teams:

   ```Preview the app: teamsfx preview --env dev```

 A new browser window with Teams web client opens. You can add your app to Teams.

# [Visual Studio](#tab/visual-studio)

Before you get started, ensure that you install Visual Studio Enterprise 2022 Preview version 17.9.0 Preview 1.0 and install the **Microsoft Teams development tools** under **ASP.NET and web development** workload.

To create an API-based message extension using Teams Toolkit for Visual Studio, follow these steps:

1. Open **Visual Studio**.
1. Go to **File** > **New** > **Project...** or **New Project**.

1. Search for **Teams** and select **Microsoft Teams App**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-teams.png" alt-text="Screenshot shows the Microsoft Teams app option in Visual Studio.":::

1. Enter the **Project name** and **Location**.
1. Select **Create**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-new-app.png" alt-text="Screenshot shows the project name, Location, and Create option in Visual Studio.":::

1. Select **Search Results from API**.

1. Select any of the following options:
   * If you want to start without an API, select **Start with a new API**.
   * If you have an existing OpenAPI Description document, select **Start with an OpenAPI Description**.

1. Select **Next**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-create-project.png" alt-text="Screenshot shows the Search results from API, New API, OpenAPI Description Document, and Create options in Visual Studio to create a new Project.":::

1. Based on the options selected in **step 7**, select the following:

   # [New API](#tab/new-api2)

   1. To get started, you must update the source code in the following files:

      | File | Contents |
      | --- | --- |
      | `src/functions/repair.ts` | The main file of a function in Azure Functions. Defines an Azure Function that retrieves and filters repair records based on a query parameter from an HTTP GET request, and returns the results as a JSON response. |
      | `src/repairsData.json` | The data source for the repair API. |
      | `src/keyGen.ts` | Designed to generate an API key used for authorization. |
      | `appPackage/apiSpecificationFile/repair.yml` | A file that describes the structure and behavior of the repair API. |
      | `appPackage/responseTemplates/repair.json` | A template file for rendering API response. |
      | `teamsapp.yml`	| The main Teams Toolkit project file. The project file defines two primary things: Properties and configuration Stage definitions.|
      |`teamsapp.local.yml` |	Overrides teamsapp.yml with actions that enable local execution and debugging.|
      |`aad.manifest.json` |	Defines the configuration of Microsoft Entra app. This template will only provision single tenant Microsoft Entra app.|


   1. After you've updated the source code, in the debug dropdown menu, select **Dev Tunnels (no active tunnel)** > **Create a Tunnel...**.

      :::image type="content" source="../assets/images/Copilot/bot-based-VS-dev-tunnel.png" alt-text="Screenshot shows the create a tunnel option in Visual Studio.":::

   1. Select an account to create the tunnel. The supported account types are Azure, Microsoft Account (MSA), and GitHub.
      1. **Name**: Enter a name for the tunnel.
      1. **Tunnel Type**: Select **Persistent** or **Temporary**.
      1. **Access**: Select **Public**.
      1. Select **OK**. Visual Studio displays a confirmation message that a tunnel is created.

       The tunnel you created is listed under **Dev Tunnels**.

   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Prepare Teams App Dependencies**.

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.

   1. Select the **F5** key or select **Debug** > **Start Debugging**. Visual Studio launches a Teams web client.

   # [OpenAPI Description](#tab/openapi-specification2)

   1. Enter OpenAPI specification URL or select **Browse..** to upload a file from your local machine.
   1. Select the dropdown and select the APIs from the list.
   1. Select **Create**. The project is scaffolded and you can find API specification, manifest, and response template files in the **appPackage** folder.
   1. Go to **Solution Explorer** and select your project.
   1. Right-click the menu and select **Teams Toolkit** > **Provision in the Cloud**.

      :::image type="content" source="../assets/images/Copilot/api-based-VS-provision-cloud.png" alt-text="Screenshot shows the Provision in the Cloud option under Teams Toolkit in Visual Studio.":::

      If prompted, sign in with a Microsoft 365 account. A message appears that the app is successfully prepared.
   
   1. Right-click your project and select **Teams Toolkit** > **Preview in** > **Teams**.
   1. Select the **manifest.json** file and select **Open**. Visual Studio launches a Teams web client.

    ---

1. Go to a chat and select **Actions and apps**.

1. From the message extension fly-out menu, enter the name of your message extension in the search box.
1. Select the message extension and enter your search query.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-invoke-app.png" alt-text="Screenshot shows an example of message extension flyout menu invoked from the Plus icon and MyTeamsApp entered in the search filed. The app is displayed in the search results.":::

1. Select an item from the list. The item unfurls into an Adaptive Card in the message compose area.

1. Select **Send**. Teams sends the search result as an Adaptive Card in the chat message.

   :::image type="content" source="../assets/images/Copilot/api-based-me-vs-adaptive-card-chat.png" alt-text="Screenshot shows an example of Adaptive Card sent to the user's chat in Microsoft Teams.":::

---

## Step-by-step guides

To build an API-based message extension, follow these step-by-step guides:

* [For beginners](../sbs-api-me-ttk.yml): Build an API-based message extension using Teams Toolkit.
* [For advanced users](../sbs-api-based-message-extensions.yml): Build an API-based message extension from the ground up.
