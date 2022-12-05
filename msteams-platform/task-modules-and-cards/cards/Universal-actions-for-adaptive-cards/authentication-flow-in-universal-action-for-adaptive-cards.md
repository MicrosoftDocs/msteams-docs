---
title: Authentication flow in Adaptive Cards Universal Actions
description: In this module, learn about the authentication flow in Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Authentication flow in Adaptive Cards Universal Actions

Universal Actions for Adaptive Cards bring the bot as the common backend for handling actions and introduces a new action type `Action.Execute`, which works across apps, such as Teams and Outlook.

> [!NOTE]
> Support for Universal Actions for Adaptive Cards schema version v1.4 is only available for cards sent by bot.

You can enable the following scenarios with `Action.Execute` on your Adaptive Cards Universal action:

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

For a OAuth or nominal sign-on experience in which the user is presented with a sign-in button or link and the following is the authentication flow:

1. Teams user sends an adaptiveCard/actionInvokeActivity request to the bot.
1. The bot uses the Token Service protocol to check if there's already a cached token for the user specified in the activity.from.id field on the channel specified in the activity.channelId field for the bot and connection that is configured.
1. If there's a cached token, the bot can use this token. If there's no token, the bot creates an OAuthCard and places it in the Response with the values:

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
    * Senders must include a connectionName. Receivers MAY ignore login requests with an empty or missing connectionName.
    * Senders must include either a button that has a non-empty buttons array.

1. Upon receiving this response, Teams client will show a **Sign-In** button in the card footer where user can select.

   :::image type="content" source="../../../assets/images/authentication/adaptive-card-universal-action/sign-in-button.png" alt-text="Screenshot shows the Sign-In button on the Adaptive card.":::

1. The user will select on the sign-in link, which will open a browser window to the configured connection"s identity provider"s sign-on page. The final redirect will land on a Token Service page offering an authorization code value.
1. Teams client will create and send the adaptiveCard/action Invoke Activity with name. The value will include the state field containing the authorization code:

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

   * Senders must include a state field.

1. The channel delivers this Invoke to the bot, which uses the authentication code to finalize retrieving the token with the Token Service. The Token Service delivers the user's access token to the bot.

   * Receivers MAY ignore the adaptiveCard/action invoke or reply with an error if there's a missing or empty state field.

   If the value in the state field is incorrect, the bot can return an error to the client as follows:

   ```javascript
     {
      'statusCode': 401,
      'type': 'application/vnd.microsoft.error.invalidAuthCode',
     }
   ```

   Clients can again prompt the user for the correct authorization code or can send a different `Action.Execute`.

1. If the authorization code in state is correct, the bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client (either a card or message).

## See also

[Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
