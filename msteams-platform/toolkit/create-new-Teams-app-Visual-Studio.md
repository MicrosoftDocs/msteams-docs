---
title: Create new Teams app in Visual Studio
author: zyxiaoyuer
description: In this module, learn how to create a new Teams app using Teams Toolkit in Visual Studio
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 03/14/2022
---

# Create new Teams app in Visual Studio

Teams Toolkit provides Microsoft Teams app templates in Visual Studio. You can search for Teams app templates when create new project. To create a Teams app, follow the steps below:

1. Launch the Visual Studio and select on “Create a new project”. Alternatively, select on File > new > Project.
1. Search for Microsoft Teams app from the template list. Select Microsoft Teams app and select Next.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-for-visual-studio/select-msteams-app.png" alt-text="Select Microsoft Teams app":::

1. Specify your application name in the next page and select Create.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-for-visual-studio/myteamsapp.png" alt-text="Select My Teams app":::

1. In the next dialog, select the Teams app type that you would like to create, and select Create.

   :::image type="content" source="../assets/images/teams-toolkit-v2/teams-toolkit-for-visual-studio/select-apptype.png" alt-text="Select app type":::

## The Teams App templates in Teams Toolkit for Visual Studio

There are prepopulated Teams app templates in Teams Toolkit for various Teams app type. The following table list all the templated available now:

|Teams app template | Description |
|-----------------------|----------|
| Notification Bot | It's a Bot app that can send notification to your Teams client, there are multiple ways to trigger the notification. For example, trigger the notification by an http request, or by time. Select triggered based on your business scenario. |
| Command Bot | It's a Bot app which user can type command to interact with the Bot. |
| Tab | It's a Tab app shows a webpage inside the Teams. And it enables single sign-on using Teams account.
| Message Extension | It's a Message Extension app implements simple features like create adaptive card, search NuGet packages, unfurling links for ".botframwork.com" domain. |

 > [!Note]
 > After project is created, Teams Toolkit will automatically open a GetStarted file. There are instructions to guide you quickly start play around with the Teams Toolkit.
