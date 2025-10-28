---
title: Connected authentication for Teams agents and apps
description: Learn how to implement, configure connected authentication in Microsoft Teams agents and app.
ms.date: 06/10/2025
ms.topic: conceptual
author: surbhigupta
ms.author: surbhigupta
ms.localizationpriority: medium
---

# Connected authentication for Teams

[Add introduction]

Connected authentication enables you to unify sign-in process for Teams agents and bot and tab apps.

- Efficient developer experience: Developers can implement a single authentication and setup flow. Enabling connected authentication minimizes redundant code and fragmented user onboarding.
- Enhanced security: Managing authentication centrally ensures compliance with organizational policies and enables advanced security features like multi-factor authentication.

## Prerequisites

- Account linking URL: This url must be hosted by the app. Teams will rendered the URL using a task module in an embedded iframe. An example for the account URL can look like `Myapp.com/linkWithMicrosoft`.
- NAA-based Proof Key for Code Exchange (PKCE) authentication flow for tab app authentication

## Connected authentication at run time

User scenario:

1. As a developer, I build apps for Teams for my organization.
1. The Contoso app includes both bot and tab capabilities. The app user must log in separately.
1. I want to the app users to log in only once...
1. ... but be able access all capabilities.

With connected authentication, apps with multiple capabilities require the users to log in only once. Following successful consent and authentication, users are able to access all app capabilities successfully:

**Step 1**: App Installation and Initial Access

- The user installs the Teams app and opens the app.
- Teams loads the bot chat as the first user interaction.

**Step 2**: Bot Authentication Prompt

- The user is prompted to sign in to the bot.
- At sign-in, the app opens a task module and an authentication popup for the bot login flow.

**Step 3**: Completing Bot Authentication

- The user completes the bot authentication process.
- The app notifies the user of successful authentication within Teams.

**Step 4**: Initiating Account Linking with Entra NAA

- Immediately after bot authentication, the app shows the user an option to link their account with Microsoft Entra NAA.
- If the user consents to the account linking process, the app triggers the NAA authentication flow.

**Step 5**: Linking Accounts and Token Exchange

- The NAA consent dialog appears. When the user gives consent, the app receives an NAA token for the user.
  - The app backend uses both the bot token and the NAA token to link the user’s profiles.
  - This linkage ensures that the user’s authentication is unified and persistent.

**Step 6**: Seamless Future Logins

- In future sessions, the user benefits from silent, automatic login using the linked NAA token.
- The user doesn't need to log in separately for the bot and tab capabilities and can enjoy a streamlined and consistent experience across the app.

**Key highlights for users**:

- Unified user experience: Users authenticate once and gain access to all app capabilities, reducing confusion and repetitive logins.

- Consistent Onboarding: Connected authentication flow ensures that all users meet minimum setup requirements before accessing app features. Following onboarding, the user experiences increased reliability and lesser support issues.

- Persistent Login: Account linking with Entra Nested app authentication (NAA) ensures that the user stays logged in, even if the primary login method expires.

- Seamless Access: Connected authentication achieves smoother app transactions and interactions as bot and tab capabilities recognize the user through the linked tokens.

**Flow-chart steps**:

1. A user installs and opens the app.
1. The user navigates to bot chat and sees the sign-in prompt.
1. The app initiates bot sign-in, which opens a task module and external auth popup.
1. The bot app completes bot auth; prompted to link account with Microsoft NAA.
1. The app proceeds with account linking, consents to NAA dialog, and receives NAA token.
1. The app uses the NAA token is used to authenticate and create a new profile.
1. The app updates the backend links for the bot and NAA profiles for unified authentication.
1. Task module closes, and user is authenticated for both tab and bot.

## Developer experience

[Add introduction]

Notes for flow infographic:

- High-level diagram or description of the authentication flow.
- Show the main actors (user, app, authentication providers, backend services).
- Explain how tokens are issued, exchanged, and linked.

