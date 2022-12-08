---
title: Enable SSO for your Adaptive Cards Universal Actions
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Enable SSO for your Adaptive Cards Universal Actions

Authentication steps for SSO are similar to that of a bot or tab in Teams. Following are the steps to achieve SSO in Adaptive Cards Universal Action:

> [!NOTE]
> To implement SSO flow, you must have personal scope declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in personal scope if it isn't already installed.

1. Before you add code to enable SSO, ensure that you've configured your app and bot resource in Azure AD portal. For more information, see [configured your app and bot resource in Azure AD portal](../../../bots/how-to/authentication/bot-sso-register-aad.md).
1. After you configured the client secret and OAuth connection setting for the app in Azure AD. You must configure the code with development environment variables. For more information, see [Update development environment variables](../../../bots/how-to/authentication/bot-sso-code.md#update-development-environment-variables).
1. Add the code to handle access token to send this token to your app's server code in the Authorization header, and to validate the access token when it's received. For more information, see [Add code to handle an access token](../../../bots/how-to/authentication/bot-sso-code.md#add-code-to-handle-an-access-token).
1. If the app user is using the application for the first time and user consent is required, the following dialog box appears:

   :::image type="content" source="../../../assets/images/authentication/consent-sso-ac.png" alt-text="Screenshot shows you the consent dialog box.":::

   * Once the user clicks on **View and accept**, the existing Azure AD permission consent view launched to show all the permissions and continue with the authentication flow.

1. If there's a cached token, the bot can use the same token. If there's no token available, the bot creates an OAuthCard and places it in an Invoke Response with the values below, which include a `tokenExchangeResource`:

    ```JSON
       {
      "statusCode": 401,
      "type": "application/vnd.microsoft.activity.loginRequest",
      "value": {
        "text": "Please sign-in",
        "connectionName": "<configured-connection-name>",
        "tokenExchangeResource": {
          "id": "<unique-indentifier>",
          "uri": "<application-or-resource-identifier>",
          "providerId": "<optional-provider-identifier>"
        },
        "buttons": [
          {
            "title": "Sign-In",
            "text": "Sign-In",
            "type": "signin",
            "value": "<sign-in-URL>"
          }
        ]
      }
    }
    
    ```

   * Senders must include a `tokenExchangeResource` to designate a single sign-on operation.

   > [!NOTE]
   > Teams client will trigger the nominal sing-on or OAuth flow when SSO fails. It is highly recommended that you provide sign in URL in the above response so that OAuth flow works.

1. The client resend the original `adaptiveCard/action` to the bot along with the token as follows:

    ```javascript
    {
      "type": "invoke",
      "name": "adaptiveCard/action"
      "value": {
         "action": {
            "id": "abc123",
            "type": "Action.Execute",
            "verb": "saveCommand",
            "data": {
               "firstName": "Jeff",
               "lastName": "Derstadt"
            }
         },
      "authentication": {
         "id": "8769-xyz",
         "connectionName": "oauthConnection",
         "token": "...single sign-on token..."
      }
      }
    }
    ```

    * Senders must include the authentication field with a token exchange resource.

1. [Update your Teams application manifest for your bot](../../../bots/how-to/authentication/bot-sso-manifest.md)
