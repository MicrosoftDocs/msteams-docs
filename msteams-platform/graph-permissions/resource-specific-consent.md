---
title: Resource specific consent in Teams
description: Describes resource specific consent in Teams and how to make advantage of it.
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: Overview
keywords: teams authorization OAuth SSO AAD rsc Graph
---
# Resource specific consent (RSC) — Microsoft Teams Graph API

Microsoft Teams and Graph API integration enables developers to use API endpoints to manage team life cycles within their organizations. When originally introduced, the permissions model was non-granular and required the approval of a global admin. The resource specific consent (RSC) permissions model enables *team owners* to grant consent for an application to access and/or modify a team's data. The granular, Teams-specific, RSC permissions define what an application can do within a specific team:

![team lifecycle](../assets/images/team-lifecycle.svg)
</br></br>

|Application Permission| Action |
| ----- | ----- |
|TeamSettings.Read.Group | Get the settings for this team.|
|TeamSettings.Edit.Group|Update the settings for this team.|
|ChannelSettings.Read.Group|Get the channel names, channel descriptions, and channel settings for this team​.|
|ChannelSettings.Edit.Group|Update the channel names, channel descriptions, and channel settings for this team.​|
|Channel.Create.Group|Create channels in this team.​|
|Channel.Delete.Group|Delete channels in this team.​|
|ChannelMessage.Read.Group |Get this team's channel messages.​|
|TeamsApp.Read.Group|Get a list of this team's installed apps.|
|TeamsTab.Read.Group|Get a list of this team's tabs.|
|TeamsTab.Create.Group|Create tabs in this team.​|
|TeamsTab.Edit.Group|Update this team's tabs.​|
|TeamsTab.Delete.Group|Delete this team's tabs.​|
|Member.Read.Group|Get this team's members.​|
|Owner.Read.Group|Get this team's owners.​|
|Member.ReadWrite.Group|Add and remove members from this team.​|
|Owner.ReadWrite.Group|Add and remove owners from this team.​|
|File.Read.Group|Open a file,get all text, and close the file in this team.|
|File.Create.Group|Create or open a file in this team. Note: if the file already exists, its contents will be overwritten.|
|File.Edit.Group|Update the name of a specified file in this team.|
|File.Delete.Group|Delete a specified file in this team.|

>[!NOTE]
>Resource specific permissions are only available to Teams apps installed on the Teams client and are currently not part of Azure AD.

### **Enabling RSC in your application** 

## 1. Ensure that the Tenant admin has configured [group owner consent](/azure/active-directory/manage-apps/configure-user-consent#configure-group-owner-consent-to-apps-accessing-group-data) settings in Azure Active Directory (Azure AD)

- **Disable or enable group owner consent from the Azure portal**  

