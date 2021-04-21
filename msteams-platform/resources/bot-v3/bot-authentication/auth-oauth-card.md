---
title: Using Azure Bot Service for Authentication in Teams
description: Describes the Azure Bot Service OAuthCard and how it is used for authentication
ms.topic: conceptual
keywords: teams authentication OAuthCard OAuth card Azure Bot Service
---
# Using Azure Bot Service for Authentication in Teams

[!include[v3-to-v4-SDK-pointer](~/includes/v3-to-v4-pointer-bots.md)]

Without the Azure Bot Service’s OAuthCard it is complicated to implement authentication in a bot. It is a full-stack challenge that involving building a web experience, integrating with external OAuth providers, token management, and handling the right server-to-server API calls to complete authentication flow securely. This can result in clunky experiences requiring the entry of “magic numbers”.

With Azure Bot Service’s OAuthCard, it is easier for your Teams bot to sign in your users and access external data providers. Whether you’ve already implemented auth and you want to switch over to something simpler, or if you are looking to add authentication to your bot service for the first time, the OAuthCard can make it easier.

Other topics in [Authentication](~/resources/bot-v3/bot-authentication/auth-flow-bot.md) describe authentication without using the OAuthCard, so if you want to understand authentication in Teams more deeply, or have a situation where you can not use the OAuthCard, you can still refer to those topics.

## Support for the OAuthCard

There are currently some restrictions to where you can use the OAuthCard. These include:

