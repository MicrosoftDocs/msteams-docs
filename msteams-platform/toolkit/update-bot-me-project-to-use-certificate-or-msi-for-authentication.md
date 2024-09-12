---
title: Update bot/ME project to use Certificate or MSI for Authentication
author: surbhigupta
description: Learn about Update bot/ME project to use Certificate or MSI for Authentication.
ms.topic: conceptual
ms.author: surbhigupta
ms.localizationpriority: high
---

# Update bot/ME project to use Certificate or MSI for Authentication

## Introduction

This guide provides step-by-step instructions to update your existing bot project from using a Bot ID and secret for authentication to using a certificate or Managed Service Identity (MSI). This change helps address compliance concerns related to using Entra ID with a secret.

## Prerequisites

Before proceeding, ensure that you have a Teams bot app deployed to Azure with the following resources:

- An Azure Bot Service.
- An Entra ID with a secret used for bot authentication.
- A resource that hosts your bot app (e.g., Azure App Service, Azure Functions).

## Updating to Certificate-Based Authentication

### Step 1: Prepare and Upload the Certificate

1. Obtain a certificate and private key.
2. Upload the certificate to your Entra ID.

### Step 2: Update Your Code and Deploy

#### For TypeScript/JavaScript Projects

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

#### For C# Projects

```csharp
builder.Services.AddSingleton<ServiceClientCredentialsFactory>((e) => 
  new CertificateServiceClientCredentialsFactory("{your certificate}", "{your Entra ID}")
);
```

### Step 3: Test Your Bot App

Ensure your bot functions correctly with the updated authentication method.

### Step 4: Clean Up Secrets

Once verified, delete the secrets in your Entra ID to maintain security compliance.

## Updating to MSI-Based Authentication

### Step 1: Create a New Azure Bot Service with MSI

Since the Azure Bot Service’s ID and type cannot be modified after creation, follow these steps:

1. Create a new Azure Bot Service, selecting **User-Assigned Managed Identity** as the type and **Create new Microsoft App ID** as the creation type. This will automatically create the Azure Bot Service and the associated managed identity.

   *Alternatively*: You can manually create a managed identity first, then create the Azure Bot Service using the "Use existing app registration" option.

2. Update the new Azure Bot Service’s messaging endpoint and channels to match those of the old service.

### Step 2: Assign the Managed Identity to Your Hosting Resource

1. Navigate to your app’s hosting resource.
2. Select **Settings > Identity > User assigned**.
3. Add the managed identity created in the previous step.

### Step 3: Update Your Code and Deploy

#### For TypeScript/JavaScript Projects

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

#### For C# Projects

```csharp
builder.Configuration["MicrosoftAppType"] = "UserAssignedMsi";
builder.Configuration["MicrosoftAppId"] = "{your MSI’s client ID}";
builder.Configuration["MicrosoftAppPassword"] = "{your MSI’s tenant ID}";
builder.Services.AddSingleton<BotFrameworkAuthentication, ConfigurationBotFrameworkAuthentication>();
```

### Step 4: Update the `BOT_ID` Value in the `.env` File

Update the `BOT_ID` value in your `.env` file to reflect your newly created managed identity’s client ID.

### Step 5: Test Your Bot App

Verify that your bot operates as expected with the updated authentication.

### Step 6: Clean Up Unneeded Resources

If everything is functioning correctly, you can delete the old Azure Bot Service and the old Entra ID to clean up unnecessary resources.
