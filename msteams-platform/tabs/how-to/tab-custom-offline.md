---
title: Offline tabs and tab customization
author: surbhigupta
description: Learn to build an offline tab and to customize tabs such as extending it to support group chats, channels, meetings, and offline access.
ms.localizationpriority: medium
ms.topic: conceptual
zone_pivot_groups: teams-app-environment
ms.date: 04/04/2025
---

# Offline tabs and tab customization

*placeholder*

## Offline tabs

> [!NOTE]
> Personal tabs with offline functionality are only supported on Teams in Android devices.

You can create a personal tab that works in Teams without an internet connection. An offline tab benefits users who work in areas with poor or no network coverage, such as field agents or frontline workers. Users can perform the following tasks in an offline tab:

* Record data through forms that can include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the user's device reconnects to the internet, the tab automatically synchronizes the locally stored data with an Azure Blob storage. This action ensures that all offline changes made by the user are updated in a central storage, maintaining data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

### Build an offline tab

Before you get started with building an offline tab, ensure that you meet the [prerequisites](~/tabs/how-to/tab-requirements.md) to build a personal tab.

1. [Create an Azure Blob storage](/azure/storage/blobs/storage-quickstart-blobs-portal). Ensure that you note down the account and container name for later use.

1. Clone the [Microsoft Teams Samples](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/) repository.

1. In the cloned repository, go to **samples** > **tab-support-offline** > **nodejs** and open the folder in Visual Studio Code.

   :::image type="content" source="../../assets/images/tabs/open-tab-sample-vsc.png" alt-text="Screenshot shows how to open the code sample in Visual Studio Code." lightbox="../../assets/images/tabs/open-tab-sample-vsc.png":::

1. Under **EXPLORER**, go to **server** > **blobStoreOperations.js** and replace `{{ account-Name }}` and `{{ container-Name }}` with your Azure Blob storage account and container's values.

1. Select the **F5** key to debug the app. Teams opens in a browser window when the build is complete.

1. Sign in with your Microsoft 365 account, if prompted.

1. Select **Add** when a dialog box opens to let you add the tab app to Teams.

   :::image type="content" source="../../assets/images/tabs/add-offline-tab-teams.png" alt-text="Screenshot shows how to add the offline tab app to Teams.":::

Congratulations! You've successfully created a Teams tab with offline functionality.
> [!div class="nextstepaction"]
> [I ran into an issue](https://github.com/MicrosoftDocs/msteams-docs/issues/new?template=Doc-Feedback.yaml&title=%5BI+ran+into+an+issue%5D+Build+an+offline+tab&author=%40laujan&pageUrl=https%3A%2F%2Flearn.microsoft.com%2Fen-us%2Fmicrosoftteams%2Fplatform%2Ftabs%2Fhow-to%2Fcreate-personal-tab%3Fbranch%3Dpr-en-us-12027%26tabs%3Dvs%26pivots%3Dnode-java-script%23build-an-offline-tab&contentSourceUrl=https%3A%2F%2Fgithub.com%2FMicrosoftDocs%2Fmsteams-docs%2Fblob%2Fmain%2Fmsteams-platform%2Ftabs%2Fhow-to%2Fcreate-personal-tab.md%23build-an-offline-tab&documentVersionIndependentId=6d43a761-19e0-541e-ba06-170099411ac1&metadata=*+ID%3A+61f5ca59-ab3e-b7ef-d3bc-55a88a362abf+%0A*+Service%3A+**msteams**)

## Reorder tabs

Starting with manifest version 1.7, developers can rearrange all tabs in their personal app. You can move the **bot chat** tab, which always defaults to the first position, anywhere in the personal app tab header. Two reserved tab `entityId` keywords are declared, **conversations** and **about**.

If you create a bot with a **personal** scope, it appears in the first tab position in a personal app by default. If you want to move it to another position, you must add a static tab object to your manifest with the reserved keyword, **conversations**. The **conversation** tab appears on web and desktop depending on where you add the **conversation** tab in the `staticTabs` array.

``` JSON

{
   "staticTabs":[
      {
         
      },
      {
         "entityId":"conversations",
         "scopes":[
            "personal"
         ]
      }
   ]
}

```

> [!NOTE]
> In mobile, tabs are reordered as defined in `staticTabs`.

This property also enables you to set the default landing capability for your app. You can configure the app to open as a tab or a bot by default. For more information, see [configure default landing capability](../../concepts/deploy-and-publish/add-default-install-scope.md#configure-your-apps-default-landing-capability).

## Extend static tabs to group chat, channels, and meetings

> [!NOTE]
> To extend your static tab to group chat, channels, and meetings, use the app manifest v1.16 or later.

You can extend static tabs to group chat, channels, and meetings. Instead of pinned app content, you can build tabs that behave more like apps as you can pin only one tab per app, for example, pinning a single YouTube app tab.

To extend your static tabs to group chat, channels, and meetings, update your [app manifest](~/resources/schema/manifest-schema.md#statictabs) with the `scopes` and `context` parameters in the `staticTabs` property. When you declare multiple static tabs in the manifest and add the app in the channel scope, only the first tab listed in the manifest appears.

Following is an example of app manifest where a static tab is defined that works in all scopes and contexts in Teams:

```json
"staticTabs": [ 
  { 
     "entityId": "homeTab", 
     "scopes": [ 
       "personal", 
       "groupChat", 
       "team"
      ], 
     "context": [ 
       "personalTab",
       "channelTab", 
       "privateChatTab", 
       "meetingChatTab", 
       "meetingDetailsTab", 
       "meetingSidePanel", 
       "meetingStage" 
      ], 
      "name": "Contoso", 
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)", 
      "websiteUrl": "https://contoso.com/content (displayed in web browser)" 
  }
], 

```

If a context isn't defined in the app manifest, by default Teams consider the following context:

```json
"context": [ 
   "personalTab",
   "channelTab",
   "privateChatTab", 
   "meetingChatTab", 
   "meetingDetailsTab", 
   "meetingStage" 
]
```

## Enable personal tab apps for calling extensibility

You can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the right scope and context to build apps that utilize tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## Customizing your static tab in chats or meetings

To customize your static tab experience in chats, channels, or meetings, you can use the `setConfig` APIs in your tab to update the `contentUrl` and `websiteUrl`. Following is an example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}

```

Only `contentUrl` and `websiteUrl` changes are supported for `setConfig`, other properties can't be changed for static tabs.

| Sample name | Description | .NET |Node.js|Manifest|
|-------------|-------------|------|----|----|
|Tab personal| Sample app, which showcases custom personal Tab with ASP.NET core for group chat, channels, and meetings. | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp) | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal-quickstart/js) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-personal/mvc-csharp/demo-manifest/tab-personal.zip)|
|Offline personal tab | The sample app showcases a personal tab app that functions offline within Microsoft Teams. | NA | [View](https://github.com/OfficeDev/Microsoft-Teams-Samples/tree/main/samples/tab-support-offline/nodejs) |[View](https://github.com/OfficeDev/Microsoft-Teams-Samples/blob/main/samples/tab-support-offline/nodejs/demo-manifest/tab-support-offline.zip)|

## See also

* [Build tabs for Teams](../what-are-tabs.md)
* [Create a channel tab or group tab](create-channel-group-tab.md)
* [App manifest schema for Teams](../../resources/schema/manifest-schema.md)
* [Tabs on mobile](../design/tabs-mobile.md)