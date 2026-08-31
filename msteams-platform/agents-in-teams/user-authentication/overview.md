---
title: User Authentication
description: Overview of user authentication in Teams SDK applications, including OAuth, SSO, and secure resource access.
ms.topic: how-to
ms.date: 07/27/2026
---

# User Authentication

At times, agents must access secured online resources on behalf of a user, such as checking email, checking flight status, or placing an order. To enable this, the user must authenticate and grant consent for the application to use their identity. This process results in the application receiving a token, which it can then use to access the permitted resources on the user's behalf.

## Single sign-on (SSO) and OAuth

Teams supports two kinds of user authentication:

- **Single sign-on (SSO)**: The agent acts on behalf of a user by using their Teams identity - their work or school account in Entra ID that they use to sign in to Teams. In SSO flows, users only need to provide consent and don't need to sign in, because they already authenticated by signing in to Teams. Users only need to grant consent once, and consent applies across all devices they use to access Teams.
- **OAuth**: The agent acts on behalf of a user by sending them a link to sign in using an OAuth identity provider (IdP) like Google, Facebook or GitHub. OAuth supports Entra ID, but scenarios that call for Entra ID identities should generally use SSO.

| Feature                                                | OAuth                                                                              | SSO                                                                                                                                                                      |
| ------------------------------------------------------ | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Identity Provider                                      | Works with any OAuth provider (Microsoft Entra ID, Google, Facebook, GitHub, etc.) | Only works with Microsoft Entra ID                                                                                                                                       |
| Authentication Flow                                    | User is sent a card with a sign-in link                                            | If the user has already consented to the requested scopes in the past they will "silently" login through the token exchange flow. Otherwise user is shown a consent form |
| User Experience                                        | Requires explicit signin, and consent to scopes                                    | Re-use existing Teams credential. Only requires consent to scopes                                                                                                        |
| Conversation scopes (`personal`, `groupChat`, `teams`) | `personal` scope only                                                              | `personal` scope only                                                                                                                                                    |
| Azure Configuration differences                        | Same configuration except `Token Exchange URL` is blank                            | Same configuration except `Token Exchange URL` is set                                                                                                                    |

### SSO

SSO in Teams enables an agent to authenticate and authorize users with the work or school account they use to sign in to Teams. With SSO, users don't need to sign in again when an agent presents an authentication flow, they only need to provide a one-time consent that applies across devices.

When an access token expires, the app automatically initiates a token exchange flow. In this process:

1. The Teams client sends an OAuth ID token containing the user's information
2. Your app exchanges this ID token for a new access token with the previously consented scopes
3. This exchange happens silently without requiring user interaction

#### The SSO Signin Flow

The SSO signin flow involves several components working together. Here's how it works:

1. User interacts with your bot or message extension app
2. App initiates the signin process
3. If it's the first time:
   - User is shown a consent form for the requested scopes
   - Upon consent, Microsoft Entra ID issues an access token (in simple terms)
4. For subsequent interactions:
   - If token is valid, app uses it directly
   - If token expires, app silently signs the user in using the token exchange flow

This is what the SSO consent form looks like in Teams:

:::image type="content" source="../../assets/images/auth-consent-popup.png" alt-text="SSO Consent Form" lightbox="../../assets/images/auth-consent-popup.png" :::

### OAuth

You can use a third-party OAuth Identity Provider (IdP) to authenticate your app users. The app user is registered with the identity provider, which has a trust relationship with your app. When the user attempts to log in, the identity provider validates the app user and provides them with access to your app. Microsoft Entra ID is one such third party OAuth provider. You can use other providers, such as Google, Facebook, GitHub, or any other provider.

#### The OAuth Signin Flow

The OAuth signin flow involves several components working together. Here's how it works:

1. User interacts with your bot or message extension app
2. App sends a sign-in card with a link to the OAuth provider
3. User clicks the link and is redirected to the provider's authentication page
4. User authenticates and grants consent for requested scopes
5. Provider issues an access token to your app (in simple terms)
6. App uses the token to access services on user's behalf

When an access token expires, the user will need to go through the sign-in process again. Unlike SSO, there is no automatic token exchange - the user must explicitly authenticate each time their token expires.

#### The OAuth Card

This is what the OAuth card looks like in Teams:

:::image type="content" source="../../assets/images/auth-explicit-signin.png" alt-text="OAuthCard" lightbox="../../assets/images/auth-explicit-signin.png" :::
