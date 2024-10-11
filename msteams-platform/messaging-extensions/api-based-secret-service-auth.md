---
title: API secret service auth
author: v-ypalikila
description: Learn how to enable API secret service authentication and register an API key for API_based message extensions.
ms.localizationpriority: medium
ms.topic: concept-article
ms.author: anclear
ms.date: 07/16/2024
---

# API secret service authentication

API secret service authentication is a method that allows your app to authenticate with your API. You can configure your endpoint to accept a secret to authenticate requests. The API secret must be registered in Microsoft Teams and when a user interacts with your message extension, Teams uses the secret to authenticate with your API. The following API key registration properties help you to secure your key and ensure it's limited to your application:

* **Base URL**: Teams transmits the secret to URL endpoints that begin with the value in this field.
* **Target Tenant**: To limit API access to your Microsoft 365 tenant or any tenant.
* **App ID**: To limit the key access to a specific app or any app.
* **Secret key**: To authenticate access to your app.

API secret service authentication is a secure method for your app to authenticate with API. You can [register an API key](#register-an-api-key) through the Developer Portal for Teams, and generate an API key registration ID. [Update the app manifest](#update-app-manifest) with the `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property. This property should contain the API key registration ID returned when you submitted the API key through the portal.

> [!NOTE]
> The API secret registration ID is not a secret itself and can be retrieved from the Teams app manifest. For more information on securing your secret, see [best practices](#best-practices).

When an API request is initiated, the system retrieves the API key from an encrypted database. This API key is included in the authorization header using the bearer token scheme and sent to the endpoint defined in app manifest.

The following is an example of the payload with the authorization header using the bearer token scheme:

```https
GET https://example.com/search?myQuery=test
Accept-Language: en-US
Authorization: Bearer <MY_API_KEY>
```

## Register an API key

To register an API Key, follow these steps:

1. Go to **Tools** > **API key registration**.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-registration.png" alt-text="Screenshot shows the API key registration option in Developer Portal for Teams.":::

1. Select **+ New API key**.

1. In the **API key registration** page, select **+ Add Secret**. A **Add an API key** dialog appears.

1. Enter a value for the secret and select **Save**.

   > [!NOTE]
   > You can maintain up to two secrets. If you need to replace one, you can do so without service interruption, as Teams will use the other configured key during the update process.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-secret.png" alt-text="Screenshot shows the Enter the value for this secret option to add a secret to the API key.":::

1. Under **API key name**, add a meaningful name for the API Key. For example, API key for Contoso message extension.

1. Under **Base URL**, specify a common base URL for all the API endpoints to be called. This URL must start with https, include a fully qualified domain name, and optionally, a path. Teams only transmits the secrets to endpoints where the URL begins with this value. For example, `https://api.yelp.com`. *[Mandatory]*

   Base URL ensures that the key remains secure and isn't leaked to random endpoints, even if another app illicitly acquires the API secret registration ID and incorporates it into their own app. If the URL registered in the API secret confirguration isn't a prefix for the target endpoints defined in the OpenAPI spec, the call gets dropped.

   :::image type="content" source="../assets/images/Copilot/api-based-me-register-key-domain.png" alt-text="Screenshot shows the Description and Add domain options in the API key registration page in Developer Portal for Teams.":::

1. Under **Target tenant**, select any of the following:

   * **Home tenant**: The API key is only functional within the tenant where it's registered.
   * **Any tenant**: The API key is usable in any tenant.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-tenant.png" alt-text="Screenshot shows the Home tenant and Any tenant options under set a target tenant heading in Developer Portal for Teams.":::

1. Under **Target Teams app**, select any of the following:

   * **Existing Teams app**: The **Existing Teams app** option binds the API secret registration to your specific Teams app.
   * **Any Teams app**: The API key can be used with any Teams app.

   Adding a domain ensures that the key isn't exposed to random endpoints. However, the API secret registration ID is publicly accessible and can be added to random apps, potentially allowing unwanted callers authorization to a developer's endpoint. To prevent this, you can bind the registration to a specific app and Teams rejects requests for any app other than the one specified in the secret registration.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-teams-app.png" alt-text="Screenshot shows the Any Teams app and Existing Teams app options under Set a Teams app heading in Developer Portal for Teams.":::

   An **API key registration ID** is generated.

   :::image type="content" source="../assets/images/Copilot/api-based-me-api-key-reg-id.png" alt-text="Screenshot shows the API key registration ID generated in Developer Portal for Teams.":::

1. In Developer portal for Teams, select **Apps** and select an app where you want to add the API key.

1. Go to **App features** > **Message extension**.

1. Under **Authentication**, select **API key** and add the API key registration ID.

   :::image type="content" source="../assets/images/Copilot/api-based-me-auth-add-key.png" alt-text="Screenshot shows an example of the Authentication section with none and API key options in Developer Portal for Teams.":::

1. Select **Save**.

The API key registration ID is updated as the value for the `apiSecretRegistrationId` property in app manifest.

## Update app manifest

Add an `apiSecretServiceAuthConfiguration` object with an `apiSecretRegistrationId` property, which contains the reference ID when you submit the API key through the Developer portal for Teams. For more information, see [composeExtensions.commands.](../resources/schema/manifest-schema.md#composeextensionscommands)

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

* **Secret**:
  * The secret value must have at least 10 characters and at most 128 characters.
  * After you update the secret, it will take up to one hour for the key to reflect throughout the system.

* **Base URL**:
  * The Base URL must begin with https, ensuring secure communication.
  * Include the full host name to specify the exact domain.
  * An optional path can be added to define a specific entry point for the API.

   This structure is crucial for the security of your API secret(s), as Teams will only send secrets to endpoints that start with the specified Base URL.

* **Target tenant**: As you develop your app within your Microsoft 365 tenant, you'll initially test it as a custom app built for your org (LOB app) or custom app. During this stage, you must create the API secret registration with your **Home tenant** as the target tenant, ensuring the key remains exclusive to your tenant.

  After you've completed testing and are ready to submit your app manifest to the Partner Center for the Teams Store, you'll need to switch the target tenant setting to **Any tenant**. This change allows your API secret registration to be used across various tenants once your app is available in the Teams Store.

* **Teams app ID**: As you develop your app within your Microsoft 365 tenant and start to test it as a custom app built for your org (LOB) or custom app, you must set the API key registration with the Teams app ID as **Any Teams app**. This configuration allows the key to be used with any Teams app uploaded as a custom app and apps built for your org (LOB app) to generate IDs after they're uploaded, and you won't have the app's ID at this stage.

  Your key's security is still maintained through the **Home Tenant** and **Base URL**. When you're ready to release your app to the world, you need to change the Teams app ID setting to **Existing Teams app** and enter your Teams app ID. Finally, submit your app manifest to the Partner Center for inclusion in the Teams Store. Your API secret registration is now tied to your specific Teams app and can't be used with others.

## See also

* [Create API-based message extension](create-api-message-extension.md)
* [Configure your API based message extension in Microsoft Entra ID](api-based-microsoft-entra.md)
