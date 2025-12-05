---
title: SSO for Adaptive Cards Universal Action
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in Adaptive Cards Universal Action in bots.
ms.author: surbhigupta
ms.topic: conceptual
ms.localizationpriority: medium
ms.date: 01/24/2023
ms.owner: ryanbliss
---

# Enable SSO for Adaptive Cards Universal Actions in your bot

SSO in Teams allows app users to use Teams to access Adaptive Cards Universal Actions in a bot. After signing in to Teams using Microsoft or Microsoft 365 account, app users use your app without signing in again. App availability spans any device with access granted through Microsoft Entra ID.

For more information about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

Adaptive Cards Universal Actions use the bot as a common backend for handling actions and introduce a new action type. Bot uses Bot Framework to communicate with app users and to send and receive access tokens for SSO authentication. Similarly, Adaptive Cards Universal Actions use Bot Framework to enable SSO authentication.

Ensure you enable SSO for your bot before enabling SSO for Adaptive Cards Universal Actions.

> [!div class="nextstepaction"]
> [Enable SSO for your bot](../../../bots/how-to/authentication/bot-sso-overview.md)

## SSO in Teams at runtime

SSO for Adaptive Cards Universal Actions in a bot activates by obtaining an access token for the Teams app user who signs in. This process involves bot app client and server, Teams client, Bot Framework, and Microsoft Entra ID. During this interaction, the app user must consent to obtain the access token in a multitenant environment.

The following image illustrates how SSO works when a Teams app user attempts to access Adaptive Cards Universal Actions in a bot:

:::image type="content" source="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png" alt-text="Screenshot shows SSO flow for Adaptive Cards Universal Actions in a bot." lightbox="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the app user has previously signed in, a token saves in Bot Framework Token Store. Bot calls Bot Framework Token Service to check for an existing token for the app user in Bot Framework Token Store. <br> • If the token exists, the app user gains access. <br> • If the token is unavailable, the bot triggers the auth flow. |
| 2 | Microsoft Entra ID → Teams client | For the app user using Adaptive Cards Universal Actions in a bot for the first time, token exchange occurs only after the app user consents. Teams client displays a message prompting app user consent. <br> If consent fails: <br> 1. Authentication falls back to the sign-in prompt and the app user signs in to use the bot app. A sign-in button appears in Teams client and when the app user selects it, Microsoft Entra sign-in page appears. <br> 2. The app user signs in and grants access to Bot service. |
| 3 | Teams Client → Bot service | Teams client resends the invoke `Action.Execute` request to the bot along with the token.  <br> Bot service sends an invoke response with an OAuth card in reply to the `adaptiveCard/action` invoke call. Teams client sends the original `adaptiveCard/action` again to the bot along with the token. |
| 4 | Microsoft Entra ID → Teams client | Microsoft Entra ID sends an invoke response with an Adaptive Card to Teams client. Bot returns a nonerror response to Teams client using either a card or message. |

For Adaptive Cards Universal Actions in a bot, bot app sends an OAuth card to Teams client. This card obtains an access token from Microsoft Entra ID using `tokenExchangeResource`. Following the app user's consent, Teams client sends the token received from Microsoft Entra ID to the bot app using `tokenExchange`. Bot app then parses the token to retrieve app user information, such as email address.

## Use cases for enabling SSO

SSO authentication within `Action.Execute` activates authentication within the context of a group chat or channel conversation where the Adaptive Card appears.

Bots respond with a sign-in request in reply to `Action.Execute` for:

* Adaptive Cards sent by bot in a one-on-one chat, group chat, or channel.
* Adaptive Cards sent by app user via message extension app (backed by bot) in one-on-one chat, group chat, or channel.
* Adaptive Cards present in compose or preview area while the app user composes the message. In the compose area, refresh in Adaptive Card operates and the bot may use a token to provide user-specific view before the app user sends the card to the chat.

## Next step

> [!div class="nextstepaction"]
> [Add code to enable SSO for Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)