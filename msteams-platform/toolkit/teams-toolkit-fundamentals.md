---
title: Teams Toolkit fundamentals
author: zyxiaoyuer
description:  Describes fundamentals of Teams Toolkit
ms.author: zhany
ms.localizationpriority: medium
ms.topic: overview
ms.date: 11/29/2021
---

# Teams Toolkit

> [!NOTE]
> Currently, this feature is available in **public developer preview** only.

Teams Toolkit for Visual Studio Code helps you to create and deploy Teams apps with integrated identity, access to cloud storage, data from Microsoft Graph, and other services in Azure and Microsoft 365 with zero-configuration approach. For Teams app development, similar to Teams Toolkit for Visual Studio, you can use [CLI tool](https://github.com/OfficeDev/TeamsFx/blob/dev/docs/cli/user-manual.md), which consists of Toolkit `teamsfx`.

## Install Teams Toolkit for Visual Studio Code

1. Open **Visual Studio Code.**
1. Select the Extensions view (**Ctrl+Shift+X** / **⌘⇧-X** or **View > Extensions**):

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-1.png" alt-text="Select Extensions View":::

1. Enter **Teams Toolkit** in the search box:

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install toolkit-2.png" alt-text="Teams Toolkit":::
   
1. Select **install**:
  
   :::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/install.png" alt-text="install toolkit":::

> [!TIP]
> You can install Teams Toolkit from [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension).

## Teams apps capabilities

[Microsoft Teams app capabilities](../concepts/capabilities-overview.md) are Teams extensibility points. Teams Toolkit for Visual Studio Code supports you to work on project with the following Teams app capabilities:

* [Tabs](../tabs/what-are-tabs.md#build-tabs-for-microsoft-teams)
* [Bots](../bots/what-are-bots.md#bots-in-microsoft-teams)
* [Messaging extensions](../messaging-extensions/what-are-messaging-extensions.md#messaging-extensions) 

You can select required capabilities to create Teams app. Your Teams project can contain either one of the capabilities or all three capabilities from above. You can select any of the required capability when you create the Teams Project:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/select capabilities.png" alt-text="select":::

You can add more capabilities if required for Teams app development by selecting **Add capabilities**:

:::image type="content" source="../assets/images/teams-toolkit-v2/teams toolkit fundamentals/add capabilities.png" alt-text="add":::

## User journey of Teams Toolkit

Teams Toolkit provides features of Teams app development to make it easy to debug, deploy, and publish. It automates manual work and provides great integration of Teams and Azure resources. The following image shows Teams Toolkit user journey:

![Teams Toolkit User Journey](./images/teams-toolkit-user-journey.png)

## Take a tour of Teams Toolkit for Visual Studio Code

After Toolkit installation, you will see the Teams Toolkit UI with limited functionalities as shown in following image:

:::image type="content" source="./images/teams-toolkit-beforestart.png" alt-text="Before start Teams Toolkit":::

You can select **Quick Start** to explore the Teams Toolkit, or select **Create a new Teams App** to create one Teams project. If you have a Teams Project created by Teams Toolkit v2.+ opened in VS Code, you will see Teams Toolkit UI with all functionalities as shown in the following image:

:::image type="content" source="./images/teams-toolkit-overview.png" alt-text="Take a tour to Teams Toolkit":::

Let's take a tour of the topics covered in this document:

* [Accounts](#accounts)

* [Environment](#environment)

* [Development](#development)

* [Deployment](#deployment)

* [Help and Feedback](#help-and-feedback)

### Help and Feedback

In this section, you can easily find the documentation and resources you need. You can select **Report issues on GitHub** in the Teams Toolkit to get **Quick support** from product expert. Browse the issue before you create a new one, or visit [StackOverflow tag `teams-toolkit`](https://stackoverflow.com/questions/tagged/teams-toolkit) to browse and ask questions:

:::image type="content" source="../assets/images/teams-toolkit-v2/manual/help and feedback.png" alt-text="Help":::

## See also

> [!div class="nextstepaction"]
> [Create new project use Teams Toolkit](create-new-project.md)

> [!div class="nextstepaction"]
>[Prepare accounts to build Teams apps](accounts.md)
