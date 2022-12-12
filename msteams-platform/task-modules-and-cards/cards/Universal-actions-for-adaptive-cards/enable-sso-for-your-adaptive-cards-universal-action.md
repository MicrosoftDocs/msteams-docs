---
title: Overview of SSO for your Adaptive Cards Universal Actions
description: Learn about Single sign-on (SSO) authentication in Teams and how to enable it in Adaptive Cards Universal Action in bots.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# SSO for your Adaptive Cards Universal Actions

With Single sign-on (SSO) in Teams, app users have the advantage of using Teams to access Adaptive Cards Universal Actions in bot. After logging in to Teams using Microsoft or Microsoft 365 account, app users can use your app without the need to sign in again. Your app is available to app users on any device with access granted through Azure Active Directory (AD).

For more information about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

## SSO in Teams at runtime

SSO for Adaptive Cards Universal Actions in bot can be enabled by obtaining access token for the Teams app user who's currently signed in. This process involves the bot app client and server, Teams client, Bot Framework, and Azure AD. During this interaction, the app user must give consent to obtain the access token in a multi-tenant environment.

The following image shows how SSO works when a Teams app user attempts to access the Adaptive Cards Universal Actions in bot:

:::image type="content" source="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png" alt-text="Screenshot shows SSO flow for Adaptive Card Universal Action in bot." lightbox="../../../assets/images/authentication/sso-runtime-seqd-adaptivecard.png":::

| # | Interaction | What's going on |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the app user has previously signed in, a token is saved in the Bot Framework Token Store. The bot calls the Bot Framework Token Service that checks for an existing token for the app user in the Bot Framework Token Store. <br> • If the token exists, the app user is given access. <br> • If the token is not available, the bot triggers the auth flow. |
| 2 | Bot service → Bot Framework Token Service | The bot calls the Bot Framework Token Service to obtain a sign-in link for the user. |
| 3 | Bot Framework Token Service → Teams client | Bot Framework Token Service sends the request for sign-in link to the bot service, which forwards it to the Teams client with an OAuth card and `tokenExchangeResource`. |
| 4 | Teams client → Bot service → Bot Framework Token Service → Azure AD | After the Teams client receives the OAuth card and `tokenExchangeResource` for the app user and if SSO is enabled, it sends a token exchange request for the app user back to the bot. The bot calls the Bot Framework Token Service attempting to exchange the received token from Azure AD. |
| 5 | Azure AD → Teams client | For the app user who's using the bot service for the first time, the token exchange can occur only after the app user gives the consent. Teams client displays a message to the app user for giving consent. <br> In case the consent fails: <br> 1. The authentication falls back to the sign-in prompt and the app user must sign in to use the bot app. The sign-in button appears in Teams client and when the app user selects it, the Azure AD sign-in page is rendered. <br> 2. The app user signs in and grants access to the Bot service. |
| 6 | Teams Client → Bot service | Teams client re-sends the invoke `Action.Execute` request to the bot along with the token. |
| 7 | Bot service → Bot Framework Token Service | The token for the app user is stored in the Bot Framework Token Store. |
| 8 | Azure AD → Teams client | Azure AD sends invoke response with Adaptive Card to Teams client. Bot returns a non-error response to the client, either a card or message. |

For an Adaptive Cards Universal Actions in bot, the bot app sends an OAuth Card to Teams client. This card is used to get access token from Azure AD using `tokenExchangeResource`. Following app user's consent, Teams client sends the token received from Azure AD to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Use cases for enabling SSO

Authentication for SSO, within the `Action.Execute`, enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with sign in request in response to `Action.Execute` for:

* Adaptive Cards sent by bot in a one-on-one chat, group chat, or a channel.
* Adaptive Cards sent by user via message extension app (backed by bot) in one-on-one chat, group chat, or channel.
* Adaptive cards present in compose or preview area while user is composing the message.
  * In compose area, refresh in Adaptive Card works and bot may want to use token to provide user specific view to user before they send the card to the chat.

## Enable SSO for a Teams app

This section describes the tasks involved in implementing SSO for Adaptive Cards Universal Actions in bot. To enable SSO for Adaptive Cards Universal Actions in bot:

**Configure app with Azure AD**: Create an Azure AD app to generate an app ID and application ID URI. For generating an access token, you configure scopes and authorize trusted client applications. The configuration required in Azure AD for enabling SSO in a bot is the same. Create a bot resource and configure it's client secret, messaging endpoint, and OAuth connection to enable SSO.

**Add code**: Add the code to handle access token to send this token to your app's server code in the Authorization header, and to validate the access token when it's received.
> [!NOTE]
> This section allows you to select the app for which you want to add code for enabling SSO.

**Update Teams app manifest**: Update your Teams client app manifest with the app ID and application ID URI generated in Azure AD to allow Teams to request access tokens on behalf of your app. The update required in the manifest file is the same for bot.

## Next step

> [!div class="nextstepaction"]
> [Enable SSO for your Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)
