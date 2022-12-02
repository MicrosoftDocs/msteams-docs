---
title: Authentication flow in Adaptive Cards Universal Actions
description: In this module, learn about the authentication flow in Adaptive Cards universal actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Authentication flow in Adaptive Cards universal actions

Universal Actions for Adaptive Cards bring the bot as the common backend for handling actions and introduces a new action type, `Action.Execute`, which works across apps, such as Teams and Outlook.

> [!NOTE]
> Support for Universal Actions for Adaptive Cards schema version v1.4 is only available for cards sent by bot.

Universal Actions for Adaptive Cards
You can enable the following scenarios with `Action.Execute` on your Adaptive card for Universal action:

* [Universal Actions](Overview.md#universal-actions)
* [User Specific Views](Overview.md#user-specific-views)
* [Sequential Workflows](Overview.md#sequential-workflow-support)
* [Up to Date View](Overview.md#up-to-date-views)

To learn more about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

If you want to add User Specific Views in instances where an Adaptive Card with Universal Action is shared in the context of a group chat or a channel, the user may need to be authenticated.

In the past, users who were chatting one-on-one with the bot had to wait while you sent them a separate auth card to authenticate. In order to communicate with the bot, user needs to switch from the group chat or channel as a result it disturbs the flow.

## Authentication flow in Action.Execute protocol

Authentication flow for OAuth and SSO, within the `Action.Execute` protocol enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with login request in response to `Action.Execute` for:

1. Adaptive Cards sent by bot in a one on one chat, group chat or a channel.
1. Adaptive Cards sent by user via message extension app (backed by bot) in one on one chat, group chat or channel.
1. Adaptive cards present in compose or preview area while user is composing the message.
   * In compose area, refresh in Adaptive Card works and bot may want to use token to provide User Specific View to user before they send the card to the chat.

## Getting started with OAuth or nominal sign-on flow

Authentication steps for OAuth are similar to a bot or a tab in Teams.

To learn more about how to create an authentication-enabled bot, how to deploy the bot to Azure and associate it with an identity provider, and how to integrate the bot within Microsoft Teams, see [Add authentication to your Teams bot](../../../bots/how-to/authentication/add-authentication.md)

For a OAuth or nominal sign-on experience in which the user is presented with a sign-in button or link, the protocol is as follows:

1. An adaptiveCard/action Invoke request is sent to the bot.
1. The bot uses the Token Service protocol to check if there's already a cached token for the user specified in the activity.from.id field on the channel specified in the activity.channelId field for the bot and connection that is configured.
1. If there's a cached token, the bot can use this token. If there's not a token, the bot creates an OAuthCard and places it in the Response with the values:
   * Senders MUST include a value that adheres to the OAuthCard format.
   * Senders MUST include a connectionName. Receivers MAY ignore login requests with an empty or missing connectionName.
   * Senders MUST include either a button that has a non-empty buttons array.
1. Upon receiving this response, Teams client will show a **Sign-In** button in the card footer where user can select.

   :::image type="content" source="../../../assets/images/authentication/adaptive-card-universal-action/sign-in-button.png" alt-text="Screenshot shows the Sign-In button on the Adaptive card.":::

1. The user will select on the sign-in link, which will open a browser window to the configured connection"s identity provider"s sign-on page. The final redirect will land on a Token Service page offering an authorization code value.
1. Teams client will create and send the adaptiveCard/action Invoke Activity with name. The value will include the state field containing the authorization code:
   * Senders MUST include a state field.
1. The channel delivers this Invoke to the bot, which uses the authentication code to finalize retrieving the token with the Token Service. The Token Service delivers the user"s access token to the bot.

   * Receivers MAY ignore the adaptiveCard/action invoke or reply with an error if there's a missing or empty state field.

   If the value in the state field is incorrect, the bot can return an error to the client as follows:

   Clients can reprompt the user for the correct authorization code or can send a different `Action.Execute`.

1. If the authorization code in state is correct, the bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client (either a card or message).

## Getting started with SSO Flow

Authentication steps for SSO are similar to that of a bot or tab in Teams. It involves two steps:

1. [Register your app through the Azure AD portal](../../../bots/how-to/authentication/bot-sso-register-aad.md)
1. [Update your Teams application manifest for your bot](../../../bots/how-to/authentication/bot-sso-manifest.md)

> [!NOTE]
> To implement SSO flow, you must have personal scope declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in personal scope if it isn't already installed.

For a single sign-on experience in which the user is already signed into a client experience and the bot wants to perform token exchange for a different registered application or resource on the same identity provider, the protocol is as follows:

1. The channel sends an Invoke `Action.Execute` request to the bot.
1. The bot uses the Token Service protocol to check if there's already a cached token for the user specified in the activity.from.id field on the channel specified in the activity.channelId field for the bot and connection that is configured.
1. If there's a cached token, the bot can use this token. If there's not a token, the bot creates an OAuthCard and places it in an Invoke Response with the values below, which include a tokenExchangeResource:

```JSON
   {
  "statusCode": 401,
  "type": "application/vnd.microsoft.activity.loginRequest",
  "value": {
    "text": "Please sign-in",
    "connectionName": "<configured-connection-name>",
    "tokenExchangeResource": {
      "id": "<unique-indentifier>",
      "uri": "<application-or-resource-identifier>",
      "providerId": "<optional-provider-identifier>"
    },
    "buttons": [
      {
        "title": "Sign-In",
        "text": "Sign-In",
        "type": "signin",
        "value": "<sign-in-URL>"
      }
    ]
  }
}

```

* Senders MUST include a `tokenExchangeResource` to designate a single sign-on operation.

   > [!NOTE]
   > Teams client will trigger the nominal sing-on or OAuth flow when SSO fails. It is highly recommended that you provide sign in URL in the above response so that OAuth flow works.

1. This response is delivered through the channel to the client, which uses the tokenExchangeResource information and the client token to obtain an on-behalf-of token or exchangeable token from the identity provider:
   * Clients MAY ignore the tokenExchangeResource for any reason, including invalid values, errors retrieving exchangeable tokens, or not supporting the identity provider.
   * Clients that ignore the tokenExchangeResource SHOULD use the nominal sign-on flow.

1. The client resend the original `adaptiveCard/action` to the bot along with the token as follows:

   ```json
    {
        "type": "invoke",
        "name": "adaptiveCard/action"
        "value": {
            "action": {
                "id": "abc123",
                "type": "Action.Execute",
                "verb": "saveCommand",
                "data": {
                    "firstName": "Jeff",
                    "lastName": "Derstadt"
                }
            },
            "authentication": {
                "id": "8769-xyz",
                "connectionName": "oauthConnection",
                "token": "...single sign-on token..."
            }
        },
   ```

* Senders MUST include the authentication field with a token exchange resource.

1. The channel delivers this Invoke to the bot, which uses the token to finalize the token exchange process with the Token Service and identity provider. The Token Service delivers the user"s access token to the bot.
   * Receivers MAY ignore the authentication if the value is malformed.
   * Receivers that experience an error performing token exchange SHOULD respond with an error or a second loginRequest that doesn't include single sign-on information. If responding with an error, the error response MUST be:
   * If the value in the state field is incorrect, the bot can return an error to the client as follows:

   ```json
   {
    "statusCode": 412,
    "type": "application/vnd.microsoft.error.preconditionFailed",
    "value": { ... error ... }
    }
   ```

1. The bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client (either a card or message).

## See also

[Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
