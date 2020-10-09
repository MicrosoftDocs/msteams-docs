---
title: Create a tab using App Studio or manually
author: laujan
description: Learn how to create a Microsoft Teams tab using App Studio or manually.
keywords: teams tabs group channel configurable 
ms.topic: conceptual
ms.author: lajanuar
---
# Create a tab using App Studio or manually

> [!TIP]
> Looking for a faster way to get started? Learn how to create a [personal](../../build-your-first-app/build-personal-tab.md) or [channel or group](../../build-your-first-app/build-channel-tab.md) tab using the Microsoft Teams Toolkit.

Custom tabs allow you to serve web content that you host to your channel, group chat, and personal users. At a high level, you'll need to complete the following steps to create a tab:

1. Prepare your development environment.
1. Create your page(s).
1. Host your app service.
1. Create your app package and upload to Microsoft Teams.

[!include[prepare environment](~/includes/prepare-environment.md)]

## Create your page(s)

Whether you present your tab within the personal or channel/group scope, it will consist of one or more HTML pages that you host. Tabs with a personal scope consist of a single content page, while tabs with a channel or group scope will require a configuration page that sets the URL of the content page based on user input at the time of installation.

There are three types of tab pages. See the corresponding documentation page for full details on creating them.

1. [Content page](~/tabs/how-to/create-tab-pages/content-page.md), the page displayed in a tab.
1. [Configuration page](~/tabs/how-to/create-tab-pages/configuration-page.md), the page used to set or update the content page URL, and add it to a channel/group tab.
1. [Removal page](~/tabs/how-to/create-tab-pages/removal-page.md), an optional page that is displayed when a channel/group tab is removed.

### Tab requirements

Regardless of the type of page, you're tab will need to adhere to the following requirements:

* You must allow your pages to be served in an IFrame, via X-Frame-Options and/or Content-Security-Policy HTTP response headers.
  * Set header: `Content-Security-Policy: frame-ancestors teams.microsoft.com *.teams.microsoft.com *.skype.com`		
  * For Internet Explorer 11 compatibility, set `X-Content-Security-Policy` as well.	
  * Alternatively, set header `X-Frame-Options: ALLOW-FROM https://teams.microsoft.com/`. This header is deprecated but still respected by most browsers.
* Typically, as a safeguard against click-jacking, login pages don't render in IFrames. Therefore, your authentication logic needs to use a method other than redirect (e.g., use token-based or cookie-based authentication).

> [!NOTE]
> Chrome 80, scheduled for release in early 2020, introduces new cookie values and imposes cookie policies by default. It's recommended that you set the intended use for your cookies rather than rely on default browser behavior. *See* [SameSite cookie attribute (2020 update)](../../resources/samesite-cookie-update.md).

* Browsers adhere to a same-origin policy restriction that prevents a webpage from making requests to a different domain than the one that served a web page. However, you may need to redirect the configuration or content page to a another domain or subdomain. Your cross-domain navigation logic should allow the Teams client to validate the origin against a static validDomains list in the app manifest when loading or communicating with the tab.

* To create a seamless experience, you should style your tabs based on the Teams client's theme, design, and intent. Typically, tabs work best when they're built to address a specific need and focus on a small set of tasks or a subset of data that is relevant to the tab's channel location.

* Within your content page, add a reference to [Microsoft Teams JavaScript client SDK](/javascript/api/overview/msteams-client) using script tags. Following your page load, make a call to `microsoftTeams.initialize()`. Your page will not be displayed if you do not.

## Host your app service

