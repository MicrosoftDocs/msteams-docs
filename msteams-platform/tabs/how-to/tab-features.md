---
title: Tab features
author: surbhigupta
description: Learn about tab features
ms.localizationpriority: high
ms.topic: quickstart
ms.date: 01/03/2025
---

# Teams tab app types and features

[TBD: Introduction]

## Static and personal tabs

You can build two types of tabs within your Microsoft Teams tab app:

* **Static tabs**:

  Static tabs are shared tabs that can be available to members of a channel or team. Teams owners or administrators can configure the tab's content. It's suitable for shared resources like dashboard or knowledge base.

* **Personal tabs**:

  Personal tabs are visible only to individuals who add the tab app. The user can configure their own personalized content and configuration. It's suitable for to-do lists or personal note taking apps.

Here's how you can add and configure tabs:

* [Extend static tabs to group chat, channels, and meetings](#extend-static-tabs-to-group-chat-channels-and-meetings)
* [Customizing your static tab in chats or meetings](#customizing-your-static-tab-in-chats-or-meetings)
* [Personal offline tabs](#personal-offline-tabs)

### Extend static tabs to group chat, channels, and meetings

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

### Customizing your static tab in chats or meetings

To customize your static tab experience in chats, channels, or meetings, you can use the `setConfig` APIs in your tab to update the `contentUrl` and `websiteUrl`. Following is an example:

```json
pages.config.setConfig({ 
  "contentUrl": "https://wwww.contoso.com/teamsapp/thread/" + context.threadId,
   ...}

```

Only `contentUrl` and `websiteUrl` changes are supported for `setConfig`, other properties can't be changed for static tabs.

### Personal offline tabs

> [!NOTE]
> Personal tabs with offline functionality are only supported on Teams in Android devices.

You can create a personal tab that works in Teams without an internet connection. An offline tab benefits users who work in areas with poor or no network coverage, such as field agents or frontline workers. Users can perform the following tasks in an offline tab:

* Record data through forms that can include images and videos.
* View details of previously submitted requests, incidents, or forms.

When the user's device reconnects to the internet, the tab automatically synchronizes the locally stored data with an Azure Blob storage. This action ensures that all offline changes made by the user are updated in a central storage, maintaining data consistency across the organization.

:::image type="content" source="../../assets/images/tabs/tab-support-offline-mobile.gif" alt-text="Graphic shows how an offline tab works in Teams mobile client.":::

#### Build an offline tab

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

<!--
:::image type="content" source="../../assets/images/tab-images/tab-progress-2.png" alt-text="tab progress 2":::

1. Understand key concepts and prerequisites:
    - Introduction to Tabs, authentication and permissions for access to Graph APIs, and User authentication with AAD.
2. Set up Environment:
    - M365 Dev account
    - AAD app
    - TTK for VSC: Install TTK and set up project using the toolkit
3. Create a basic tab app [Add link to how-to guide]
4. Set up Web app
    - Set up SPA or HTML content of the tab
    - Design for desktop and mobile
    - Use support for Adaptor Card, deep links, and more to structure content, format, navigation in the app
5. Configure app in Teams using app manifest
    - Define tab ID, scope, and website and content URLs
    - Example of app manifest code snippet
6. Add authentication (optional step)
    - Cross-link to authentication module
    - Code snippet or examples, if and as needed
7. Add support for building tabs for Teams Meetings
    - Cross-link to Build tabs for meetings page
    - Code snippet or examples, if and as needed
8. Test and debug app
9. Publish app
-->

### Information required during app building

1. AAD registration
2. Teams app manifest understanding
3. Teams APIs: Teams specific APIs (JS SDK, Graph APIs)
4. Authentication types/methods
5. Dev tools such as VSC and TTK
6. Web app development for desktop, mobile
7. Debugging tools

## Features and benefits of Teams tab app

A tab is a specific area in a channel or chat that displays content or functionality from an integrated app or website. These apps can be either built-in apps (like Planner, SharePoint, or Excel) or custom apps created by your organization or third-party developers.

Teams tabs offer several key features that help enhance collaboration and productivity:

* **Embedded web content**: With custom tabs, organizations can embed their own web content, applications, or dashboards directly into Teams.
* **Single app tab limit**: In channels or meetings, you can pin only one instance of an app per tab. For example, a YouTube tab can only be pinned once per meeting, ensuring a clean and focused experience.
* **Pre-pinned tabs**: IT admins can pre-pin tabs in meetings or channels, ensuring that necessary tools and resources are easily accessible to users.
* **Adaptive and responsive**: Tabs are designed to adapt to the user’s environment, ensuring content fits seamlessly into the Teams experience.
* **Collaboration**: Reuse of SharePoint web parts within the tab.
* **Multi-capability apps**: If a tab is added to an app that also has a bot, the bot is also added to the team.
* **Locale awareness**: The users can indicate language that is `en-us`.
* **Deep links**:
  * Ability to use bots or app notifications to deep link to the tab or to a sub-entity within the service, for example an individual work item.
  * The ability to open a modal dialog from links within a tab.
* **Authentication**:
  * Single sign-on (SSO) capability, if supported.
  * Awareness of Microsoft Entra ID of the current user.

Using tab apps in Teams has the following benefits:

* **Streamlined Workflows**: Keep all your important tools and content in one place, so you don't have to switch between apps.
* **Improved Collaboration**: Receive live updates, chat integration, and shared data, all within Teams.
* **Customization**: Design custom tabs to fit your business needs, embedding both internal tools and third-party services.
* **Consistency Across Platforms**: Access tabs across Teams, Outlook, and Microsoft 365 for a seamless experience.

By building a Teams tab app, you can:

* Integrate your tab app with advanced features
* Enable your app to reach a vast user base and enhance app visibility
* Enhance user engagement and productivity

| # | To ... | Try ... | Here's how |
| --- | --- | --- | --- |
| 1. | Customize UI (Tab as a web app): The tab hosts a web app that is fully customizable with HTML, CSS, and JS. | Pin only one tab per application to the left pane for convenient access within chats, channels, or meetings, as tabs function similarly to applications. | [Link to relevant section and API] |
| 2. | Build access to Teams context - Teams tab can access the current context of the team, channel, and user information. | Use context-specific data to build personalized and relevant UX. For example, display team or channel-specific data. | [Link to relevant section and API] |
| 3. | Pin or share a tab for easier access - A user can pin a tab app to left-hand navigation or add it to individual channel or chat. | Pin a tab to provide easy access to the app and improve workflow efficiency. Make the app available for day-to-day access. | [Link to relevant section and API] |
| 4. | Build support for Adaptive Card and provide UI capability - embed content using AC, etc. | Use Adaptive Cards to provide a flexible way to show dynamic data such as notifications or forms.  It can show relevant and updated information and user interaction. | [Link to relevant section and API] |
| 5. | Build authentication to protect user data and help user access | Tabs can use AAD for authentication (SSO, OAuth, and more) | [Link to relevant section and API] |
| 6. | Ensure data is shared securely with permission control, and prevent security risks. | App permissions and access resources like SharePoint, Graph APIs, etc. | [Link to relevant section and API] |
| 7. | Build collaboration and integration so users can use multiple tools or datasets without having to switch between apps. | Multi-tab support for collaboration with web app or content | [Link to relevant section and API] |
| 8. | Create custom apps for desktop and mobile devices, adjust UI, and have flexible UX for all environment, and provide remote access | Mobile support | [Link to relevant section and API] |
| 9. | Provide latest info to the user. Beneficial in scenarios where data monitoring or timely update is required. | Integration with real-time data from backend servers or databases directly into tabs | [Link to relevant section and API] |
| 10. | Easy navigation for enhanced UX, reduce search time, improve collaboration and communication | Support for deep linking – Devs can add deep links to open specific tabs | [Link to relevant section and API] |
| 11. | Streamline communication, all interaction in one consolidated place | Collaboration workflow - @mentions, notifications, comments, and more. | [Link to relevant section and API] |
| 12. | Build support for meetings and calls in tab apps | Tabs for Teams meeting | [Link to relevant section and API] |

## Enable personal tab apps for calling extensibility

You can create personal scope apps that integrate with Public Switched Telephone Network (PSTN) and Teams-to-Teams calls. Use the right scope and context to build apps that utilize tab type, static scope, personal context, and meeting side panels.

For more information, see [build tabs for calling](../../apps-in-teams-meetings/build-tabs-for-calling.md).

## See also

## Next step
