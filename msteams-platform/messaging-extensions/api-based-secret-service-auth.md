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

API key authentication authenticates access to your message extension app using an API. It uses a unique API key that is passed with each API request to verify the identity of the user or app initiating the request. The API key must register in Microsoft Teams, and when a user interacts with your message extension, Teams uses the secret to authenticate with your API.

The following API key registration properties secure your key and ensure its limitation to your application:

* **Base URL**: Teams transmits the secret to URL endpoints that begin with the value in this field.
* **Target Tenant**: Limit API access to your Microsoft 365 tenant or any tenant.
* **App ID**: Limit key access to a specific app or any app.
* **API key**: Authenticate access to your app.

You can [register an API key](#register-an-api-key) through Developer Portal for Teams and generate an API key registration ID. [Update the app manifest](#update-app-manifest) with the `apiSecretServiceAuthConfiguration` object containing an `apiSecretRegistrationId` property. This property contains the API key registration ID returned when you submit the API key through Developer Portal for Teams.

> [!NOTE]
> Secure the API key registration ID as it can retrieve from the Teams app manifest. For more information on securing your API key, see [best practices](#best-practices).

When an API request initiates, the system retrieves the API key from an encrypted database and includes it in the authorization header using the bearer token scheme. The system sends the authorization header with the API key to the endpoint defined in the app manifest.

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
   > Maintain up to two API keys. If replacement is necessary, update one without service interruption because Teams uses the other configured key during the update process.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-secret.png" alt-text="Screenshot shows Add an API key dialog to add API key for your app.":::

1. Under **API key name**, add a meaningful name for the API key. For example, API key for Contoso message extension.

1. Under **Base URL**, specify a common base URL for all API endpoints that must call. This URL must start with https, include a fully qualified domain name, and optionally, a path. Teams transmits the key to URL endpoints that begin with the value in this field. For example, `https://api.yelp.com`.

   Base URL ensures the key remains secure and does not leak to random endpoints, even if another app illicitly acquires the API key registration ID and incorporates it into its own app. If the URL registered in the API key configuration does not prefix the target endpoints defined in the OpenAPI spec, the call gets dropped.

   :::image type="content" source="../assets/images/Copilot/api-based-me-register-key-domain.png" alt-text="Screenshot shows the Description and Add domain options in the API key registration page in Developer Portal for Teams.":::

1. Under **Target tenant**, select any of the following:

   * **Home tenant**: The API key functions only within the tenant where it registers.
   * **Any tenant**: The API key functions in any tenant.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-tenant.png" alt-text="Screenshot shows the Home tenant and Any tenant options under Set a target tenant heading in Developer Portal for Teams.":::

1. Under **Target Teams app**, select any of the following:

   * **Existing Teams app**: The **Existing Teams app** option binds the API key registration ID to your specific Teams app.
   * **Any Teams app**: The API key can use with any Teams app.

    <!-- Adding a domain ensures that the key isn't exposed to random endpoints. However, the API secret registration ID is publicly accessible and can be added to random apps, potentially allowing unwanted callers authorization to a developer's endpoint. To prevent this, you can bind the registration to a specific app and Teams rejects requests for any app other than the one specified in the secret registration. -->

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-teams-app.png" alt-text="Screenshot shows the Any Teams app and Existing Teams app options under Set a Teams app heading in Developer Portal for Teams.":::

   An **API key registration ID** generates.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-reg-id.png" alt-text="Screenshot shows the API key registration ID generated in Developer Portal for Teams.":::

1. In Developer Portal for Teams, select **Apps** and select an app where you add the API key.

1. Go to **App features** > **Message extension**.

1. Under **Authentication**, select **API key** and add the API key registration ID.

   :::image type="content" source="../assets/images/Copilot/api-based-me-auth-add-key.png" alt-text="Screenshot shows an example of the Authentication section with none and API key options in Developer Portal for Teams.":::

1. Select **Save**.

The API key registration ID updates as the value for the `apiSecretRegistrationId` property in the app manifest. Verify the API key registration ID in the app manifest in Developer Portal for Teams.

## Update app manifest

Add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property that contains the reference ID when you submit the API key through Developer Portal for Teams. For more information, see [composeExtensions.commands.](/microsoft-365/extensibility/schema/root-compose-extensions-commands)

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
  * Require the API key to have at least 10 characters and at most 2048 characters.
  * After updating the API key, allow up to one hour for the key to reflect throughout the system.

* **Base URL**:
  * Ensure the base URL begins with `https` for secure communication.
  * Include the full host name to specify the exact domain.
  * Optionally add a path to define a specific entry point for the API.

   This structure is crucial for API key security as Teams sends the API key to endpoints that start with the specified Base URL.

* **Target tenant**: As you develop your app within your Microsoft 365 tenant and test it as a custom app built for your org (LOB app) or custom app, register the API key with your **Home tenant** as the target tenant to ensure key exclusivity to your tenant.

  After completing testing and preparing to submit the app manifest to Partner Center for Teams Store, switch the target tenant setting to **Any tenant**. This change allows the API key registration ID to use across various tenants once the app publishes in Teams Store.

* **Teams app ID**: As you develop and test your app within your Microsoft 365 tenant as a custom app built for your org (LOB) or custom app, set the API key registration ID with the Teams app ID as **Any Teams app**. This configuration allows the key to function with any Teams app uploaded as a custom app and custom apps built for your org (LOB apps) that generate IDs after upload. At this stage, the app ID remains unknown.

  Your key's security maintains through **Home Tenant** and **Base URL**. When ready to release your app publicly, change the Teams app ID setting to **Existing Teams app** and enter your Teams app ID. Finally, submit your app manifest to Partner Center for inclusion in Teams Store. The API key registration ties to your specific Teams app and cannot use with others.

  For a custom app built for your org (LOB) or custom app, an internal app ID exists that is difficult to access. In this scenario, limit the configuration to the tenant where the app functions. For other apps, link the API key registration with your published app ID after publishing in Teams Store.

## See also

* [Create API-based message extension](create-api-message-extension.md)
* [Configure your API based message extension in Microsoft Entra ID](api-based-microsoft-entra.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)
* [Enable OAuth authentication for API based message extension](api-based-oauth.md)