---
title: Overview of SSO for Adaptive Cards Universal Actions in your bot
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in Adaptive Cards Universal Action in bots.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Enable SSO for Adaptive Cards Universal Actions in your bot

With Single sign-on (SSO) in Teams, app users have the advantage of using Teams to access Adaptive Cards Universal Actions in a bot. After logging in to Teams using Microsoft or Microsoft 365 account, app users can use your app without the need to sign in again. Your app is available to app users on any device with access granted through Azure Active Directory (Azure AD).

For more information about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

Adaptive Cards Universal Actions uses the bot as the common backend for handling actions and introduces a new action type. Bot uses Bot Framework to handle communication with the app users and to send and receive access token to the bot for SSO authentication. Similarly, Adaptive Cards Universal Actions also uses Bot Framework to enable SSO authentication.

Before you enable SSO for your Adaptive Cards Universal Actions, ensure that you've enabled the SSO for your bot.

> [!div class="nextstepaction"]
> [Enable SSO for your bot](../../../bots/how-to/authentication/bot-sso-overview.md)

## SSO in Teams at runtime

SSO for Adaptive Cards Universal Actions in a bot can be enabled by obtaining access token for the Teams app user who's currently signed in. This process involves the bot app client and server, Teams client, Bot Framework, and Azure AD. During this interaction, the app user must give consent to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the Adaptive Cards Universal Actions in a bot:

:::image type="content" source="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png" alt-text="Screenshot shows SSO flow for Adaptive Cards Universal Actions in a bot." lightbox="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the app user has previously signed in, a token is saved in the Bot Framework Token Store. The bot calls the Bot Framework Token Service that checks for an existing token for the app user in the Bot Framework Token Store. <br> • If the token exists, the app user is given access. <br> • If the token isn't available, the bot triggers the auth flow. |
| 2 | Azure AD → Teams client | For the app user who's using the Adaptive Cards Universal Actions in a bot for the first time, the token exchange can occur only after the app user gives the consent. Teams client displays a message to the app user for giving consent. <br> In case the consent fails: <br> 1. The authentication falls back to the sign-in prompt and the app user must sign in to use the bot app. The sign-in button appears in Teams client and when the app user selects it, the Azure AD sign-in page appears. <br> 2. The app user signs in and grants access to the Bot service. |
| 3 | Teams Client → Bot service | Teams client resends the invoke `Action.Execute` request to the bot along with the token.  <br> Bot service sends an invoke response with an OAuth card in response to `adaptiveCard/action` invoke call. Teams client sends the original `adaptiveCard/action` again to the bot along with the token. |
| 4 | Azure AD → Teams client | Azure AD sends invoke response with Adaptive Card to Teams client. Bot returns a non-error response to the Teams client using either a card or message. |

For an Adaptive Cards Universal Actions in a bot, the bot app sends an OAuth card to Teams client. This card is used to get access token from Azure AD using `tokenExchangeResource`. Following app user's consent, Teams client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Use cases for enabling SSO

Authentication for SSO, within the `Action.Execute`, enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with sign-in request in response to `Action.Execute` for:

* Adaptive Cards sent by bot in a one-on-one chat, group chat, or a channel.
* Adaptive Cards sent by app user via message extension app (backed by bot) in one-on-one chat, group chat, or channel.
* Adaptive Cards present in compose or preview area while the user is composing the message. In the compose area, refresh in Adaptive Card works and the bot may want to use a token to provide user-specific view to the app user before they send the card to the chat.

## Next step

> [!div class="nextstepaction"]
> [Add code to enable SSO for Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)
