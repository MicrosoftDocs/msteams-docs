---
title: Teams Toolkit Fundamentals
author: Rajeshwari-v
description:  Describes fundamentals of Teams Toolkit
ms.author: surbhigupta
ms.localizationpriority: medium
ms.topic: overview
---

# Teams Toolkit

The Teams Toolkit for Visual Studio Code helps developers create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and M365 with a “zero-configuration” approach to the developer experience.  

There is also a Teams Toolkit for Visual Studio and a [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md) for Teams app development (called `teamsfx`).

## Install the Teams Toolkit for Visual Studio Code

1. Open Visual Studio Code.

1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**).

1. In the search box, enter _Teams Toolkit_.

1. Select on the green install button next to the Teams Toolkit.

You also can find the Teams Toolkit on the [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

The following tools are installed by the Visual Studio Code extension when they are needed. If already installed, the installed version is used instead. If using Linux (including WSL), you must install these tools before use:

- [Azure Functions Core Tools](/azure/azure-functions/functions-run-local)

Azure Functions Core Tools is used to run any backend components locally during a local debug run, including the authentication helpers required when running your services in Azure. It is installed within the project directory using the npm `devDependencies`.

- [.NET SDK](/dotnet/core/install/)

The .NET SDK is used to install customized bindings for local debugging and Azure Functions app deployments. If you have not installed the .NET 3.1 or later SDK globally, the portable version is installed.

- [ngrok](https://ngrok.com/download)

Some Teams app features (conversational bots, messaging extensions, and incoming webhooks) require inbound connections. You need to expose your development system to Teams through a tunnel. A tunnel is not required for apps that only include tabs. This package is installed within the project directory (using npm `devDependencies`).

## Supported Teams Apps Capabilities
[Understand Microsoft Teams app capabilities](../concepts/capabilities-overview.md) are Teams extensibility points. Your Teams app can contain one or more Teams App Capabilities. Teams Toolkit for Visual Studio Code supports developers to work on project with the following Teams App Capabilities:

* [Tabs](../tabs/what-are-tabs.md#microsoft-teams-tabs)

* [Bots](../bots/what-are-bots.md#bots-in-microsoft-teams)

* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md#messaging-extensions)

Your Teams project can contain either one of the capabilities or a mixture of two or three capabilities from above.

You can select the capabilities you want when you create the Teams Project.

:::image type="content" source="../assets/images/teams-toolkit-v2/create-project-capabilities.png" alt-text="Select capabilities to Create New Project":::

And Teams Toolkit provides flexibility to add more capabilities in later process of Teams app development.

:::image type="content" source="../assets/images/tools-and-sdks/add-capabilities.png" alt-text="add capabilities":::

## Take a Tour of Teams Toolkit for Visual Studio Code

In the Tree View (left sidebar) of Teams Toolkit, there are four sections offers the main features developers will need for Teams app development.

:::image type="content" source="../assets/images/teams-toolkit-v2/Teams-Toolkit-Overview.png" alt-text="Take a tour to Teams Toolkit"::: 

- [Typical User Journey](#typical-user-journey-of-teams-toolkit)

- [ACCOUNTS](#accounts)

- [DEVELOPMENT](#development)

- [DEPLOYMENT](#deployment)

- [HELP AND FEEDBACK](#help-and-feedback)

### Typical User Journey of Teams Toolkit
Teams Toolkit provides a set of comprehensive features covering the lifecycle of Teams app development to make it easy and productive for developers. From create Teams app projects, to debugging, deployment and publishing. Teams Toolkit automates many of the manually work and provides great integration of Teams and Azure resources. How can developers use the Teams Toolkit? A typical user journey can be described in the picture:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-user-journey.png" alt-text="Teams Toolkit User Journey":::

### ACCOUNTS

Developers must have a Microsoft 365 account before they start to build Teams app. This is the account you use to sign in to Teams. If you do not have one yet, you can get a free Teams developer account by joining the M365 developer program. A good practice is to verify whether your Microsoft 365 account has the permission to upload Teams app before you start the Teams app building. In Teams client, select `Apps`. If you cannot see the `Upload custom app` option, you do not have the permission to upload your Teams app.

:::image type="content" source="~/assets/images/teams-toolkit-v2/Teams-Toolkit-Accounts.png" alt-text="Teams Toolkit Take a Tour - Accounts":::

:::image type="content" source="~/assets/images/teams-toolkit-v2/upload-custom-app-closeup.png" alt-text="Illustration showing where in Teams you can upload a custom app.":::

Please contact your tenant administrator to [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md). If you cannot get permission from tenant administrator, you can join M365 developer program. The free Teams developer account you get from M365 developer account is an admin account, so that you can enable the Teams custom app uploading by yourself.

Azure account is commonly used but not a must-have in Teams app development. If you wish to host your Teams app or access resources on Azure, you need to have an Azure account. Teams Toolkit support integrated experience to sign in, provision and deployment for Azure resources. You can [create a free Azure account](https://azure.microsoft.com/free/) before you start. 

For more information about Accounts, please check the [Accounts](placeholder, point to Accounts page) guide.

### DEVELOPMENT

Teams Toolkit provides a set of options in the `DEVELOPMENT` section to help developers make the Teams app development work easy and quick.  

:::image type="content" source="~/assets/images/teams-toolkit-v2/Teams-Toolkit-Development.png" alt-text="Teams Toolkit Take a Tour - Development":::

1. `Create a new Teams app` let developers to start their Teams app development work with either a hello world template project or a sample project. Select 'create a new Teams app', specify the Teams app capabilities and some other parameters, Teams Toolkit will generate a hello world app template for you to start with. Select 'start from a sample', Teams Toolkit will download and open the source code of selected samples.
1. There are a set of samples for developers to explore, reference and even start development work with. By clicking `View samples` you can see samples and download them to play with.
1. `Add capabilities` let developers to add additional Teams Capabilities to their Teams app at any time during development process. For example, you select only Tab when you create a new project because you want to build a Teams Tab app at the beginning, but later you find that a Bot needs to be added to your project due to requirement change or some other reasons. Then you can add new capabilities by clicking this button, Teams Toolkit can help you generate the source code file for the the new capability.  
1. `Add cloud resources` let developer to add additional cloud resources according to the requirement change.
1. Developers can use debug feature by clicking the `Run and Debug` button. Teams Toolkit support local debug and remote debug for Teams projects. Before run remote debug, you will need to provision cloud resource first.

1. `Edit manifest file` let developers easily edit how the Teams app integrate with Teams client.  

### DEPLOYMENT

During or after the development, a Teams app needs to go through provision, deployment and publish process before it can be accessed by real users. These can be easily accomplished by using a set of options in `DEPLOYMENT` section.

:::image type="content" source="~/assets/images/teams-toolkit-v2/Teams-Toolkit-Deployment.png" alt-text="Teams Toolkit Take a Tour - Deployment":::

1. If you want to host your Teams app on Azure or you need to use Azure resources, `Provision in the cloud` can help you automate the process to create Azure resources. To use it you must have an Azure Subscription which you can use to provision new resources.

1. `Validate manifest file` helps developer to check whether the manifest file is valid and consist with manifest schema.

1. Before publishing your app or share it with someone else, you can build your Teams app into packages by clicking `Zip Teams metadata package`.

1. `Deploy to the cloud` helps developers deploy their source code to Azure. The prerequisite to run deploy is you have provisioned resources by running `Provision in the cloud`. Or you have created the Azure resources manually and specify the resource parameter in your project environment settings. Learn more about [Provision](placeholder, point to provision page) and [Deploy](placeholder, point to deployment page).

1. Instead of manually publish your custom Teams app, developers can use `Publish to Teams` function to call Teams api to publish their Teams app. Please be noticed that you will need the permission to upload Teams app. For more information refer to [Accounts](placeholder, point to Accounts page).

1. Developer Portal for Teams is where you can manage and distribute your Teams app.  

1. Teams Toolkit also provide CI/CD template for popular CI/CD tools like GitHub Workflow, Azure DevOps and Jenkins. For other tools it has guidance on how to build CI/CD pipeline. Refer to [CI/CD Guidance](placeholder, point to CICD page) for more information

### HELP AND FEEDBACK

In this section developers can easily find the documentation and resources they need. Developers can click `Report issue on GitHub` button in the Teams Toolkit to get quick support from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to browse and ask questions.

:::image type="content" source="~/assets/images/teams-toolkit-v2/Teams-Toolkit-Help.png" alt-text="Teams Toolkit Take a Tour - Help and feedback":::

## Next step

> [!div class="nextstepaction"]
> [Create new project use Teams Toolkit](..Path placeholder, point to create new project page)
