---
title: Add code to enable SSO for your Adaptive Cards Universal Actions
description: In this module, learn about how to enable SSO for your Adaptive Cards Universal Actions.
author: v-sdhakshina
ms.topic: conceptual
ms.localizationpriority: medium
---

# Add code to enable SSO for your Adaptive Cards Universal Actions

Authentication steps for single sign-on (SSO) are similar to that of a bot in Teams. Following are the steps to achieve SSO in Adaptive Cards Universal Action.

> [!NOTE]
> To implement SSO flow, you must have a personal scope declared for your bot in the app manifest. When a user invokes the SSO flow via the Adaptive Card `Action.Execute` protocol, the user is prompted to install the app in a personal scope if it isn't installed already.

## Add code to handle an access token

If there's a cached token, the bot uses the same token. If there's no token available, the bot creates an OAuth card and places it in an invoke response with the following values that includes a `tokenExchangeResource`:

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

Teams client must include a `tokenExchangeResource` to designate an SSO operation.

> [!NOTE]
> Teams client triggers the nominal sign-in or OAuth flow when SSO fails. It's highly recommended that you provide a sign-in URL in the above response so that the OAuth flow works.

This response is delivered through the channel to the client, which uses the `tokenExchangeResource` value and the client token to obtain an on-behalf-of token or exchangeable token from the Azure Active Directory (Azure AD).

* Teams clients ignore the `tokenExchangeResource` value for any reason, including invalid values, errors retrieving exchangeable tokens, or not supporting the Azure AD.

* Teams clients that ignore the `tokenExchangeResource` must use the nominal sign-in flow.

## Consent dialog for getting access token

If the app user is using an Adaptive Card for the first time and user consent is required, the following dialog appears:

   :::image type="content" source="../../../assets/images/authentication/consent-sso-ac.png" alt-text="Screenshot shows you the consent dialog box.":::

Once the user selects **View and accept**, the existing Azure AD permission consent view is launched to show all the permissions and continue with the authentication flow.

## Add code to receive the token

The following are the steps to receive token:

1. Teams client sends the original `adaptiveCard/action` again to the bot along with the token as follows:

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

    * Teams client must include the `authentication` field with a token exchange resource.

1. Teams client sends an invoke response with an OAuth card in response to `adaptiveCard/action` as follows:.

    ```csharp
            protected override async Task<InvokeResponse> OnInvokeActivityAsync(ITurnContext<IInvokeActivity> turnContext, 
         CancellationToken cancellationToken)
            {
              JObject value = JsonConvert.DeserializeObject<JObject>
              (turnContext.Activity.Value.ToString());
              JObject authentication = null;
              if (value["authentication"] != null)
              {
              authentication = JsonConvert.DeserializeObject<JObject>(value["authentication"].ToString());
              }
            }
    ```

1. The channel delivers this invoke to the bot, which uses the token to finalize the token exchange process with the Token Service and Azure AD. The Token Service delivers the user's access token to the bot.
   * Receivers ignore the authentication if the value is incorrect.
   * Receivers that experience an error while performing token exchange must respond with an error or a second sign-in request that doesn't include SSO information. If responding with an error, the error must be:

        ```javascript
         {
          "statusCode" = 412,
          "type" = "application/vnd.microsoft.error.preconditionFailed",
          "value" = {
            "code" = "412",
            "message" = "authentication token expired"    }
            }
        ```

   * When SSO fails, the Teams client shows a sign-in button in the card footer to initiate nominal sign-in flow.

1. The bot uses the access token on behalf of the user to perform its actions.
1. The bot returns a non-error response to the Teams client, either a card or a message.

> [!NOTE]
> To handle the access token in case the app user logs out, see [handle app user log out](../../../bots/how-to/authentication/bot-sso-code.md#handle-app-user-log-out).

## Code sample

| **Sample name** | **Description** | **C#** | **JavaScript** | **Node.js** |
| --- | --- | --- | --- | --- |
| SSO for your Adaptive Cards Universal Actions | This sample code demonstrates how to enable SSO authentication for your Adaptive Cards Universal Actions in bot. | [Link to be added] | [Link to be added] | [Link to be added] |

## See also

* [Work with Universal Actions for Adaptive Cards](Work-with-Universal-Actions-for-Adaptive-Cards.md)
* [SSO for your Adaptive Cards Universal Actions](enable-sso-for-your-adaptive-cards-universal-action.md)
* [Enable SSO for your Adaptive Cards Universal Actions](sso-adaptive-cards-universal-action.md)
