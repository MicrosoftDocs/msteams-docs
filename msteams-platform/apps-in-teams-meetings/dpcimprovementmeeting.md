---
title: Unified meetings apps
author: surbhigupta
description: Learn about Meeting lifecycle, building user's meeting experience throughout meeting lifecycle in desktop and mobile environment, participant roles and user types. In addition, learn about integrating bots and messaging extension in meeting lifecycle.
ms.topic: conceptual
ms.localizationpriority: none
---
 Messaging extensions allow the users to interact with your web service through buttons and forms in the Microsoft Teams client.

    This step-by-step guide illustrates how to build an Action-based Messaging Extension.
   
    You'll see the following output:

       :::image type="content" source="assets/images/sbs-messagingextension-action/output-card.png alt-text="Output":::

- title: Prerequisites
  durationInMinutes: 1
  content: |
    Ensure you install the following tools and set up your development environment:  

      * [.NET Core SDK](https://dotnet.microsoft.com/download) version 3.1
      * [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/)
      * [ngrok](https://ngrok.com/download) latest version (only for devbox testing) or any equivalent tunneling solution

      > [!NOTE]
      > After downloading ngrok, sign up and install [authtoken](https://ngrok.com/download).

      * [Microsoft Teams](https://teams.microsoft.com/) with valid account

   > [!NOTE]
    > Use version 1.7.0 or later of [Teams SDK](/javascript/api/overview/msteams-client?view=msteams-client-js-latest&preserve-view=true), as versions prior to it do not support meeting sidepanel.

- title: Set up local environment
  durationInMinutes: 1
  content: |
   Clone `BotBuilder-Samples` repository to your local GitHub:  

    1. Open [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples).
    1. Select **Code**.
    1. From the dropdown menu, select **Open with GitHub Desktop**.

        :::image type="content" source="assets/images/sbs-messagingextension-action/output-card.png alt-text="Output":::

    1. Select **Clone**.
