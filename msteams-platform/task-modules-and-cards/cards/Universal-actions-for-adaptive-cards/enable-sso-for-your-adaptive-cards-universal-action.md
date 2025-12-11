# Enable SSO for Adaptive Cards Universal Actions in your bot

Single sign-on (SSO) in Teams allows app users to access Adaptive Cards Universal Actions in a bot using Teams. After logging into Teams with a Microsoft or Microsoft 365 account, app users can use your app without needing to sign in again. Your app is accessible to app users on any device with access granted through Microsoft Entra ID.

For more information about Universal Actions for Adaptive Cards, see [Universal Actions for Adaptive Cards](Overview.md).

Adaptive Cards Universal Actions use the bot as the common backend for handling actions and introduce a new action type. The bot uses Bot Framework to manage communication with app users and to send and receive access tokens to the bot for SSO authentication. Similarly, Adaptive Cards Universal Actions also use Bot Framework to enable SSO authentication.

Ensure you enable SSO for your bot before enabling SSO for your Adaptive Cards Universal Actions.

> 
> [Enable SSO for your bot](../../../bots/how-to/authentication/bot-sso-overview.md)

## SSO in Teams at runtime

Enable SSO for Adaptive Cards Universal Actions in a bot by obtaining an access token for the Teams app user who's signed in. This process involves the bot app client and server, Teams client, Bot Framework, and Microsoft Entra ID. During this interaction, the app user must consent to obtain the access token in a multitenant environment.

The following image illustrates how SSO functions when a Teams app user attempts to access Adaptive Cards Universal Actions in a bot:

![Screenshot shows SSO flow for Adaptive Cards Universal Actions in a bot.](https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/authentication/sso-runtime-seqd-adaptivecard.png)

| # | Interaction | Description |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the app user has previously signed in, a token is saved in the Bot Framework Token Store. The bot calls the Bot Framework Token Service that checks for an existing token for the app user in the Bot Framework Token Store. <br> • If the token exists, the app user gains access. <br> • If the token isn't available, the bot triggers the auth flow. |
| 2 | Microsoft Entra ID → Teams client | For the app user using Adaptive Cards Universal Actions in a bot for the first time, the token exchange can occur only after the app user consents. Teams client displays a message to the app user for giving consent. <br> If consent fails: <br> 1. Authentication falls back to the sign-in prompt, and the app user must sign in to use the bot app. The sign-in button appears in Teams client, and when the app user selects it, the Microsoft Entra sign-in page appears. <br> 2. The app user signs in and grants access to the Bot service. |
| 3 | Teams Client → Bot service | Teams client resends the invoke `Action.Execute` request to the bot along with the token.  <br> Bot service sends an invoke response with an OAuth card in response to `adaptiveCard/action` invoke call. Teams client sends the original `adaptiveCard/action` again to the bot along with the token. |
| 4 | Microsoft Entra ID → Teams client | Microsoft Entra ID sends invoke response with Adaptive Card to Teams client. Bot returns a nonerror response to the Teams client using either a card or message. |

For Adaptive Cards Universal Actions in a bot, the bot app sends an OAuth card to Teams client. This card is used to get an access token from Microsoft Entra ID using `tokenExchangeResource`. Following app user's consent, Teams client sends the token received from Microsoft Entra ID to the bot app using `tokenExchange`. The bot app can then parse the token to retrieve the app user's information, such as email address.

## Use cases for enabling SSO

Authentication for SSO, within the `Action.Execute`, enables authentication within the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with a sign-in request in response to `Action.Execute` for:

* Adaptive Cards sent by the bot in a one-on-one chat, group chat, or a channel.
* Adaptive Cards sent by the app user via a message extension app (backed by the bot) in a one-on-one chat, group chat, or channel.
* Adaptive Cards present in the compose or preview area while the app user is composing the message. In the compose area, refresh in Adaptive Card works, and the bot might want to use a token to provide a user-specific view to the app user before they send the card to the chat.

## Next step

> 
> [Add code to enable SSO for Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)