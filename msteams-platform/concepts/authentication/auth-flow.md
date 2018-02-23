---
title: Authentication flow
description: Describes authentication flow in bots
keywords: teams authentication flow bots
ms.date: 02/22/2018
---
# Microsoft teams authentication flow in bots

OAuth is an open standard for authentication used by AAD and many other service providers. Understanding OAuth is a prerequisite for working with authentication in Teams. Authentication flow in bots differs slightly from authentication flow in tabs.

See the github repo [Microsoft Teams Authentication Sample](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
for an example that demonstrates authentication flow for tabs and bots using node.

![Bot authentication sequence diagram](https://aosolis.github.io/bot-auth/bot_auth_sequence.png)

1. The user sends a message to the bot.
2. The bot determines if the user needs to sign in.
    * In this example, the bot stores the access token in its user data store. It asks the user to log in if it doesn't have a validated token for the selected identity provider. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/utils/AuthenticationUtils.ts#L58-L76))
3. The bot constructs the URL to the start page of the authentication flow, and sends a card to the user with a `signin` action. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L160-L190))
    * Like other application auth flows in Teams, the start page must be on a domain that's in your `validDomains` list, and on the same domain as the post-login redirect page.
    * **IMPORTANT**: If you are using OAuth, remember that the `state` parameter in the authentication request must contain a unique session token to prevent request forgery attacks. The example uses a randomly-generated GUID.
4. When the user clicks on the `signin` button, Teams opens a popup window and navigates it to the start page.
5. The start page redirects the user to the identity provider's `authorize` endpoint. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/public/html/auth-start.html#L51-L56))
6. On the provider's site, the user signs in and grants access to the bot.
7. The provider takes the user to the bot's OAuth redirect page, with an authorization code.
8. The bot redeems the authorization code for an access token, and **provisionally** associates the token with the user that initiated the signin flow.
    * In the example, the bot uses information in the OAuth `state` parameter to determine the id of the user that started the signin process. Before proceeding, it checks `state` against the expected value, to detect forged requests. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/AuthBot.ts#L70-L99))
    * **IMPORTANT**: The bot puts the token in user's data store, but it is marked as "pending validation". The token is not used while in this state. The user has to "complete the loop" first by sending a verification code in Teams. This is to ensure that the user who authorized the bot with the identity provider is the same user who is chatting in Teams. This guards against "man-in-the-middle" attacks. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/AuthBot.ts#L100-L113))
9. The OAuth callback renders a page that calls `notifySuccess("<verification code>")`. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/master/src/views/oauth-callback-success.hbs))
10. Teams closes the popup and sends the string given to `notifySuccess()` back to the bot. The bot receives an invoke message with `name` = `signin/verifyState`.
11. The bot checks the incoming verification code against the code stored in the user's provisional token. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L127-L140))
12. If they match, the bot marks the token as validated and ready for use. Otherwise, the auth flow fails, and the bot deletes the provisional token.

## Mobile clients

As of February 2018, the Microsoft Teams mobile clients do not fully support the `signin` action protocol:

* If the URL provided to the `signin` action has a `fallbackUrl` query string parameter, Teams will launch that URL in the browser.
* Otherwise, Teams will show an error saying that the action is not yet supported on mobile.

In the example, the mobile signin flow works the same way as on the desktop, until the point where the OAuth callback page tries to send the verification code back to the bot. The bot sets the `fallbackUrl` query string parameter to be the same as the original url to the auth start page, so that the user goes to the same page on all platforms. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L173-L178))

When the OAuth callback runs in a mobile browser, the call to `notifySuccess()` will fail silently because it's not running inside the Teams client. The window will not close and the bot won't get the verification code. To handle this case, the page has a timer that checks if it's still open after 5 seconds. If so, it asks the user to manually send the verification code via chat. The bot code is able to receive the verification code from either the `signin/verifyState` callback or a chat message. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L106-L117))

If you want to limit signing in to web and desktop only, you can choose to omit the `fallbackUrl` parameter, or point it to your own error page that asks the user to sign in on web or desktop.

Once the Microsoft Teams mobile clients support the complete signin protocol, including passing the verification code via `notifySuccess()`, they will launch the auth start page in a popup window and ignore `fallbackUrl`.