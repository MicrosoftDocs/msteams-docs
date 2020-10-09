---
author: heath-hamilton
description: Learn how to build a channel and group tab for your first Microsoft Teams app.
ms.author: lajanuar
ms.date: 09/22/2020
ms.topic: tutorial
title: Build a Teams channel and group tab
---
# Build a Teams channel and group tab

In this tutorial, you'll build a basic *channel tab* (also known as a *group tab*), which is a full-screen page for a team channel or chat. Unlike a personal tab, users can configure some aspects of this kind of tab (for example, rename the tab so it's meaningful to their channel).

## Your assignment

Not long ago, your organization created a Teams tab with information on how to contact important functions (help desk, HR, etc.). However, since the tab was scoped only for personal use, each user must install the tab to see it and adoption is lower than expected. In other words, too many workers still don't know how to reach the help desk.

You can make this information easier to find by building a channel tab, which will remove the burden of requiring everyone to install an app. Instead, one user can install the tab in a channel or chat for the benefit of an entire group.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify some of the app manifest properties and scaffolding relevant to channel and group tabs
> * Host an app locally
> * Create tab content
> * Create content for a tab's configuration page
> * Allow a tab to be configured and installed
> * Provide a suggested tab name

## 1. Create your app project

The Microsoft Teams Toolkit helps you set up the app manifest and scaffolding relevant to channel and group tabs, including a basic configuration page and content page that displays a "Hello, World!" message.

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
1. On the **Add capabilities** screen, select **Tab** then **Group or Teams channel tab**.
1. Select **Finish** at the bottom of the screen to configure your project.  

## 2. Identify relevant app project components

Much of the app manifest and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a channel and group tab.

### App manifest

