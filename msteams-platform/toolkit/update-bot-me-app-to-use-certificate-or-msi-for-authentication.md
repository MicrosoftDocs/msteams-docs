---
title: Use Certificate or MSI Authentication for Bots
author: surbhigupta
description: Learn how to use certificate or MSI-based authentication for your bot app, which resolves compliance concerns with Microsoft Entra ID and bot secret.
ms.author: surbhigupta
ms.localizationpriority: high
ms.topic: overview
ms.date: 10/22/2024
---

# Use certificate or MSI for app authentication

You can use certificate- or MSI-based authentication to validate your bot app instead of bot ID and secret. This authentication resolves the compliance concerns related to the use of Microsoft Entra ID and bot secret.

## Prerequisites

Ensure that you have a Teams bot app deployed to Azure with the following resources:

* An Azure bot.
* An Entra ID with a secret used for bot authentication.
* A resource that hosts your bot app, such as Azure App Service, Azure Functions.

# [Update to certificate-based Authentication](#tab/certificate)

To update your bot app to use certificate-based authentication:

1. [Create and upload certificate in Azure AD](#create-and-upload-certificate-in-azure-ad)
1. [Update the bot app code](#update-the-bot-app-code)
1. [Delete bot secret](#delete-bot-secret)

## Create and upload certificate in Azure AD

To use a certificate for bot authentication:

1. Prepare a certificate and private key.

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

1. Upload the certificate you prepared.

1. Enter **Description**.

1. Select **Add**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/upload-certificate.png" alt-text="Screenshot shows the upload certificate option.":::

## Update the bot app code

Follow the steps to update the bot app code:

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

Ensure that your bot app uses the certificate for authentication before you delete the bot secret.

To delete the bot secret:

1. Go to [Azure portal](https://ms.portal.azure.com).
1. Select **App registrations**.

    :::image type="content" source="../assets/images/include-files/azure-app-registration.png" alt-text="Screenshot shows the Azure services to select App registrations.":::

1. Select your registered app.

1. In the left pane, under **Manage**, select **Certificates & secrets**.
1. Delete the secrets from Entra.

    :::image type="content" source="../assets/images/teams-toolkit-v2/delete-client-secret-value.png" alt-text="Screenshot shows the delete client secret value.":::

Your bot app now uses the certificate for authentication.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Update%20to%20certificate-based%20Authentication&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fupdate-bot-me-app-to-use-certificate-or-msi-for-authentication%3Ftabs%3Dcertificate%252Cjs1%252Cjs2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fupdate-bot-me-app-to-use-certificate-or-msi-for-authentication.md&documentVersionIndependentId=fb0fc1e4-02c4-5de2-bed1-da3c33971117&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

# [Update to MSI-based authentication](#tab/msi)

To update your bot app to use MSI-based authentication:

1. [Create bot service with MSI type in Azure AD](#create-bot-service-with-msi-type-in-azure-ad)
1. [Update your bot app code for MSI](#update-your-bot-app-code-for-msi)
1. [Delete bot secret](#delete-bot-secret-1)

> [!NOTE]
> The **Azure Bot** service ID and type can't be modified after creation.

## Create bot service with MSI type in Azure AD

To create a new **Azure Bot** service with MSI type, follow these steps:

1. Go to [Azure portal](https://ms.portal.azure.com).
1. Go to **Home**.
1. Select **+ Create a resource**.
1. In the search box, enter **Azure Bot**.
1. Select the **Enter** key.
1. Select **Azure Bot**.
1. Select **Create**.

    :::image type="content" source="../assets/images/include-files/azure-bot.png" alt-text="Screenshot shows the creation of Azure bot.":::

1. Enter the bot name in **Bot handle**.
1. Select your **Subscription** from the dropdown list.
1. Select your **Resource group** from the dropdown list.

    :::image type="content" source="../assets/images/include-files/create-azure-bot.png" alt-text="Screenshot shows the option resource group and subscription in the Azure portal.":::

    If you don't have an existing resource group, you can create a new resource group. To create a new Azure bot service and managed identity, follow these steps:

    1. Select **Create new**.
    1. Enter the resource name and select **OK**.
    1. Select a location from **New resource group location** dropdown list.

    :::image type="content" source="../assets/images/include-files/new-resource-location.png" alt-text="Screenshot shows the new resource group option in Azure portal.":::

1. Under **Microsoft App ID**, select **Type of App** as **User-Assigned Managed Identity**.

1. From the **Creation type**, select **Create new Microsoft App ID**.

    :::image type="content" source="../assets/images/teams-toolkit-v2/microsoft-app-id.png" alt-text="Screenshot shows the microsoft app ID option.":::

    OR

    You can manually create a managed identity first, then create the **Azure Bot** using the **Use existing app registration**.

1. Update the new **Azure Bot** messaging endpoint and channels to match those of the old service.

1. Go to your apps hosting resource.

1. Select **Settings > Identity > User assigned**.

1. Add the managed identity that you've created.

## Update your bot app code for MSI

To update the bot app code for MSI, follow these steps:

1. Open your bot app project in Visual Studio or Visual Studio Code.
1. Update your code.

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
        builder.Configuration["MicrosoftAppTenantId"] = "{your MSI’s tenant ID}";
        builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();
    ```

    ---

1. Update the `BOT_ID` in your `.env` file.

1. Ensure you test your bot to confirm its operation aligns with the updated authentication.

## Delete bot secret

Ensure that your bot app uses the certificate for authentication before you delete the bot secret.

To delete the bot secret:

1. Go to [Azure portal](https://ms.portal.azure.com).
1. Select **App registrations**.

    :::image type="content" source="../assets/images/include-files/azure-app-registration.png" alt-text="Screenshot shows the Azure services to select App registrations.":::

1. Select your registered app.

1. In the left pane, under **Manage**, select **Certificates & secrets**.
1. Delete the secrets from Entra.

    :::image type="content" source="../assets/images/teams-toolkit-v2/delete-client-secret-value.png" alt-text="Screenshot shows the delete client secret value.":::

Your bot app now uses MSI for authentication.

> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI%20ran%20into%20an%20issue%5D%20Update%20to%20MSI-based%20authentication&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftoolkit%2Fupdate-bot-me-app-to-use-certificate-or-msi-for-authentication%3Ftabs%3Dmsi%252Cjs1%252Cjs2&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftoolkit%2Fupdate-bot-me-app-to-use-certificate-or-msi-for-authentication.md&documentVersionIndependentId=fb0fc1e4-02c4-5de2-bed1-da3c33971117&author=surbhigupta&metadata=*%2BID%253A%2Be473e1f3-69f5-bcfa-bcab-54b098b59c80%2B%250A*%2BService%253A%2B**msteams**)

---

## See Also

* [Build bots for Teams](../bots/what-are-bots.md)
* [Build message extensions](../messaging-extensions/what-are-messaging-extensions.md)
* [Authenticate users in Microsoft Teams](../concepts/authentication/authentication.md)