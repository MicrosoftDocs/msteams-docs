---
title: Testing resource-specific consent in Teams
description: Details testing resource-specific consent in Teams using Postman
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: How-to
keywords: teams authorization OAuth SSO AAD rsc Postman Graph
---

# Test resource-specific consent permissions  in Teams

Resource-specific consent (RSC) is a Microsoft Teams and Graph API integration that enables your app to use API endpoints to manage specific teams within an organization. Please *see*  [Resource-specific consent (RSC) — Microsoft Teams Graph API](resource-specific-consent.md).

> [!NOTE]
>To test the RSC permissions, your Teams app manifest file must include a **webApplicationInfo** key populated with the following fields:
>
> - **id**  — your Azure AD app id, *see* [Register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-via-the-azure-ad-portal).
> - **resource**  — any string, *see* the note in  [Update your Teams app manifest](resource-specific-consent.md#update-your-teams-app-manifest)
> - **application permissions** — RSC permissions for  your app, *see* [Resource-specific Permissions](resource-specific-consent.md#resource-specific-permissions).

```json
"webApplicationInfo":{
      "id":"XXxxXXXXX-XxXX-xXXX-XXxx-XXXXXXXxxxXX",
      "resource":"https://AnyString",
      "applicationPermissions":[
         "Channel.Create.Group",
         "Channel.Delete.Group",
         "ChannelMessage.Read.Group",
         "ChannelSettings.Read.Group",
         "ChannelSettings.Edit.Group",
         "Member.Read.Group",
         "Owner.Read.Group",
         "TeamsApp.Read.Group",
         "TeamsTab.Read.Group",
         "TeamsTab.Create.Group",
         "TeamsTab.Edit.Group",
         "TeamsTab.Delete.Group",
         "TeamSettings.Read.Group",
         "TeamSettings.Edit.Group"
      ]
   }
```

>[!IMPORTANT]
>In your app manifest, only include the RSC permissions that you want your app to have.

## Test added RSC permissions using the Postman app

To check whether the RSC permissions are being honored by the API request, you'll need to copy the [RSC JSON test code](test-rsc-json-file.md) into your local environment and update the following values:

1. `azureADAppId`  — your app's Azure AD app id.
1. `azureADAppSecret`  — your Azure AD app secret (password)
1. `token_scope`  — the scope is required to get a token - set the value to https://graph.microsoft.com/.default
1. `teamGroupId` — you can get the team group id from the Teams client as follows:

> [!div class="checklist"]
>
> - In the Teams client, select **Teams** from the far left nav bar .
> - Select the team where the app is installed from the dropdown menu.
> - Select the **More options** icon (&#8943;)
> - Select **Get link to team** 
> - Copy and save the **groupId** value from the string.

### Using Postman

> [!div class="checklist"]
>
> - Open the [Postman](https://www.postman.com) app.
> - Select **File** => **Import** => **Upload Files** to upload the updated JSON file from your environment.  
> - Select the **Collections** tab.
> - Select the chevron (>) next to **Test RSC** to expand the details view and see the API requests.

Execute the entire permissions collection for each API call. The permissions that you specified in your app manifest should succeed, while those not specified should fail with an HTTP 403 status code. Check all of the response status codes to confirm that the behavior of the RSC permissions in your app meets expectations.

>[!NOTE]
>To test specific DELETE and READ API calls, please add those instance scenarios to the JSON file.

## Test  revoked RSC permissions using [Postman](https://www.postman.com/)

> [!div class="checklist"]
>
> - Uninstall the app from the specific team.
> - Follow the steps above for [Test added RSC permissions using Postman](#test-added-rsc-permissions-using-the-postman-app).
> - Check all of the response status codes to confirm that the specific API calls that succeeded have failed with an HTTP 403 status code.

> [!div class="nextstepaction"]
>
> [Learn more about the Graph API and Teams](/graph/api/resources/teams-api-overview?view=graph-rest-1.0&preserve-view=true )
