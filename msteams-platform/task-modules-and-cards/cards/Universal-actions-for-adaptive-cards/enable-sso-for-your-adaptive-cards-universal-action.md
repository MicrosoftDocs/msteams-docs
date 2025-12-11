---
title: SSO for Adaptive Cards Universal Action
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in Adaptive Cards Universal Action in bots.
ms.author: surbhigupta
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 01/24/2023
ms.owner: ryanbliss
---
-
# Enable SSO for Adaptive Cards Universal Actions in your bot

Single sign-on (SSO) in Teams allows app users to access Adaptive Cards Universal Actions in a bot using Teams. Once users log in to Teams with a Microsoft or Microsoft 365 account, they can use your app without needing to sign in again. Your app becomes accessible to users on any device with access granted through Microsoft Entra ID.

For more details about Universal Actions for Adaptive Cards, refer to [Universal Actions for Adaptive Cards](Overview.md).

Adaptive Cards Universal Actions utilize the bot as the common backend for managing actions and introduce a new action type. The bot employs Bot Framework to handle communication with users and to send and receive access tokens for SSO authentication. Similarly, Adaptive Cards Universal Actions also leverage Bot Framework to facilitate SSO authentication.

Ensure you enable SSO for your bot before enabling SSO for your Adaptive Cards Universal Actions.

> 
> [Enable SSO for your bot](../../../bots/how-to/authentication/bot-sso-overview.md)

## SSO in Teams at runtime

Enable SSO for Adaptive Cards Universal Actions in a bot by obtaining an access token for the Teams app user who’s signed in. This process involves the bot app client and server, Teams client, Bot Framework, and Microsoft Entra ID. During this interaction, users must consent to obtain the access token in a multitenant environment.

The following image illustrates how SSO functions when a Teams app user tries to access Adaptive Cards Universal Actions in a bot:

![Screenshot shows SSO flow for Adaptive Cards Universal Actions in a bot.](https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/authentication/sso-runtime-seqd-adaptivecard.png)

| # | Interaction | Description |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the user has previously signed in, a token is saved in the Bot Framework Token Store. The bot calls the Bot Framework Token Service to check for an existing token for the user in the Bot Framework Token Store. <br> • If the token exists, the user gains access. <br> • If the token isn't available, the bot initiates the auth flow. |
| 2 | Microsoft Entra ID → Teams client | For users accessing Adaptive Cards Universal Actions in a bot for the first time, token exchange occurs only after user consent. Teams client displays a message for user consent. <br> If consent fails: <br> 1. Authentication reverts to the sign-in prompt, and users must sign in to use the bot app. The sign-in button appears in Teams client, and upon selection, the Microsoft Entra sign-in page appears. <br> 2. Users sign in and grant access to the Bot service. |
| 3 | Teams Client → Bot service | Teams client resends the invoke `Action.Execute` request to the bot with the token.  <br> Bot service sends an invoke response with an OAuth card in response to `adaptiveCard/action` invoke call. Teams client sends the original `adaptiveCard/action` again to the bot with the token. |
| 4 | Microsoft Entra ID → Teams client | Microsoft Entra ID sends an invoke response with an Adaptive Card to Teams client. Bot returns a non-error response to Teams client using either a card or message. |

For Adaptive Cards Universal Actions in a bot, the bot app sends an OAuth card to Teams client. This card retrieves an access token from Microsoft Entra ID using `tokenExchangeResource`. After user consent, Teams client sends the token received from Microsoft Entra ID to the bot app using `tokenExchange`. The bot app can parse the token to obtain user information, such as email address.

## Use cases for enabling SSO

Authentication for SSO within `Action.Execute` enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with a sign-in request in response to `Action.Execute` for:

* Adaptive Cards sent by the bot in a one-on-one chat, group chat, or channel.
* Adaptive Cards sent by users via message extension app (backed by the bot) in a one-on-one chat, group chat, or channel.
* Adaptive Cards present in the compose or preview area while users compose messages. In the compose area, refresh in Adaptive Card functions, and the bot might use a token to provide a user-specific view before users send the card to the chat.

## Next step

> 
> [Add code to enable SSO for Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)