---
title: Manage your apps with the Developer Portal for Microsoft Teams
description: Learn how to configure and manage your apps using the Developer Portal for Microsoft Teams
keywords: getting started developer portal teams
localization_priority: Normal
ms.topic: overview
---

# Deliver great apps with the Developer Portal for Microsoft Teams

The Developer Portal makes it easy to manage your Microsoft Teams apps, whether you develop custom apps for your organization or SaaS applications for teams around the world.

- [Go to Developer Portal](https://aka.ms/dev-portal)
- [Download the Developer Portal app for Teams](https://aka.ms/dev-portal-app)

## Developer Portal Overview

The Developer Portal enables app creators to register apps with the Teams app service so they can be published to an organization's app catalog, or the Teams store. You can invite colleagues in your organization to collaborate on an app, configure runtime environment, and more.

A Teams app is a web app. Like all web apps, its source code is developed in an IDE or editor, then published to a cloud hosting solution like Azure. For the Teams client to install that app, it must be configured in such a way that it appears to be a native Teams application. This has traditionally been done by crafting a manifest file that contains all the data the Teams client needs to render content. The app package that ultimately gets installed to Teams consists of the manifest file and two icon files for the app. Developer Portal builds features and tooling around this core scenario to enable our userbase to be more successful.

### Register a new app

There are three paths to registering a Teams app with Developer Portal:
- Register a brand new app from the portal
- Import an existing app package from the portal
- Create a new app from the [Microsoft Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)

If you register a new app, you must fill out all the mandatory configuration fields before you can install the app to your Teams client.


## App Configuration


### App Overview page

Your app's overview page contains basic information about your app, a validation snapshot of your app's configuration state, and app usage metrics (currently in preview) for your app.

#### App Usage (Preview)
The App Usage metrics show the total number of Active Users for your app. These metrics are available for apps published to the Teams store or an organization's app catalog through Teams Developer Portal, and are scoped to the App ID(s) shown in the Basic Information section.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows you the count of unique active users that used your app within that rolling 30 day window, in UTC. |
| *Daily* | Shows you the count of unique active users that used your app in a given day, in UTC. |

**History:** Monthly and Daily usage is shown for the past 7 days, 30 days, and 60 days.

**Latency:** You should see usage reflected for a given day within 24-48 hours.


### Owners

Use this section to share your app registration with colleagues in your organization. The *Contributor* role has the same permissions as the *Owner* role, except the ability to delete an app. 


### Environments

Environment configurations allow you to seamlessly transion an app from your local runtime through to production.

Start by creating a new runtime environment configuration by pressing the *+ Add an environment* button. Once created, you can begin to add key value pairs for that environment. As you start configuring your app, you can use the variable names instead actual values in the property fields. When you app package is downloaded or published, you must select the environment configuration you wish to use. Global variables will be the same across all environments.

### Plans and Pricing

//TODO: Christian Maier


### Configuration

The most significant part of a Microsoft Teams app package is its manifest.json file. This file, which must conform to the [Teams App schema](~/resources/schema/manifest-schema.md), contains metadata which allows Teams to correctly present your app to users.

The *Configure* section in Developer Portal simplifies creating the app package, allowing you to describe the app, upload your icons, add app capabilities, and produce a .zip file which can easily be distributed for others to use.

> [!NOTE]
> Developer Portal does not produce functional code for your app, or host your app. Your app must already be hosted and running at the URL listed in the manifest for the app upload process to result in a working app.

#### Basic information and Branding

The *Details* and *Branding* sections define the high-level description of the app you are making. This includes things such as the app’s name, description, and visual branding. The information in these section will be used in your app's Teams store listing and app installation dialogue.

#### Capabilities

The capabilities section of *Configuration* is where the app's capabilities are defined and where details of each of those capabilities are listed.

> [!NOTE]
> The app customization feature is currently available in developer preview only.
> 
> As a best practice, you must provide customization guidelines for app users and customers to follow when customizing your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

##### Group and channel app

* **Team Tabs.** A team tab becomes part of a channel and provides quick access to team information and resources. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports, but it does enable the *Go to website* button that launches the report in the main Power BI website.

  For team tabs, you must provide a *Configuration URL* to present options and gather information so users can customize the content and experience of your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.

  You must also provide any additional domains that the tab expects to load from or link to.

* **Personal Tabs.** This section lets you define a set of tabs that are presented by default in the personal app experience (i.e. the experience a user has with your app outside the context of a team or channel). In this section, provide the tab name, a unique identifier, the URL that points to the UI to be displayed in Teams, and optionally, the URL to use if a user opts to view the tab in a browser. As with Teams tabs, provide any additional domains from which the tab expects to load from or link to.

##### Bot

This section allows you to add a [conversational bot](~/bots/what-are-bots.md) to your app. If you already have a bot registered with Bot Framework, you can add that bot by clicking *Set Up* and supplying the bot's name, Bot Framework ID, and defining the scopes in which the bot will work.

If you have not yet registered a bot with the Bot Framework, click *Register* to create a new one. Once you’re done registering your bot, come back to this section of the Manifest Editor to enter its name and Bot Framework ID.

After you have supplied your bot's information, you can now optionally define a list of commands that your bot can suggest to users. Add the name of the command, a description of the command which indicates its syntax and arguments, and the scope(s) to which this command should apply.

Note that if you have defined your bot to only support one scope, commands specified for the unsupported scope will be ignored. You can edit the scopes your bot supports at any time.

##### Connector

This section allows you to add a connector to your app. If you already have registered an Office 365 connector, choose *Set up* and enter the name and ID of the connector. If you want a new connector click *Register* to be taken to the Connector Developer Dashboard in your browser.

> [!NOTE]
> App customization enables admins to change the look-and-feel of the apps loaded through bots, messaging extensions, tabs, and connectors. For example, if the Teams admin customizes the name of an app from *Contoso* to *Contoso Agent*, then the app will appear with the new name *Contoso Agent* to users. However, while adding a connector to a chat, in the list the connectors will still show the name of the app as *Contoso*.

##### Messaging Extensions

[Messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md) are a powerful way for users to engage with your app within Microsoft Teams. Users can query for information from your service and post that information in the form of cards, right into the channel or chat conversation.

Messaging extensions are powered by Bot Framework bots, so they require a configured bot to operate. If you have the name and Bot Framework ID of the bot you would like to power the messaging extension, enter it. Otherwise, click *Register* to create one and enter the information afterward. Select whether the configuration of a messaging extension can be updated by the user.

Once you have the underlying bot configured, define the commands and parameters which the messaging extension can accept.

Each command requires a title and an ID. The command can optionally contain a description for the user. Each command can support up to five parameters, each of which requires:

* The name of the parameter as it appears in the Teams client and is included in the user request
* A user-friendly title
* An optional description

> [!NOTE]
> To create messaging extension using app studio, see [create messaging extension using app studio](~/resources/create-messaging-extension-using-appstudio.md).

##### Meeting extension

//TODO: Rajesh R.

##### Scene

Scenes in Together Mode is an artifact created by the scene developer using the [Microsoft Scene studio](build-scene-in-scene-studio.md) that brings people together along with their video stream in a creative setting as conceived by the scene creator. In a conceived scene setting, participants have designated seats with video streams rendered in those seats.

>[!NOTE]
> Scene only apps are recommended as the acquisition experience for such apps is more seamless.

The following image gives an overview to create a scene only app:

:::image type="content" source="../assets/images/apps-in-meetings/create-together-mode-scene-flow.png" alt-text="Create scene only app" border="false":::

>[!NOTE]
> * A scene only app is still an app in Microsoft Teams. The app package creation step is abstracted out since the Scene studio handles the app package creation in the background.
> * Multiple scenes in a single app package appear as a flat list of scenes to users.

#### Permissions

You can enrich your Teams app with native device capabilities, such as camera, microphone, and location.

#### Languages

Set up or change the languages that your app supports.

#### Single Sign-On

Configure your app to authenticate users with single sign-on (SSO).

#### Domains
//TODO


## Distribute

Once you have finished defining your application, the *Distribute* section allows you export your app’s definition as a zip file which then can be shared and uploaded into the Teams client for testing. Clicking export downloads the zip file as *appname.zip* in your default download directory.

### Publish your app to Teams

On your project home page, you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users. Your IT admin will review these submissions. You can return to the *Publish* page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you'll come to submit updates to your app or cancel any currently active submissions.


## Tools

### Bot Management

//Todo

### Scene studio

Microsoft has a Scene studio that allows you to build the scenes. It is available on the [Scenes Editor - Teams Developer Portal](https://dev.teams.microsoft.com/scenes).

>[!NOTE]
> This document is referring to Scene studio in the Microsoft Teams Developer Portal. The interface and functionalities are all the same in App Studio Scene Designer.

A scene in the context of the Scene studio is an artifact that contains the following:

* Seats reserved for meeting organizer and meeting presenters.

    >[!NOTE]
    > Presenter does not refer to the user who is actively sharing. It refers to the [meeting role](https://support.microsoft.com/en-us/office/roles-in-a-teams-meeting-c16fa7d0-1666-4dde-8686-0a0bfe16e019).

* Seat and image for each participant. Each seat and image has an adjustable width and height.

    >[!NOTE]
    > PNG is the only supported format.

* The xyz coordinates of all the seats and images.
* A collection of images that are camouflaged as one image.

The following image shows each seat represented as an avatar for building scenes:

![Scene studio](../assets/images/apps-in-meetings/scene-design-studio.png)

The seat dimensions become the canvas for rendering the participant video stream.

![Build a scene](../assets/images/apps-in-meetings/build-a-scene.png)

**To build a scene using the Scene studio**

1. Go to [Scenes Editor - Teams Developer Portal](https://dev.teams.microsoft.com/scenes).

2. From the **Scenes Editor** page, select **Create a new scene**.

3. On the right side, in the **Scene Name** box, enter a name for the scene.

4. Drag and drop the image into the environment as displayed in the following image:

    >[!NOTE]
    > * You can download the [SampleScene.zip](/apps-in-teams-meetings/SampleScene.zip) and [SampleApp.zip](/apps-in-teams-meetings/SampleApp.zip) files with the images.
    > * Alternately, you can add background images to the scene using **Add images**.

    ![Drag into the scene](../assets/images/apps-in-meetings/drag-and-drop-scene.png)

5. Select an image that you have placed in the scene. From the right pane, select an alignment for the image or use the **Resize** slider to adjust the image size.

    ![Alignment for images](../assets/images/apps-in-meetings/image-alignment.png)

6. Select a participant image, and select **Participants** under **Layers** in the upper-right corner.

7. Select the number of participants for the scene from the **Number of participants** box, and select **Add**.

    >[!NOTE]
    > * After the scene is shipped, the avatar placements are replaced with actual participant's video streams.
    > * You can drag the participant images around the scene and place them in the required position and resize them using the resize arrow.

8. Select any participant image, and choose the **Assign Spot** check box to assign the spot to the participant.

9. Select **Meeting Organizer** or **Presenter** role for the participant.

    >[!NOTE]
    > In a meeting, one participant must be assigned the role of a meeting organizer.

    ![Assign spot](../assets/images/apps-in-meetings/assign-spot.png)

10. Select **Save** and select **Preview** to start testing your scenes in Microsoft Teams. 
    
    >[!NOTE]
    > Selecting **Preview** automatically creates a Microsoft Teams app that can be viewed in the **Apps** page in the Teams Developer Portal. The scene can then be viewed in the Together Mode scene gallery.

11. After preview, the scene can be shipped as an app to Teams by following the steps for app submission.

    >[!NOTE]
    > This step requires the app package that is different from the scene package, described in the next step, for the scene that was just designed. The app package, created, automatically can be found in the **Apps** section in the Teams Developer Center. 

12. Optionally, the scene package can be retrieved by selecting **Export** from the **Save** drop-down menu. A .zip file, that is the scene package, is downloaded.
    
    >[!NOTE]
    > Scene package comprises of a scene.json and the PNG assets used to build a scene. The scene package can be reviewed for incorporating other changes as described in the Sample JSON section of this document.

### Adaptive card editor

//Todo

### Microsoft identity platform management

//Todo

### Teams store app validation

//Todo
