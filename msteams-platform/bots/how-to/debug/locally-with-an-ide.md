---
title: Test and debug your bot locally
description: Learn how to test and debug your bot locally with Microsoft 365 Agents Playground and validate its functionality in Microsoft Teams.
ms.topic: overview
ms.localizationpriority: medium
ms.author: anclear
ms.owner: angovil
ms.date: 11/23/2026
---

# Test and debug your bot locally with IDE

When testing your bot, you need to consider both the contexts you want your bot to run in, and any functionality you add to your bot that requires data specific to Microsoft Teams. Ensure that the method you choose to test your bot aligns with its functionality.

Use [Microsoft 365 Agents Playground](#use-microsoft-365-agents-playground) to test and debug your bot locally without uploading an app to Teams. Use the Teams client to validate the full functionality of your bot with real Teams data.

## Test by uploading to Teams

The most comprehensive way to test your bot is by creating an app package and uploading it to Teams. Uploading the app package to Teams is the only method to test the full functionality available to your bot, across all scopes.

There are two methods for uploading your app:

* Use [Developer Portal for Teams](~/concepts/build-and-test/teams-developer-portal.md).
* [Create an app package](~/concepts/build-and-test/apps-package.md) manually, and then [upload your app](~/concepts/deploy-and-publish/apps-upload.md).

> [!NOTE]
> To alter the manifest and re-upload your app, [delete the bot](#delete-a-bot-from-teams) before uploading the altered app package.
> To test the bot, enable custom app upload in Teams. See [enable custom app upload](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

We don't recommend uploading multiple apps with differing content under the same bot ID. This could lead to unpredictable bot behavior. Remove or uninstall any prior versions of the apps, ensuring only the latest version is uploaded. If the apps share the same bot ID, assign the necessary permissions in the app package. Additionally, activate both apps in the app permission policy and the managed apps, ensuring they aren't blocked. Failure to do so might result in issues during app usage.

## Debug your bot locally

If you're hosting your bot locally during development and want to test it in the Teams client, use [dev tunnels](/azure/developer/dev-tunnels/get-started). You don't need a tunnel when testing with [Agents Playground](#use-microsoft-365-agents-playground).

1. [Install the dev tunnels CLI](/azure/developer/dev-tunnels/get-started#install) and sign in:

   ```console
   devtunnel user login
   ```

1. Start your bot locally, then run the following command in a separate terminal to host a tunnel. Replace `3978` with the port your bot uses:

   ```console
   devtunnel host -p 3978 --protocol http --allow-anonymous
   ```

   The `--allow-anonymous` option allows the Teams service to reach your local bot through the tunnel. Your bot must still validate incoming requests.

1. Update your bot's messaging endpoint to use the HTTPS tunnel URL shown under **Connect via browser**, followed by your bot's messaging route, such as `/api/messages`.

> [!NOTE]
>
> * If the tunnel URL changes when you restart the tunnel, update your bot's messaging endpoint to use the new URL.
> * The tunnel must remain running while you test your locally hosted bot in Teams.

## Test your bot without uploading to Teams

Use Agents Playground for local testing without installing your bot as an app in Teams. You can also talk to a registered bot directly by ID for basic testing. These options don't replace testing the full functionality of your bot in the Teams client. To fully test your bot, see [test by uploading to Teams](#test-by-uploading-to-teams).

<a name="use-the-bot-emulator"></a>

### Use Microsoft 365 Agents Playground

[Microsoft 365 Agents Playground](../../../toolkit/debug-your-agents-playground.md) provides a local environment for testing bot and agent-based apps. Use it instead of Bot Framework Emulator to send messages, inspect activities, render Adaptive Cards, and simulate Teams events with mock data. Agents Playground supports personal, team, and group chat scopes. You don't need a Microsoft 365 developer tenant, app registration, custom app upload permissions, or a tunneling service to use it.

#### Prerequisites

* Install a [supported version of Node.js](../../../toolkit/build-environments.md#nodejs-version-compatibility-table-for-project-type).

#### Test and debug in Agents Playground

The following steps apply only to bot projects created using Microsoft 365 Agents Toolkit and configured for Agents Playground. If your project wasn't created using Agents Toolkit, use the [command-line workflow](#test-using-the-command-line) instead.

Before you begin:

* Install [Visual Studio Code](https://code.visualstudio.com/).
* Install the [latest prerelease version of Microsoft 365 Agents Toolkit](../../../toolkit/install-Agents-Toolkit.md#install-a-prerelease-version).
* If your existing Agents Toolkit project doesn't have an Agents Playground debug configuration, follow [Debug an existing app with Agents Playground](../../../toolkit/debug-your-agents-playground.md#debug-an-existing-app-with-agents-playground).

1. Open your bot project in Visual Studio Code.
1. Set breakpoints in your bot's message or activity handlers.
1. Open **Run and Debug** (`Ctrl+Shift+D`) and select **Debug in Microsoft 365 Agents Playground (Preview)** from the debug configuration dropdown.
1. Press **F5** to start debugging. Agents Toolkit starts the local services and opens Agents Playground in your browser.
1. Send messages to your bot and inspect its responses. When execution reaches a breakpoint, use the Visual Studio Code debugger to inspect variables and step through your code.
1. Use [activity triggers](../../../toolkit/debug-your-agents-playground.md#activity-triggers) to send mock events, such as a member joining a conversation.

#### Test using the command line

You can use the Agents Playground CLI with a locally running bot without creating a project using Agents Toolkit. For more information about the CLI and message endpoint settings, see [Understand Agents Playground](../../../toolkit/debug-your-agents-playground.md#understand-agents-playground).

1. In your bot project's directory, install Agents Playground:

   ```console
   npm install @microsoft/m365agentsplayground
   ```

1. Start your bot locally using your project's startup command or IDE debugger. Note its message endpoint, such as `http://localhost:3978/api/messages`.
1. In a separate terminal, open the same project directory and launch Agents Playground:

   ```console
   npx teamsapptester start --app-endpoint http://localhost:3978/api/messages
   ```

   Replace the endpoint URL with your bot's local message endpoint. If your bot requires authentication, [configure Agents Playground for authentication](../../../toolkit/debug-your-agents-playground.md#configure-agents-playground-for-authentication).

1. In the browser window opened by Agents Playground, send messages to your bot and inspect its responses. To step through your code, use your IDE debugger with the running bot process.

> [!NOTE]
> Agents Playground uses mock data and doesn't process your Teams app manifest. It doesn't support all Teams experiences, including tabs, message extensions, single sign-on (SSO), mobile, or meetings. For these scenarios and final validation with real Teams data, [test your bot in Teams](#test-by-uploading-to-teams). For more information, see [Agents Playground limitations](../../../toolkit/debug-your-agents-playground.md#limitations).

### Talk to your bot directly by ID

> [!Important]
>
> * Talking to your bot by ID is intended for basic testing purposes only. Any Teams-specific functionality you add to your bot fails to work.
> * Users can't chat with bots that aren't connected to a Microsoft Teams app such as Azure bots created through the Bot Framework or Power Virtual Agents. We recommend you to create a new Teams app connected to the Azure Bot using the [Developer Portal](../../../concepts/build-and-test/manage-your-apps-in-developer-portal.md#configure), publish it to Teams, and allow users to install the app using the [app permission policies](/microsoftteams/teams-app-permission-policies#edit-an-app-permission-policy). If you want to test the app, you can assign users an [app setup policy](/microsoftteams/teams-app-setup-policies#manage-app-setup-policies) that allows uploading custom apps and chat with the Azure bot through a direct link to a chat.

Initiate a conversation with your bot by using its ID. When a bot is added through one of these methods, it isn't addressable in channel conversations, and you can't take advantage of other Teams app capabilities like tabs or message extensions. Initiate a conversation in one of the following ways:

* On the [Bot Dashboard](https://dev.botframework.com/bots) page for your bot, under **Channels**, select **Add to Microsoft Teams**. Teams launches a personal chat with your bot.

* Directly reference your bot's app ID from within Teams:
   1. Go to [Bot Dashboard](https://dev.botframework.com/bots) > **Details** and copy the **Microsoft App ID** for your bot.

      :::image type="content" source="../../../assets/images/bots_appid_botframework.png" alt-text="Screenshot shows the Microsoft App ID in the details page.":::
  
   2. Open Microsoft Teams, on the Chat pane, select the **New chat** icon. In the **To:** filed, enter your bot's Microsoft App ID.

      :::image type="content" source="../../../assets/images/bots_uploading.png" alt-text="Screenshot shows the New chat icon and the To field in Teams.":::

      The app ID must resolve to your bot name.

   3. Select your bot and send a message to initiate a conversation.
      Alternatively, you can paste your bot's app ID in the search box in the top left in Teams. In the search results page, go to the **People** tab to see your bot and to start chatting with it.

> [!NOTE]
> For Teams to refer to your bot's app ID, enable [custom app upload](/microsoftteams/platform/concepts/build-and-test/prepare-your-o365-tenant#enable-custom-teams-apps-and-turn-on-custom-app-uploading).

Your bot receives the `conversationUpdate` event as you add the bots to a team, without the team information in the `channelData` object.

## Block a bot in personal chat

Users can choose to block your bot from sending personal chat messages. They might toggle this by right-clicking your bot in the chat channel and choosing **Block bot conversation**. This means, your bots continue to send messages, however, the user doesn't receive the messages.

:::image type="content" source="../../../assets/images/bots/botdisable.png" alt-text="Screenshot shows the block bot conversation option in the personal chat.":::

## Remove a bot from a team

Users can delete the bot by choosing the trash-can icon on the bots list in their team's view. This only removes the bot from that team's use. Individual users can still interact in personal context. Users can't remove or disable bots in personal context.

## Disable a bot in Teams

To stop your bot from receiving messages, go to your **Bot Dashboard** and edit the Teams channel. Clear the **Enable on Microsoft Teams** option. This prevents users from interacting with the bot, however, it's still discoverable and users can add it to Teams.

## Delete a bot from Teams

To remove your bot completely from Teams, go to your **Bot Dashboard** and edit the Teams channel. Choose the **Delete** button at the bottom. Deleting a bot from Teams prevents users from discovering, adding, and interacting with your bot. Deleting a bot from Teams doesn't remove the bot from other user's Teams instances, however, it stops functioning for them as well.

## See also

* [Test your app](../../../concepts/build-and-test/test-app-overview.md)
* [Microsoft 365 Agents Playground](../../../toolkit/debug-your-agents-playground.md)
* [Debug your calling and meeting bot locally](~/bots/calls-and-meetings/debugging-local-testing-calling-meeting-bots.md)
* [Build bots for Teams](../../what-are-bots.md)
