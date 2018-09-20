---
title: Registering a calling bot for Microsoft Teams
description: Learn how to register a new audio and/or video calling bot for Microsoft Teams
keywords: calling bot audio/video audio video media
ms.date: 08/20/18
---
# Registering a Calling Bot for Microsoft Teams

In this topic, learn how to register a new Calling Bot for Microsoft Teams.


## Register your bot in the Microsoft Bot Framework

Complete the following steps:
*  Register a bot in [Microsoft Bot Framework Portal](https://dev.botframework.com/bots). Please refer to [Register a Bot](https://docs.microsoft.com/en-us/bot-framework/portal-register-bot) for instructions to create a Bot Channels Registration. Once you complete the registration, take a note of the registered config values (Bot Id, MicrosoftAppId and MicrosoftAppPassword).  You will need these values later in the code samples.
* Enable the Skype Channel and update the Calling tab settings to enable calling and select Real Time Media.  Update the Webhook (for calling) to your own https URL where you will receive incoming notifications. Eg. `https://{your domain}/api/calling`. Refer to [Configuring Channels](https://docs.microsoft.com/en-us/bot-framework/portal-configure-channels) for more information on how to configure channels.
>NOTICE: Once the Graph Platform has shipped publicly, the Calling Settings will be available in the Microsoft Teams channel settings.  Registration of Teams Calling Bots will also be available through Teams App Studio. 
* Enable the Microsoft Teams channel.

## Add Microsoft Graph Permissions for Calling to your Bot

Microsoft Graph exposes granular permissions that control the access that apps have to resources. As a developer, you decide which permissions for Microsoft Graph your app requests.  The Microsoft Graph Calling APIs support Application permissions, which are used by apps that run without a signed-in user present; for example, apps that run as background services or bots.  Application permissions can only be consented by an administrator.  Calling bots and applications have some capabilties that will need permission consent.  Below is a list of those permissions:

|Permission|Display String|Description|Admin Consent Required|
|---| ------------- |---|--|
|Calls.Initiate.All|Initiate outgoing 1:1 calls from the app (preview)|Allows the app to place outbound calls to a single user and transfer calls to users in your organization’s directory, without a signed-in user.|Yes|
|Calls.InitiateGroupCall.All|Initiate outgoing group calls from the app (preview)|Allows the app to place outbound calls to multiple users and add participants to meetings in your organization, without a signed-in user.|Yes|
|Calls.JoinGroupCall.All|Join Group Calls and Meetings as an app (preview)|Allows the app to join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined with the privileges of a directory user to meetings in your tenant.|Yes|
|Calls.JoinGroupCallasGuest.All|Join Group Calls and Meetings as a guest (preview)|Allows the app to anonymously join group calls and scheduled meetings in your organization, without a signed-in user.  The app will be joined as a guest to meetings in your tenant.|Yes|
|Calls.AccessMedia.All|Access media streams in a call as an app (preview)|Allows the app to get direct access to media streams in a call, without a signed-in user.|Yes|
|OnlineMeetings.Read.All|Read Online Meeting details (preview)|Allows the app to read Online Meeting details in your organization, without a signed-in user.|Yes|
|OnlineMeetings.ReadWrite.All|Read and Create Online Meetings (preview)|Allows the app to read and create Online Meetings as an application in your organization, without a signed-in user.|Yes|

### Assigning Permissions

You pre-configure the application permissions your app needs when you register your app.  To add Permissions from the Azure Bot Registration Portal, do the following:

* From the **Settings** blade, click **Manage**. This is the link appearing by the **Microsoft App ID**. This link will open a window where you can scroll down to add Microsoft Graph Permissions: under **Microsoft Graph**, choose **Add** next to **Application Permissions** and then select the permissions your app requires in the **Select Permissions** dialog. <br/>
  ![Manage link in Settings blade](./images/registration-settings-manage-link.png)

  You can also add permissions by accessing your app through the [Microsoft App Registration Portal](https://apps.dev.microsoft.com/).

### Getting Administrator Consent

An administrator can either consent to these permissions using the [Azure portal](https://portal.azure.com) when your app is installed in their organization, or you can provide a sign-up experience in your app through which administrators can consent to the permissions you configured. Once administrator consent is recorded by Azure AD, your app can request tokens without having to request consent again.

You can rely on an administrator to grant the permissions your app needs at the [Azure portal](https://portal.azure.com); however, often, a better option is to provide a sign-up experience for administrators by using the Azure AD v2.0 `/adminconsent` endpoint.  Please refer to the [instructions on constructing an Admin Consent URL](https://developer.microsoft.com/en-us/graph/docs/concepts/auth_v2_service#3-get-administrator-consent) for more detail.

> **Note**: Constructing the Tenant Admin Consent URL requires a configured Redirect URI/Reply URL in the [App Registration Portal](https://apps.dev.microsoft.com/). To add reply URLs for your bot, access your bot registration, choose Advanced Options > Edit Application Manifest.  Add your Redirect URI to the field replyURLs.

> **Important**: Any time you make a change to the configured permissions, you must also repeat the Admin Consent process. Changes made in the app registration portal will not be reflected until consent has been reapplied by the tenant's administrator.