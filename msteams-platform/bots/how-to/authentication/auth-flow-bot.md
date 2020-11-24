---
title: Microsoft Teams Authentication flow for bots
description: Describes Microsoft Teams authentication flow in bots
keywords: teams authentication flow bots
ms.topic: overview
---

# Authentication flow for bots in Microsoft Teams

OAuth 2.0 is an open standard for authentication and authorization used by Azure Active Directory (Azure AD) and many other identity providers. A basic understanding of OAuth 2.0 is a prerequisite for working with authentication in Teams; [here's a good overview](https://aaronparecki.com/oauth-2-simplified/) that's easier to follow than the [formal specification](https://oauth.net/2/). Authentication flow for tabs and bots is a little different — tabs are very similar to websites so they can use OAuth 2.0 directly, while bots aren't and must do a few things differently — but the core concepts are identical.

See the GitHub repo [Microsoft Teams Authentication Sample](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)
for an example that demonstrates authentication flow for bots using Node.js and the [OAuth 2.0 authorization code grant type](https://oauth.net/2/grant-types/authorization-code/).

![Bot authentication sequence diagram](../../../assets/images/authentication/bot_auth_sequence_diagram.png)

1. The user sends a message to the bot.
2. The bot determines if the user needs to sign in.
    * In this example, the bot stores the access token in its user data store. It asks the user to sign in if it doesn't have a validated token for the selected identity provider. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/utils/AuthenticationUtils.ts#L58-L76))
3. The bot constructs the URL to the start page of the authentication flow, and sends a card to the user with a `signin` action. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L160-L190))
    * Like other application auth flows in Teams, the start page must be in a domain that's on your `validDomains` list, and in the same domain as the post-login redirect page.
    * **IMPORTANT**: The OAuth 2.0 authorization code grant flow calls for a `state` parameter in the authentication request which contains a unique session token to prevent a [cross-site request forgery attack](https://en.wikipedia.org/wiki/Cross-site_request_forgery). The example uses a randomly-generated GUID.
4. When the user selects the *signin* button, Teams opens a popup window and navigates to the start page.
> [!NOTE]
> The size of the pop-up window can be controlled through width and height query string parameters in the URL. For example if you add width=500 and height=500, you'll get a popup that's 500x500 pixels. Teams will show the pop-up window with the given pixel size, up to a maximum that's a percentage of the size of the main window.
5. The start page redirects the user to the identity provider's `authorize` endpoint. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/public/html/auth-start.html#L51-L56))
6. On the provider's site, the user signs in and grants access to the bot.
7. The provider takes the user to the bot's OAuth redirect page with an authorization code.
8. The bot redeems the authorization code for an access token, and **provisionally** associates the token with the user that initiated the sign-in flow. Below, we call this a *provisional token*.
    * In the example, the bot associates the value of the `state` parameter with the ID of the user that initiated the sign-in process so it can later match it with the `state` value returned by the identity provider. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/AuthBot.ts#L70-L99))
    * **IMPORTANT**: The bot stores the token it receives from the identity provider and associates it with a specific user, but it is marked as "pending validation". The provisional token can't be used yet; it must be further validated:
      1. **Validate what's received from the identity provider.** The value of the `state` parameter must be confirmed against what was saved earlier. 
      1. **Validate what's received from Teams.** A [two-step authentication](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) validation is performed to ensure that the user who authorized the bot with the identity provider is the same user who is chatting with the bot. This guards against [man-in-the-middle](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) and [phishing](https://en.wikipedia.org/wiki/Phishing) attacks. The bot generates a verification code and stores it, associated with the user. The verification code is sent automatically by Teams as described below. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/AuthBot.ts#L100-L113))
9. The OAuth callback renders a page that calls `notifySuccess("<verification code>")`. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/master/src/views/oauth-callback-success.hbs))
10. Teams closes the pop-up window and sends the `<verification code>` sent to `notifySuccess()` back to the bot. The bot receives an [invoke](/bot-framework/dotnet/bot-builder-dotnet-activities#invoke) message with `name = signin/verifyState`.
11. The bot checks the incoming verification code against the verification code stored with the user's provisional token. ([View code](https://github.com/OfficeDev/microsoft-teams-sample-auth-node/blob/469952a26d618dbf884a3be53c7d921cc580b1e2/src/dialogs/BaseIdentityDialog.ts#L127-L140))
12. If they match, the bot marks the token as validated and ready for use. Otherwise, the auth flow fails, and the bot deletes the provisional token.

> [!NOTE]
> If you experience issues with authentication on mobile, ensure your JavaScript SDK is updated to version 1.4.1 or later.

## Samples

For sample code showing the bot authentication process see:

* [Microsoft Teams bot authentication sample (Node.js)](https://github.com/OfficeDev/microsoft-teams-sample-auth-node)

## More details

For detailed implementation walkthroughs for bot authentication targeting Azure AD see:

* [Add authentication to your Teams bot](add-authentication.md)
