---
title: Deploy a Skype real-time media bot to Azure | Microsoft Docs
description: Learn how to deploy a Skype real-time audio-video bot to Azure using Visual Studio's built-in publishing feature.
keywords: 
ms.date: 12/13/17
---

# Deploy a real-time media bot from Visual Studio to Azure
Real-time media bots can be hosted in either an "IaaS" Azure Virtual Machine or a "classic" Azure Cloud Service. This article shows how to deploy a bot, hosted in an Azure Cloud Service Worker Role, from Visual Studio using its built-in publish capability.

## Prerequisites

You must have a Microsoft Azure subscription before you can deploy a bot to Azure. If you do not already have a subscription, you can register for a <a href="https://azure.microsoft.com/en-us/free/" target="_blank">free account</a>. Additionally, the process described by this article requires Visual Studio. If you do not already have Visual Studio, you can download <a href="https://www.visualstudio.com/downloads/" target="_blank">Visual Studio 2017 Community</a> for free.

### Certificate from a valid certificate authority
The bot needs to be configured with a valid certificate from a trusted Certificate Authority (CA). The Subject Name (SN) or the last entry of the Subject Alternative Name (SAN) of the certificate should be the name of the cloud service. Wild-card certificates are currently not supported. If a CNAME is used to point to the cloud service, the CNAME should be the SN or the last SAN entry of the certificate.

## Configure application settings
For your bot to function properly in the cloud, you must ensure that its application settings are correct. More specifically, set the following key values in the app.config file of your worker role:
> <ul><li>MicrosoftAppId</li><li>MicrosoftAppPassword</li></ul>

> [!NOTE]
> To find your bot's **AppID** and **AppPassword**, see [MicrosoftAppID and MicrosoftAppPassword](~/bot-service-manage-overview.md#microsoftappid-and-microsoftapppassword).

## Create worker role in the Azure Portal
### Step 1: Create Cloud Service(classic)
Log on to <a href="https://portal.azure.com">Azure Portal</a>. Click **+** on the left side of the screen and choose **Cloud services (classic)**. Provide the required information in the form and click **Create**.

![Create the Cloud Service](../media/real-time-media-bot-portal-service-creation.png)

> [!NOTE]
> The DNS name of the bot should be supplied in the url for bot registration.

### Step 2: Upload the certificate for the bot
Once the bot is created, upload the certificate for the bot.

![Upload certificate](../media/real-time-media-bot-portal-certificates.png)

## Modify service configuration with worker role details
The Fully-Qualified Domain Name (FQDN) of the bot is not available through the Azure RoleEnvironment APIs. Therefore, the bot must be provided with its FQDN. It also needs to know about the certificate for HTTPS. These can be configured in the service configuration (.cscfg) file of the worker role.

> [!TIP]
> If you are deploying a sample from BotBuilder-RealTimeMediaCalling git repository,
> - Substitute the $DnsName$ with either the cloud service name or the CNAME if one is used in the service configuration.
>   ```xml
>      <Setting name="ServiceDnsName" value="$DnsName$" />
>   ```
> 
> - Substitute $CertThumbprint$ with the thumbprint of the certificate uploaded to the bot in the following lines from the configuration.
>   ```xml
>      <Setting name="DefaultCertificate" value="$CertThumbprint$" />
>      <Certificate name="Default" thumbprint="$CertThumbprint$" thumbprintAlgorithm="sha1" />
>   ```

## Publish the bot from Visual Studio
### Step 1: Launch the Microsoft Azure Publishing Wizard in Visual Studio

Open your project in Visual Studio. In Solution Explorer, right-click the cloud service project and select **Publish**. This starts the Microsoft Azure publishing wizard. Use your credentials to sign in to the appropriate subscription.

![Right-click on the project and choose Publish to start the Microsoft Azure publishing wizard](../media/real-time-media-bot-publish-signin.png)

### Step 2: Publish the bot

Click **Next**. This will open the **Settings** tab. Specify the Cloud Service, Environment, Build Configuration and the Service Configuration for deploying the bot.

![Click Next and go to Settings tab](../media/real-time-media-bot-publish-settings.png)

You can optionally choose **Advanced Settings** and specify the Storage account for the deployment logs (which you can use to debug issues).

![Click Advanced Settings tab](../media/real-time-media-bot-publish-advanced-settings.png)

Verify the configuration in the **Summary** tab and click **Publish** to deploy the bot to Microsoft Azure.