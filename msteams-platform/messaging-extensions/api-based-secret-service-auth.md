---
title: API secret service auth
author: surbhigupta
description: Learn how to enable API key authentication and register an API key for API_based message extensions.
ms.localizationpriority: medium
ms.topic: concept-article
ms.author: anclear
ms.date: 07/16/2024
---

# API key authentication

API key authentication is a method used to authenticate access to message extension apps using an API. It involves using a unique API key, which is passed with each API request to verify the identity of the user or app that initiates the request. The API key must be registered in Microsoft Teams and when a user interacts with a message extension, Teams uses the secret to authenticate with the API.

The following API key registration properties help secure the key and ensure it remains limited to the application:

* **Base URL**: Teams transmits the secret to URL endpoints that begin with the value in this field.
* **Target Tenant**: Limits API access to a specific Microsoft 365 tenant or any tenant.
* **App ID**: Limits the key access to a specific app or any app.
* **API key**: Authenticates access to the app.

Developers can [register an API key](#register-an-api-key) through Developer Portal for Teams, and generate an API key registration ID. [Update the app manifest](#update-app-manifest) with the `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property. This property must contain the API key registration ID returned when the API key is submitted through Developer Portal for Teams.

> [!NOTE]
> Developers must secure the API key registration ID as it can be retrieved from the Teams app manifest. For more information on securing the API key, see [best practices](#best-practices).

When an API request is initiated, the system retrieves the API key from an encrypted database and includes it in the authorization header using the bearer token scheme. The system sends the authorization header with the API key to the endpoint defined in the app manifest.

The following example shows the payload with the authorization header using the bearer token scheme:

```https
GET https://example.com/search?myQuery=test
Accept-Language: en-US
Authorization: Bearer <MY_API_KEY>
```

## Register an API key

To register an API key, follow these steps:

1. Go to **Tools** > **API key registration**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-registration.png" alt-text="Screenshot shows the API key registration option in Developer Portal for Teams.":::

1. Select **+ New API key**.

1. In the **API key registration** page, select **+ Add Secret**. The **Add an API key** dialog appears.

1. Enter a value for the key and select **Save**.

   > [!NOTE]
   > Developers can maintain up to two API keys. If one key must be replaced, it is possible to do so without service interruption, as Teams uses the other configured key during the update process.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-secret.png" alt-text="Screenshot shows Add an API key dialog to add API key for your app.":::

1. Under **API key name**, add a meaningful name for the API key. For example, API key for Contoso message extension.

1. Under **Base URL**, specify a common base URL for all API endpoints that must be called. This URL must start with https, include a fully qualified domain name, and optionally, a path. Teams transmits the key to URL endpoints that begin with the value in this field. For example, `https://api.yelp.com`.

   Base URL ensures that the key remains secure and is not transmitted to random endpoints, even if another app illicitly acquires the API key registration ID and incorporates it into its own app. If the URL registered in the API key configuration is not a prefix for the target endpoints defined in the OpenAPI spec, the call gets dropped.

   :::image type="content" source="../assets/images/Copilot/api-based-me-register-key-domain.png" alt-text="Screenshot shows the Description and Add domain options in the API key registration page in Developer Portal for Teams.":::

1. Under **Target tenant**, select any of the following:

   * **Home tenant**: The API key functions only within the tenant where it is registered.
   * **Any tenant**: The API key is usable in any tenant.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-tenant.png" alt-text="Screenshot shows the Home tenant and Any tenant options under Set a target tenant heading in Developer Portal for Teams.":::

1. Under **Target Teams app**, select any of the following:

   * **Existing Teams app**: The **Existing Teams app** option binds the API key registration ID to a specific Teams app.
   * **Any Teams app**: The API key can be used with any Teams app.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-teams-app.png" alt-text="Screenshot shows the Any Teams app and Existing Teams app options under Set a Teams app heading in Developer Portal for Teams.":::

   An **API key registration ID** is generated.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-reg-id.png" alt-text="Screenshot shows the API key registration ID generated in Developer Portal for Teams.":::

1. In Developer Portal for Teams, select **Apps** and choose an app to which the API key should be added.

1. Go to **App features** > **Message extension**.

1. Under **Authentication**, select **API key** and add the API key registration ID.

   :::image type="content" source="../assets/images/Copilot/api-based-me-auth-add-key.png" alt-text="Screenshot shows an example of the Authentication section with none and API key options in Developer Portal for Teams.":::

1. Select **Save**.

The API key registration ID is updated as the value for the `apiSecretRegistrationId` property in the app manifest. Developers can verify the API key registration ID in the app manifest in Developer Portal for Teams.

## Update app manifest

Add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property, which contains the reference ID when the API key is submitted through Developer Portal for Teams. For more information, see [composeExtensions.commands.](/microsoft-365/extensibility/schema/root-compose-extensions-commands)

```json
"composeExtensions": [
    {
      "composeExtensionType": "apiBased",
      "authorization": {
        "authType": "apiSecretServiceAuth",
        "apiSecretServiceAuthConfiguration": {
            "apiSecretRegistrationId": "9xxxxb0f-xxxx-40cc-xxxx-15xxxxxxxxx3"
        }
      },
```

## Best practices

* **API key**:
  * The API key must have at least 10 characters and at most 2048 characters.
  * After updating the API key, it takes up to one hour for the key to reflect throughout the system.

* **Base URL**:
  * The Base URL must begin with `https` to ensure secure communication.
  * Developers must include the full host name to specify the exact domain.
  * An optional path can be added to define a specific entry point for the API.

   This structure is crucial for the security of API key(s), as Teams sends the API key to endpoints that start with the specified Base URL.

* **Target tenant**: Developers testing within a Microsoft 365 tenant initially develop apps as custom apps built for an organization (LOB app) or custom apps. During testing, the API key must be registered with the **Home tenant** as the target tenant to ensure the key remains exclusive to the tenant.

  After testing is complete and the app manifest is ready for submission to Partner Center for Teams Store, the target tenant setting must be switched to **Any tenant**. This change allows the API key registration ID to be used across various tenants once the app is available in Teams Store.

* **Teams app ID**: Developers testing within a Microsoft 365 tenant initially deploy apps as custom apps built for an organization (LOB) or custom apps; the API key registration ID is set with the Teams app ID as **Any Teams app**. This configuration allows the key to be used with any Teams app uploaded as a custom app and custom apps built for an organization (LOB apps) to generate IDs after upload. The app's ID is not available at this stage.

  The key's security remains maintained through the **Home Tenant** and **Base URL**. When the app is released to the world, the Teams app ID setting must be changed to **Existing Teams app** and the Teams app ID entered. Finally, the app manifest is submitted to Partner Center for inclusion in Teams Store. The API key registration then becomes tied to a specific Teams app and cannot be used with others.

  For a custom app built for an organization (LOB) or custom app, an internal app ID is available which is difficult to access. In this scenario, configuration is limited to the tenant where the app is used. For other apps, the API key registration is linked with the published app ID after publishing to Teams Store.

## See also

* [Create API-based message extension](create-api-message-extension.md)
* [Configure your API based message extension in Microsoft Entra ID](api-based-microsoft-entra.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Enable OAuth authentication for API based message extension](api-based-oauth.md)