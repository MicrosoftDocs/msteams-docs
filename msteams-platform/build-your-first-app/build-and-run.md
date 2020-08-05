---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into Microsoft Teams platform development by quickly building and running a "Hello, world!" app:

## Prerequisites

1. [Microsoft 365 developer account](/concepts/build-and-test/prepare-your-o365-tenant) or Teams account that allows you to sideload an app. 
1. [Enable Teams developer preview mode](/resources/dev-preview/developer-preview-intro#enable-developer-preview)

<!-- markdownlint-disable MD033 -->
<details>
  <summary>Not sure if your account allow you to sideload an app? Click here.</summary>
Click on AppStore on the bottom left corner and you should see "Upload a custom app" if sideloading is turned on.
<image src="../assets/images/app-up-and-running/upload-custom-app.png">

If sideloading is not turned on for your tenant, please get a Microsoft 365 developer account and turn on sideloading by following [these steps](/concepts/build-and-test/prepare-your-o365-tenant#Enable-custom-Teams-apps-and-turn-on-custom-app-uploading) 
</details>

## Build with Visual Studio Code

Follow these steps to create your new Teams project:

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download)

## Set up a project with Visual Studio Code

Follow these steps to set up your first Teams app project using Visual Studio Code.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download).
1. Create a workspace/folder for your project in your local environment.
1. In Visual Studio Code, select the Teams icon ![Teams icon](../assets/icons/favicon-16x16.png) from the activity bar on the left.
1. Select **Create a new Teams app** from the command menu.
1. When prompted, enter the name of the workspace . This will be used as both the name of the folder where your project will reside, and the default name of your app.
1. Press **Enter** and you will arrive at the **Add capabilities** screen configure the properties for your new app.
1. Select **Tab** and then **Personal tab**

<!-- markdownlint-disable MD033 -->

<image src="../assets/images/app-up-and-running/choose-tab.png" alt-text="<alt text>">

1. Select the **Finish** button to complete the configuration process.
1. You should see a README popping up and we are ready to run your app
1. Following the readme instruction to build and run your apps locally and then deploy to Teams
1. You should see your app up and running in the Teams Client 

<image src="../assets/images/app-up-and-running/tab-running.png" alt-text="<alt text>">

---

### Let's take a deeper look

Now that you have your first app up and running in Teams. Let's examine the essential files found in the Toolkit template and understand the role of each in the overall application.

## The app manifest

The manifest file — **.publish/manifest.json**  — is the starting point for any Teams app project. It specifies  your app's attributes and points to required resources for your solution. The manifest has a number of fields and properties that you can surface to create an amazing app experience. There are two sections of the app manifest that integrate personal/static and channel/configurable tabs with Teams:

### Personal tab

```json
"staticTabs": [
    {
      "entityId": "unique Id for the page entity",
      "scopes": [
        "personal"
      ],
      "name": "Display name of tab",
      "contentUrl": "https://contoso.com/content (displayed in Teams canvas)",
      "websiteUrl": "https://contoso.com/content (displayed in web browser"
    }
  ]
```

### Channel tab

```json
"configurableTabs": [
    {
      "configurationUrl": "https://contoso.com/teamstab/configure",
      "scopes": [
        "team",
        "groupchat"
      ],
      "canUpdateConfiguration": true,
      "sharePointPreviewImage": "Relative path to a tab preview image for use in SharePoint — 1024px X 768",
      "supportedSharePointHosts": "Define how your tab wil be made available in SharePoint (full page or web part)"
    }
  ]
```

## The app package

The app package — **.publish/Development.zip** — is a _.zip_ file consisting of your app manifest and icons.  You'll need the app package to upload and [install your app](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) in Teams locally and to [publish in your organization's app catalog](../concepts/deploy-and-publish/overview#publish-to-your-organizations-app-catalog) or [AppSource](../concepts/deploy-and-publish/appsource/publish). Here are the components of the app package in detail:

|Data|Type|Size|Manifest location|Toolkit file name|
|---|---|:---:|:---:|-----|
|✔ **app manifest**|.json| — | — |.publish/**manifest.json**|
|✔**color logo**|.png|192&times;192 pixels|`icon.color`|.publish/**color.png**|
|✔**outline logo**|.png|32&times;32 pixels|``icon.outline`|.publish/**outline.png**|

### App.js

The app.js file — **src/components/app.js** — handles the initialization and routing of your app and, most importantly, calls the Microsoft Teams SDK to establish integral communication between your app and Teams:

```javascript
microsoftTeams.initialize(window);
```

The `MicrosoftTeams.(initialize)`  function must be called before any other [Teams SDK API](../tabs/how-to/using-teams-client-sdk.md) calls. Unlike a webpage that is loaded into a browser, Microsoft Teams tabs always display content within an **iframe** in the Teams client. Thus it is important to note that `MicrosoftTeams.(initialize)`   must be made _after_ the iframe has loaded successfully.

### Tab.js

The Tab.js file — **src/components/Tab.js** — renders the main tab content
 for your app in the personal scope. Your tab may require contextual information to display relevant content such as basic information about the user, team, or company. You can retrieve context information by calling the Microsoft Teams SDK `microsoftTeams.getContext(function(context)` function:

```javascript
 microsoftTeams.getContext((context, error) => {
      this.setState({
        context: context
      });
  }
```

### TabConfig,js

The TabConfig.js file — **src/components/TabConfig.js** — renders the content for your channel tab and displays a configuration experience for users when the tab is added to a channel. You can use the configuration page defined in the app manifest to collect any configuration information your app may need to customize the information shown in the tab. Similar to a personal tab, the content displayed in a channel tab is displayed in an **iframe**.

The URL loaded in the iframe is defined by the `contentUrl` property that's specified on the configuration page:

```javascript
microsoftTeams.settings.setSettings({"contentUrl": "https://localhost:3000/tab"})
```

Finally, the [`setValidityState`](/javascript/api/@microsoft/teams-js/microsoftteams.settings?view=msteams-client-js-latest#setvaliditystate-boolean-) boolean must be set to true so that your users can save their chosen settings in your tab:

```javascript
microsoftTeams.settings.setValidityState(true);
```

🎉 Congratulations! You have a basic functioning Teams app and you also understands some of its components. Learn how to add features to it with our real-world app tutorials.

## Next step

> [!div class="nextstepaction"]
> [Building a real-world Teams app](../build-your-first-app/building-real-world-app.md)
>
>
