---
title: Authentication flow in Adaptive Cards Universal Actions
description: In this module, learn about the authentication flow in Adaptive Cards universal actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Authentication flow in Adaptive Cards universal actions

Universal Actions for Adaptive Cards were introduced in the Adaptive Cards schema version v1.4. It introduces a new action type, Action.Execute and enables bot as the common backend for handling actions which work across apps, such as Teams and Outlook.

With Action.Execute, following are the major benefits to bot developers and users:

1. Bot developers can use Action.Execute for action handling across different platforms. Action.Execute works across hubs including Teams and Outlook. In addition, an Adaptive Card can be returned as response for an Action.Execute triggered invoke request.
1. User specific views: With refresh property in adaptive cards, which triggers automatic refresh (internally an Action.Execute call) on the card, can fetch different cards for different users in the chat based on their role. For eg, in the below picture, Incident creator, incident assignee and a participant all see different cards in the conversation.

1. Sequential View: Since Action.Execute buttons can return new Adaptive card in response which is shown to user, it can enable sequential flows, like a menu card scenario
1. Up to Date View: Cards with automatic refresh will fetch the latest data from bot service and it can display up to date information to user.

To learn more about universal actions, see [Universal Actions for Adaptive Cards](Overview.md).

In scenarios when an Adaptive Card with Universal Action (Action.Execute) is shared in the context of a Group chat or a Channel, if a developer wants to implement user specific views, there could be a need to first authenticate the user. Earlier, for user authentication, developer had to first send an auth card separately to the user’s 1:1 chat with the bot. This disrupts the flow as a user needs to switch from their group chat or channel conversation to the bot chat.

## Introducing authentication flow in Action.Execute protocol

We are now enabling authentication flow, both OAuth and SSO, within the Action.Execute protocol which will enable authentication right within the context of the Group chat or Channel conversation where the Adaptive Card is shared.
Bots can respond with login request in response to Action.Execute for

1. Adaptive cards sent by bot in a 1:1 chat, group chat or a channel
1. Adaptive cards sent by user via message extension app (backed by bot) in 1:1 chat, group chat or channel.
1. Adaptive cards present in compose/preview area while user is composing the message.
   * In compose area, refresh in Adaptive card works and bot may want to use token to provide user specific view to user before they send the card to the chat.

## Getting started with OAuth (Nominal Sign-On) flow

Authentication steps for OAuth are similar to a bot or a tab in Teams.

To learn more about how to create an authentication-enabled bot, how to deploy the bot to Azure and associate it with an identity provider and how to integrate the bot within Microsoft Teams, see [Add authentication to your Teams bot](../../../bots/how-to/authentication/add-authentication.md)

For a nominal sign-on (OAuth) experience in which the user is presented with a sign-in button or link, the protocol is as follows:

1. An adaptiveCard/action Invoke request is sent to the bot.
1. The bot leverages the Token Service protocol to check if there is already a cached token for the user specified in the activity.from.id field on the channel specified in the activity.channelId field for the bot and connection that is configured.
1. If there is a cached token, the bot can leverage this token. If there is not a token, the bot creates an OAuthCard and places it in the Response with the values:
   * Senders MUST include a value that adheres to the OAuthCard format.
   * Senders MUST include a connectionName. Receivers MAY ignore login requests with an empty or missing connectionName.
   * Senders MUST include either a button that has a non-empty buttons array.
1. Upon receiving this response, Teams client will show a sign In button in the card footer where user can click.
1. The user will click on the sign-in link which will open a browser window to the configured connection's identity provider's sign-on page. The final redirect will land on a Token Service page offering an authorization code value.
1. Teams client will create and send the adaptiveCard/action Invoke Activity with name. The value will include the state field containing the authorization code:
   * Senders MUST include a state field.
1. The channel delivers this Invoke to the bot, which uses the authentication code to finalize retrieving the token with the Token Service. The Token Service delivers the user's access token to the bot.

   * Receivers MAY ignore the adaptiveCard/action invoke or reply with an error if there is a missing or empty state field.

   If the value in the state field is incorrect, the bot can return an error to the client as follows:

   Clients can re-prompt the user for the correct authorization code or can send a different Action.Execute.

1. If the authorization code in state is correct, the bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client (either a card or message).
