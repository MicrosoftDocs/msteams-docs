# Enable SSO for Adaptive Cards Universal Actions in your bot

Single sign-on (SSO) in Teams allows app users to leverage Teams for accessing Adaptive Cards Universal Actions in a bot. Once users log in to Teams using their Microsoft or Microsoft 365 account, they can use your app without needing to sign in again. Your app remains accessible to users on any device with permissions granted through Microsoft Entra ID.

For additional details about Universal Actions for Adaptive Cards, refer to [Universal Actions for Adaptive Cards](Overview.md).

Adaptive Cards Universal Actions utilize the bot as a shared backend for managing actions and introduce a new action type. The bot employs Bot Framework to manage communication with users and to send and receive access tokens for SSO authentication. Similarly, Adaptive Cards Universal Actions also rely on Bot Framework to facilitate SSO authentication.

Make sure to enable SSO for your bot before enabling SSO for your Adaptive Cards Universal Actions.

> 
> [Enable SSO for your bot](../../../bots/how-to/authentication/bot-sso-overview.md)

## SSO in Teams at runtime

You can enable SSO for Adaptive Cards Universal Actions in a bot by acquiring an access token for the signed-in Teams app user. This process involves the bot app client and server, Teams client, Bot Framework, and Microsoft Entra ID. During this interaction, users must consent to obtain the access token in a multitenant environment.

The following image illustrates how SSO functions when a Teams app user tries to access Adaptive Cards Universal Actions in a bot:

![Screenshot shows SSO flow for Adaptive Cards Universal Actions in a bot.](https://learn.microsoft.com/en-us/microsoftteams/platform/assets/images/authentication/sso-runtime-seqd-adaptivecard.png)

| # | Interaction | Description |
| --- | --- | --- |
| 1 | Teams client → Bot service | Teams sends an invoke `Action.Execute` request to the bot. <br> If the user has previously signed in, a token is stored in the Bot Framework Token Store. The bot calls the Bot Framework Token Service to check for an existing token for the user in the Bot Framework Token Store. <br> • If the token exists, the user gains access. <br> • If the token isn't available, the bot initiates the auth flow. |
| 2 | Microsoft Entra ID → Teams client | For users accessing Adaptive Cards Universal Actions in a bot for the first time, token exchange occurs only after user consent. Teams client prompts the user to give consent. <br> If consent fails: <br> 1. Authentication reverts to the sign-in prompt, requiring the user to sign in to use the bot app. A sign-in button appears in Teams client, and when selected, the Microsoft Entra sign-in page appears. <br> 2. The user signs in and grants access to the Bot service. |
| 3 | Teams Client → Bot service | Teams client resends the invoke `Action.Execute` request to the bot with the token.  <br> Bot service responds with an OAuth card to the `adaptiveCard/action` invoke call. Teams client sends the original `adaptiveCard/action` again to the bot with the token. |
| 4 | Microsoft Entra ID → Teams client | Microsoft Entra ID sends an invoke response with Adaptive Card to Teams client. The bot returns a non-error response to Teams client using either a card or message. |

For Adaptive Cards Universal Actions in a bot, the bot app sends an OAuth card to Teams client. This card retrieves an access token from Microsoft Entra ID using `tokenExchangeResource`. After user consent, Teams client sends the token from Microsoft Entra ID to the bot app using `tokenExchange`. The bot app can then parse the token to extract user information, such as email address.

## Use cases for enabling SSO

Authentication for SSO within `Action.Execute` enables authentication in the context of the group chat or channel conversation where the Adaptive Card is shared.

Bots can respond with a sign-in request in response to `Action.Execute` for:

* Adaptive Cards sent by the bot in a one-on-one chat, group chat, or a channel.
* Adaptive Cards sent by users via message extension app (backed by bot) in one-on-one chat, group chat, or channel.
* Adaptive Cards present in the compose or preview area while users compose the message. In the compose area, refresh in Adaptive Card works, and the bot might use a token to provide a user-specific view before sending the card to the chat.

## Next step

> 
> [Add code to enable SSO for Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [Authentication flow in Adaptive Cards Universal Actions](authentication-flow-in-universal-action-for-adaptive-cards.md)