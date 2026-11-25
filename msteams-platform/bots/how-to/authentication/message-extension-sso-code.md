---
title: Add code to enable SSO in a message extension
description: Learn how to configure code, request and receive an access token, and handle sign-out when enabling SSO in a Teams message extension.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 11/19/2026
---

# Enable SSO in your message extension app

Single sign-on (SSO) lets a bot-based message extension access resources on behalf of a Teams user using their Microsoft Entra identity. This article describes the Teams SDK configuration, message-extension handlers, and considerations for authentication.

> [!IMPORTANT]
> This article doesn't provide an end-to-end Teams SDK implementation of message-extension SSO. The sign-in and sign-out examples are for an optional conversational bot and don't authenticate a message-extension request. Verify the extension's authentication response, token exchange, and request handling in Teams before deploying your app.

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure your app code with these variables.

To update the development environment variables:

1. Open the app project.
1. Open the `./env` file for your project.
1. Update the following variables:

    - For `MicrosoftAppId`, update the Bot registration ID from Microsoft Entra ID.
    - For `MicrosoftAppPassword`, update the Bot registration client secret.
    - For `ConnectionName`, update the name of the OAuth connection you configured in Microsoft Entra ID.
    - For `MicrosoftAppTenantId`, update the tenant ID.

1. Save the file.

You've now configured the required environment variables for your bot app and SSO. Next, add the code for handling tokens.

## Add code to request a token

The request to get the token is a POST message request using the existing message schema. It's included in the attachments of an OAuthCard. The schema for the OAuthCard class is defined in [Microsoft Bot Schema 4.0](/dotnet/api/microsoft.bot.schema.oauthcard?view=botbuilder-dotnet-stable&preserve-view=true). Teams refreshes the token if the `TokenExchangeResource` property is populated on the card. For the Teams channel, only the `Id` property, which uniquely identifies a token request, is honored.

To update your app's code:

