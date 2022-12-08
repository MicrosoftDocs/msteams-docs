---
title: Enable SSO for your Adaptive Cards Universal Actions
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# SSO for your Adaptive Cards Universal Actions

Universal Actions for Adaptive Cards bring the bot as the common backend for handling actions and introduces a new action type `Action.Execute`, which works across apps, such as Teams and Outlook.

> [!NOTE]
> Support for Universal Actions for Adaptive Cards schema version v1.4 is only available for cards sent by bot.

You can enable the following scenarios with `Action.Execute` on your Adaptive Cards Universal Actions:

* [Universal Actions](Overview.md#universal-actions)
* [User Specific Views](Overview.md#user-specific-views)
* [Sequential Workflows](Overview.md#sequential-workflow-support)
* [Up to Date View](Overview.md#up-to-date-views)

To learn more about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

With Single sign-on (SSO) in Teams, app users have the advantage of using Teams to access Adaptive Cards Universal Actions in bot. After logging into Teams using Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is available to app users on any device with access granted through Azure Active Directory (AD).

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
| 8 | Azure AD → Teams client | Azure AD sends a Invoke response with Adaptive Card to Teams client. Bot returns a non-error response to the client, either a card or message. |

For a Adaptive Cards Universal Actions in bot, the bot app sends an OAuth Card to Teams client. This card is used to get access token from Azure AD using `tokenExchangeResource`. Following app user's consent, Teams client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Next step

> [!div class="nextstepaction"]
> [Enable SSO for your Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)
