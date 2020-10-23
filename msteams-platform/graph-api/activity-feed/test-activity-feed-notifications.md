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

The activity feed API is a Microsoft Teams and Microsoft Graph integration that enables your app to use API endpoints to send activity feed notifications to Teams users. Activity feed notifications can range from identifying tasks requiring a user's attention, to actions taken by others that affect the user or a set of users.

> [!NOTE]
>To test activity feed notifications:
>
> 1. Your Teams app manifest file must include **webApplicationInfo** and **activities** keys. *See*, [Update your Teams app manifest](feed-notifications.md#update-your-teams-app-manifest).
>2. The **Upload custom apps** policy setting must be enabled as part of the custom app setup policies. *See* [Custom app policy settings](/microsoftteams/teams-custom-app-policies-and-settings#custom-app-policy-and-settings). <br/>
> <br/>

## Test activity feed notifications using the Postman app

> [!div class="checklist"]
>
> * Copy the [Activity feed notification test code](test-activity-feed-json-file.md) into your local environment and update the following values:

1. `client_id`  — your app's Azure AD app id.
1. `client_secret`  — your Azure AD app secret (password)
1. `tenantId` — you can get the unique identifier tenant id from the Teams client as follows:

* In the Teams client, select **Teams** from the far left nav bar .
* Select the team where the app is installed from the dropdown menu.
* Select the **More options** icon (&#8943;).
* Select **Get link to team**.
* Copy and save the **tenantId** value from the string.

>[!NOTE]
> You may need to replace other parameters as appropriate such as `username`, `password`, `chatId`,  etc.

> [!div class="checklist"]
>
>* [Prepare your Office 365 tenant](../../concepts/build-and-test/prepare-your-o365-tenant.md).  
>* [Upload your app package](../../concepts/deploy-and-publish/apps-upload.md#upload-your-package-into-a-team-using-the-apps-tab) directly to a specific team, one-to-one chat, or group chat using the `Apps` tab or by selecting click the `More apps` icon on the left-rail app bar and choosing the `Upload a custom app link`.
> * Open the [Postman](https://www.postman.com) app:

* Select **File** -> **Import** -> **Upload Files** to upload the JSON file from your environment.  
* Select the **Collections** tab.
* Select the chevron (>) next to **Activity Feed** to expand the details view and see the API requests.
* Select the authentication request.
* Select an API.

 Check the response status codes to confirm that the activity feed notification behavior in your app meets expectations.
