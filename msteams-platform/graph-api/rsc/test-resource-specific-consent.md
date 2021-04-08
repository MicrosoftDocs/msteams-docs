---
title: Test resource-specific consent permissions in Teams
description: Details testing resource-specific consent in Teams using Postman
localization_priority: Normal
author: laujan
ms.author: lajanuar
ms.topic: tutorial
keywords: teams authorization OAuth SSO AAD rsc Postman Graph
---

# Test resource-specific consent permissions in Teams

Resource-specific consent (RSC) is a Microsoft Teams and Graph API integration that enables your app to use API endpoints to manage specific teams within an organization. For more information, see [Resource-specific consent (RSC) — Microsoft Teams Graph API](resource-specific-consent.md).

> [!NOTE]
> To test the RSC permissions, your Teams app manifest file must include a **webApplicationInfo** key populated with the following fields:
>
> - **id**: Your Azure AD app ID, see [Register your app in the Azure AD portal](resource-specific-consent.md#register-your-app-with-microsoft-identity-platform-via-the-azure-ad-portal).
> - **resource**: Any string, see the note in  [Update your Teams app manifest](resource-specific-consent.md#update-your-teams-app-manifest)
> - **application permissions**: RSC permissions for  your app, see [Resource-specific Permissions](resource-specific-consent.md#resource-specific-permissions).

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

> [!IMPORTANT]
> In your app manifest, only include the RSC permissions that you want your app to have.

## Test added RSC permissions using the Postman app

To check whether the RSC permissions are being honored by the API request payload, you need to copy the [RSC JSON test code](test-rsc-json-file.md) into your local environment and update the following values:

* `azureADAppId`: Your app's Azure AD app ID
* `azureADAppSecret`: Your Azure AD app secret (password)
* `token_scope`: The scope is required to get a token - set the value to https://graph.microsoft.com/.default
* `teamGroupId`: You can get the team group id from the Teams client as follows:

  > [!div class="checklist"]
  >
  > * In the Teams client, select **Teams** from the far left navigation bar .
  > * Select the team where the app is installed from the dropdown menu.
  > * Select the **More options** icon (&#8943;)
  > * Select **Get link to team** 
  > * Copy and save the **groupId** value from the string.

### Use Postman

1. Open the [Postman](https://www.postman.com) app.
2. Select **File** > **Import** > **Import file** to upload the updated JSON file from your environment.  
3. Select the **Collections** tab. 
4. Select the chevron **>** next to the **Test RSC** to expand the details view and see the API requests.

Execute the entire permissions collection for each API call. The permissions that you specified in your app manifest must succeed, while those not specified must fail with an HTTP 403 status code. Check all of the response status codes to confirm that the behavior of the RSC permissions in your app meet expectations.

> [!NOTE]
> To test specific DELETE and READ API calls, add those instance scenarios to the JSON file.

## Test revoked RSC permissions using [Postman](https://www.postman.com/)

1. Uninstall the app from the specific team.
2. Follow the steps for [Test added RSC permissions using Postman](#test-added-rsc-permissions-using-the-postman-app).
3. Check all the response status codes to confirm that the specific API calls, **succeeded, have failed with an HTTP 403 status code**.

## See also

> [!div class="nextstepaction"]
> [Microsoft Graph API and Teams](/graph/api/resources/teams-api-overview?view=graph-rest-1.0&preserve-view=true)

