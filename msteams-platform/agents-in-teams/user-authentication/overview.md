---
title: Accessing User Data and Services with Single Sign-On and OAuth 2.0
description: Overview of user authentication in Teams SDK applications, including OAuth, SSO, and secure resource access.
ms.topic: how-to
ms.date: 07/27/2026
---

# Accessing user data and services with OAuth and single sign-on

Many agent scenarios require an agent to interact with a service on a user's behalf, with their permission, to access their private data or accomplish tasks. Ideally, the user should be able to grant access without providing their personal login information or full access to their service account.

This is called *delegation*, and Teams agents can support it through an industry standard protocol called OAuth 2.0.

two different kinds:

general oauth: With OAuth, the agent directs the user to sign in a user signs in to an account using an OAuth identity provider (IdP) and confirms a

sso:
Teams agents can perform two kinds of OAuth delegation:

-

OAuth 2.0 is an industry-standard protocol for enabling users to grant access to their data without sharing their login information. With OAuth, the user logs in

- **OAuth 2.0**: Access functionality and user data in third-party services via external . The agent sends a link to the user, directing them to sign in to an OAuth identity provider (IdP), which is often a major
- - **Teams single sign-on (SSO)**:
-
- Enables  The user consents to the agent  Teams identity - the user's work or school account signed in to Teams - to access data and services in the Microsoft ecosystem, such as Graph, OneDrive and SharePoint. Usres

, users want agents to be able to access secure online resources on their behalf, such as their Microsoft 365 email or documents, or features of an account on an external service.

Agents can implement OAuth 2.0 and Teams single sign-on to access data and services on users' behalf, using their permissions.

**OAuth 2.0** enables a user to grant an agent access to data and operations in a third-party service on their behalf. The agent sends the user a link to sign in to the service using a supported identity provider. Af

**Single sign-on (SSO)** enables an agent to access data and perform actions within the Microsoft ecosystem using a user's Teams identity - the Entra ID user associated with their work or school account they use to log in to Teams. Unlike OAuth, the user doesn't need to sign in

Single sign-on enables users to delegate

 need to access users' data and services on their behalf can implement OAuth and Teams single sign-on to enable users to delegate access.

Teams agents can implement OAuth and Teams single-sign on to authenticate users and enable them to delegate access to secure resources.

Delegation enables agents to act on behalf of users by to grant Teams agents can enable users to grant them delegate access to secure resources

OAuth and Teams single-sign on enable agents to access secure resources on behalf of consenting users.

Teams agents can enable users to delegate access to secure resources, allowing the agent to access them on their behalf. If a scenario calls for an agent to access a user's

In some scenarios, users want agents to be able to access secure online resources on their behalf, such as their Microsoft 365 email or documents, or features of an account on an external service.

Teams agents can implement two kinds of user delegation:

- **OAuth delegation**: The agent sends the user a link to sign in to a service using an OAuth identity provider (IdP) that it supports, like Google, Facebook or GitHub. After the user signs in, the service confirms the user's consent for the agent to access data or perform certain operations.
- **Single sign-on (SSO)**: The user grants consent for the agent to  - their work or school account in Entra ID that they use to sign in to Teams. In SSO flows, users only need to provide consent and don't need to sign in, because they already authenticated by signing in to Teams. Users only need to grant consent once, and consent applies across all devices they use to access Teams.

With single sign-on, an agent can both authenticate a user and

OAuth supports Entra ID, but scenarios that call for Entra ID identities should generally use SSO.

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
