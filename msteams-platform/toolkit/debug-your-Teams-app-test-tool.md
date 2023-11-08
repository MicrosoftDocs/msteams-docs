---
title: Debug your Teams app test tool
author: surbhigupta 
description: In this module, learn how to debug your Teams app test tool and key features of Teams app test tool.
ms.author: surbhigupta 
ms.localizationpriority: high
ms.topic: overview
ms.date: 11/03/2023
---

# Teams App Test Tool

Teams App Test Tool, also known as the Test Tool, is a component integrated into the Teams Toolkit. This tool assists users in debugging, testing, and refining the app design of a Teams bot application. It provides a web-based chat environment that replicates the behavior, appearance, and user experience of Microsoft Teams.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams app test tool adaptive card.":::

## Features

The Teams App Test Tool assists users in testing and debugging their Teams bot applications and following are the key features:

1. **Sandbox Environment**: The tool provides a web-based chat environment that emulates the behavior, look, and user experience of Microsoft Teams. This tool allows users to test and debug their bot application in a controlled environment.

1. **Tunneling**: With the Test Tool, users don't need to set up a tunnel with [Ngrok](https://ngrok.com/) or [Microsoft Dev Tunnel](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) to expose their local bot application to the internet.

1. **Reduce Local Debugging**: Ensure you meet the [prerequisites](https://learn.microsoft.com/microsoftteams/platform/toolkit/tools-prerequisites#accounts-to-build-your-teams-app) to secure a Microsoft 365 Developer tenant and the app uploading permissions before you debug the Teams bot applications.

1. **Rapid Inner-Loop Iterations**: Optimize the process of making changes to the app design and bot logic without having to redeploy the bot application to the cloud.

1. **Mock Data and Activities**: The test tool makes it easy to accomplish a test for complex scenarios such as `Send a welcome message when a new member joins the channel` by using mock data and built-in and custom activity triggers.

1. **Reliable and Trustable**: The test tool is reliable as the Bot application UX ([Adaptive Cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card)) utilizes the same rendering technology as in Microsoft Teams.

1. **Integration with Existing Teams Bot Applications**: The test tool can be integrated with existing Teams bot applications that are built with [Bot Framework SDK](https://dev.botframework.com/).

1. **Support for Different Scopes**: The tool supports testing in different scopes (personal, team, group chat), allowing developers to ensure their bot works correctly in all the scopes.

## Limitations: 

The following are the limitations to Test Tool: 

1. Limited Emulation: The tool attempts to emulate the behavior, appearance, and user experience of Microsoft Teams, but it doesn't capture every aspect of the Teams environment completely. There could be some variations in behavior between the tool and the actual Teams application.

1. The Test Tool doesn't support all other types of Bot application UX [Cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/what-are-cards) other than Adaptive Cards.

1. The Test Tool doesn't process the app manifest, which means features that are only enabled through the manifest will not be accessible.
 
1. The Test Tool doesn't support Single sign-on (SSO), mobile view, and meetings.
