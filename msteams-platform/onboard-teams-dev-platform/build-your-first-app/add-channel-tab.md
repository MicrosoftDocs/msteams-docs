---
author: heath-hamilton
description: Learn how to build a channel tab in your first Microsoft Teams app.
ms.author: heath-hamilton
ms.date: 08/31/2020
ms.topic: tutorial
title: Create a channel tab for Teams
---
# Create a channel tab for Teams

In this tutorial, you'll build a basic *channel tab*, a full-screen content page for a team channel or chat. Unlike a personal tab, users can configure some aspects of a channel tab (for example, rename the tab so it's meaningful to their channel).

## Before you begin

You need a basic running app to get started. If you don't have one, follow the [build and run your Teams first app instructions](../build-your-first-app/build-and-run.md). When you create your app project, choose only the **Group or Teams channel tab** option.

## Your assignment

Not long ago, your organization created a Teams tab with information on how to contact important functions (help desk, HR, etc.). However, since the tab was scoped only for personal use, each user must install the tab to see it and adoption is lower than expected. In other words, too many workers still don't know how to reach the help desk.

You can make this information easier to find by building a channel tab, which will remove the burden of requiring everyone to install an app. Instead, one user can install the tab in a channel or chat for the benefit of an entire group.

## What you'll learn

> [!div class="checklist"]
>
> * Identify the app manifest properties and scaffolding relevant to channel tabs
> * Create tab content
> * Create content for a tab's configuration page
> * Allow a tab to be configured and installed
> * Provide a suggested tab name

## Identify relevant app project components

Much of the app manifest and scaffolding are set up automatically when you create your project with the Teams Toolkit. Let's look at the main components for building a channel tab.

### App manifest

The following snippet from the app manifest shows [`configurableTabs`](../../resources/schema/manifest-schema.md#configurabletabs), which includes the properties and default values relevant to channel tabs.

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

## Create your tab content

Open your app manifest (`manifest.json`) and set the following properties in [`staticTabs`](../../resources/schema/manifest-schema.md#statictabs), which defines your tab's content page.

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

## Create your tab configuration page

Every channel tab has a configuration page, a modal with at least one setup option that displays when installing the app. The configuration page by default asks users if they want to notify the channel or chat when the tab is installed.

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
> At minimum, provide some brief information about your app on this page since this may be the first time users are learning about it. You also could include custom configuration options or an [authentication workflow](../../tabs/how-to/authentication/auth-aad-sso.md), which is common on tab configuration pages.

## Allow the tab to be configured and installed

For users to successfully configure and install the channel tab, you must add the host URL you set up when [creating and running your first app](../build-your-first-app/build-and-run.md) to the configuration page component.

Go to `TabConfig.js` and locate `microsoftTeams.settings.setSettings`. For `"contentUrl"`, replace the `localhost:3000` part of the URL with the domain where you're hosting the tab content (as shown).

```JavaScript
    microsoftTeams.settings.setSettings({
      "contentUrl": "https://<MY_HOST_DOMAIN>/tab"
    });
```

Also, make sure that `microsoftTeams.settings.setValidityState(true);`. It is by default, but if set to `false`, the **Save** button is disabled on the configuration page.

## Provide a suggested tab name

When you install a tab for personal use, the display name is the `name` property in the `staticTabs` portion of of the app manifest (for example, **My Contacts**). When you install a channel tab, by default the app name displays (for example, **first-app**).

This may be fine depending on what you call your app, but you may want to provide a name that makes more sense in the context of group collaboration (for example, **Team Contacts**).

In `TabConfig.js`, go back to `microsoftTeams.settings.setSettings`. Add the `suggestedDisplayName` property with the tab name you want to display by default (as shown). Use the provided name or create your own. Remember, in the manifest you're allowing users to change the name if they want.

```JavaScript
    microsoftTeams.settings.setSettings({
      "contentUrl": "https://<MY_HOST_DOMAIN>/tab",
      "suggestedDisplayName": "Team Contacts"
    });
```

## View the channel tab

To see your channel tab's configuration and content pages, you must install it in a channel or chat.

1. In the Teams client, select **Apps**.
1. Select **Upload a custom app** and choose your app's `Development.zip`.
1. Choose **Add to a team** or **Add to a chat** and locate a channel or chat you can use for testing.
1. Select **Set up a tab**. The configuration page displays.

:::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content.png" alt-text="Example screenshot of a channel tab with static content.":::

Once you select **Save** to configure the tab, the content displays.

:::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content-installed.png" alt-text="Example screenshot of a channel tab with static content.":::

## Well done

Congratulations! You have a Teams app with a channel tab for displaying useful content in channels and chats.

## Learn more

* [Authenticate tab users with SSO](../../tabs/how-to/authentication/auth-aad-sso.md): If you only want authorized users viewing your tab, set up single sign-on (SSO) through Azure Active Directory (AD).
* [Embed content from an existing web app or webpage](../../tabs/how-to/add-tab.md#tab-requirements): We showed you how to create new content for a personal tab, but you can also load content from an external URL.
* [Create a seamless experience for your tab](../../tabs/design/tabs.md): See the recommended guidelines for designing Teams tabs.
* [Build tabs for mobile](../../tabs/design/tabs-mobile.md): Understand how to develop tabs for phones and tablets.

## Next lesson

You know how to build a tab for collaboration. Want to try building a different kind of Teams app?

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/add-bot.md)
