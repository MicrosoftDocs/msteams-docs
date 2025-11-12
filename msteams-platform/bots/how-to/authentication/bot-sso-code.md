---
title: Update App Manifest to Enable SSO
description: Learn how to add code configuration, handle an access token, receive token, and handle app user sign out for enabling SSO in Teams bots.
ms.topic: how-to
ms.localizationpriority: high
zone_pivot_groups: enable-sso
ms.date: 11/13/2024
ms.owner: ryanbliss
---
# Add code to enable SSO in your bot app

Before you add code to enable single sign-on (SSO), ensure that you've configured your app and bot resource in Microsoft Entra admin center.

> [!div class="nextstepaction"]
> [Configure bot app in Microsoft Entra ID](bot-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Microsoft Entra ID. The access token is issued on behalf of the bot app.

> [!NOTE]
> If you've built your Teams app using Microsoft Teams Toolkit, you can enable SSO for your app using the instructions in the Tools and SDKs module. For more information, see [add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md). Teams Toolkit supports SSO for JavaScript, TypeScript, and C# apps in Visual Studio Code.

::: zone pivot="bot-app"

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Add code to handle an access token](#add-code-to-handle-an-access-token)
1. [Add code to receive the token](#add-code-to-receive-the-token)
1. [Handle app user sign out](#handle-app-user-sign-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure the code with these values.

To update the development environment variables:

1. Open the bot app project.
1. Open the environment file for your project.
1. Update the following variables:

    - For `MicrosoftAppId`, update the bot ID from Microsoft Entra ID.
    - For `MicrosoftAppPassword`, update the client secret.
    - For `ConnectionName`, update the name of the OAuth connection you configured in Microsoft Entra ID.
    - For `MicrosoftAppTenantId`, update the tenant ID.

    > [!NOTE]
    > You can customize the OAuth redirect URL for your bot and identity provider based on your data residency requirements, whether your bot is in the public cloud, Microsoft Azure Government cloud, or Microsoft Azure operated by 21Vianet. For OAuth URLs and data residency list, see [OAuth URL support in Azure AI Bot Service](/azure/bot-service/ref-oauth-redirect-urls?view=azure-bot-service-4.0&preserve-view=true).

1. Save the file.

You've now configured the required environment variables for your bot app and SSO. Next, add the code for handling bot tokens.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Update+development+environment+variables&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23update-development-environment-variables&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Add code to handle an access token

The request to get the token is a POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true). Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

To update your app's code:

1. Add code snippet for `TeamsSSOTokenExchangeMiddleware`.

   # [C#](#tab/cs1)

    Add the following code snippet to `AdapterWithErrorHandler.cs` (or the equivalent class in your app's code):

    ```csharp
    base.Use(new TeamsSSOTokenExchangeMiddleware(storage, configuration["ConnectionName"]));
    ```

   # [JavaScript](#tab/js1)

    Add the following code snippet to `index.js` (or the equivalent class in your app's code):

    ```JavaScript
    const {TeamsSSOTokenExchangeMiddleware} = require('botbuilder');
    const tokenExchangeMiddleware = new TeamsSSOTokenExchangeMiddleware(memoryStorage, env.connectionName);
    adapter.use(tokenExchangeMiddleware);
    ```

    ---

    > [!NOTE]
    > You might receive multiple responses for a given request if the user has multiple active endpoints. You must eliminate all duplicate or redundant responses with the token. For more information about signin/tokenExchange, see [TeamsSSOTokenExchangeMiddleware Class](/python/api/botbuilder-core/botbuilder.core.teams.teams_sso_token_exchange_middleware.teamsssotokenexchangemiddleware?view=botbuilder-py-latest&preserve-view=true#remarks).

1. Use the following code snippet for requesting a token.

   # [C#](#tab/cs2)

    After you add the `AdapterWithErrorHandler.cs`, the following code must appear:

    ```csharp
        public class AdapterWithErrorHandler : CloudAdapter
        {
            public AdapterWithErrorHandler(
                IConfiguration configuration,
                IHttpClientFactory httpClientFactory,
                ILogger<IBotFrameworkHttpAdapter> logger,
                IStorage storage,
                ConversationState conversationState)
                : base(configuration, httpClientFactory, logger)
            {
                base.Use(new TeamsSSOTokenExchangeMiddleware(storage, configuration["ConnectionName"]));
    
                OnTurnError = async (turnContext, exception) =>
                {
                    // Log any leaked exception from the application.
                    // NOTE: In production environment, you must consider logging this to
                    // Azure Application Insights. Visit https://learn.microsoft.com/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp to see how
                    // to add telemetry capture to your bot.
                    logger.LogError(exception, $"[OnTurnError] unhandled error : {exception.Message}");
    
                    // Send a message to the user.
                    await turnContext.SendActivityAsync("The bot encountered an error or bug.");
                    await turnContext.SendActivityAsync("To continue to run this bot, please fix the bot source code.");
    
                    if (conversationState != null)
                    {
                        try
                        {
                            // Delete the conversationState for the current conversation to prevent the
                            // bot from getting stuck in an error-loop caused by being in a bad state.
                            // conversationState must be thought of as similar to "cookie-state" in a Web pages.
                            await conversationState.DeleteAsync(turnContext);
                        }
                        catch (Exception e)
                        {
                            logger.LogError(e, $"Exception caught on attempting to Delete ConversationState : {e.Message}");
                        }
                    }
    
                    // Send a trace activity, which is displayed in the Bot Framework Emulator.
                    await turnContext.TraceActivityAsync(
                        "OnTurnError Trace",
                        exception.Message,
                        "https://www.botframework.com/schemas/error",
                        "TurnError");
                };
            }
        }
    ```

   # [JavaScript](#tab/js2)

    After you add the code snippet for `TeamsSSOTokenExchangeMiddleware`, the following code must appear:

    ```JavaScript
        // index.js is used to setup and configure your bot.
    
        // Import required packages
        const path = require('path');
        
        // Read botFilePath and botFileSecret from .env file.
        const ENV_FILE = path.join(__dirname, '.env');
        require('dotenv').config({ path: ENV_FILE });
        
        const express = require("express");
        
        // Import required bot services.
        // See https://learn.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the different parts of a bot.
        const {
            CloudAdapter,
            ConversationState,
            MemoryStorage,
            UserState,
            ConfigurationBotFrameworkAuthentication,
            TeamsSSOTokenExchangeMiddleware
        } = require('botbuilder');
        
        const { TeamsBot } = require('./bots/teamsBot');
        const { MainDialog } = require('./dialogs/mainDialog');
        const { env } = require('process');
        
        const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(process.env);
        
        var conname = env.connectionName;
        
        console.log(`\n${ conname } is the con name`);
        
        // Create adapter.
        // See https://learn.microsoft.com/javascript/api/botbuilder-core/botadapter?view=botbuilder-ts-latest to learn more about how bot adapter.
        const adapter = new CloudAdapter(botFrameworkAuthentication);
        const memoryStorage = new MemoryStorage();
        const tokenExchangeMiddleware = new TeamsSSOTokenExchangeMiddleware(memoryStorage, env.connectionName);
        
        adapter.use(tokenExchangeMiddleware);
        adapter.onTurnError = async (context, error) => {
            // This check writes out errors to console log .vs. app insights.
            // NOTE: In production environment, you must consider logging this to Azure
            //       application insights. See https://learn.microsoft.com/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp for telemetry
            //       configuration instructions.
            console.error(`\n [onTurnError] unhandled error: ${ error }`);
        
            // Send a trace activity, which is displayed in Bot Framework Emulator.
            await context.sendTraceActivity(
                'OnTurnError Trace',
                `${ error }`,
                'https://www.botframework.com/schemas/error',
                'TurnError'
            );
        
            // Send a message to the user.
            await context.sendActivity('The bot encountered an error or bug.');
            await context.sendActivity('To continue to run this bot, please fix the bot source code.');
            // Clear out state.
            await conversationState.delete(context);
        };
        
        // Define the state store for your bot.
        // See https://aka.ms/about-bot-state to learn more about using MemoryStorage.
        // A bot requires a state storage system to persist the dialog and user state between messages.
        //const memoryStorage = new MemoryStorage();
        
        // Create conversation and user state with in-memory storage provider.
        const conversationState = new ConversationState(memoryStorage);
        const userState = new UserState(memoryStorage);
        
        // Create the main dialog.
        const dialog = new MainDialog();
        // Create the bot that will handle incoming messages.
        const bot = new TeamsBot(conversationState, userState, dialog);
        
        // Create express application.
        const expressApp = express();
        expressApp.use(express.json());

        const server = expressApp.listen(process.env.port || process.env.PORT || 3978, () => {
            console.log(`\n${ expressApp.name } listening to`, server.address());
            console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
            console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
        });
        
        // Listen for incoming requests.
        expressApp.post('/api/messages', async (req, res) => {
            // Route received a request to adapter for processing.
            await adapter.process(req, res, (context) => bot.run(context));
        });
    ```

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+handle+an+access+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23add-code-to-handle-an-access-token&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Consent dialog for getting access token

The user needs to consent to the permissions requested by the bot app to get the access token. The consent dialog appears based on the scope of the app.

### In one-on-one chats

When the app user is using the application for the first time and user consent is required, the following dialog box appears:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-consent-in-personal-scope-infographics.png" alt-text="consent dialog for bot SSO in personal scope" border="false":::

When the user selects **Continue**, one of the following events occurs:

- If the bot UI has a sign-in button, the sign-in flow for bots is activated. You can determine the permissions that require app user's consent. Use this approach if your app requires Graph permissions other than `openid`.

- If the bot doesn't have a sign-in button on the OAuth card, app user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the app user's email address.

The consent dialog that appears is for open-id scopes defined in Microsoft Entra ID. The app user must give consent only once. After consenting, the app user can access and use your bot app for the granted permissions and scopes.

### In group chats

When a bot is added to a group chat for the first time and consent is required for a particular user, a consent dialog box appears only to the user who @mentions the bot.

# [Desktop](#tab/desktop)

- The user selects **Add**, an adaptive card appears to the user to request consent for permissions.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/user-mentions-bot-desktop.png" alt-text="consent dialog box for desktop" border="false":::

- If the user selects **Add**, a permissions dialog box appears to the user.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/permissions-requested-desktop.png" alt-text="permissions dialog box" border="false":::

  The user must select **Accept** to give consent.

- If the user declines, or the request times out, the user has to @mention bot again to grant permission for token acquisition. The group sees a public message that the action was not completed.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/request-times-out-desktop.png" alt-text="consent denied or request times out" lightbox="../../../assets/images/authentication/teams-sso-bots/request-times-out-desktop.png" border="false":::
  
# [Mobile](#tab/mobile)

- The user selects **Add**, an adaptive card appears to the user to request consent for permissions.
  
  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/user-mentions-bot-mobile.png" alt-text="user mentions bot on mobile" border="false":::

- If the user selects **Add**, a permissions dialog box appears to the user.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/permissions-requested-mobile.png" alt-text="permissions requested on mobile" border="false":::

  The user must select **Accept** to give consent.

- If the user declines, or the request times out, the user has to @mention bot again to grant permission for token acquisition. The group sees a public message that the action was not completed.

  :::image type="content" source="../../../assets/images/authentication/teams-sso-bots/request-times-out-mobile.png" alt-text="consent denied or request times out mobile":::

---
> [!NOTE]
> After the app user consents, they're not required to consent again for any other permissions. If the permissions defined in Microsoft Entra scope are modified, then the app user might need to consent again. If, however, the consent prompt fails to let the app user access, the bot app falls back to sign-in card.

> [!IMPORTANT]
> Scenarios where consent dialogs aren't needed:
>
> - If the admin has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.
> - If your Microsoft Entra app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Microsoft Entra app is registered in a different tenant.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](../../../tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Add code to receive the token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name, sign in/tokenExchange, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

Use the following code snippet to invoke response:

# [C#](#tab/cs3)

```csharp
public MainDialog(IConfiguration configuration, ILogger<MainDialog> logger)
            : base(nameof(MainDialog), configuration["ConnectionName"])
        {
            AddDialog(new OAuthPrompt(
                nameof(OAuthPrompt),
                new OAuthPromptSettings
                {
                    ConnectionName = ConnectionName,
                    Text = "Please Sign In",
                    Title = "Sign In",
                    Timeout = 300000, // User has 5 minutes to login (1000 * 60 * 5)
                    EndOnInvalidMessage = true
                }));

            AddDialog(new ConfirmPrompt(nameof(ConfirmPrompt)));

            AddDialog(new WaterfallDialog(nameof(WaterfallDialog), new WaterfallStep[]
            {
                PromptStepAsync,
                LoginStepAsync,
            }));

            // The initial child Dialog to run.
            InitialDialogId = nameof(WaterfallDialog);
        }


private async Task<DialogTurnResult> PromptStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            return await stepContext.BeginDialogAsync(nameof(OAuthPrompt), null, cancellationToken);
        }

private async Task<DialogTurnResult> LoginStepAsync(WaterfallStepContext stepContext, CancellationToken cancellationToken)
        {
            
            var tokenResponse = (TokenResponse)stepContext.Result;
            if (tokenResponse?.Token != null)
            {
                var token = tokenResponse.Token;

                // On successful login, the token contains sign in token.
            }
            else 
            {
                await stepContext.Context.SendActivityAsync(MessageFactory.Text("Login was not successful please try again."), cancellationToken);
            }            

            return await stepContext.EndDialogAsync(cancellationToken: cancellationToken);
        }
```

# [JavaScript](#tab/js3)

```JavaScript
class MainDialog {
  
        this.addDialog(new OAuthPrompt(OAUTH_PROMPT, {
                    connectionName: process.env.connectionName,
                    text: 'Please Sign In',
                    title: 'Sign In',
                    timeout: 300000
                }));

        this.addDialog(new ConfirmPrompt(CONFIRM_PROMPT));

        this.addDialog(new WaterfallDialog(MAIN_WATERFALL_DIALOG, [
                    this.promptStep.bind(this),
                    this.loginStep.bind(this),
                ]));

        this.initialDialogId = MAIN_WATERFALL_DIALOG;

    }

async promptStep(stepContext) {
        try {
            return await stepContext.beginDialog(OAUTH_PROMPT);
        } catch (err) {
            console.error(err);
        }
    }

async loginStep(stepContext) {
        // Get the token from the previous step. Note that we could also have gotten the
        // token directly from the prompt itself. There is an example of this in the next method.
        const tokenResponse = stepContext.result;
        if (!tokenResponse || !tokenResponse.token) {
            await stepContext.context.sendActivity('Login was not successful please try again.');
        } else {
            const token = tokenResponse.token;
            // On successful login, the token contains sign in token.
        }
        return await stepContext.endDialog();
    }
```

---

> [!NOTE]
> The code snippets use the Waterfall Dialog. For more information, see [About component and waterfall dialogs](/azure/bot-service/bot-builder-concept-waterfall-dialogs?view=azure-bot-service-4.0&preserve-view=true).

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+receive+the+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dbot-app%23add-code-to-receive-the-token&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Validate the access token

Web APIs on your server must decode the access token and verify if it's sent from the client.

> [!NOTE]
> If you use Bot Framework, it handles the access token validation. If you don't use Bot Framework, follow the guidelines given in this section.

For more information about validating access token, see [Validate tokens](/azure/active-directory/develop/access-tokens#validate-tokens).

There are many libraries available that can handle JWT validation. Basic validation includes:

- Checking that the token is well-formed.
- Checking that the token was issued by the intended authority.
- Checking that the token is targeted to the web API.
Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by Microsoft Entra ID. The `iss` claim in the token must start with this value.
- The token's `aud1` parameter is set to the app ID generated during Microsoft Entra app registration.
- The token's `scp` parameter is set to `access_as_user`.

### Example access token

The following code snippet is a typical decoded payload of an access token:

```javascript
{
    aud: "2c3caa80-93f9-425e-8b85-0745f50c0d24",
    iss: "https://login.microsoftonline.com/fec4f964-8bc9-4fac-b972-1c1da35adbcd/v2.0",
    iat: 1521143967,
    nbf: 1521143967,
    exp: 1521147867,
    aio: "ATQAy/8GAAAA0agfnU4DTJUlEqGLisMtBk5q6z+6DB+sgiRjB/Ni73q83y0B86yBHU/WFJnlMQJ8",
    azp: "e4590ed6-62b3-5102-beff-bad2292ab01c",
    azpacr: "0",
    e_exp: 262800,
    name: "Mila Nikolova",
    oid: "6467882c-fdfd-4354-a1ed-4e13f064be25",
    preferred_username: "milan@contoso.com",
    scp: "access_as_user",
    sub: "XkjgWjdmaZ-_xDmhgN1BMP2vL2YOfeVxfPT_o8GRWaw",
    tid: "fec4f964-8bc9-4fac-b972-1c1da35adbcd",
    uti: "MICAQyhrH02ov54bCtIDAA",
    ver: "2.0"
}
```

## Handle app user sign out

Use the following code snippet to handle the access token in case the app user signs out:

# [C#](#tab/cs4)

```csharp
    private async Task<DialogTurnResult> InterruptAsync(DialogContext innerDc, 
    CancellationToken cancellationToken = default(CancellationToken))
        {
            if (innerDc.Context.Activity.Type == ActivityTypes.Message)
            {
                var text = innerDc.Context.Activity.Text.ToLowerInvariant();

                // Allow logout anywhere in the command.
                if (text.IndexOf("logout") >= 0)
                {
                    // The UserTokenClient encapsulates the authentication processes.
                    var userTokenClient = innerDc.Context.TurnState.Get<UserTokenClient>();
                    await userTokenClient.SignOutUserAsync(
                    innerDc.Context.Activity.From.Id, 
                    ConnectionName, 
                    innerDc.Context.Activity.ChannelId, 
                    cancellationToken
                    ).ConfigureAwait(false);

                    await innerDc.Context.SendActivityAsync(MessageFactory.Text("You have been signed out."), cancellationToken);
                    return await innerDc.CancelAllDialogsAsync(cancellationToken);
                }
            }

            return null;
        }
```

# [JavaScript](#tab/js4)

```JavaScript
    async interrupt(innerDc) {
        if (innerDc.context.activity.type === ActivityTypes.Message) {
            const text = innerDc.context.activity.text.toLowerCase();
            if (text === 'logout') {
                const userTokenClient = innerDc.context.turnState.get(innerDc.context.adapter.UserTokenClientKey);

                const { activity } = innerDc.context;
                await userTokenClient.signOutUser(activity.from.id, this.connectionName, activity.channelId);

                await innerDc.context.sendActivity('You have been signed out.');
                return await innerDc.cancelAllDialogs();
            }
        }
    }
```

---

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Handle+app+user+sign+out&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dmex-app%23handle-app-user-sign-out&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

## Code sample

| **Sample name** | **Description** | **C#** | **Node.js** |
| --- | --- | --- | --- |
| Bot conversation SSO quick start | Quickly set up Teams bot with SSO for seamless user authentication. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/csharp_dotnetcore/BotConversationSsoQuickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)  |

::: zone-end

::: zone pivot="mex-app"

[!INCLUDE [msgex-sso-code](../../../includes/messaging-extensions/msgex-sso-code.md)]

::: zone-end

## Next step

> [!div class="nextstepaction"]
> [Update manifest for SSO and preview app](bot-sso-manifest.md)
