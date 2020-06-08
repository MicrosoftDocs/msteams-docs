---
title: Testing activity feed notifications in Teams
description: Details testing activity feed notifications in Teams using Postman
localization_priority:  Normal
author: laujan
ms.author: lajanuar
ms.topic: How-to
keywords: teams authorization OAuth SSO AAD activity feed notification Postman Graph
---

# Test activity feed notification in Teams

The Activity feed API is a Microsoft Teams and Microsoft Graph integration that enables your app to use API endpoints to send activity feed notifications to  Teams users. Activity feed notifications can range from identifying tasks requiring a user's attention, to actions taken by others that affect the user or a set of users.

> [!NOTE]
>To test activity feed notifications, your Teams app manifest file must include **webApplicationInfo** and activities keys. *See*, [Update your Teams app manifest](feed-notifications.md#update-your-teams-app-manifest).

## Test activity feed notifications using the Postman app

To check whether the activity feed notifications are being honored by the API request payload, you'll need to copy the [Activity feed notification test code](test-activity-feed-json-file.md) into your local environment and update the following values:

1. `azureADAppId`  — your app's Azure AD app id.
1. `azureADAppSecret`  — your Azure AD app secret (password)
1. `tenantId` — you can get the team group id from the Teams client as follows:

> [!div class="checklist"]
>
> * In the Teams client, select **Teams** from the far left nav bar .
> * Select the team where the app is installed from the dropdown menu.
> * Select the **More options** icon (&#8943;)
> * Select **Get link to team** 
> * Copy and save the **groupId** value from the string.

### Using Postman

> [!div class="checklist"]
>
> * Open the [Postman](https://www.postman.com) app.
> * Select **File** => **Import** => **Upload Files** to upload the JSON file from your environment.  
> * Select the **Collections** tab.
> * Select the chevron (>) next to the **Activity Feed** to expand the details view and see the API requests.

Execute the entire collection for each API call. Check all of the response status codes to confirm that the activity feed notification behavior in your app meets expectations.

## Install your app directly in Teams

Once you've created and tested your app, you can [upload your app package](../../concepts/deploy-and-publish/apps-upload.md#upload-your-package-into-a-team-using-the-apps-tab) directly to a specific team, one-to-one chat, or group chat.   To do so, the **Upload custom apps** policy setting must be enabled as part of the custom app setup policies. *See* [Custom app policy settings](/microsoftteams/teams-custom-app-policies-and-settings#custom-app-policy-and-settings).