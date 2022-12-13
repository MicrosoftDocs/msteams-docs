---
title: Add code to enable SSO
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Add code to enable SSO for your Adaptive Cards Universal Actions

Authentication steps for SSO are similar to that of a bot in Teams. Following are the steps to achieve SSO in Adaptive Cards Universal Action:

> [!NOTE]
> To implement SSO flow, you must have personal scope declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in personal scope if it isn't installed already.

## Prerequisites

> [!IMPORTANT]
> Before you add code to enable SSO, ensure that you've configured your app and bot resource in Azure AD portal. For more information, see [configured your app and bot resource in Azure AD portal](../../../bots/how-to/authentication/bot-sso-register-aad.md).

After you configure the client secret and OAuth connection setting for the app in Azure AD, you must configure the code with development environment variables. For more information, see [update development environment variables](../../../bots/how-to/authentication/bot-sso-code.md#update-development-environment-variables).

## Add code to handle an access token

> [!IMPORTANT]
> Ensure that you added the code to handle access token for your bot. For more information, see [add code to handle an access token](../../../bots/how-to/authentication/bot-sso-code.md#add-code-to-handle-an-access-token).

If there's a cached token, the bot uses the same token. If there's no token available, the bot creates an OAuthCard and places it in an invoke response with the values below, which includes a `tokenExchangeResource`:

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

Senders must include a `tokenExchangeResource` to designate a SSO operation.

> [!NOTE]
> Teams client triggers the nominal sign-in or OAuth flow when SSO fails. It is highly recommended that you provide sign in URL in the above response so that OAuth flow works.

This response is delivered through the channel to the client, which uses the `tokenExchangeResource` value and the client token to obtain an on-behalf-of token or exchangeable token from the Azure AD.

* Teams clients ignore the `tokenExchangeResource` value for any reason, including invalid values, errors retrieving exchangeable tokens, or not supporting the Azure AD.

* Clients that ignore the `tokenExchangeResource` should use the nominal sign-in flow.

## Consent dialog for getting access token

If the app user is using the Adaptive Card for the first time and user consent is required, the following dialog appears:

   :::image type="content" source="../../../assets/images/authentication/consent-sso-ac.png" alt-text="Screenshot shows you the consent dialog box.":::

Once the user selects **View and accept**, the existing Azure AD permission consent view is launched to show all the permissions and continue with the authentication flow.

## Add code to receive the token

The following are the steps to receive token:

> [!IMPORTANT]
> Ensure that your bot receives the invoke activity or token. For more information, see [add code to receive the token](../../../bots/how-to/authentication/bot-sso-code.md#add-code-to-receive-the-token).

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

    * Senders must include the `authentication` field with a token exchange resource.

1. The channel delivers this invoke to the bot, which uses the token to finalize the token exchange process with the Token Service and Azure AD. The Token Service delivers the user's access token to the bot.
   * Receivers ignore the authentication if the value is incorrect.
   * Receivers that experience an error performing token exchange must respond with an error or a second login request that doesn't include SSO information.
   * If the value in the `state` field is incorrect, the bot returns an error to the client as follows:

        ```javascript
           {
            "statusCode": 412,
            "type": "application/vnd.microsoft.error.preconditionFailed",
            "value": { ... error ... }
            }
        ```

1. The bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the client, either a card or a message.

> [!NOTE]
> To handle the access token in case the app user logs out, see [handle app user log out](../../../bots/how-to/authentication/bot-sso-code.md#handle-app-user-log-out).

## Next step

> [!div class="nextstepaction"]
> [Update your Teams application manifest for your bot](../../../bots/how-to/authentication/bot-sso-manifest.md)

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [SSO for your Adaptive Cards Universal Actions](enable-sso-for-your-adaptive-cards-universal-action.md)
* [Enable SSO for your Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)
