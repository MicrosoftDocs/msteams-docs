---
title: SSO for API-based message extensions
author: v-ypalikila
description: Learn how to enable Microsoft Entra SSO authentication, register a new app, configure access token, API scopes, and authorize client application.
ms.localizationpriority: medium
ms.topic: concept-article
ms.author: anclear
ms.date: 07/16/2024
---

# Enable SSO for API-based message extensions

Single sign-on (SSO) authentication method for API based message extension uses an app user's Teams identity to provide them with access to your app. A user who has signed into Teams doesn't need to sign in again to your app within the Teams environment. Microsoft Entra SSO enables the app to silently obtain a user token that is issued for its resource by Microsoft Entra. The app can then authenticate this token and retrieve the user profile information without the user's consent.

## Prerequisites

Before you start, ensure you have the following:

* An Azure account with an active subscription.
* Basic familiarity with Microsoft Entra ID and Teams app development.

The following image shows how SSO works when a Teams app user attempts to access API-based message extension app:

:::image type="content" source="../assets/images/Copilot/api-me-entra-sso.png" alt-text="Screenshot shows how Microsoft Entra SSO authorization works to authenticate API-based message extension." lightbox="../assets/images/Copilot/api-me-entra-sso.png" :::

* The user invokes the API-based message extension app within Teams and invokes a command that requires authentication.
* The app sends a request to the Teams backend service with the app ID and the required scope (`access_as_user`).
* The Teams backend service checks if the user consented to the app and the scope. If not, it shows a consent screen to the user.
* If the user consents, Microsoft Entra generates an access token for the user and the app, and sends it to the app in the authorization header of the request.
* The app validates the token and extracts the user information from the token, such as the name, email, and object ID.
* After successful authentication, user is grated access to the API-based message extension.

To enable SSO authentication for API-based message extension, follow these steps:

