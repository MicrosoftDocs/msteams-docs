---
title: Build apps with the Microsoft Teams Toolkit and Visual Studio Code
description: Get started building great custom apps directly within Visual Studio Code with the Microsoft Teams Toolkit
keywords: teams visual studio code toolkit
ms.localizationpriority: medium
ms.topic: overview
ms.author: lajanuar
---
# Build apps with the Teams Toolkit and Visual Studio Code

The Teams Toolkit for Visual Studio Code helps developers to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration experience.  

You also can use the toolkit with Visual Studio or as CLI, such as `teamsfx`.

## Install the Teams Toolkit for Visual Studio Code

1. Open Visual Studio Code.
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter _Teams Toolkit_.
1. Select on the green install button next to the Teams Toolkit.

You also can find the Teams Toolkit on [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following tools are installed by the Visual Studio Code extension as needed and the installed version is used. For using Linux with WSL, install the following tools:

- [Azure functions core tools](/azure/azure-functions/functions-run-local)

    Azure functions core tools are used to run any backend components locally during a local debug run, including the authentication assistance required to run your services in Azure. It is installed within the project directory using the npm `devDependencies`.

- [.NET SDK](/dotnet/core/install/)

    The .NET SDK is used to install customized bindings for local debugging and Azure functions app deployments. If you have not installed the .NET 3.1 or later SDK globally, the portable version is installed.

- [ngrok](https://ngrok.com/download)

    Some Teams app features, such as conversational bots, messaging extensions, and incoming webhooks require inbound connections. Open your development system to Teams through a tunnel. A tunnel is not required for apps that only include tabs. This package is installed within the project directory using npm `devDependencies`.

## Use the Teams Toolkit for Visual Studio Code

- [Set up a new project](#set-up-a-new-teams-project)
- [Configure your app](#configure-your-app)
- [Run your app locally](#install-and-run-your-app-locally)
- [Publish your app](#publish-your-app-to-teams)

## Set up a new Teams project

The Teams Toolkit can create React apps hosted in Azure or SPFx web parts, which are hosted in your Microsoft 365 SharePoint environment.

**To create a new React app on Azure:**

1. Open Visual Studio code.
1. Open the Teams Toolkit by selecting the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="The Teams Icon in the Visual Studio Code sidebar.":::

1. Select **Create New Teams app** from the side panel.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app** from  pop-up.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Wizard start for Create New Project":::

1. The **Tab** capability is already selected for adding capabilities. You can select **Bot** and **Messaging Extension** to add more capabilities as required. Select **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot showing how to add capabilities to your new app.":::

1. Select **Azure** for **Frontend hosting type**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot showing how to select hosting for your new app.":::

1. Select **Cloud resources** that your application uses. You can select CRUD (create, read, update, and delete) access to SQL table or API:

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-cloud-resources.png" alt-text="Screenshot showing how to add cloud resources for your new app.":::

1. Select **JavaScript** or **TypeScript** as **Programming Language**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot showing how to select the programming language.":::

1. Select a workspace folder. A folder is created within your workspace for the project you are creating.

1. Enter a suitable name for your app, like `helloworld`. The name of the app must consist only of alphanumeric characters.  

1. Press **Enter** to continue.

Your Teams app is created within a few seconds. The app contains codes to handle single sign-on with Azure Active Directory and access to Microsoft Graph. If you select Azure resources, then the codes for those resources are also available.

For more information on SPFx creation and publication process, see [SPFx tutorial](../get-started/first-app-spfx.md).

## Configure your app

The Teams app consists the following components:

  1. The Microsoft Teams client, where users interact with your app.
  1. A server, which responds to requests for Teams content.
  1. A Teams app package, which consists of the following files:

      > [!div class="checklist"]
      >
      > - The manifest.json.
      > - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog.
      > - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

The manifest and icons are stored in the `.fx` folder of your project before being uploaded to Teams. When an app is installed, the Teams client parses the manifest file to determine information, such as the name of your app and the URL where the services are located.

**To configure your app**

1. Navigate to **Teams Toolkit** tab in Visual Studio Code.
1. Select **Manifest Editor** in the **Project** section.

You can edit the fields in the App details page, which updates the contents of the `manifest.json` file shipped as part of the app package.

## Install and run your app locally

**To build and run your app locally:**

1. From Visual Studio Code, press **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built. A browser window automatically opens when the build is complete, which can take 3 to 5 minutes to complete.

   The toolkit prompts you to install a local certificate if necessary. This certificate allows Teams to load your application from `https://localhost`. Select **yes** when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot showing how the prompt to install an SSL certificate to enable Teams to load your application from localhost.":::

1. You can run the application through web browser. If you are prompted to open Microsoft Teams app, select **Cancel** to remain within the browser. You may also be prompted to switch to the Teams application at other times. Select Teams on web browser.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot showing how to pick the web version of teams when launched":::

1. You may be prompted to sign in. If so, sign in with your Microsoft 365 account credentials.
1. When prompted to install the app onto Teams, select **Add**.

Both the backend and frontend are hooked into the Visual Studio Code debugger.  This allows you to set breakpoints anywhere in your code and inspect state. You can also use any frontend debugging tools, such as the React Developer tools within the browser. For more information about debugging in Visual Studio Code, check [the documentation](https://code.visualstudio.com/Docs/editor/debugging).

## Publish your app to Teams

You must first publish your app to the Developer Portal for Teams before anyone can access.

**To publish your app:**

1. Navigate to the **Teams Toolkit** tab in Visual Studio Code.
1. Select **Publish to Teams** in the **Project** section.

For Azure hosting, you must provision and deploy to the cloud. For more information on SPFx publication process, see [SPFx tutorial](../get-started/first-app-spfx.md).

## Next step

> [!div class="nextstepaction"]
> [Maintaining and supporting your published app](../concepts/deploy-and-publish/appsource/post-publish/overview.md)
