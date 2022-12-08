---
title: Enable SSO for your Adaptive Cards Universal Actions
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Enable SSO for your Adaptive Cards Universal Actions

Universal Actions for Adaptive Cards bring the bot as the common backend for handling actions and introduces a new action type `Action.Execute`, which works across apps, such as Teams and Outlook.

> [!NOTE]
> Support for Universal Actions for Adaptive Cards schema version v1.4 is only available for cards sent by bot.

You can enable the following scenarios with `Action.Execute` on your Adaptive Cards Universal action:

* [Universal Actions](Overview.md#universal-actions)
* [User Specific Views](Overview.md#user-specific-views)
* [Sequential Workflows](Overview.md#sequential-workflow-support)
* [Up to Date View](Overview.md#up-to-date-views)

With Single sign-on (SSO) in Teams, app users have the advantage of using Teams to access Adaptive Cards Universal Actions in bot. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure Active Directory (AD).

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

## SSO in Teams at runtime

Achieve SSO in Adaptive Cards Universal Actions in bot by obtaining access token for the Teams app user who's currently signed in. This process involves the bot app client and server, Teams client, Bot Framework, and Azure AD. During this interaction, the app user must give consent to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the Adaptive Cards Universal Actions in bot:

:::image type="content" source="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png" alt-text="Screenshot shows SSO flow for Adaptive Card Universal Action in bot." lightbox="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an Invoke Action.Execute request to the bot. <br> If the app user has previously signed in, a token is saved in the Bot Framework Token Store. The bot calls the Bot Framework Token Service which checks for an existing token for the app user in the Bot Framework Token Store. <br> • If the token exists, the app user is given access. <br> • If no token is available, the bot triggers the auth flow. |
| 2 | Bot service → Bot Framework Token Service | The bot calls the Bot Framework Token Service to obtain a sign in link for the user. |
| 3 | Bot Framework Token Service → Teams client | Bot Framework Token Service sends the request for sign-in link to the bot service, which forwards it to the Teams client with an OAuth card and tokenExchangeResource. |
| 4 | Teams client → Bot service → Bot Framework Token Service → Azure AD | After the Teams client receives the OAuth card and tokenExchangeResource for the app user, if SSO is enabled, it sends a token exchange request for the app user back to the bot. The bot calls the Bot Framework Token Service, attempting to exchange the received token from Azure AD. |
| 5 | Azure AD → Teams client | For the app user who's using the bot service for the first time, the token exchange can occur only after app user gives their consent. Teams client displays a message to the app user for giving consent. <br> In case the consent fails: <br> 1. The authentication falls back to the sign-in prompt and the app user must sign in to use the bot app. The sign-in button pops up in Teams client, and when app user selects it, the Azure AD sign-in page is rendered. <br> 2. The app user signs in and grants access to the bot service. |
| 6 | Teams Client → Bot service | Teams client re-sends the invoke Action.Execute request to the bot along with the token. <br> • Senders must include the authentication field with a token exchange resource. |
| 7 | Bot service → Bot Framework Token Service | The token for the app user is stored in the Bot Framework Token Store. |
| 8 | Bot service → Bot Framework Token Service | The token for the app user is stored in the Bot Framework Token Store. |

For a Adaptive Cards Universal Action in bot, the bot app sends an OAuth Card to Teams client. This card is used to get access token from Azure AD using `tokenExchangeResource`. Following app user's consent, Teams client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Getting started with SSO Flow

Authentication steps for SSO are similar to that of a bot or tab in Teams. Following are the steps to achieve SSO in Adaptive Cards Universal Action:

> [!NOTE]
> To implement SSO flow, you must have personal scope declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in personal scope if it isn't already installed.

1. Before you add code to enable SSO, ensure that you've configured your app and bot resource in Azure AD portal. For more information, see [configured your app and bot resource in Azure AD portal](../../../bots/how-to/authentication/bot-sso-register-aad.md).
1. After you configured the client secret and OAuth connection setting for the app in Azure AD. You must configure the code with development environment variables. For more information, see [Update development environment variables](../../../bots/how-to/authentication/bot-sso-code.md#update-development-environment-variables).
1. Add code to handle an access token. For more information, see [Add code to handle an access token](../../../bots/how-to/authentication/bot-sso-code.md#add-code-to-handle-an-access-token).
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

* Senders must include a `tokenExchangeResource` to designate a single sign-on operation.

   > [!NOTE]
   > Teams client will trigger the nominal sing-on or OAuth flow when SSO fails. It is highly recommended that you provide sign in URL in the above response so that OAuth flow works.

1.
1. [Update your Teams application manifest for your bot](../../../bots/how-to/authentication/bot-sso-manifest.md)

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

* Senders must include a `tokenExchangeResource` to designate a single sign-on operation.

   > [!NOTE]
   > Teams client will trigger the nominal sing-on or OAuth flow when SSO fails. It is highly recommended that you provide sign in URL in the above response so that OAuth flow works.

1. This response is delivered through the channel to the client, which uses the tokenExchangeResource information and the client token to obtain an on-behalf-of token or exchangeable token from the identity provider:
   * Clients may ignore the tokenExchangeResource for any reason, including invalid values, errors retrieving exchangeable tokens, or not supporting the identity provider.
   * Clients that ignore the tokenExchangeResource should use the nominal sign-on flow.

1. The client resend the original `adaptiveCard/action` to the bot along with the token as follows:

    ```javascript
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
      }
    }
    ```

    * Senders must include the authentication field with a token exchange resource.

1. The channel delivers this Invoke to the bot, which uses the token to finalize the token exchange process with the Token Service and identity provider. The Token Service delivers the user"s access token to the bot.
   * Receivers may ignore the authentication if the value is malformed.
   * Receivers that experience an error performing token exchange should respond with an error or a second loginRequest that doesn't include single sign-on information. If responding with an error, the error response must be:
   * If the value in the state field is incorrect, the bot can return an error to the client as follows:

    ```javascript
       {
        "statusCode": 412,
        "type": "application/vnd.microsoft.error.preconditionFailed",
        "value": { ... error ... }
        }
    ```

1. The bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client, either a card or message.

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)
