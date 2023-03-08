---
title: Add third party authentication to Adaptive Cards Universal Actions
description: In this module, learn how to add third party authentication to your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Add third party authentication to Adaptive Cards Universal Actions

Adaptive Cards Universal Actions use the bot as the common backend for handling actions and introduce a new action type `Action.Execute`, which works across apps, such as Teams and Outlook.

> [!NOTE]
> Support for Adaptive Cards Universal Actions schema version v1.4 is only available for cards sent by bot.

You can enable the following scenarios with `Action.Execute` on your Adaptive Cards Universal Action:

* [Universal Actions](Overview.md#universal-actions)
* [User Specific Views](Overview.md#user-specific-views)
* [Sequential Workflows](Overview.md#sequential-workflow-support)
* [Up to Date View](Overview.md#up-to-date-views)

To learn more about Adaptive Cards Universal Actions, see [Adaptive Cards Universal Actions](Overview.md).

If you want to add user-specific views in instances where an Adaptive Card with Universal Action is shared, in the context of a group chat or a channel, the user may need to be authenticated.

In the past, users who were chatting one-on-one with the bot had to wait while you sent them a separate auth card to authenticate. To communicate with the bot, user would need to switch from the group chat or channel that would disturb the flow.

## Authentication flow in Action.Execute protocol

Authentication flow for OAuth, within the `Action.Execute` protocol, enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with sign-in request in response to `Action.Execute` for:

* Adaptive Cards sent by bot in a one-on-one chat, group chat, or a channel.
* Adaptive Cards sent by app user via message extension app (backed by bot) in one-on-one chat, group chat, or channel.
* Adaptive Cards present in compose or preview area while the user is composing the message. In the compose area, refresh in Adaptive Card works and the bot may want to use a token to provide user-specific view to the app user before they send the card to the chat.

## Getting started with OAuth or nominal sign-on flow

The OAuth or nominal authentication steps for Adaptive Cards with Universal Actions are similar to bot in Teams.

Ensure that you added authentication to your Teams bot. To learn more about how to create an authentication-enabled bot, how to deploy the bot to Azure and associate it with an identity provider, and how to integrate the bot within Microsoft Teams, see [add authentication to your Teams bot](../../../bots/how-to/authentication/add-authentication.md).

For an OAuth or nominal sign-on experience in which the user is presented with a sign-in button or link, the following is the OAuth or nominal sign-on flow:

:::image type="content" source="../../../assets/images/authentication/oauth-flow-ac.png" alt-text="Screenshot shows you the authentication flow for the Adaptive Cards with Universal Actions.":::

1. Teams client sends an Adaptive Card or `actionInvokeActivity` request to the bot.
1. The bot uses the Token Service protocol to check if there's already a cached token for the user specified in the `activity.from.id` field. The channel is specified in the `activity.channelId` field for the bot and connection that is configured.
1. If there's a cached token, the bot can use this token. If there's no token, the bot creates an OAuthCard and places it in the response with the following values:

    ```javascript
   {
      'statusCode': 401,
      'type': 'application/vnd.microsoft.activity.loginRequest',
      'value': {
         'text': 'Please sign-in',
         'connectionName': '<configured-connection-name>',
         'buttons': [
            {
               'title': 'Sign-In',
               'text': 'Sign-In',
               'type': 'signin',
               'value': '<sign-in-URL>'
            }
         ]
      }
   }   
    ```

    * Senders must include a value that adheres to the OAuthCard format.
    * Senders must include a `connectionName`. Receivers may ignore sign in requests with an empty or missing `connectionName`.
    * Senders must include a `button` that has a non-empty buttons array.

1. Upon receiving this response, Teams client shows a **Sign-In** button in the card footer where user can sign in.

   :::image type="content" source="../../../assets/images/authentication/adaptive-card-universal-action/sign-in-button.png" alt-text="Screenshot shows the Sign-In button on the Adaptive card.":::

1. When the user selects **Sign-In** button, the identity provider's sign-in page opens in a browser window opens. After the user signs in, the Token Service page appears with an authorization code value.
1. Teams client creates and sends the `adaptiveCard/action` invoke activity with `name`. The value includes the `state` field containing the authorization code:

    ```javascript
    {
       'type': 'invoke',
       'name': 'adaptiveCard/action'
       'value': {
          'action': {
             'id': 'abc123',
             'type': 'Action.Execute',
             'verb': 'saveCommand',
             'data': {
                'firstName': 'Jeff',
                'lastName': 'Derstadt'
             }
          },
       'state': '123456'
       },
       ...
    }
    
    ```

    Senders must include a `state` field.

1. The channel delivers this invoke to the bot, which uses the authentication code to retrieve the token from the Token Service. The Token Service delivers the user's access token to the bot.

    Receivers may ignore the `adaptiveCard/action` invoke or reply with an error if there's a missing or empty `state` field.

    If the value in the `state` field is incorrect, the bot returns an error to the Teams client as follows:

   ```javascript
     {
      'statusCode': 401,
      'type': 'application/vnd.microsoft.error.invalidAuthCode',
     }
   ```

   Teams client can again prompt the user for the correct authorization code or can send an `Action.Execute` request again.

1. If the authorization code in the `state` field is correct, the bot uses the access token on behalf of the user to perform its actions.
1. The bot responds with a card or message to the Teams client without an error.

## See also

* [Work with Adaptive Cards Universal Actions](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Enable SSO for Adaptive Cards Universal Actions](enable-sso-for-your-adaptive-cards-universal-action.md)
