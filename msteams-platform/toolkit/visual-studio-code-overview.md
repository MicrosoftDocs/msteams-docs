---
title: Build apps with the Microsoft Teams Toolkit and Visual Studio Code
description: Get started building great custom apps directly within Visual Studio Code with the Microsoft Teams Toolkit.
keywords: teams visual studio code toolkit
ms.localizationpriority: medium
ms.topic: overview
ms.author: lajanuar
---
# Build apps with the Teams Toolkit and Visual Studio Code

The Teams Toolkit for Visual Studio Code helps developers create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with a “zero-configuration” approach to the developer experience.

You also can use the toolkit with Visual Studio or as a CLI (called `teamsfx`).

## Install the Teams Toolkit for Visual Studio Code

1. Open Visual Studio Code.
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).
1. In the search box, enter _Teams Toolkit_.
1. Select on the green install button next to the Teams Toolkit.

You also can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following tools are installed by the Visual Studio Code extension when they're needed. If already installed, the installed version is used instead. If using Linux (including WSL), you must install these tools before use:

- [Azure Functions Core Tools](/azure/azure-functions/functions-run-local)

    Azure Functions Core Tools is used to run any backend components locally during a local debug run, including the authentication helpers required when running your services in Azure. It's installed within the project directory using the npm `devDependencies`.

- [.NET SDK](/dotnet/core/install/)

    The .NET SDK is used to install customized bindings for local debugging and Azure Functions app deployments. If you haven't installed the .NET 3.1 or later SDK globally, the portable version is installed.

- [ngrok](https://ngrok.com/download)

    Some Teams app features (conversational bots, messaging extensions, and incoming webhooks) require inbound connections.  You need to expose your development system to Teams through a tunnel. A tunnel isn't required for apps that only include tabs.  This package is installed within the project directory (using npm `devDependencies`).

## Use the Teams Toolkit for Visual Studio Code

- [Set up a new project](#set-up-a-new-teams-project)
- [Configure your app](#configure-your-app)
- [Run your app locally](#install-and-run-your-app-locally)
- [Publish your app](#publish-your-app-to-teams)

## Set up a new Teams project

The Teams Toolkit can create React apps that are hosted in Azure or SPFx web parts that are hosted on your Microsoft 365 SharePoint environment. To create a new React app to be hosted on Azure:

1. Open Visual Studio code.
1. Open the Teams Toolkit by selecting the Teams icon in the sidebar:

    :::image type="content" source="../assets/images/teams-toolkit-v2/sidebar-icon.png" alt-text="Screenshot is an example that shows the Teams icon in the Visual Studio Code sidebar.":::

1. Select **Create New Project**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project.png" alt-text="Screenshot is an example that shows the location of the Create New Project link in the Teams Toolkit sidebar.":::

1. Select **Create a new Teams app**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-new-project-intro.png" alt-text="Screenshot is an example that shows wizard start for Create New Project.":::

1. On the **Select capabilities** step, the **Tab** capability is already selected. You can also optionally select **Bot** and **Messaging Extension**.  Press **OK**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Screenshot describes how to add capabilities to your new app.":::

1. On the **Frontend hosting type** step, select **Azure**.

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-hosting.png" alt-text="Screenshot describes how to select hosting for your new app.":::

1. Optionally, on the **Cloud resources** step, select cloud resources that your application uses. You can select CRUD (create, read, update, and delete) access to a SQL table or an API:

   :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-cloud-resources.png" alt-text="Screenshot describes how to add cloud resources for your new app.":::

1. On the **Programming Language** step, you can choose **JavaScript** or **TypeScript**:

    :::image type="content" source="../assets/images/teams-toolkit-v2/create-project-programming-languages.png" alt-text="Screenshot describes how to select the programming language.":::

1. Select a workspace folder. A folder is created within your workspace folder for the project you're creating.

1. Enter a suitable name for your app, like `helloworld`. The name of the app must consist only of alphanumeric characters. Press **Enter** to continue.

Your Teams app is created within a few seconds. The scaffolded app contains code to handle single sign-on with Azure Active Directory and access to the Microsoft Graph. If you selected Azure resources, then the code for those resources is also available.

For a walk-through of the SPFx creation and publication process, see the [SPFx tutorial](../get-started/first-app-spfx.md).

## Configure your app

At its core, the Teams app embraces three components:

  1. The Microsoft Teams client (web, desktop or mobile) where users interact with your app.
  1. A server that responds to requests for content that is displayed in Teams. For example, HTML tab content or a bot Adaptive Card.
  1. A Teams app package consists of three files:

      > [!div class="checklist"]
      >
      > - The manifest.json.
      > - A [color icon](../resources/schema/manifest-schema.md#icons) for your app to display in the public or organization app catalog.
      > - An [outline icon](../resources/schema/manifest-schema.md#icons) for display on the Teams activity bar.

The manifest and icons are stored in the `.fx` folder of your project prior to being uploaded to Teams. When an app is installed, the Teams client parses the manifest file to determine needed information like the name of your app and the URL where the services are located.

1. To configure your app, navigate to the **Teams Toolkit** tab in Visual Studio Code.
1. Select **Manifest Editor** in the **Project** section.

Editing the fields in the App details page updates the contents of the manifest.json file that is ultimately shipped as part of the app package.

## Install and run your app locally

To build and run your app locally:

1. From Visual Studio Code, press **F5** to run your application in debug mode.

   > When you run the app for the first time, all dependencies are downloaded and the app is built.  A browser window automatically opens when the build is complete. This can take 3-5 minutes to complete.

   The toolkit prompts you to install a local certificate if required. This certificate allows Teams to load your application from `https://localhost`. Select yes when the following dialog appears:

   :::image type="content" source="../assets/images/teams-toolkit-v2/ssl-prompt.png" alt-text="Screenshot describes how to install a SSL certificate to enable Teams to load your application from localhost.":::

1. Your web browser is started to run the application. If prompted to open Microsoft Teams, select Cancel to remain within the browser. You may also be prompted to switch to the Teams application at other times. Select the web app when this happens.

   :::image type="content" source="../assets/images/teams-toolkit-v2/launch-web-browser-and-pick-webapp.png" alt-text="Screenshot describes how to pick the web version of teams when launched.":::

1. You may be prompted to sign in. If so, sign in with your Microsoft 365 account.
1. When prompted to install the app onto Teams, press **Add**.

Both the backend and frontend are hooked into the Visual Studio Code debugger. This allows you to set breakpoints anywhere in your code and inspect state.  You can also use any frontend debugging tools (such as the React Developer Tools) within the browser.  For more information about debugging in Visual Studio Code, review [the documentation](https://code.visualstudio.com/Docs/editor/debugging).

## Publish your app to Teams

Before it can be used by other people, you must publish your app to the Developer Portal for Teams.

1. To publish your app, navigate to the **Teams Toolkit** tab in Visual Studio Code.
1. Select **Publish to Teams** in the **Project** section.

If using Azure hosting, you must have provisioned and deployed to the cloud. For a walk-through of the SPFx publication process, see the [SPFx tutorial](../get-started/first-app-spfx.md).

## Next step

> [!div class="nextstepaction"]
> [Maintaining and supporting your published app](../concepts/deploy-and-publish/appsource/post-publish/overview.md)

## See also

- [Build apps with the Teams Toolkit and Visual Studio](~/toolkit/visual-studio-overview.md)
- [Build tabs and other hosted experiences with the Microsoft Teams JavaScript client SDK](~/tabs/how-to/using-teams-client-sdk.md)