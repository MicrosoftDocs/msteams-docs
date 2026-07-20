The Teams SDK handles the SSO token exchange and OAuth flow automatically. You configure an OAuth connection name on the `App` object, then call `signin()` inside your message extension handlers. The SDK manages the underlying `signin/verifyState` and `signin/tokenExchange` invoke activities for you.

This section covers:

1. [Update development environment variables](#update-development-environment-variables)
1. [Configure the OAuth connection](#configure-the-oauth-connection)
1. [Implement message extension handlers with authentication](#implement-message-extension-handlers-with-authentication)
1. [Handle sign-in events and failures](#handle-sign-in-events-and-failures)
1. [Handle sign out](#handle-sign-out)

## Update development environment variables

You've configured client secret and OAuth connection setting for the app in Microsoft Entra ID. You must configure your app code with these variables.

To update the development environment variables:

1. Open the app project.
1. Open the configuration file for your project.
1. Update the environment variables as shown in the following tabs.
1. Save the file.

# [C#](#tab/cs1)

Update `appsettings.json` (or use environment variables in `launchSettings.json`):

- `Teams:ClientID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `Teams:ClientSecret` &ndash; The client secret you created.
- `Teams:TenantId` &ndash; Your Directory (tenant) ID.
- `Teams:ConnectionName` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

# [TypeScript](#tab/ts1)

Update the `.env` file:

- `CLIENT_ID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `CLIENT_SECRET` &ndash; The client secret you created.
- `TENANT_ID` &ndash; Your Directory (tenant) ID.
- `CONNECTION_NAME` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

# [Python](#tab/py1)

Update the `.env` file:

- `CLIENT_ID` &ndash; The Application (client) ID from your Microsoft Entra app registration.
- `CLIENT_SECRET` &ndash; The client secret you created.
- `TENANT_ID` &ndash; Your Directory (tenant) ID.
- `CONNECTION_NAME` &ndash; The name of the OAuth connection you configured in Azure Bot Service.

---

You've now configured the required environment variables for your message extension app and SSO. Next, configure the OAuth connection in your app code.

## Configure the OAuth connection

The Teams SDK provides built-in OAuth support. You configure the OAuth connection name when creating the `App` object, and the SDK automatically handles token exchange and SSO for all handler routes.

# [C#](#tab/cs2)

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
                   // Azure Application Insights. Visit https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-telemetry?view=azure-bot-service-4.0&tabs=csharp to see how
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
                           // ConversationState must be thought of as similar to "cookie-state" in a Web pages.
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

    After you add the code to `index.js`, the following code must appear:

   ```JavaScript
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
       // See https://learn.microsoft.com/en-us/azure/bot-service/bot-builder-howto-v4-state?view=azure-bot-service-4.0&branch=live&tabs=csharp to learn more about using MemoryStorage.
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
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+request+a+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)

### Consent dialog for getting access token

If the app user is using your app for the first time, they're required to consent for SSO authentication.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-profile-select.png" alt-text="SSO authentication for message extension app":::

When the app user selects the user name, the permission is granted and they can use the app.

:::image type="content" source="~/assets/images/authentication/teams-sso-mex/me-sso-completed.png" alt-text="SSO authentication completed for message extension app":::

The consent dialog that appears is for open-id scopes defined in Microsoft Entra ID. The app user must give consent only once. After consenting, the app user can access and use your message extension app for the granted permissions and scopes.

> [!IMPORTANT]
> Scenarios where consent dialogs are not needed:
>
> - If the admin has granted consent on behalf of the tenant, app users don't need to be prompted for consent at all. This means that the app users don't see the consent dialogs and can access the app seamlessly.

If you encounter any errors, see [Troubleshoot SSO authentication in Teams](~/tabs/how-to/authentication/tab-sso-troubleshooting.md).

## Implement message extension handlers with authentication

With the Teams SDK, you implement message extension handlers using event-driven patterns. The SDK provides the auth context (such as `signin`, `isSignedIn`, and `userGraph`) directly in the handler, so there's no need for manual token exchange or middleware.

### Search command handler

The following code shows how to handle a search query in a message extension, with SSO authentication to access Microsoft Graph on behalf of the user:

# [C#](#tab/cs3)

In C#, register an inline handler on the `teams` pipeline using `teams.OnQuery(...)`. The context provides the activity and cancellation token:

```csharp
using Microsoft.Teams.Api.MessageExtensions;
using Microsoft.Teams.Cards;
using Microsoft.Teams.Api.Cards;

// ...

teams.OnQuery(async (ctx) =>
{
    var commandId = ctx.Activity.Value.CommandId;
    var query = ctx.Activity.Value.Parameters?
        .FirstOrDefault()?.Value?.ToString() ?? "";

    Console.WriteLine($"Query: command={commandId}, query={query}");

    if (commandId == "searchQuery")
    {
        return CreateSearchResults(query);
    }

    return new Response
    {
        ComposeExtension = new Result
        {
            Type = ResultType.Result,
            AttachmentLayout = Microsoft.Teams.Api.Attachment.Layout.List,
            Attachments = new List<Microsoft.Teams.Api.MessageExtensions.Attachment>()
        }
    };
});
```

# [TypeScript](#tab/ts3)

```typescript
import { cardAttachment } from '@microsoft/teams.api';
import { App } from '@microsoft/teams.apps';
import { AdaptiveCard, TextBlock } from '@microsoft/teams.cards';

app.on('message.ext.query', async ({ activity, signin, isSignedIn }) => {
  // Trigger sign-in if user is not authenticated
  if (!isSignedIn) {
    await signin();
    return { status: 200 };
  }

  const { commandId } = activity.value;
  const searchQuery = activity.value.parameters?.[0]?.value ?? '';

  if (commandId === 'searchQuery') {
    const cards = await createSearchResults(searchQuery);
    const attachments = cards.map(({ card, thumbnail }) => ({
      ...cardAttachment('adaptive', card),
      preview: cardAttachment('thumbnail', thumbnail),
    }));

    return {
      composeExtension: {
        type: 'result',
        attachmentLayout: 'list',
        attachments,
      },
    };
  }

  return { status: 400 };
});
```

# [Python](#tab/py3)

```python
from microsoft_teams.api import (
    AdaptiveCardAttachment,
    MessageExtensionQueryInvokeActivity,
    ThumbnailCardAttachment,
    card_attachment,
    AttachmentLayout,
    MessagingExtensionAttachment,
    MessagingExtensionInvokeResponse,
    MessagingExtensionResult,
    MessagingExtensionResultType,
    InvokeResponse,
)
from microsoft_teams.apps import ActivityContext

@app.on_message_ext_query
async def handle_message_ext_query(
    ctx: ActivityContext[MessageExtensionQueryInvokeActivity],
):
    # Trigger sign-in if user is not authenticated
    if not ctx.is_signed_in:
        await ctx.sign_in()
        return InvokeResponse[MessagingExtensionInvokeResponse](status=200)

    command_id = ctx.activity.value.command_id
    search_query = ""
    if ctx.activity.value.parameters and len(ctx.activity.value.parameters) > 0:
        search_query = ctx.activity.value.parameters[0].value or ""

    if command_id == "searchQuery":
        cards = await create_search_results(search_query)
        attachments = []
        for card_data in cards:
            main = card_attachment(AdaptiveCardAttachment(content=card_data["card"]))
            preview = card_attachment(ThumbnailCardAttachment(content=card_data["thumbnail"]))
            attachments.append(
                MessagingExtensionAttachment(
                    content_type=main.content_type, content=main.content, preview=preview
                )
            )

        result = MessagingExtensionResult(
            type=MessagingExtensionResultType.RESULT,
            attachment_layout=AttachmentLayout.LIST,
            attachments=attachments,
        )
        return MessagingExtensionInvokeResponse(compose_extension=result)

    return InvokeResponse[MessagingExtensionInvokeResponse](status=400)
```

---

> [!NOTE]
> The code snippets use the Waterfall Dialog bot. For more information about Waterfall Dialog, see [About component and waterfall dialogs](/azure/bot-service/bot-builder-concept-waterfall-dialogs?view=azure-bot-service-4.0&preserve-view=true).

You receive the token in `OnTeamsMessagingExtensionQueryAsync` handler in the `turnContext.Activity.Value` payload or in the `OnTeamsAppBasedLinkQueryAsync`, depending on which scenario you're enabling SSO for.

```json
JObject valueObject=JObject.FromObject(turnContext.Activity.Value);
if(valueObject["authentication"] !=null)
 {
    JObject authenticationObject=JObject.FromObject(valueObject["authentication"]);
    if(authenticationObject["token"] !=null)
 }
```

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Add+code+to+receive+the+token&&author=%40surbhigupta&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code%3Ftabs%3Dcs1%252Ccs2%252Ccs3%252Ccs4%252Ccs5%26pivots%3Dmex-app%23add-code-to-receive-the-token&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Fbots%2Fhow-to%2Fauthentication%2Fbot-sso-code.md&documentVersionIndependentId=039ff5cc-7243-ce4b-527e-c152755eeb72&platformId=915789b2-9617-01bb-fb21-d6789a634ed8&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B%2A%2Amsteams%2A%2A)
>
### Validate the access token

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

#### Example access token

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
teams.OnSignInFailure(async (_, @event) =>
{
    Console.WriteLine($"Sign-in failed: {@event.Error.Code} - {@event.Error.Message}");
    await @event.Context.Send("Sign-in failed.");
});
```

# [TypeScript](#tab/ts6)

```typescript
app.on('signin.failure', async ({ activity, send }) => {
  const { code, message } = activity.value;
  console.log(`Sign-in failed: ${code} - ${message}`);
  await send('Sign-in failed.');
});
```

# [Python](#tab/py6)

```python
@app.on_signin_failure()
async def handle_signin_failure(ctx):
    failure = ctx.activity.value
    print(f"Sign-in failed: {failure.code} - {failure.message}")
    await ctx.send("Sign-in failed.")
```

---

## Handle sign out

Use the following code to sign out the user and clear the token from the User Token Service cache:

# [C#](#tab/cs7)

```csharp
teams.OnMessage("signout", async context =>
{
    if (!context.IsSignedIn)
    {
        await context.Send("You are not signed in.");
        return;
    }

    await context.SignOut();
    await context.Send("You have been signed out.");
});
```

# [TypeScript](#tab/ts7)

```typescript
app.message('/signout', async ({ send, signout, isSignedIn }) => {
  if (!isSignedIn) {
    await send('You are not signed in.');
    return;
  }

  await signout();
  await send('You have been signed out.');
});
```

# [Python](#tab/py7)

```python
from microsoft_teams.api import MessageActivity
from microsoft_teams.apps import ActivityContext

@app.on_message_pattern("signout")
async def handle_signout(ctx: ActivityContext[MessageActivity]):
    if not ctx.is_signed_in:
        await ctx.send("You are not signed in.")
        return

    await ctx.sign_out()
    await ctx.send("You have been signed out.")
```

---

## Code sample

This section provides bot authentication v3 SDK sample.

| **Sample name** | **Description** | **.NET** | **Node.js** | **Python** | **Manifest** |
|---------------|------------|------------|-------------|---------------|---------------|
| Bot authentication | This sample app demonstrate how an Bot can use Teams authentication. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-teams-authentication/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/bot-conversation-sso-quickstart/js) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-teams-authentication/python) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/bot-teams-authentication/csharp/demo-manifest/bot-teams-authentication.zip)|
| Tab, bot, and Message extension (ME) SSO | This sample app demonstrates Teams SSO integration for Tab, Bot, and Messaging Extension, using C# and Microsoft Entra ID for secure authentication. |  [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/app-sso/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/app-sso/nodejs) | NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsJS/app-sso/csharp/demo-manifest/App-SSO.zip)|
|Tab, bot, and Message extension | This sample showcases Microsoft Entra ID and Facebook authentication across bots, tabs, and messaging extensions in Microsoft Teams. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/app-complete-auth/csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/app-complete-auth/nodejs) | NA |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/TeamsSDK/Archived/app-complete-auth/csharp/demo-manifest/App-Complete-Auth.zip)|
