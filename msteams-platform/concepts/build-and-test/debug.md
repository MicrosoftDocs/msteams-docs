---
title: Test and Debug Your Teams Agent or App Locally or in the Cloud
description: Learn options for testing and debugging Microsoft Teams agents and apps locally, through a local HTTPS tunnel in Teams, or in a cloud-hosted environment.
ms.localizationpriority: medium
ms.topic: article
ms.date: 11/23/2026
---

# Choose a test setup and debug your Teams agent or app

<a id="choose-a-test-setup-and-debug-your-teams-app"></a>

Microsoft Teams agents and apps contain one or more capabilities and the ways to run or even host them are different. For debugging, use one of the following ways:

* **Purely local**: For agents and bots with a locally running messaging endpoint, you can test your experience in [Microsoft 365 Agents Playground](~/toolkit/debug-your-agents-playground.md), a local testing environment that simulates agent and bot interactions without tunneling or Teams app and bot registration. Agents Playground doesn't support declarative agents. For other content, you can run locally in your browser and address content through `http://localhost`.
* **Locally hosted in Teams**: This involves running the app locally in tunneling software and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams. This permits you to easily run and debug your app within the Teams client.
* **Cloud-hosted in Teams**: This truly simulates the production level support for a Teams app. It involves uploading your solution to your externally accessible server or cloud provider of choice and [creating a package](~/concepts/build-and-test/apps-package.md) to [upload](~/concepts/deploy-and-publish/apps-upload.md) into Teams.

Run the experience from your own computer for purely local or local Teams testing. By doing this, you can compile and run within your integrated development environment and take full advantage of techniques, such as breakpoints and step debugging.

> [!NOTE]
> For production-scale debugging and testing, we recommend that you follow your own company guidelines to ensure you are able to support testing, staging, and deployment through your own processes.

Use multiple manifests and packages to maintain separation between production and development services. For example, you might choose to register separate development and production bots and create appropriate packages to upload them in your testing environment. We also recommend that you upload and test your production package before submitting your app for publishing in our Microsoft Teams Store or distributing to customers.

## Purely local

Use Microsoft 365 Agents Playground to test your agent's or bot's core logic, exchange messages, and preview Adaptive Cards in a browser. This workflow applies to agents and bots with a locally running messaging endpoint, not declarative agents. You can also use mock data and activity triggers to simulate supported Teams scenarios, such as a member joining a team. You don't need a Microsoft 365 developer tenant for anonymous local testing.

> [!NOTE]
> Agents Playground simulates supported Teams activities and APIs, including roster calls, with mock data. It doesn't process your app manifest or reproduce every Teams feature. For supported scenarios and restrictions, see [Agents Playground limitations](~/toolkit/debug-your-agents-playground.md#limitations). Test your app in the Teams client to validate real service integration and features that aren't supported in Agents Playground.

Before launching Playground, choose the channel and authentication settings for your local project:

