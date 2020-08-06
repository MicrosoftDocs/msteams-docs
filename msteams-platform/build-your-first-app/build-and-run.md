---
title: Build and run your first Teams app
author: heath-hamilton
description: Run your first Microsoft Teams app.
---
# Build and run your first Microsoft Teams app

You can jump right into developing on the Microsoft Teams platform by quickly building and running a "Hello, world!" app.

## Set up your development environment

To build apps for Teams, you need a Teams account that enables sideload. You can either use your own Teams account or get a test tenant from Microsoft 365 developer subscription. 
Use your current Teams acount: 
1. Verify if you can sideload apps in Teams:
    1. In the Teams client, select **Apps**.
    1. Look for an option to **Upload a custom app**.
1. if you have this option, you are good to go. If not, get a developer test account. 

Get a developer test account  
1. Register for a [Microsoft 365 developer subscription](../concepts/build-and-test/prepare-your-o365-tenant.md).
1. [Enable custom app sideloading](../concepts/build-and-test/prepare-your-o365-tenant.md#enable-custom-teams-apps-and-turn-on-custom-app-uploading) for your test account. 

## Install your development tools

You can build Teams apps with your preferred tools, but here we'll show you how to get started quickly with Visual Studio Code and the Microsoft Teams Toolkit.

1. Install the latest version of [Visual Studio Code](https://code.visualstudio.com/download).
1. In Visual Studio Code, select **Extensions** :::image type="icon" source="../assets/icons/vs-code-extensions.png"::: on the left Activity Bar and install the **Microsoft Teams Toolkit**.

## Create an app project

The Microsoft Teams Toolkit can help you set up your first app project.

1. In Visual Studio Code, open the toolkit by selecting the Teams icon :::image type="icon" source="../assets/icons/favicon-16x16.png"::: on the left Activity Bar.
1. Select **Create a new Teams app**.
1. When prompted, enter a name for your app. This is the default name for your app and also the name of the project directory on your local machine.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
1. Check the **Personal tab** and **Group or Teams channel** options and select **Finish** to configure your project.

:::image type="content" source="../assets/images/get-started/toolkit-add-tabs.png" alt-text="Example screenshot of using the Teams Toolkit to set up a project with personal and channel tab scaffolding.":::

Once complete, you have the app scaffolding components for building personal and channel tabs.

## Run your app

Follow the `README.md` instructions in your project to build, run, and deploy your app to Teams.

Your app running in the Teams client should look like the following screenshot.

:::image type="content" source="../assets/images/app-up-and-running/tab-running.png" alt-text="Screenshot showing an example Hello, World! app in Teams.":::

## The app manifest

The manifest file — **.publish/manifest.json**  — is the starting point for any Teams app project. It specifies your app's attributes and points to required resources for your solution. The manifest has a number of fields and properties that you can surface to create an amazing app experience. There are two sections of the app manifest that integrate personal/static and channel/configurable tabs with Teams:

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

The app package — **.publish/Development.zip** — is a _.zip_ file consisting of your app manifest and icons.  You'll need the app package to upload and [install your app](../concepts/deploy-and-publish/overview.md#upload-your-app-directly) in Teams locally and to [publish in your organization's app catalog](../concepts/deploy-and-publish/overview.md#publish-to-your-organizations-app-catalog) or [AppSource](../concepts/deploy-and-publish/appsource/publish.md). Here are the components of the app package in detail:

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

🎉 Congratulations! You have a basic functioning Teams app and you also understand some of its components. Learn how to add features to it with our real-world app tutorials.

## Next step

> [!div class="nextstepaction"]
> [Create a personal tab](../build-your-first-app/add-personal-tab.md)