The following snippet from the app manifest shows [`configurableTabs`](../resources/schema/manifest-schema.md#configurabletabs), which includes the properties and default values relevant to channel and group tabs.

```JSON
"configurableTabs": [
    {
        "configurationUrl": "{baseUrl0}/config",
        "canUpdateConfiguration": true,
        "scopes": [
            "team",
            "groupchat"
        ]
    }
],
```

* `configurationUrl`: The host URL for your tab configuration page (must be HTTPS).
* `canUpdateConfiguration`: If set to `true`, users can change tab settings, rename the tab, or remove it from a channel or chat.
* `scopes`: Specifies if users can install the app in channels (`team`) and chats (`groupchat`). At least one value is required.

### App scaffolding

The app scaffolding provides a `TabConfig.js` file, located in the `src/components` directory of your project, for rendering your tab's configuration page (more on this soon).

## 3. Run your app

In the interest of time, you'll build and run your app locally.

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

Once complete, there's a **Compiled successfully!** message in the terminal.

## 4. Set up a secure tunnel to your app

For testing purposes, let's host your tab on a local web server (port 3000).

1. In a terminal, run `ngrok http 3000`.
1. Copy the HTTPS URL you're provided.
1. In your `.publish` directory, open `Development.env`.
1. Replace the `baseUrl0` value with the copied URL. (For example, change `baseUrl0=http://localhost:3000` to `baseUrl0=https://85528b2b3ca5.ngrok.io`.)

Your app manifest is pointing to where you're hosting the tab.

## 5. Customize your tab content page

Open the app manifest (`manifest.json`) in the `.publish` directory and set the following properties in [`staticTabs`](../resources/schema/manifest-schema.md#statictabs), which defines your tab's content page.

```JSON
"staticTabs": [
    {
        "entityId": "index",
        "name": "My Contacts",
        "contentUrl": "{baseUrl0}/tab",
        "scopes": [ "personal" ]
    }
],
```

Copy and update the following snippet with information that's relevant to your organization or, for the sake of time, use the code as is.

```JSX
<div>
  <h1>Important Contacts</h1>
    <ul>
      <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
      <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
      <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
    </ul>
</div>
```

Go to the `src/components` directory and open `Tab.js`. Locate the `render()` function and paste your content inside `return()` (as shown).

```JavaScript
render() {

    let userName = Object.keys(this.state.context).length > 0 ? this.state.context['upn'] : "";

    return (
    <div>
      <h1>Important Contacts</h1>
        <ul>
          <li>Help Desk: <a href="mailto:support@company.com">support@company.com</a></li>
          <li>Human Resources: <a href="mailto:hr@company.com">hr@company.com</a></li>
          <li>Facilities: <a href="mailto:facilities@company.com">facilities@company.com</a></li>
        </ul>
    </div>
    );
}
```

Add the following rule to `App.css` so the email links are easier to read no matter which theme is used.

```CSS
a {
  color: inherit;
}
```

## 6. Create your tab configuration page

Every tab in a channel or chat has a configuration page, a modal with at least one setup option that displays when users install your app. The configuration page by default asks users if they want to notify the channel or chat when the tab is installed.

Add some content to your configuration page. Go to your project's `src/components` directory, open `TabConfig.js`, and insert some content inside `return()` (as shown).

```JavaScript
return (
    <div>
      <h1>Add My Contoso Contacts</h1>
      <div>
        Select <b>Save</b> to add our organization's important contacts to this workspace.
      </div>
    </div>
);
```
 
> [!TIP]
> At minimum, provide some brief information about your app on this page since this may be the first time users are learning about it. You also could include custom configuration options or an [authentication workflow](../tabs/how-to/authentication/auth-aad-sso.md), which is common on tab configuration pages.

## 7. Allow the tab to be configured and installed

For users to successfully configure and install the tab, you must add the [secure host URL you set up](#4-set-up-a-secure-tunnel-to-your-app) to the configuration page component.

Go to `TabConfig.js` and locate `microsoftTeams.settings.setSettings`. For `"contentUrl"`, replace the `localhost:3000` part of the URL with the domain where you're hosting the tab content (as shown).

```JavaScript
microsoftTeams.settings.setSettings({
  "contentUrl": "https://<MY_HOST_DOMAIN>/tab"
});
```

Also, make sure that `microsoftTeams.settings.setValidityState(true);`. It is by default, but if set to `false`, the **Save** button is disabled on the configuration page.

## 8. Provide a suggested tab name

When you install a tab for personal use, the display name is the `name` property in the `staticTabs` portion of the app manifest (for example, **My Contacts**). When you install a channel tab, by default the app name displays (for example, **first-app**).

This may be fine depending on what you call your app, but you may want to provide a name that makes more sense in the context of group collaboration (for example, **Team Contacts**).

In `TabConfig.js`, go back to `microsoftTeams.settings.setSettings`. Add the `suggestedDisplayName` property with the tab name you want to display by default (as shown). Use the provided name or create your own. Remember, in the manifest you're allowing users to change the name if they want.

```JavaScript
microsoftTeams.settings.setSettings({
  "contentUrl": "https://<MY_HOST_DOMAIN>/tab",
  "suggestedDisplayName": "Team Contacts"
});
```

## 9. View the tab

To see your tab's configuration and content pages, you must install it in a channel or chat.

1. In the Teams client, select **Apps**.
1. Select **Upload a custom app** and choose your app's `Development.zip`.
1. Choose **Add to a team** or **Add to a chat** and locate a channel or chat you can use for testing.
1. Select **Set up a tab**. The configuration page displays.<br/>
   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content.png" alt-text="Screenshot of a channel tab configuration page.":::
1. Select **Save** to configure the tab. The content displays.<br/>
   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content-installed.png" alt-text="Screenshot of a channel tab with static content view.":::

## Well done

Congratulations! You have a Teams app with a tab for displaying useful content in channels and chats.

## Learn more

* [Authenticate tab users with SSO](../tabs/how-to/authentication/auth-aad-sso.md): If you only want authorized users viewing your tab, set up single sign-on (SSO) through Azure Active Directory (AD).
* [Embed content from an existing web app or webpage](../tabs/how-to/tab-requirements.md): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](../tabs/design/tabs.md): See the recommended guidelines for designing Teams tabs.
* [Build tabs for mobile](../tabs/design/tabs-mobile.md): Understand how to develop tabs for phones and tablets.
* [Create a tab without the toolkit](../tabs/quickstarts/create-channel-group-tab-node-yeoman.md)

## Next lesson

You know how to build a tab for collaboration. Want to try building a different kind of Teams app?

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