* [Register a new app in Microsoft Entra ID](#register-a-new-app-in-microsoft-entra-id).
* [Configure scope for access token](#configure-scope-for-access-token).
* [Authenticate token](#authenticate-token).
* [Update app manifest](#update-app-manifest).

## Register a new app in Microsoft Entra ID

1. Open the [Azure portal](https://ms.portal.azure.com/) on your web browser.

2. Select the **App registrations** icon.

   :::image type="content" source="../assets/images/authentication/teams-sso-tabs/azure-portal.png" alt-text="Screenshot shows the Microsoft Entra admin center page.":::

   The **App registrations** page appears.

3. Select **+ New registration** icon.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-registrations.png" alt-text="Screenshot shows you the new registration page on Microsoft Entra admin center.":::

    The **Register an application** page appears.

4. Enter the name of your app that you want to be displayed to the app user. You can change the name at a later stage if you want to.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/register-app.png" alt-text="Screenshot shows you the app registration page on Microsoft Entra admin center.":::

5. Select the type of user account that can access your app. You can select from single or multitenant options in organizational directories, or restrict the access to personal Microsoft accounts only.

    <details>
    <summary><b>Options for supported account types</b></summary>

    | Option | Select this to... |
    | --- | --- |
    | Accounts in this organizational directory only (Microsoft only - Single tenant) | Build an application for use only by users (or guests) in your tenant. <br> Often called custom app built for your org (LOB app), this app is a single-tenant application in the Microsoft identity platform. |
    | Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) | Let users in any Microsoft Entra tenant use your application. This option is appropriate if, for example, you're building a SaaS application, and you intend to make it available to multiple organizations. <br> This type of app is known as a multitenant application in the Microsoft identity platform.|
    | Accounts in any organizational directory (Any Microsoft Entra ID tenant - Multitenant) and personal Microsoft accounts (for example, Skype, Xbox) | Target the widest set of customers. <br> By selecting this option, you're registering a multitenant application that can support app users who have personal Microsoft accounts also. |
    | Personal Microsoft accounts only | Build an application only for users who have personal Microsoft accounts. |

    </details>

    > [!NOTE]
    > You don't need to enter **Redirect URI** for enabling SSO for an API-based message extension app.

7. Select **Register**.
    A message pops up on the browser stating that the app was created.

    :::image type="content" source="../assets/images/Copilot/api-me-entra-sso-register.png" alt-text="Screenshot shows an example of the notification after the app registration is successful on Azure portal.":::

    The page with app ID and other app details is displayed.

    :::image type="content" source="../assets/images/Copilot/api-me-entra-sso-app-details.png" alt-text="Screenshot shows the app details page in Azure portal.":::

8. Note and save the app ID from **Application (client) ID** to update the app manifest later.

    Your app is registered in Microsoft Entra ID. You now have the app ID for your API-based message extension app.

## Configure scope for access token

After you've created a new app registration, configure scope (permission) options for sending access token to Teams client, and authorizing trusted client applications to enable SSO.

To configure scope and authorize trusted client applications, you must:

* [Add App ID URI](#app-id-uri): Configure scope (permission) options for your app. Expose a web API and configure the app ID URI.
* [Configure API scope](#configure-api-scope): Define scope for the API, and the users who can consent for a scope. You can let only admins provide consent for higher-privileged permissions.
* [Configure authorized client application](#configure-authorized-client-application): Create authorized client IDs for applications that you want to preauthorize. It allows the app user to access the app scopes (permissions) you've configured, without requiring any further consent. Preauthorize only those client applications you trust as your app users don't have the opportunity to decline consent.

### App ID URI

1. Select **Manage** > **Expose an API** from the left pane.

    The **Expose an API** page appears.

1. Select **Add** to generate app ID URI in the form of `api://{AppID}`.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-expose-api.png" alt-text="Screenshot shows you how to set app ID URI.":::

    The section for setting app ID URI appears.

1. Enter the **Application ID URI** in the format explained here.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-app-id-uri.png" alt-text="Screenshot shows you the App ID URI in Microsoft Entra ID.":::

    * The **Application ID URI** is prefilled with app ID (GUID) in the format `api://{AppID}`.
    * The app ID URI format must be: `api://fully-qualified-domain-name.com/{AppID}`.
    * Insert the `fully-qualified-domain-name.com` between `api://` and `{AppID}` (which is, GUID). For example, api://example.com/{AppID}.

    > [!IMPORTANT]
    >
    > * If you're building a standalone bot, enter the app ID URI as api://botid-{YourBotId}. Here, {YourBotId} is your Microsoft Entra app ID.
    > * If you're building an app with a bot, a message extension, and a tab, enter the app ID URI as api://fully-qualified-domain-name.com/botid-{YourClientId}, where {YourClientId} is your bot app ID.
    > * If you're building an app with a message extension or tab capabilities without the bot,  enter the app ID URI as api://fully-qualified-domain-name.com/{YourClientId}, where {YourClientId} is your Microsoft Entra app ID.
    > * **Application ID URI for app with multiple capabilities**: If you're building an API-based message extension, enter the app ID URI as `api://fully-qualified-domain-name.com/{YourClientId}`, where {YourClientId} is your Microsoft Entra app ID.
    > * **Format for domain name**: Use only lower case letters for domain name.

1. Select **Save**.

    A message pops up on the browser stating that the app ID URI was updated.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/app-id-uri-msg.png" alt-text="Screenshot shows you the app ID URI message.":::

    The app ID URI displays on the page.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-app-id-uri-final.png" alt-text="Screenshot shows you the app ID URI updated.":::

1. Note and save the app ID URI to update the app manifest later.

### Configure API scope

> [!NOTE]
>
> * API-based message extension supports only the **access_as_user** scope.
> * The API receives a Microsoft Entra access token with the scope set to `access_as_user` as registered in the Azure portal. However, the token isn't authorized to call any other downstream APIs, such as Microsoft Graph.

1. Select **+ Add a scope** in the **Scopes defined by this API** section.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/select-scope.png" alt-text="Screenshot shows you the select scope option.":::

    The **Add a scope** page appears.

1. Enter the details for configuring scope.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/add-scope.png" alt-text="The screenshot shows how to add scope details in Azure.":::

    1. Enter the scope name. This field is mandatory.
    2. Select the user who can give consent for this scope. The default option is **Admins only**.
    3. Enter the **Admin consent display name**. This field is mandatory.
    4. Enter the description for admin consent. This field is mandatory.
    5. Enter the **User consent display name**.
    6. Enter the description for user consent description.
    7. Select the **Enabled** option for state.
    8. Select **Add scope**.

    A message pops up on the browser stating that the scope was added.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/scope-added-msg.png" alt-text="Screenshot shows you the scope added message.":::

    The new scope you defined displays on the page.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-scopes.png" alt-text="Screenshot shows an example of the scope added to the app in Azure portal.":::

### Configure authorized client application

1. Move through the **Expose an API** page to the **Authorized client application** section, and select **+ Add a client application**.

    :::image type="content" source="../assets/images/authentication/teams-sso-tabs/auth-client-apps.png" alt-text="Screenshot shows you the authorized client application.":::

    The **Add a client application** page appears.

1. Enter the appropriate Microsoft 365 client ID for the applications that you want to authorize for your app’s web application.

    :::image type="content" source="../assets/images/Copilot/api-based-me-entra-sso-client-app.png" alt-text="Screenshot shows the Client ID and Authorized scopes option to add a client application to the app in Azure portal.Add a client application":::

    > [!NOTE]
    >
    > The Microsoft 365 client IDs for mobile, desktop, and web apps for Teams are the actual IDs that you must add.

    1. Select one of the following client IDs:

       | Use client ID | For authorizing... |
       | --- | --- |
       | 1fec8e78-bce4-4aaf-ab1b-5451cc387264 | Teams mobile or desktop app |
       | 5e3ce6c0-2b1f-4285-8d4b-75ee78787346 | Teams web app |

    1. Select the app ID URI you created for your app in **Authorized scopes** to add the scope to the web API you exposed.

    1. Select **Add application**.

       A message pops up on the browser stating that the authorized client app was added.

       :::image type="content" source="../assets/images/authentication/teams-sso-tabs/update-app-auth-msg.png" alt-text="Screenshot shows you the client application added message.":::

       The authorized app's client ID displays on the page.

       :::image type="content" source="../assets/images/authentication/teams-sso-tabs/client-app-added.png" alt-text="Screenshot shows you the client app added.":::

> [!NOTE]
> You can authorize more than one client application. Repeat the steps of this procedure for configuring another authorized client application.

You've successfully configured app scope, permissions, and client applications. Ensure that you note and save the app ID URI. Next, you configure the access token version.

## Authenticate token

When the message extension calls the API during authentication, it receives a request with the user’s access token. The message extension then adds the token in the authorization header of the outgoing HTTP request. The header format is `Authorization: Bearer <token_value>`. For example, when a message extension makes an API call to a service that requires authentication. The extension constructs an HTTP request as follows:

```http
GET /api/resource HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

After the API-based message extension gets a request header with token, perform the following steps:

* **Authenticate**: Verify the token for the audience, scope, issuer, and signature claims to check if the token is for your app. For more claims, see [ID token claims](/entra/identity-platform/access-tokens#validate-tokens).

  The following example shows the JSON Web Token (JWT) with a header and response:

  # [Token V2](#tab/token-v2)

  ```json
  {
  "typ": "JWT",
  "rh": "0.AhoAv4j5cvGGr0GRqy180BHbR6Rnn7s7iddIqxdA7UZsDxYaABY.",
  "alg": "RS256",
  "kid": "q-23falevZhhD3hm9CQbkP5MQyU"
  }.{
    "aud": "00000002-0000-0000-c000-000000000000",
    "iss": "https://login.microsoftonline.com/72f988bf-86f1-41af-91ab-2d7cd011db47/v2.0",
    "iat": 1712509315,
    "nbf": 1712509315,
    "exp": 1712513961,
    "aio": "Y2NgYEjJqF0stqv73u41a6ZmxPEvBgA=",
    "azp": "1fec8e78-bce4-4aaf-ab1b-5451cc387264",
    "azpacr": "0",
    "name": "John Doe",
    "oid": "00000000-0000-0000-0000-000000000000",
    "preferred_username": "john.doe@contoso.com",
    "rh": "I",
    "scp": "access_as_user",
    "sub": "e4uM7JgAEm08GBuasSltQjvPuMX1fR5TqxopJpqZJB8",
    "tid": "12345678-aaaa-bbbb-cccc-9876543210ab",
    "uti": "h7DMQwSPAEeiEe62JJUGAA",
    "ver": "2.0"
    }
  ```

  # [Token V1](#tab/token-v1)

  ```json
  {
  "typ": "JWT",
  "rh": "0.AhoAv4j5cvGGr0GRqy180BHbR6Rnn7s7iddIqxdA7UZsDxYaABY.",
  "alg": "RS256",
  "kid": "q-23falevZhhD3hm9CQbkP5MQyU"
  }.{
    "aud": "api://00000002-0000-0000-c000-000000000000",
    "iss": "https://sts.windows.net/{tenantid}/",
    "iat": 1537231048,
    "nbf": 1537231048,
    "exp": 1537234948,
    "acr": "1",
    "aio": "AXQAi/8IAAAA",
    "amr": ["pwd"],
    "appid": "c44b4083-3bb0-49c1-b47d-974e53cbdf3c",
    "appidacr": "0",
    "ipaddr": "192.168.1.1",
    "name": "John Doe",
    "oid": "00000000-0000-0000-0000-000000000000",
    "scp": "access_as_user",
    "sub": "AAAAAAAAAAAAAAAAAAAAAIkzqFVrSaSaFHy782bbtaQ",
    "tid": "12345678-aaaa-bbbb-cccc-9876543210ab",
    "uti": "fqiBqXLPj0eQa82S-IYFAA",
    }
  ```

* **Use the token**: Extract the user information from the token, such as name, email, and object ID and use the token to call the message extension app's own API. For more information on claims reference with details on the claims included in access tokens, see [access token claims](/entra/identity-platform/access-token-claims-reference).

## Update app manifest

Update the following properties in the app manifest file:

* `webApplicationInfo`: The `webApplicationInfo` property is used to enable SSO for your app to help app users access your API-based message extension app seamlessly. The app ID URI that you registered in Microsoft Entra ID is configured with the scope of the API you exposed. For more information, see [webApplicationInfo](../resources/schema/manifest-schema.md#webapplicationinfo).

   &nbsp;&nbsp;:::image type="content" source="../assets/images/authentication/teams-sso-tabs/sso-manifest.png" alt-text="Screenshot shows the app manifest configuration.":::

* `microsoftEntraConfiguration`: Enables SSO authentication for your app. Configure the `supportsSingleSignOn` property to `true` to support SSO and reduce the need for multiple authentications. If the property is set to `false` or is left empty, the user can't upload the app to Teams and the app fails validation.

To configure app manifest:

1. Open the API-based message extension app.
2. Open the app manifest folder.

    > [!NOTE]
    >
    > * The app manifest folder should be at the root of your app folder. For more information, see [create a Microsoft Teams app package](../concepts/build-and-test/apps-package.md).
    > * For more information on learning how to create a manifest.json, see [the app manifest schema](../resources/schema/manifest-schema.md).

1. Open the `manifest.json` file.
1. Add the following code snippet into the `webApplicationInfo` section of your app manifest file:

    ```json
    "webApplicationInfo":
    {
    "id": "{Microsoft Entra AppId}",
    "resource": "api://subdomain.example.com/{Microsoft Entra AppId}"
    }
    ```

    where,
    * `{Microsoft Entra AppId}` is the app ID you created when you registered your app in Microsoft Entra ID. It's the GUID.
    * `api://subdomain.example.com/{Microsoft Entra AppId}` is the app ID URI that you registered when creating scope in Microsoft Entra ID.

1. Add the following code snippet into the `composeExtensions` section of your app manifest file:

    ```json
    "authorization": {
      "authType": "microsoftEntra",
      “microsoftEntraConfiguration”: {
        “supportsSingleSignOn”: true
      }
    },
    ```
  
1. Save the app manifest file.

For more information, see [composeExtensions.commands](../resources/schema/manifest-schema.md#composeextensionscommands).

## See also

* [Create API-based message extension](create-api-message-extension.md)
* [API key authentication](api-based-secret-service-auth.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
