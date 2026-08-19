---
title: Configure Azure Bot Service authentication
description: Learn how to configure client secret, user-assigned managed identity, or federated identity credential authentication for a Teams agent in Azure Bot Service.
ms.topic: how-to
ms.localizationpriority: high
ms.date: 08/18/2026
---

# Configure Azure Bot Service authentication

A Teams agent authenticates with Azure Bot Service to send messages and perform other bot operations. You can authenticate the agent with a client secret, a user-assigned managed identity, or a federated identity credential.

This configuration authenticates the agent application, not the person using the agent. To authenticate users and access resources on their behalf, see [User authentication in Teams](../../../concepts/authentication/authentication.md).

## Prerequisites

Before you begin, ensure that you have an Azure subscription, with permissions to create Entra ID app registrations and Azure Bot resources.

-
- Permission to manage identities if you use a managed identity or federated identity credential.
- An Azure compute resource that hosts your agent, such as Azure App Service, Azure Container Apps, or an Azure virtual machine, if you use a managed identity or federated identity credential.

If your agent runs in a US Government or China cloud environment, see [Sovereign cloud configuration](https://microsoft.github.io/teams-sdk/typescript/essentials/app-configuration/sovereign-cloud).

## Choose an authentication method

Choose one of the following methods based on your hosting environment and security requirements:

| Authentication method | When to use | Considerations |
| --- | --- | --- |
| Client secret | You want the simplest setup or your agent isn't hosted on an Azure resource that supports managed identities. | You must store the secret securely and rotate it before it expires. |
| User-assigned managed identity | Your agent is hosted on an Azure resource and you want passwordless authentication. | Azure creates a managed identity with the Azure Bot resource. You must assign that identity to the compute resource that hosts the agent. |
| Federated identity credential | You want to use a user-assigned or system-assigned managed identity with a single-tenant app registration. | You must federate the identity with the app registration and assign or enable the same identity on the compute resource that hosts the agent. |

Complete only the procedure for your selected authentication method.

# [Client secret](#tab/client-secret)

Client secret authentication uses a password-like value to authenticate your agent. Azure displays the secret value only once, and you must rotate the secret periodically.

## Create a single-tenant Azure Bot resource

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Azure Bot**.
1. Select **Create**.
1. Enter the required bot and project details, including the bot handle, subscription, and resource group.
1. For **Type of App**, select **Single Tenant**.
1. Create a new Microsoft app ID or use an existing app registration.
1. Select **Review + create**, and then select **Create** after validation succeeds.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/single-tenant-bot-creation.png" alt-text="Screenshot of the Create an Azure Bot page with Single Tenant selected as the app type.":::

## Create a client secret

1. In the Azure portal, open the app registration associated with your Azure Bot resource.
1. Under **Manage**, select **Certificates & secrets**.
1. Under **Client secrets**, select **New client secret**.
1. Enter a description and select an expiration period.
1. Select **Add**.
1. Copy the secret **Value** immediately.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/client-secret.png" alt-text="Screenshot of the Client secrets tab in an app registration with the secret value column highlighted.":::

> [!IMPORTANT]
> The secret value isn't shown again after you leave the page. Store it securely, don't commit it to source control, and rotate it before it expires.

# [User-assigned managed identity](#tab/user-assigned-managed-identity)

User-assigned managed identity authentication eliminates the need to create or store a secret. When you select this app type, Azure creates a user-assigned managed identity with the Azure Bot resource.

## Create an Azure Bot resource with a managed identity

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Azure Bot**.
1. Select **Create**.
1. Enter the required bot and project details, including the bot handle, subscription, and resource group.
1. For **Type of App**, select **User Assigned Managed Identity**.
1. Create a new Microsoft app ID or use an existing user-assigned managed identity.
1. Select **Review + create**, and then select **Create** after validation succeeds.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/user-assigned-managed-identity.png" alt-text="Screenshot of the Create an Azure Bot page with User-Assigned Managed Identity selected as the app type.":::

## Assign the identity to the compute resource

1. In the Azure portal, open the compute resource that hosts your agent.
1. Under **Settings**, select **Identity**.
1. Select the **User assigned** tab.
1. Select **Add**.
1. Select the user-assigned managed identity associated with your Azure Bot resource.
1. Select **Add** to assign the identity.

# [Federated identity credential](#tab/federated-identity-credential)

A federated identity credential establishes a trust relationship between a single-tenant app registration and a managed identity. The agent can then authenticate without a client secret.

## Create a single-tenant Azure Bot resource for federation

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **Azure Bot**.
1. Select **Create**.
1. Enter the required bot and project details, including the bot handle, subscription, and resource group.
1. For **Type of App**, select **Single Tenant**.
1. Create a new Microsoft app ID or use an existing app registration.
1. Select **Review + create**, and then select **Create** after validation succeeds.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/single-tenant-bot-creation.png" alt-text="Screenshot of the Create an Azure Bot page with Single Tenant selected as the app type.":::

## Add a federated identity credential

1. In the Azure portal, open the app registration associated with your Azure Bot resource.
1. Under **Manage**, select **Certificates & secrets**.
1. Select the **Federated credentials** tab.
1. Select **Add credential**.
1. Select the federated credential scenario that applies to your hosting resource.
1. Select or configure the user-assigned or system-assigned managed identity for your compute resource.
1. Complete the required fields, and then select **Add**.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/federated-identity-credential.png" alt-text="Screenshot of the Federated credentials tab in an app registration with the Add credential option.":::

> [!IMPORTANT]
> You must assign or enable the same managed identity on the compute resource that hosts your agent.

## Configure the identity on the compute resource

# [User-assigned identity](#tab/federated-user-assigned)

1. In the Azure portal, open the compute resource that hosts your agent.
1. Under **Settings**, select **Identity**.
1. Select the **User assigned** tab.
1. Select **Add**.
1. Select the identity configured in the federated credential.
1. Select **Add** to assign the identity.

# [System-assigned identity](#tab/federated-system-assigned)

1. In the Azure portal, open the compute resource that hosts your agent.
1. Under **Settings**, select **Identity**.
1. Select the **System assigned** tab.
1. Set **Status** to **On**.
1. Select **Save**.

---

---

## Configure your agent application

After you configure Azure resources for your selected authentication method, configure the corresponding environment variables and authentication settings in your application. For more information, see [App authentication configuration](https://microsoft.github.io/teams-sdk/typescript/essentials/app-authentication).

## Troubleshoot a missing service principal

A single-tenant Azure Bot resource (`msaAppType: 'SingleTenant'`) requires a service principal for its app registration in the tenant. If the service principal is missing, the agent can return an `invalid_client` response with error `AADSTS7000229`.

### Error examples

# [TypeScript](#tab/troubleshoot-typescript)

```console
[ERROR] @teams/app Request failed with status code 401
[ERROR] @teams/app {
[ERROR] @teams/app   "error": "invalid_client",
[ERROR] @teams/app   "error_description": "AADSTS7000229: The client application 00001111-aaaa-2222-bbbb-3333cccc4444 is missing service principal in the tenant aaaabbbb-0000-cccc-1111-dddd2222eeee.",
[ERROR] @teams/app   "error_codes": [7000229]
[ERROR] @teams/app }
```

# [Python](#tab/troubleshoot-python)

```console
[ERROR] @teams/app Failed to refresh bot token:
Client error '401 Unauthorized' for url
'https://login.microsoftonline.com/aaaabbbb-0000-cccc-1111-dddd2222eeee/oauth2/v2.0/token'
```

# [C#](#tab/troubleshoot-csharp)

```console
[ERROR] Echobot Failed to get bot token on app startup.
[ERROR] Echobot {
[ERROR] Echobot   "error": "invalid_client",
[ERROR] Echobot   "error_description": "AADSTS7000229: The client application 00001111-aaaa-2222-bbbb-3333cccc4444 is missing service principal in the tenant aaaabbbb-0000-cccc-1111-dddd2222eeee.",
[ERROR] Echobot   "error_codes": [7000229]
[ERROR] Echobot }
```

---

To create the missing service principal:

1. Find the `BOT_ID` value in your application environment file. For local development, open `env/.env.local`. For an Azure deployment, open `env/.env.dev`.

1. Sign in to the [Azure portal](https://portal.azure.com).
1. Search for and select **App registrations**.
1. Search for the application by using the `BOT_ID` value.
1. Open the app registration and check **Managed application in local directory** on the **Overview** page.
1. If a managed application is listed, the service principal already exists.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/existing-service-principal.png" alt-text="Screenshot of an app registration Overview page with an existing managed application in the local directory.":::

1. If no managed application is listed, select **Create service principal**.

:::image type="content" source="../../../assets/images/bots/configure-azure-bot-service-authentication/create-service-principal.png" alt-text="Screenshot of an app registration Overview page with the Create Service Principal link.":::

1. Wait for the service principal to be created, and then restart your agent application.

## See also

- [App authentication configuration](https://microsoft.github.io/teams-sdk/typescript/essentials/app-authentication)
- [Use certificate or MSI for app authentication](../../../toolkit/update-bot-me-app-to-use-certificate-or-msi-for-authentication.md)
- [User authentication in Teams](../../../concepts/authentication/authentication.md)
