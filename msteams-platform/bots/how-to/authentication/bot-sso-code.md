---
title: Code configuration for enabling SSO for bots
description: Describes code configuration for enabling SSO for bots.
ms.topic: how-to
ms.localizationpriority: high
zone_pivot_groups: enable-sso
---
# Add code to enable SSO in your bot app

Before you add code to enable SSO, ensure that you've configured your app and bot resource in Azure AD portal.

> [!div class="nextstepaction"]
> [Configure bot app in Azure AD](bot-sso-register-aad.md)

You need to configure your app's code to obtain an access token from Azure AD. The access token is issued on behalf of the bot app.

> [!NOTE]
> If you've built your Teams app using Microsoft Teams Toolkit, you can enable SSO for your app using the instructions in the Tools and SDKs module. For more information, see [Add single sign-on to Teams app](../../../toolkit/add-single-sign-on.md). Teams Toolkit supports SSO for JavaScript and TypeScript apps in Visual Studio Code, and in Teams Toolkit 17.4 preview 3 for C# apps.

::: zone pivot="bot-app"

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Add code to handle an access token](#add-code-to-handle-an-access-token)
1. [Add code to receive the token](#add-code-to-receive-the-token)
1. [Handle app user log out](#handle-app-user-log-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Azure AD. You must configure the code with these values.

To update the development environment variables:

1. Open the bot app project.
1. Open the environment file for your project.
1. Update the following variables:

    - For `MicrosoftAppId`, update the bot ID from Azure AD.
    - For `MicrosoftAppPassword`, update the client secret.
    - For `ConnectionName`, update the name of the OAuth connection you configured in Azure AD.
    - For `MicrosoftAppTenantId`, update the tenant ID.

1. Save the file.

You've now configured the required environment variables for your bot app and SSO. Next, add the code for handling bot tokens.

## Add code to handle an access token

The request to get the token is a POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true). Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

>[!NOTE]
> The Microsoft Bot Framework `OAuthPrompt` or the `MultiProviderAuthDialog` is supported for SSO authentication.

To update your app's code:

1. Add code snippet for `TeamsSSOTokenExchangeMiddleware`.

   # [csharp](#tab/cs1)

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

    >[!NOTE]
    > You might receive multiple responses for a given request if the user has multiple active endpoints. You must eliminate all duplicate or redundant responses with the token. For more information about signin/tokenExchange, see [TeamsSSOTokenExchangeMiddleware Class](/python/api/botbuilder-core/botbuilder.core.teams.teams_sso_token_exchange_middleware.teamsssotokenexchangemiddleware?view=botbuilder-py-latest#remarks&preserve-view=true).

1. Use the following code snippet for requesting a token.

   # [csharp](#tab/cs2)

    After you add the `AdapterWithErrorHandler.cs`, your code should be as shown below:

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
                // NOTE: In production environment, you should consider logging this to
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
                        // bot from getting stuck in a error-loop caused by being in a bad state.
                        // conversationState should be thought of as similar to "cookie-state" in a Web pages.
                        await conversationState.DeleteAsync(turnContext);
                    }
                    catch (Exception e)
                    {
                        logger.LogError(e, $"Exception caught on attempting to Delete ConversationState : {e.Message}");
                    }
                }

                // Send a trace activity, which will be displayed in the Bot Framework Emulator.
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

    After you add the code snippet for `TeamsSSOTokenExchangeMiddleware`, your code should be as shown below:

    ```JavaScript
    // index.js is used to setup and configure your bot.

    // Import required packages
    const path = require('path');
        
    // Read botFilePath and botFileSecret from .env file.
    const ENV_FILE = path.join(__dirname, '.env');
    require('dotenv').config({ path: ENV_FILE });
        
    const restify = require('restify');
        
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
        // NOTE: In production environment, you should consider logging this to Azure
        //       application insights. See https://learn.microsoft.com/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp for telemetry
        //       configuration instructions.
        console.error(`\n [onTurnError] unhandled error: ${ error }`);
    
        // Send a trace activity, which will be displayed in Bot Framework Emulator.
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
    
    // Create HTTP server.
    const server = restify.createServer();
    server.use(restify.plugins.bodyParser());
        
    server.listen(process.env.port || process.env.PORT || 3978, function() {
        console.log(`\n${ server.name } listening to ${ server.url }`);
        console.log('\nGet Bot Framework Emulator: https://aka.ms/botframework-emulator');
        console.log('\nTo talk to your bot, open the emulator select "Open Bot"');
    });
        
    // Listen for incoming requests.
    server.post('/api/messages', async (req, res) => {
        // Route received a request to adapter for processing.
        await adapter.process(req, res, (context) => bot.run(context));
    });
    ```

---

### Consent dialog for getting access token

If the app user is using the application for the first time and user consent is required, the following dialog box appears:

:::image type="content" source="../../../assets/images/authentication/teams-sso-bots/bot-consent.png" alt-text="Consent dialog for bot SSO" border="false":::

When the user selects **Continue**, one of the following events occurs:

- If the bot UI has a sign-in button, the sign-in flow for bots is activated. You can determine the permissions that require app user's consent. Use this approach if your app requires Graph permissions other than `openid`.

- If the bot doesn't have a sign-in button on the OAuth card, app user consent is required for a minimal set of permissions. This token is useful for basic authentication and to get the app user's email address.

The consent dialog that appears is for open-id scopes defined in Azure AD. The app user must give consent only once. After consenting, the app user can access and use your bot app for the granted permissions and scopes.

> [!NOTE]
> After the app user consents, they're not required to consent again for any other permissions. If the permissions defined in Azure AD scope are modified, then the app user may need to consent again. If, however, the consent prompt fails to let the app user access, the bot app falls back to sign-in card.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the tenant administrator has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.
> - If your Azure AD app is registered in the same tenant from which you're requesting an authentication in Teams, the app user can't be asked to consent, and is granted an access token right away. App users consent to these permissions only if the Azure AD app is registered in a different tenant.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](../../../tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Add code to receive the token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name, sign in/tokenExchange, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

Use the following code snippet to invoke response:

# [csharp](#tab/cs3)

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

### Validate the access token

Web APIs on your server must decode the access token and verify if it's sent from the client.

> [!NOTE]
> If you use Bot Framework, it handles the access token validation. If you don't use Bot Framework, follow the guidelines given in this section.

For more information about validating access token, see [Validate tokens](/azure/active-directory/develop/access-tokens#validate-tokens).

There are a number of libraries available that can handle JWT validation. Basic validation includes:

- Checking that the token is well-formed.
- Checking that the token was issued by the intended authority.
- Checking that the token is targeted to the web API.

Keep in mind the following guidelines when validating the token:

- Valid SSO tokens are issued by Azure AD. The `iss` claim in the token should start with this value.
- The token's `aud1` parameter will be set to the app ID generated during Azure AD app registration.
- The token's `scp` parameter will be set to `access_as_user`.

#### Example access token

The following is a typical decoded payload of an access token.

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

## Handle app user log out

Use the following code snippet to handle the access token in case the app user logs out:

# [csharp](#tab/cs4)

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

## Code sample

| **Sample name** | **Description** | **C#** | **JavaScript** | **Node.js** |
| --- | --- | --- | --- | --- |
| Bot framework SDK | This sample code demonstrates how to get started with authentication in a bot for Microsoft Teams. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/csharp_dotnetcore/BotConversationSsoQuickstart) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js)  | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js) |

::: zone-end

::: zone pivot="mex-app"

[!INCLUDE [msgex-sso-code](../../../includes/messaging-extensions/msgex-sso-code.md)]

::: zone-end

## Next step

> [!div class="nextstepaction"]
> [Update manifest for SSO and preview app](bot-sso-manifest.md)