* To simulate Teams-specific activities, select the `msteams` channel. Agents Toolkit launches Playground with the `emulator` channel by default. Change it with the `DEFAULT_CHANNEL_ID` environment variable or use `--channel-id msteams` for a standalone launch. For more information, see [Multiple channel support](~/toolkit/debug-your-agents-playground.md#multiple-channel-support).
* Agents Playground supports anonymous and authenticated testing. For anonymous testing, use your project's local development configuration. If your agent or bot requires authentication, configure Microsoft Entra ID app registrations for both Playground and your app. For setup details, see [Configure Agents Playground for authentication](~/toolkit/debug-your-agents-playground.md#configure-agents-playground-for-authentication). Keep local development settings separate from production settings, and don't disable production authentication for local testing.

To debug an agent or bot project with Microsoft 365 Agents Toolkit in Visual Studio Code:

1. Install the [Agents Playground prerequisites](~/toolkit/debug-your-agents-playground.md#prerequisites).
1. Open your bot project. If it doesn't have an Agents Playground debug configuration, follow [Debug an existing app with Agents Playground](~/toolkit/debug-your-agents-playground.md#debug-an-existing-app-with-agents-playground) to configure it.
1. Apply the channel and authentication settings described above to your local debug configuration. If you change environment variables after Playground starts, stop and restart the debug session to apply them.
1. Set breakpoints in your agent's or bot's message or activity handlers.
1. Open **Run and Debug** (`Ctrl+Shift+D`), select the **Debug in Microsoft 365 Agents Playground** configuration, and press **F5**. The configuration might include **(Preview)** in its name. Agents Playground opens in a browser.
1. Send a message to your bot, inspect its responses and Adaptive Cards, and step through your code when a breakpoint is reached. Use activity triggers to test events supported by the selected channel.

If you run your bot independently of Agents Toolkit, install and launch the standalone Playground as described in [Test your agent locally in Microsoft 365 Agents Playground](/microsoft-365/agents-sdk/test-with-toolkit-project#start-your-project-by-cloning-or-with-the-cli). Run your bot locally and set Playground's `--app-endpoint` option to its actual messaging endpoint, using the port configured in your project.

## Locally hosted

For HTTPS-based testing in Teams, the services your app uses must be publicly accessible over HTTPS. You can publish your code to the cloud or make your locally running instance externally accessible with tunneling software. Your agent or app runs locally, while you interact with it through the Teams client over a public HTTPS tunnel.

Although you can use any tool of your choice, we use and recommend [ngrok](https://ngrok.com/download), which creates an externally addressable URL for a port you open locally on your machine.

To set up ngrok in preparation to execute your Teams app locally, follow these steps:

1. Go to the directory where you have ngrok.exe installed in a terminal application. You may want to add it as a path variable to avoid this step.
2. Run, for example, `ngrok http 3978 --host-header=localhost:3978`, or replace the port number as needed.
   This launches ngrok to listen on the port you specify. In return, it gives you an externally addressable URL valid for as long as ngrok is running.

> [!NOTE]
> If you stop and restart ngrok, the URL changes.

To use ngrok in your project based on the capabilities you're using, you must replace all URL references in your code, configuration, and manifest.json file to use this URL endpoint.

For agents or bots built with Teams SDK, update the messaging endpoint in your bot's registration to use the ngrok HTTPS URL followed by `/api/messages`, for example, `https://2d1224fb.ngrok.io/api/messages`. Keep your local app and ngrok running, then upload and install your app in Teams. Send a message to your agent or bot in the Teams client to verify that Teams can reach your local endpoint and test Teams-specific functionality.

To update an existing bot registration in [Developer Portal for Teams](https://dev.teams.microsoft.com):

1. Go to **Tools** > **Bot management** and select your existing bot.
1. Select **Configure**.
1. Under **Delivery method**, select **HTTPS endpoint**, enter the ngrok HTTPS URL followed by `/api/messages`, and select **Save**.

For details, see [Configure the agent's bot registration](/microsoftteams/platform/agents-in-teams/configure-delivery-methods-for-agents#configure-the-agents-bot-registration). If you manage an Azure Bot resource in the Azure portal instead, see [Configure messaging endpoint](~/bots/how-to/authentication/bot-sso-register-aad.md#configure-messaging-endpoint).

> [!NOTE]
> If the tunnel URL changes, update the existing registration's messaging endpoint before testing again. You don't need to create a new registration. If you haven't registered your agent or bot yet, see [Register, install, and chat in Teams](~/agents-in-teams/quickstart-create-agent-teams-sdk.md#register-install-and-chat-in-teams).

## Cloud-hosted

You can use any externally addressable service to host your development and production code and their HTTPS endpoints. There's no expectation that your capabilities reside on the same service. We require all domains to be accessed from your Teams apps listed in the [`validDomains`](/microsoft-365/extensibility/schema/root#validdomains) object in the `manifest.json` file.

> [!NOTE]
> To ensure a secure environment, be explicit about the exact domain and subdomains you reference and those domains must be in your control. For example, `*.azurewebsites.net` is not recommended, however `contoso.azurewebsites.net` is recommended.

## Load and run your experience

To load and run your experience within Teams, you need to create a package and upload it into Teams. Packaging and uploading aren't required for testing in Agents Playground. Always test your app in the Teams client before moving it to production. For more information, see:

* [Create the package for your Microsoft Teams app](~/concepts/build-and-test/apps-package.md).
* [Upload your app in Microsoft Teams](~/concepts/deploy-and-publish/apps-upload.md).

## Next step

> [!div class="nextstepaction"]
> [Add test data to your environment](~/concepts/build-and-test/test-data.md)

## See also

* [Microsoft 365 Agents Playground](~/toolkit/debug-your-agents-playground.md)
* [Test by uploading to Teams](../../bots/how-to/debug/locally-with-an-ide.md#test-by-uploading-to-teams)
* [Dev Tools for Microsoft Teams tabs](../../tabs/how-to/developer-tools.md)
* [Test app behavior in different environment](../../toolkit/test-app-behavior.md)