> [!div class="checklist"]
>
>- Sign in to the [Azure portal](https://portal.azure.com) as a [Global Administrator/Company Administrator](/azure/active-directory/users-groups-roles/directory-assign-admin-roles.md#global-administrator--company-administrator).  
 > - Select **Azure Active Directory** =>**Enterprise applications** =>**User settings**.
> - Enable, disable, or limit user consent with the control labeled **Users can consent to apps accessing company data for the groups they own** (This capability is enabled by default)

![azure rsc configuration](../assets/images/azure-rsc-configuration.svg)

| Value | Description|
|--- | --- |
|Yes | Enable group-specific consent for all group owners.|
|No |Disable group-specific consent for all users.| 
|Limited | Enable group-specific consent for members of a selected group.|

- **Disable or enable group owner consent using PowerShell**. Please follow the steps outlined in  the [Configure group owner consent using PowerShell](/azure/active-directory/manage-apps/configure-user-consent#configure-group-owner-consent-using-powershell) documentation.

## 2.  [Register your app using the Azure portal](/graph/auth-register-app-v2)

>[!WARNING]
>Do not register multiple Teams apps to the same Azure AD app id. The app id must be unique for each app. Attempts to install multiple apps to the same app id will fail.

## 3. Check API permissions in the Azure portal

Navigate to the **Home** => **App registrations** page and select your RSC app. Choose **API permissions** from the left nav bar and examine the list of configured permissions for your app. If your app will only make RSC Graph calls, delete all the permission on that page. If your app will also make non-RSC calls, keep those permissions as needed.

>[!IMPORTANT]
>The Azure portal cannot be used to request RSC permissions. RSC permissions are currently exclusive to Teams applications installed in the Teams client and are declared in the app manifest (JSON) file.

## 4.  [Get an access token from the Microsoft Identity platform](/graph/auth-v2-user?view=graph-rest-1.0#3-get-a-token)

>[!NOTE]
>Before your app can get a token from the Microsoft identity platform, it must be registered in the Azure portal. You'll need to have the following values from the Azure AD registration process:

- The **Application ID** assigned by the app registration portal. If your app supports single sign-on (SSO) you should use the same Application ID for your app and SSO.
- The  **Client secret/password** or a public/private key pair (**Certificate**). This is not required for native apps.
- A **Redirect URI** (or reply URL) for your app to receive responses from Azure AD.

## 5. Update your Teams [app manifest](/sharepoint/dev/spfx/web-parts/guidance/creating-team-manifest-manually-for-webpart#create-a-microsoft-teams-app-manifest)

Add a [webApplicationInfo](../resources/schema/manifest-schema.md#webapplicationinfo) key to your app manifest and provide your app's Azure application ID, resource (any string), and permissions:

>[!NOTE]
>The RSC permissions do not use the webApplicationInfo `resource` value; however, the value should be completed with "`https://` + "any string". *See* the example, below to avoid an error response.

```json
"webApplicationInfo": {

        "id": "XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX", 

"resource": "https://RscBasedStoreApp",

        "applicationPermissions": [

    "TeamSettings.Read.Group",

   "ChannelMessage.Read.Group",

  "TeamSettings.Edit.Group",

  "ChannelSettings.Edit.Group",

  "Channel.Create.Group",

  "Channel.Delete.Group",

  "TeamsApp.Read.Group",

  "TeamsTab.Read.Group",

  "TeamsTab.Create.Group",

  "TeamsTab.Edit.Group",

  "TeamsTab.Delete.Group",

  "Member.Read.Group",

  "Member.ReadWrite.Group",

  "File.Read.Group",

  "File.Create.Group",

  "File.Edit.Group",

  "File.Delete.Group"

        ]

    }
```

>[!NOTE]
>Non-RSC permissions are stored in the Azure portal. Do not add them to the app manifest.

## 6. Install your app in Teams

Once you've created your app there are two options for publishing within your Teams organization:

1. [Upload your app directly](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) to a specific team.
2. [Publish your app to your organization's app catalog](../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) and then install in specific teams.

## Ensure RSC permissions have been added to your app definition

>[!IMPORTANT]
>Graph RSC API calls are not attributed to a user. Calls are made with app permissions not user delegated permissions. Thus, the app may be allowed to perform actions that the user cannot, such as creating a channel or deleting a tab. You should review the team owner's intent for your use case prior to making RSC API calls. *See* [Microsoft Teams API overview](/graph/teams-concept-overview).

Once the app has been installed to a team, you can use [Graph Explorer](https://developer.microsoft.com/graph/graph-explorer)  to view the permissions that have been granted to the app in a team:

> [!div class="checklist"]
>
>- Get the team's groupId from the Teams client.
> - In the Teams client, select **Teams** from the far left nav bar.
> - Select the team where the app is installed from the dropdown menu.
> - Select the **More options** icon (&#8943;)
> - Select **Get link to team** 
> - Copy and save the **groupId** value from the string.
> - Log into **Graph Explorer**
> - Make a **GET** call to the following endpoint: `https://graph.microsoft.com/beta/groups/{teamGroupId}/permissionGrants`. The clientAppId field in the response will map to the appId specified in the Teams app manifest

 ![Graph explorer response to GET call.](../assets/images/graph-permissions.png)

 > [!div class="nextstepaction"]
> [Test resource specific consent permissions in Teams](./test-resource-specific-consent.md)