Your content needs to be hosted on a publicly available URL available using HTTPS. For testing, you can use a reverse proxy, such as [ngrok](https://ngrok.com/), to expose your local port to an internet-facing URL.

## Create your app package with App Studio

You can use the App Studio app from within the Microsoft Teams client to help create your app manifest. If you do not have App studio installed in Teams, select **Apps** ![Store App](/microsoftteams/platform/assets/images/tab-images/storeApp.png) at the bottom-left corner of the Teams app, and search for App Studio. Once you find the tile, select it and choose install in the pop-up window dialog box.

1. Open the Microsoft Teams client—using the [web based version](https://teams.microsoft.com) will enable you to inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
1. Open App Studio and select the **Manifest editor** tab.
1. Choose the **Create a new app** tile.
1. Add your app details (see the [manifest schema definition](~/resources/schema/manifest-schema.md) for full description of each field).
1. In the capabilities section select **Tabs**.
    * For a personal tab, choose *Add a personal tab* and select **Add**. You will be presented with a pop-up dialogue window where you can add your tab details.
    * For a channel/group tab, under *Team Tab* select **Add** and complete the tab details fields in the Team tab pop-up window. Make sure the *can update configuration? Team* and *Group chat* boxes are checked and select **Save**.
1. In the *Domains and permissions* section, the *Domains from your tabs* field should contain your host or reverse proxy URL without the HTTPS prefix.
1. From the **Finish** => **Test and distribute** tab you can **Download** your app package, **Install** the package into a team, or **Submit** to the Teams app store for approval. *If you are using a reverse proxy you will get a warning in the **Description** field on the right. The warning can be ignored while testing your tab*.

## Create your app package manually

As with bots and messaging extensions, you update the [app manifest](~/resources/schema/manifest-schema.md) of your app to include the tab properties. These properties govern the scopes your tab is available in, the URLs to be used, and various other properties.

### Personal Tabs

The displayed content for personal tabs is the same for all users and is configured in the `staticTabs` array. You may declare up to sixteen (16) personal tabs in an app.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`entityId`|String|64 characters|✔|A unique identifier for the entity that the tab displays.|
|`name`|String|128 characters|✔|The display name of the tab in the channel interface.|
|`contentUrl`|String|2048 characters|✔|The https:// URL that points to the entity UI to be displayed in the Teams canvas.|
|`websiteUrl`|String|2048 characters||The https:// URL to point at if a user opts to view in a browser.|
|`scopes`|Array of enum|1|✔|Static tabs support only the `personal` scope, which means it can be provisioned only as part of a personal app.|

#### Simple personal tab manifest example

The example below shows just the `staticTabs` array from an app manifest.

```json
...
"staticTabs": [
    {
      "entityId": "idForPage",
      "name": "Display name for tab",
      "contentUrl": "https:// yourURL.com/content ",
      "websiteUrl": "https://yourURL.com/website",
      "scopes": [ "personal" ]
    }
...
```

### Channel/group tabs

Channel/group tabs are added in the `configurableTabs` array. You may declare only one channel/group tab in the `configurableTabs` array.

|Name| Type| Maximum size | Required | Description|
|---|---|---|---|---|
|`configurationUrl`|String|2048 characters|✔|The https:// URL to configuration page.|
|`canUpdateConfiguration`|Boolean|||A value indicating whether an instance of the tab's configuration can be updated by the user after creation. Default: `true`|
|`scopes`|Array of enum|1|✔|Configurable tabs support only the `team` and `groupchat` scopes. |

#### Simple channel/group tab manifest example

The example below shows just the `configurableTabs` array from an app manifest.

```json
...
"configurableTabs": [
    {
      "configurationUrl": "https://yourURL.com/configure",
      "canUpdateConfiguration": true,
      "scopes": [ "team", "groupchat" ]
    }
...
```

Once you have completed your `manifest.json` bundle it in a zip folder along with your two required icons.

### Upload app package directly to a team

1. Open the Microsoft Teams client. If you use the [web based version](https://teams.microsoft.com) you can inspect your front-end code using your browser's [developer tools](~/tabs/how-to/developer-tools.md).
1. In the *YourTeams* panel on the left, select the `...` menu next to the team that you're using to test your tab and choose **Manage team**.
1. In the main panel select **Apps** from the tab bar and choose **Upload a custom app** located in the lower right-hand corner of the page.
1. Open your project directory, browse to the **./package** folder, select the app package zip folder and choose **Open**. Your tab will upload into Teams.

### View your tab in Teams

1. View your personal tab:
    * In the navbar located at the far-left of the Teams client, select the `...` menu and choose your app from the list.

1. View your channel/group tab:
    * Return to your team, choose the channel where you would like to display the tab, select ➕ from the tab bar, and choose your tab from the gallery.
    * Follow the directions for adding a tab. Note that there's a custom configuration dialog for your channel/group tab. Select **Save** and your tab will be added to the channel's tab bar.

## Learn more

* [Create a content page for your tab](~/tabs/how-to/create-tab-pages/content-page.md)
* [Create a configuration page for your tab](~/tabs/how-to/create-tab-pages/configuration-page.md)
* [Update or remove a tab](~/tabs/how-to/create-tab-pages/removal-page.md)
