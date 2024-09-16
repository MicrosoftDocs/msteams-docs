---
title: Update bot or message extension app to use certificate or MSI for authentication
author: surbhigupta
description: Learn how to update bot or message extension app to use certificate or MSI for authentication.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Update bot or message extension app to use certificate or MSI for authentication

Update your bot or message extension app to authenticate using a certificate or Managed Service Identity (MSI), instead of a bot ID and secret. This action resolves compliance concerns related to the use of Microsoft Entra ID and a secret.

## Prerequisites

Ensure that you've a Teams bot app deployed to Azure with the following resources:

* An Azure bot.
* An Entra ID with a secret used for bot authentication.
* A resource that hosts your bot app, such as Azure App Service, Azure Functions.

# [Update to certificate based Authentication](#tab/certificate)

To update your bot app to use certificate based authentication:

* [Create and upload certificate in Azure AD](#create-and-upload-certificate-in-azure-ad)
* [Update the bot app code](#update-the-bot-app-code)
* [Delete bot secret](#delete-bot-secret)

## Create and upload certificate in Azure AD

1. Obtain a certificate and private key.

1. Go to [Azure portal](https://ms.portal.azure.com).

1. Select **App registrations**.

    :::image type="content" source="../assets/images/include-files/azure-app-registration.png" alt-text="Screenshot shows the Azure services to select App registrations.":::

1. Select your registered app.

1. In the left pane, under **Manage**, select **Certificates & secrets**.

1. Under **Certificates**, select **Upload certificate**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/certificates-secrets.png" alt-text="Screenshot shows the certificates and secrets option.":::

    The **Upload a certificate** window appears.

    > [!NOTE]
    > Upload a certificate (public key) with one of the following file types: .cer, .pem, .crt.

1. Upload a certificate.

1. Enter **Description**.

1. Select **Add**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/upload-certificate.png" alt-text="Screenshot shows the upload certificate option.":::

## Update the bot app code

1. Open your bot app project in Visual Studio or Visual Studio Code.
1. Update your code.

    # [JavaScript](#tab/js1)

    ```javascript
        const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppId: config.botId,
        CertificatePrivateKey: '{your private key}',
        CertificateThumbprint: '{your cert thumbprint}',
        MicrosoftAppType: "MultiTenant",
        });
        
        const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
        {},
        credentialsFactory
        );
        
        const adapter = new CloudAdapter(botFrameworkAuthentication);
    ```

    # [C#](#tab/cs1)

    ```csharp
        builder.Services.AddSingleton<ServiceClientCredentialsFactory>((e) => new CertificateServiceClientCredentialsFactory("{your certificate}", "{your entra id}"));
    ```
    ---

1. Ensure you test your bot to confirm the operation aligns with the updated authentication.

## Delete bot secret

1. Go to [Azure portal](https://ms.portal.azure.com), and open your bot service.
1. Delete the secrets from Entra.

    :::image type="content" source="../assets/images/teams-toolkit-v2/delete-client-secret-value.png" alt-text="Screenshot shows the delete client secret value.":::

Your bot app now uses the certificate for authentication.

# [Update to MSI based authentication](#tab/msi)

To update your bot app to use MSI based authentication:

* [Create bot service with MSI type in Azure AD](#create-bot-service-with-msi-type-in-azure-ad)
* [Update your bot app code for MSI](#update-your-bot-app-code-for-msi)
* [Delete the previous bot details](#delete-the-previous-bot-details)

## Create bot service with MSI type in Azure AD

> [!NOTE]
> The **Azure Bot** service ID and type can't be modified after creation.

To create a new **Azure Bot** service with MSI type, follow these steps:

1. Go to **Home**.
1. Select **+ Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select **Enter**.
1. Select **Azure Bot**.
1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/azure-bot.png" alt-text="Screenshot shows the creation of Azure bot.":::

1. Enter the bot name in **Bot handle**.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.

    :::image type="content" source="../assets/images/include-files/create-azure-bot.png" alt-text="Screenshot shows the option resource group and subscription in the Azure portal.":::

    If you don't have an existing resource group, you can create a new resource group. To create a new resource group, follow these steps:

    1. Select **Create new**.
    1. Enter the resource name and select **OK**.
    1. Select a location from **New resource group location** dropdown list.

    :::image type="content" source="../assets/images/include-files/new-resource-location.png" alt-text="Screenshot shows the new resource group option in Azure portal.":::

1. Under **Microsoft App ID**, select **Type of App** as **User-Assigned Managed Identity**.

1. In the **Creation type**, select **Create new Microsoft App ID**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/microsoft-app-id.png" alt-text="Screenshot shows the microsoft app ID option.":::

    OR

    You can manually create a managed identity first, then create the **Azure Bot** using the **Use existing app registration**.

1. Update the new **Azure Bot** messaging endpoint and channels to match those of the old service.

1. Go to your apps hosting resource.

1. Select **Settings > Identity > User assigned**.

1. Add the managed identity that you've created.

## Update your bot app code for MSI

1. Update your code and deploy.

    # [JavaScript](#tab/js2)

    ```javascript
        const credentialsFactory = new ConfigurationServiceClientCredentialFactory({
        MicrosoftAppType: 'UserAssignedMsi',
        MicrosoftAppId: '{your MSI’s client ID}',
        MicrosoftAppTenantId: '{your MSI’s tenant ID}',
        });
        
        const botFrameworkAuthentication = new ConfigurationBotFrameworkAuthentication(
        {},
        credentialsFactory
        );
        
        const adapter = new CloudAdapter(botFrameworkAuthentication);
    ```

    # [C#](#tab/cs2)

    ```csharp
        builder.Configuration["MicrosoftAppType"] = "UserAssignedMsi";
        builder.Configuration["MicrosoftAppId"] = "{your MSI’s client ID}";
        builder.Configuration["MicrosoftAppPassword"] = "{your MSI’s tenant ID}";
        builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();
    ```

    ---

1. Update the `BOT_ID` in your `.env` file.

1. Ensure you test your bot to confirm its operation aligns with the updated authentication.

## Delete the previous bot details

1. Delete the old Azure bot and the Entra ID.

Your bot app now uses MSI for authentication.

---

## See Also
