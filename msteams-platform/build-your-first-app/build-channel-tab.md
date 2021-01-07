---
title: Get started - Build a channel and group tab
author: heath-hamilton
description: Quickly create a Microsoft Teams channel and group tab using the Microsoft Teams Toolkit.
ms.author: lajanuar
ms.date: 10/09/2020
ms.topic: tutorial
---
# Build a channel and group tab for Microsoft Teams

In this tutorial, you'll build a basic *channel tab* (also known as a *group tab*), which is a full-screen page for a team channel or chat. Unlike a personal tab, users can configure some aspects of this kind of tab (for example, rename the tab so it's meaningful to their channel).

## Your assignment

Not long ago, your organization created a Teams app that uses a tab to display important contact information (help desk, HR, etc.). However, since it's a personal tab, each user must install the tab to see it and adoption is lower than expected. In other words, too many workers still don't know how to reach the help desk.

You can make this information easier to find by building a channel tab, which will remove the burden of requiring everyone to install an app. Instead, one user can add the tab in a channel or chat for the benefit of an entire group.

## What you'll learn

> [!div class="checklist"]
>
> * Create an app project using the Microsoft Teams Toolkit for Visual Studio Code
> * Identify some of the app configurations and scaffolding relevant to channel tabs
> * Create tab content
> * Create content for a tab's configuration page
> * Provide a suggested tab name
> * Build and run your app locally
> * Sideload your app in Teams for testing

## Before you begin

If you haven't yet, make sure you [understand and install the Teams development prerequisites](build-first-app-overview.md#get-prerequisites).

## 1. Create your app project

The Microsoft Teams Toolkit helps configure your app and set up scaffolding relevant to channel and group tabs, including a basic configuration page and content page that displays a "Hello, World!" message.

> [!TIP]
> If you haven't created a Teams app project before, you might find it helpful to follow [these instructions](../build-your-first-app/build-and-run.md) that explain projects in more detail.

1. In Visual Studio Code, select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar and choose **Create a new Teams app**.
1. When prompted, sign in with your Microsoft 365 development account.
1. On the **Add capabilities** screen, select **Tab** then **Next**.
1. Enter a name for your Teams app. (This is the default name for your app and also the name of the app project directory on your local machine.)
Select **Group or Teams channel tab**.
1. Select **Finish** at the bottom of the screen to configure your project.  

## 2. Identify relevant app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the toolkit. Let's look at the main components for building a channel tab.

### App configurations

In the toolkit, go to **App Studio** to view and update your app configurations.

### App scaffolding

The app scaffolding provides the components for rendering your channel tab in Teams. There's a lot you can work with, but for now you only need to focus on the following:

* Two files located in the `src/components` directory of your project:
  * `Tab.js` for rendering your tab's content page.
  * `TabConfig.js` for rendering your tab's configuration page.
* Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components.

## 3. Customize your tab content page

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

Add the following rule to `App.css` (also located in `src/components`) so the email links are easier to read no matter which theme is used.

```CSS
a {
  color: inherit;
}
```

## 4. Customize your tab configuration page

Every tab in a channel or chat has a configuration page, a modal with at least one setup option that displays when users add your app. The configuration page by default asks users if they want to notify the channel or chat when the tab is installed.

Add some custom content to your configuration page. Go to your project's `src/components` directory, open `TabConfig.js`, and update the placeholder content inside `return()` (as shown in the following example).

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

## 5. Provide a suggested tab name

When you add a channel tab, by default the app name displays (for example, **first-app**).

This may be fine depending on what you call your app, but you may want to provide a name that makes more sense in the context of group collaboration (for example, **Team Contacts**).

1. In `TabConfig.js`, go to `microsoftTeams.settings.setSettings`.
2. Add the `suggestedDisplayName` property with the tab name you want to display by default. 
3. Use the name provided in the following example or type your name. (By default, users can change the name.)

```JavaScript
microsoftTeams.settings.setSettings({
  "contentUrl": "https://localhost:3000/tab",
  "suggestedDisplayName": "Team Contacts"
});
```

## 6. Build and run your app

In the interest of time, you'll build and run your app locally.

(This information is also available in the toolkit `README`.)

1. In a terminal, go to the root directory of your app project and run `npm install`.
1. Run `npm start`.

Once complete, there's a **Compiled successfully!** message in the terminal. Your app is running on `https://localhost:3000`.

## 7. Sideload your app in Teams

Your app is ready to test in Teams. To do this, you must have an account that allows app sideloading. (If you aren't sure you have that, learn about getting a [Teams development account](../build-your-first-app/build-first-app-overview.md#set-up-your-development-account).)

1. In Visual Studio Code, press the **F5** key to launch a Teams web client.
1. To display your app content in Teams, specify that where your app is running (`localhost`) is trustworthy:
   1. Open a new tab in the same browser window (Google Chrome by default) which opened after pressing **F5**.
   1. Go to `https://localhost:3000/tab` and proceed to the page.
1. Go back to Teams. In the modal, select **Add to a team** or **Add to a chat** and locate a channel or chat you can use for testing.
1. Select **Set up a tab**. The configuration page displays in a modal.<br/>
   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content.png" alt-text="Screenshot of a channel tab configuration page.":::
1. Select **Save** to configure the tab. The content page displays.<br/>
   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content-installed.png" alt-text="Screenshot of a channel tab with static content view.":::

## Well done

Congratulations! You have a Teams app with a tab for displaying useful content in channels and chats.

## Learn more

* [Authenticate tab users with SSO](../tabs/how-to/authentication/auth-aad-sso.md): If you only want authorized users viewing your tab, set up single sign-on (SSO) through Azure Active Directory (AD).
* [Embed content from an existing web app or webpage](../tabs/how-to/add-tab.md#tab-requirements): We showed you how to create new content for a tab, but you can also load content from an external URL.
* [Create a seamless tab experience](../tabs/design/tabs.md): See the recommended guidelines for designing Teams tabs.
* [Build tabs for mobile](../tabs/design/tabs-mobile.md): Understand how to develop tabs for phones and tablets.
* [Utilize Teams data with the Microsoft Graph API](https://docs.microsoft.com/graph/teams-concept-overview)
* [Create a tab without the toolkit](../tabs/how-to/add-tab.md)

## Next lesson

You know how to build a tab for collaboration. Want to try building a different kind of Teams app?

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)