* The card will not work with [guest access](/MicrosoftTeams/guest-access)
* It will not work with [Microsoft Teams free](https://products.office.com/microsoft-teams/free)
* It can only be used for bot authentication
* It only works for bots registered in the [Azure Bot Service](https://azure.microsoft.com/services/bot-service/)

## How does the Azure Bot Service help me do authentication?

Full documentation using the OAuthCard is available in the topic: [Add authentication to your bot via Azure Bot Service](/azure/bot-service/bot-builder-tutorial-authentication?view=azure-bot-service-3.0&preserve-view=true). Note that this topic is in the Azure Bot Framework documentation set, and is not specific to Teams.

The following sections tell how to use the OAuthCard in Teams.

## Main benefits for Teams developers

The OAuthCard helps with authentication in the following ways:

* Provides an out-of-box web-based authentication flow: you no longer have to write and host a web page to direct to external login experiences or provide a redirect.
* Is seamless for end users: complete the full sign in experience right within Teams.
* Includes easy token management: you no longer have to implement a token storage system – instead, the Bot Service takes care of token caching and provides a secure mechanism for fetching those tokens.
* Is supported by complete SDKs: easy to integrate and consume from your bot service.
* Has out-of-box support for many popular OAuth providers, such as Azure AD/MSA, Facebook, and Google.

## When should I implement my own solution?

Because access tokens are sensitive information, you may not wish to have them stored in an external service. In this case, you may choose to still implement your own token management system and login experience within Teams, as described in the rest of the Teams [Authentication](~/resources/bot-v3/bot-authentication/auth-flow-bot.md) topics.

## Getting started with OAuthCard in Teams

> [!NOTE]
> This guide is using the Bot Framework v3 SDK. You can find the v4 implementation [here](/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp&preserve-view=true). You will still need to create a manifest and include token.botframework.com in the `validDomains` section, because otherwise the Sign in button will not open the authentication window. Use the [App Studio](~/concepts/build-and-test/app-studio-overview.md) to generate your manifest.

You’ll first need to configure your Azure bot service to set up external authentication providers. Read [Configuring identity providers](~/concepts/authentication/configure-identity-provider.md) for detailed steps.

To enable authentication using the Azure Bot Service, you need to make these additions to your code:

1. Include token.botframework.com in the `validDomains` section of your app manifest because Teams will embed the Bot Service’s login page.
2. Fetch the token from the Bot Service whenever your bot needs to access authenticated resources. If no token is available, send a message with an OAuthCard to the user requesting them to log into the external service.
3. Handle the login completion activity. This ensures that the authentication request and the token are associated with the user currently interacting with your bot.
4. Retrieve the token whenever your bot needs to perform authenticated actions, such as calling external REST APIs.

In your dialog code, you’ll need to add this snippet (C#), which checks for an existing access token:

```CSharp
// First ask Bot Service if it already has a token for this user
var token = await context.GetUserTokenAsync(ConnectionName).ConfigureAwait(false);
if (token != null)
{
    // use the token to do exciting things!
}
else
{
    // If Bot Service does not have a token, send an OAuth card to sign in 
    await SendOAuthCardAsync(context, (Activity)context.Activity);
}
```

If an access token doesn’t exist, your code will then send a message with an OAuthCard to the user:

```CSharp
private async Task SendOAuthCardAsync(IDialogContext context, Activity activity)
{
    await context.PostAsync($"To do this, you'll first need to sign in.");

    var reply = await context.Activity.CreateOAuthReplyAsync(_connectionName, _signInMessage, _buttonLabel).ConfigureAwait(false);
    await context.PostAsync(reply);

    context.Wait(WaitForToken);
}
```

To handle the login complete activity, you’ll need to process this Invoke:

```CSharp
if (activity.Name == "signin/verifyState")
{
  // We do this so that we can pass handling to the right logic in the dialog. You can
  // set this to be whatever string you want.
  activity.Text = "loginComplete";
  await Conversation.SendAsync(activity, () => new Dialogs.RootDialog());

  return Request.CreateResponse(HttpStatusCode.OK);
}
```

In your dialog code, you can then retrieve the token from the Bot authentication service:

```CSharp
if (text.Contains("loginComplete"))
  {
    // Handle login completion event.
    JObject ctx = activity.Value as JObject;

    if (ctx != null)
    {
      string code = ctx["state"].ToString();

      var oauthClient = activity.GetOAuthClient();
      var token = await oauthClient.OAuthApi.GetUserTokenAsync(activity.From.Id, ConnectionName, magicCode: code).ConfigureAwait(false);
      if (token != null)
      {
        // Make whatever API calls here you want
        await context.PostAsync($"Success! You are now signed in.");
      }
    }
  // Need to respond to the Invoke.
  return;
}
```

## Using OAuthCard with messaging extensions

You can also use Azure Bot Service to connect third-party providers to your messaging extension. The flow is the same as with a bot, except instead of returning an OAuthCard, your service will return a login prompt.

The following snippet (C#) illustrates how to craft the login response:

```CSharp
var token = await client.OAuthApi.GetUserTokenAsync(activity.From.Id, ConnectionName).ConfigureAwait(false);

if (token == null)
{
  // Send the login response with the auth link.
  string link = await client.OAuthApi.GetSignInLinkAsync(activity, ConnectionName);

  response = new ComposeExtensionResponse()
  {
    ComposeExtension = new ComposeExtensionResult()
  };
  response.ComposeExtension.Type = "auth";
  response.ComposeExtension.SuggestedActions = new ComposeExtensionSuggestedAction()
  {
    Actions = new List<CardAction>()
      {
        new CardAction(ActionTypes.OpenUrl, title: "Sign into this app", value: link)
      }
    };
  return response;
}
```

Note that in the example above you need to make the call to `GetSignInLinkAsync` directly against the `client.OAuthApi` property.

When the user successfully completes the login sequence, your service will receive another Invoke request containing the original user query, along with a state parameter string containing the “magic code”. You can now fetch the token using this string, along with the user ID and connection name.

```CSharp
var query = activity.GetComposeExtensionQueryData();
JObject data = activity.Value as JObject;

var client = activity.GetOAuthClient();

// Check if the request comes with login state
if (data != null && data["state"] != null)
{
  var token = await client.OAuthApi.GetUserTokenAsync(activity.From.Id, ConnectionName, data["state"].ToString());

  // Do stuff with the token here.

}
```
