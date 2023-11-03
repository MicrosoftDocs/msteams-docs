# Teams App Test Tool

The Teams App Test Tool, also known as the Test Tool, is a component integrated into the Teams Toolkit. This tool assists developers in debugging, testing, and refining the app design of a Teams bot application. It provides a web-based chat environment that replicates the behavior, appearance, and user experience of Microsoft Teams.

   :::image type="content" source="../assets/images/teams-toolkit-v2/debug/test-tool.png" alt-text="Screenshot shows the Teams app test tool adaptive card.":::

## Features

Teams App Test Tool enables developers to:

- **Sandbox Environment**: Test and debug their bot application in a sandbox environment that emulates the behavior, look and feel of Microsoft Teams.
- **Reduce Local Debugging Frictions**: Remove the [prerequisites](https://learn.microsoft.com/microsoftteams/platform/toolkit/tools-prerequisites#accounts-to-build-your-teams-app) to obtain a Microsoft 365 Developer tenant and side-loading permissions before debugging the Teams bot applications.
- **Network Security**: No need to set up a tunnel with [Ngrok](https://ngrok.com/) or [Microsoft Dev Tunnel](https://learn.microsoft.com/azure/developer/dev-tunnels/overview) to expose the local bot application to the internet.
- **Rapid Inner-Loop Iterations**: Quickly iterate on the app design and bot logic without the need to re-deploy the bot application to the cloud.
- **Mock Data and Activities**: The test tool makes it easy to accomplish a test for complex scenarios such as `Send a welcome message when a new member joins the channel` by using mock data as well as built-in and custom activity triggers.
  ![Custom_Activity](https://github.com/OfficeDev/TeamsFx/assets/11220663/3ef10c42-b3b3-4970-8ebf-92e4307f9d27)
- **Reliable and Trustable**: You can trust the test tool because the Bot application UX ([Adaptive Cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-reference#adaptive-card)) is built on top of the same rendering technology as in Microsoft Teams.
- **Integration with Existing Teams Bot Applications**: The test tool can be integrated with existing Teams bot applications that are built with [Bot Framework SDK](https://dev.botframework.com/).
- **Easy Inspections**: You can inspect the interactions between your bot application and the Test Tool as well as the request and response payloads coming in and out of your bot application.

## Limitations

- Application manifest is not being processed in the Test Tool. This means features that enabled only through the manifest will not be available in the Test Tool. For example, [The Bot Command Menu](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/create-a-bot-commands-menu?tabs=desktop%2Cdotnet) will not be available in the Test Tool.
- Not all types of Bot application UX ([Cards](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/what-are-cards)) are supported in the Test Tool other than Adaptive Cards.
- Some features used in the Adaptive Card are not supported:
  - [People picker](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/people-picker)
  - [Dynamic type-ahead search](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/dynamic-search)
  - [User mention](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#sample-adaptive-card-with-a-mention)
  - [Image stage view](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#stage-view-for-images-in-adaptive-cards)
  - [Full-width control](https://learn.microsoft.com/microsoftteams/platform/task-modules-and-cards/cards/cards-format?tabs=adaptive-md%2Cdesktop%2Cconnector-html#full-width-adaptive-card)
- Single Sign-On (SSO) is not supported in the Test Tool. This means the [Bot SSO](https://learn.microsoft.com/microsoftteams/platform/bots/how-to/authentication/bot-sso-overview) feature will not be available in the Test Tool.
