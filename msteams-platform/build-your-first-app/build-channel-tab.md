---
title: Get started - Build a channel and group tab
author: girliemac
description: Quickly create a Microsoft Teams channel and group tab using the Microsoft Teams Toolkit.
ms.author: timura
ms.date: 03/22/2020
ms.topic: tutorial
---
# Build your first channel and group tab for Microsoft Teams

This tutorial teaches you to build a basic *channel tab* also known as a *group tab*, which is a full-screen page for a team channel or chat. You can also configure some aspects of this kind of tab, for example, rename the tab so it's meaningful to their channel, which you cannot do in a Personal Tab.

## What you'll learn

* Create an app project using the Microsoft Teams Toolkit for Visual Studio Code.
* Understand the app configurations and scaffolding relevant to channel tabs.
* Create tab content and tab configuration.
* Build and run your app in teams for testing.

## Prerequisites

Make sure that you understand how to set up and build a simple Teams app. For more information, see [create your first Microsoft Teams "Hello, World!" app](../build-your-first-app/build-and-run.md).

## 1. Create your app project

The Microsoft Teams Toolkit helps you to configure your app and set up the scaffolding relevant to channel and group tabs. It also contains a basic configuration page and content page that displays a "Hello, World!" message.

**To create your app project**

1. Go to Visual Studio Code and select **Microsoft Teams** :::image type="icon" source="../assets/icons/vsc-toolkit.png"::: on the left Activity Bar.
1. Sign in with your Microsoft 365 development account when prompted to do so.
1. On the **Select project** screen, select **JS** (JavaScript) under **Channel and group app**.
1. Enter a name for your Teams app. 

    > [!NOTE]
    > This is the default name for your app and also the name of the app project directory on your local machine.

1. Select **Group or Teams channel tab**.
1. Select **Finish** at the bottom of the screen to configure your project and save your project on your local machine.  

## 2. Understand your app project components

Much of the app configurations and scaffolding are set up automatically when you create your project with the toolkit. Let's look at the main components for building a channel tab.

* **App configurations**: Open **App Studio** in the toolkit to view and update your app configurations.
* **App scaffolding**: The app scaffolding provides the components needed for rendering your channel tab in Teams. There's a lot you can work with, however, for now let's focus on the following:
  * The files located in the `src/components` directory of your project:
    * `Tab.js` for rendering your tab's content page.
    * `TabConfig.js` for rendering your tab's configuration page.
  * Microsoft Teams JavaScript client SDK, which comes pre-loaded in your project's front-end components.

## 3. Customize your tab content page

1. Copy and modify the following code sample with information that's relevant to your organization. You can also use the snippet as it is:
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
1. Go to the `src/components` directory and open the `Tab.js` file. Locate the `render()` function and paste your code inside `return()` as shown in the following example:
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
1. Go to the `src/components` directory and update the `App.css` file with the following code to make the email links easier to read in any theme that is used:
    ```CSS
    a {
      color: inherit;
    }
    ```

## 4. Customize your tab configuration page

Every tab in a channel or chat has a configuration page, a modal with at least one setup option that displays when users add your app. The configuration page by default asks users if they want to notify the channel or chat when the tab is installed. You can customize the configuration page by adding custom content.

To add custom content, open `TabConfig.js` file from the `src/components` directory and update the placeholder content inside `return()` as shown in the following example:

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
> Give a brief information about your app on this page since this would be the first time users are reading about it. You can also include custom configuration options or an [authentication workflow](../tabs/how-to/authentication/auth-aad-sso.md), which is common on tab configuration pages.

## 5. Customize your tab name

When you add a channel tab, the app name displays by default, for example, **first-app**. You can also provide a name that makes more sense in the context of group collaboration, for example, **Team Contacts**:

1. Go to the `src/components` directory and open the `TabConfig.js` file.
1. Add the `suggestedDisplayName` property with the tab name you want to display by default under `microsoftTeams.settings.setSettings` as shown in the following example:

  ```JavaScript
    microsoftTeams.settings.setSettings({
    "contentUrl": "https://localhost:3000/tab",
    "suggestedDisplayName": "Team Contacts"
  });
  ```

## 6. Build and run your app

This tutorial teaches you to build and run your app locally. 

1. Go to the root directory of your app project in Terminal.
1. Run `npm install`.
1. Run `npm start`.

This information is also present in the `README` section of the toolkit.
Your app is running on `https://localhost:3000` after the **Compiled successfully!** message appears in the terminal. 

## 7. Sideload your app in Teams

Your app is ready to test in Teams. To do this, you must have an account that allows app sideloading. 

1. Open a Teams web client in Visual Studio Code with the **F5** key.
1. Add (`localhost`) as trustworthy by following these steps to enable your app content to display in Teams:

   1. Open a new tab in the same browser window (Google Chrome by default) which opened with the **F5** key.
   1. Open `https://localhost:3000/tab` and proceed to the page.

1. Select **Add to a team** or **Add to a chat** and locate a channel or chat you can use for testing from the modal in Teams.
1. Select **Set up a tab**. The configuration page displays in a modal.

   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content.png" alt-text="Screenshot of a channel tab configuration page.":::

1. Select **Save** to configure the tab. The following content page appears:

   :::image type="content" source="../assets/images/tabs/channel-tab-tutorial-content-installed.png" alt-text="Screenshot of a channel tab with static content view.":::

## See also

* [Build and run your first Microsoft Teams app](../build-your-first-app/build-and-run.md) 
* [Teams JavaScript client SDK](https://docs.microsoft.com/javascript/api/@microsoft/teams-js/?view=msteams-client-js-latest&preserve-view=true)
* [Designing your tab for Microsoft Teams desktop and web](../tabs/design/tabs.md) 
* [Designing your Microsoft Teams app with UI templates](../concepts/design/design-teams-app-ui-templates.md) 
* [Tabs on mobile](../tabs/design/tabs-mobile.md)
* [Single sign-on (SSO) support for tabs](../tabs/how-to/authentication/auth-aad-sso.md)
* [Microsoft Teams API overview](https://docs.microsoft.com/graph/teams-concept-overview)
* [Create a custom personal tab with Node.js and the Yeoman Generator for Microsoft Teams](../tabs/quickstarts/create-personal-tab-node-yeoman.md)

## Next step

> [!div class="nextstepaction"]
> [Build a bot](../build-your-first-app/build-bot.md)

> [!div class="nextstepaction"]
> [Build a messaging extension](../build-your-first-app/build-messaging-extension.md)