## Enable connected authentication

This section describes the tasks involved in implementing connected authentication within Teams. These tasks are language- and framework-agnostic.

To enable connected authentication for a Teams app that includes bot and tab capabilities:

1. Configure app with Microsoft Entra ID: For more information, see [tabs](../../tabs/how-to/authentication/tab-sso-register-aad.md) and [bots](../../bots/how-to/authentication/bot-sso-register-aad.md).

1. Backend requirements

    - secure token management and storage
    - NAA API and other APIs for linking and validating account
    - Integration with IdP (Azure, Auth0)

1. Build user experience to trigger authentication

    - UI prompts for authentication and account linking
    - Handle redirection, popups, and consent dialog for users

1. Security requirements

    - Token validation
    - handle third-party cookies and authentication across domains

## Add code for connected authentication

To implement backend logic for token management and account linking:

1. Obtain and save the NAA token:

    1. After the app receives user consent, call the NAA Auth API to receive NAA token.
    1. Save the received NAA token securely in a cookie for subsequent flows.

1. Trigger the tab auth flow:

    1. Configure `connectionName` as `microsoftEntraCustom` for NAA-based tab auth flow.
    1. Use the `MicrosoftTeams.authentication.authenticate` API to trigger tab auth flow in a popout window.
    1. Ensure that the authentication URL reads the NAA token that you've saved in a cookie.
    1. Validate the cookie and perform PKCE code exchange.
    1. Create a user profile for the NAA user who gave the consent.

1. Link NAA user profile with bot auth profile: This process ensures that the user's session in the tab is securely authenticated using the token generated by the backend, enabling seamless access to protected resources without requiring repeated logins.

    1. After a user successfully authenticates using the NAA flow, the backend (server-side part of the app) generates an access token. This token is a secure credential that proves the user's identity and grants access to resources.
    1. The app must store the access token in a cookie associated with the tab authentication flow.
    1. As part of the authentication process, the user is redirected (sent) to a specific page after logging in. During this redirect, the app sets the cookie containing the access token so that subsequent requests from the tab (the part of the app running in Microsoft Teams or a similar environment) are authenticated automatically.

    After the user completes authentication with Microsoft Entra (NAA), the backend system of the app generates a secure access token.

    - This token represents the user’s authenticated session for the NAA-based login. This access token is used to verify the user’s identity and grant access to protected resources in the Teams tab.
    - During the auth redirect, the user is sent back to the app after successful login. The backend sends this access token to the user’s browser by setting it in a cookie.
    - The Teams tab can now use this cookie to automatically authenticate the user in future interactions. It enables a seamless experience without repeated logins.

    Here's an example code snippet to fetch the bot auth flow from the token service:

    ```JavaScript
    import { App } from '@microsoft/teams.apps';

    const app = new App({
        clientId: process.env.ENTRA_CLIENT_ID,
        clientSecret: process.env.ENTRA_SECRET_ID,
    });
    await app.start();
    const res = await app.api.users.token.get({
        userId: "aad-user-id",
        connectionName: "auth0",
    });

    const bearer = res.token;
    ```

Post authentication the account linking page must call the backend to link the NAA based profile with the bot auth Profile.

1. Link account to enable persistent login:
    1. After successful authentication for both tab (NAA) and bot, the app account linking dialog must send a request to backed to link the tab and bot accounts along with the tokens.
    1. The backend must receive the NAA token and the bot access token.
    1. After the tokens are available, the app must unify the profiles in one.
    1. The app must use the microsftEntraCustom as the login connection for future silent login.

  Linking these profiles means that the user’s identity is unified across both the bot and tab capabilities. The user enjoys a persistent, unified login experience across the Teams app.

### Build user experience to trigger authentication

Design the user experience to ensure smooth and seamless one-time authentication process for the app users. The user experience must trigger the authentication flow to seek user consent for account linking, popups dialogs, and redirection.