1. Add code snippet for `TeamsSSOTokenExchangeMiddleware`.

   # [C#](#tab/cs1)

    Add the following code snippet to `AdapterWithErrorHandler.cs` (or the equivalent class in your app's code):

    ```csharp
    base.Use(new TeamsSSOTokenExchangeMiddleware(storage, configuration["ConnectionName"]));
    ```

   # [JavaScript](#tab/js1)

    Add the following code snippet to `index.js` (or the equivalent class in your app's code):

    ```javascript
    const {TeamsSSOTokenExchangeMiddleware} = require('botbuilder');
    const tokenExchangeMiddleware = new TeamsSSOTokenExchangeMiddleware(memoryStorage, env.connectionName);
    adapter.use(tokenExchangeMiddleware);
    ```

    ---

    > [!NOTE]
    > The Teams SDK OAuth flow handles `signin/tokenExchange` requests and duplicate token exchanges. Configure shared state storage when running multiple application instances.

1. Use the following code snippet for requesting a token.

   # [C#](#tab/cs2)

   After you add the `AdapterWithErrorHandler.cs`, the following code must appear:

   ```csharp
    using Microsoft.Teams.Apps;
    using Microsoft.Teams.Apps.OAuth;
    
    var builder = WebApplication.CreateBuilder(args);
    
    var connectionName = builder.Configuration["ConnectionName"]
        ?? throw new InvalidOperationException("ConnectionName is required.");
    
    builder.Services.AddTeamsBotApplication(options =>
    {
        options.AddOAuthFlow(connectionName, oauth =>
        {
            oauth.OAuthCardText = "Sign in to your account";
            oauth.SignInButtonText = "Sign in";
        });
    });
    
    var app = builder.Build();
    var teams = app.UseTeamsBotApplication();
    var auth = teams.GetOAuthFlow(connectionName);
    
    // Register application handlers here, before app.Run().
    
    app.Run();
   ```

   # [JavaScript](#tab/js2)

   After you add the code to `index.js`, the following code must appear:

   ```javascript
   // index.js is used to setup and configure your bot.

   // Import required packages.
   const path = require('path');

   // Read botFilePath and botFileSecret from .env file.
   const ENV_FILE = path.join(__dirname, '.env');
   require('dotenv').config({ path: ENV_FILE });

   const express = require("express");

   // Import required bot services.
   // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about the different parts of a bot.
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
   // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0 to learn more about how bots work.
   const adapter = new CloudAdapter(botFrameworkAuthentication);
   const memoryStorage = new MemoryStorage();
   const tokenExchangeMiddleware = new TeamsSSOTokenExchangeMiddleware(memoryStorage, env.connectionName);

   adapter.use(tokenExchangeMiddleware);
   adapter.onTurnError = async (context, error) => {
       // This check writes out errors to console log .vs. app insights.
       // NOTE: In production environment, you must consider logging this to Azure application insights. See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp for telemetry configuration instructions.
       console.error(`\n [onTurnError] unhandled error: ${ error }`);

       // Send a trace activity, which will be displayed in the Bot Framework Emulator.
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
   // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-state?view=azure-bot-service-4.0&branch=live&tabs=csharp to learn more about using MemoryStorage.
   // A bot requires a state storage system to persist the dialog and user state between messages.
   // const memoryStorage = new MemoryStorage();

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

## Consent dialog for getting access token

If the app user is using your app for the first time, they're required to consent for SSO authentication.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-profile-select.png" alt-text="SSO authentication for message extension app":::

When the app user selects the user name, the permission is granted and they can use the app.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-completed.png" alt-text="SSO authentication completed for message extension app":::

The consent dialog that appears is for open-id scopes defined in Microsoft Entra ID. The app user must give consent only once. After consenting, the app user can access and use your message extension app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the admin has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](../../../tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Add code to receive the token

The response with the token is sent through an invoke activity with the same schema as other invoke activities that the bots receive today. The only difference is the invoke name, sign in/tokenExchange, and the **value** field. The **value** field contains the **Id**, a string of the initial request to get the token and the **token** field, a string value including the token.

Use the following code snippet example to invoke response:

# [C#](#tab/cs3)

```csharp
auth.OnSignInComplete(async (context, tokenResponse, cancellationToken) =>
{
    var accessToken = tokenResponse.Token;

    // Use accessToken to call the protected resource.
    await context.SendAsync(
        "You have signed in successfully.",
        cancellationToken);
});
```

# [JavaScript](#tab/js3)

```javascript
auth.onSignInComplete(async (context, tokenResponse) => {
  const accessToken = tokenResponse.token;

  // Use accessToken to call the protected resource.
  await context.send('You have signed in successfully.');
});
```

---

> [!NOTE]
> These examples use Teams SDK OAuth flows instead of dialog-based authentication. Handle successful sign-in with the flow’s completion callback. A cached token returned by the sign-in method is handled directly by the calling handler.

You receive the token in `OnTeamsMessagingExtensionQueryAsync` handler in the `turnContext.Activity.Value` payload or in the `OnTeamsAppBasedLinkQueryAsync`, depending on which scenario you're enabling SSO for.

```csharp
JObject valueObject = JObject.FromObject(turnContext.Activity.Value);
if (valueObject["authentication"] != null)
{
    JObject authenticationObject = JObject.FromObject(valueObject["authentication"]);
    if (authenticationObject["token"] != null)
    {
        // Process the token.
    }
}
```

## Validate the access token

Web APIs on your server must decode the access token and verify if it's sent from the client.

> [!NOTE]
> If you use Bot Framework, it handles the access token validation. If you don't use Bot Framework, follow the guidelines in this section.

For more information about validating access token, see [Validate tokens](/azure/active-directory/develop/access-tokens#validate-tokens).

There are a number of libraries available that can handle JWT validation. Basic validation includes:

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

## Add token to Bot Framework Token Store

If you're using the OAuth connection, you must update or add the token in the Bot Framework Token store. Add the following code snippet example to `TeamsMessagingExtensionsSearchAuthConfigBot.cs` (or the equivalent file in your app's code) for updating or adding the token in the store:

> [!NOTE]
> You can find the sample `TeamsMessagingExtensionsSearchAuthConfigBot.cs` in [Tab, Bot, and Message Extension (ME) SSO](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/app-sso/csharp/App%20SSO%20Sample/Bots).

# [C#](#tab/cs4)

```csharp
protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, CancellationToken cancellationToken)
{
    JObject valueObject = JObject.FromObject(turnContext.Activity.Value);
    if (valueObject["authentication"] != null)
    {
        JObject authenticationObject = JObject.FromObject(valueObject["authentication"]);
        if (authenticationObject["token"] != null)
        {
            // If the token is NOT exchangeable, then return 412 to require user consent.
            if (await TokenIsExchangeable(turnContext, cancellationToken))
            {
                return await base.OnInvokeActivityAsync(turnContext, cancellationToken).ConfigureAwait(false);
            }

            var response = new InvokeResponse();
            response.Status = 412;
            return response;
        }
    }

    return await base.OnInvokeActivityAsync(turnContext, cancellationToken).ConfigureAwait(false);
}

private async Task<bool> TokenIsExchangeable(ITurnContext turnContext, CancellationToken cancellationToken)
{
    TokenResponse tokenExchangeResponse = null;
    try
    {
        JObject valueObject = JObject.FromObject(turnContext.Activity.Value);
        var tokenExchangeRequest =
            ((JObject)valueObject["authentication"])?.ToObject<TokenExchangeInvokeRequest>();
        var userTokenClient = turnContext.TurnState.Get<UserTokenClient>();
        tokenExchangeResponse = await userTokenClient.ExchangeTokenAsync(
            turnContext.Activity.From.Id,
            _connectionName,
            turnContext.Activity.ChannelId,
            new TokenExchangeRequest
            {
                Token = tokenExchangeRequest.Token,
            },
            cancellationToken).ConfigureAwait(false);
    }
#pragma warning disable CA1031 // Do not catch general exception types (ignoring, see comment below)
    catch
#pragma warning restore CA1031 // Do not catch general exception types
    {
        // Ignore exceptions. If token exchange fails for any reason,
        // tokenExchangeResponse remains null and a failure invoke response is sent.
    }

    if (tokenExchangeResponse == null || string.IsNullOrEmpty(tokenExchangeResponse.Token))
    {
        return false;
    }

    return true;
}
```

# [JavaScript](#tab/js4)

```javascript
async onInvokeActivity(context) {
    console.log('onInvoke, ' + context.activity.name);
    const valueObj = context.activity.value;
    if (valueObj.authentication) {
        const authObj = valueObj.authentication;
        if (authObj.token) {
            // If the token is NOT exchangeable, then do NOT deduplicate requests.
            if (await this.tokenIsExchangeable(context)) {
                return await super.onInvokeActivity(context);
            } else {
                const response = {
                    status: 412
                };
                return response;
            }
        }
    }
    return await super.onInvokeActivity(context);
}

async tokenIsExchangeable(context) {
    let tokenExchangeResponse = null;
    try {
        const valueObj = context.activity.value;
        const tokenExchangeRequest = valueObj.authentication;
        tokenExchangeResponse = await context.adapter.exchangeToken(
            context,
            process.env.connectionName,
            context.activity.from.id,
            { token: tokenExchangeRequest.token }
        );
    } catch (err) {
        console.log('tokenExchange error: ' + err);
        // Ignore exceptions. If token exchange fails for any reason,
        // tokenExchangeResponse remains null and a failure invoke response is sent.
    }
    if (!tokenExchangeResponse || !tokenExchangeResponse.token) {
        return false;
    }
    return true;
}
```

---

## Handle app user log out

Use the following code snippet to handle the access token in case the app user logs out:

# [C#](#tab/cs5)

```csharp
private async Task<DialogTurnResult> InterruptAsync(
    DialogContext innerDc,
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
                cancellationToken).ConfigureAwait(false);

            await innerDc.Context.SendActivityAsync(
                MessageFactory.Text("You have been signed out."), cancellationToken);
            return await innerDc.CancelAllDialogsAsync(cancellationToken);
        }
    }

    return null;
}
```

# [JavaScript](#tab/js5)

```javascript
async interrupt(innerDc) {
    if (innerDc.context.activity.type === ActivityTypes.Message) {
        const text = innerDc.context.activity.text.toLowerCase();
        if (text === 'logout') {
            const userTokenClient = innerDc.context.turnState.get(
                innerDc.context.adapter.UserTokenClientKey
            );

            const { activity } = innerDc.context;
            await userTokenClient.signOutUser(
                activity.from.id,
                this.connectionName,
                activity.channelId
            );

            await innerDc.context.sendActivity('You have been signed out.');
            return await innerDc.cancelAllDialogs();
        }
    }
}
```

---


## Next step

> [!div class="nextstepaction"]
> [Update manifest for SSO and preview app](bot-sso-manifest.md)
