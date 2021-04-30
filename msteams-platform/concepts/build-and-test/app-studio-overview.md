---
title: Get started with App Studio for Microsoft Teams
description: Get started building great apps in Microsoft Teams using App Studio
keywords: getting started app studio teams
localization_priority: Normal
ms.topic: overview
---

# Quickly develop apps with App Studio for Microsoft Teams

App Studio makes it easy to start creating or integrating your own Microsoft Teams apps, whether you develop custom apps for your enterprise or SaaS applications for teams around the world by streamlining the creation of the manifest and package for your app and providing useful tools like the Card Editor and a React control library.

## Installing App Studio

App Studio is a Teams app which can be found in the Teams store. Follow this link for direct download: [App Studio](https://aka.ms/InstallTeamsAppStudio) (you can also find the app in the app store).

In the store, search for App Studio.

![Store entry for app studio](~/assets/images/get-started/storeteamsappstudio.png)

Select the App Studio tile to open the app install page:

![Configure app studio](~/assets/images/get-started/teamsappstudioconfiguration.png)

Select *install*.

![app studio](~/assets/images/get-started/teamsappstudio.png)

Once you are in App Studio, click on the *Manifest editor* tab where you can either import an existing app or create a new app.

## App Studio Features

This section covers features, such as conversation, manifest editor, details, and capabilities. You can customize your capabilities using app customization.

### Conversation

This is where you can see what [cards you create in App Studio](#card-editor) look like in Teams when you test them by sending them to yourself.

### Manifest Editor

As mentioned earlier, the most significant part of a Microsoft Teams app package is its manifest.json file. This file, which must conform to the [Teams App schema](~/resources/schema/manifest-schema.md), contains metadata which allows Teams to correctly present your app to users.

The Manifest Editor tab in App Studio simplifies creating the manifest, allowing you to describe the app, upload your icons, add app capabilities, and produce a .zip file which can easily be uploaded into Teams for testing or distributed for others to use. Note that App Studio does not produce functional code for your app, or host your app. Your app must already be hosted and running at the URL listed in the manifest for the app upload process to result in a working app.

#### Details

The details section of the Manifest Editor defines the high-level description of the app you are making. This includes things such as the app’s name, description, and visual branding. You can automatically generate a GUID for your app and provide URLs for your privacy statement and terms of use.

#### Capabilities

The capabilities section of the Manifest Editor is where the app's capabilities are defined and where details of each of those capabilities are listed.

> [!NOTE]
> The app customization feature is currently available in developer preview only.
> 
> As a best practice, you must provide customization guidelines for app users and customers to follow when customizing your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).


##### Tabs

* **Team Tabs.** A team tab becomes part of a channel and provides quick access to team information and resources. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports, but it does enable the *Go to website* button that launches the report in the main Power BI website.

  For team tabs, you must provide a *Configuration URL* to present options and gather information so users can customize the content and experience of your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.

  You must also provide any additional domains that the tab expects to load from or link to.

* **Personal Tabs.** This section lets you define a set of tabs that are presented by default in the personal app experience (i.e. the experience a user has with your app outside the context of a team or channel). In this section, provide the tab name, a unique identifier, the URL that points to the UI to be displayed in Teams, and optionally, the URL to use if a user opts to view the tab in a browser. As with Teams tabs, provide any additional domains from which the tab expects to load from or link to.

##### Bots

This section allows you to add a [conversational bot](~/bots/what-are-bots.md) to your app. If you already have a bot registered with Bot Framework, you can add that bot by clicking *Set Up* and supplying the bot's name, Bot Framework ID, and defining the scopes in which the bot will work.

If you have not yet registered a bot with the Bot Framework, click *Register* to create a new one. Once you’re done registering your bot, come back to this section of the Manifest Editor to enter its name and Bot Framework ID.

After you have supplied your bot's information, you can now optionally define a list of commands that your bot can suggest to users. Add the name of the command, a description of the command which indicates its syntax and arguments, and the scope(s) to which this command should apply.

Note that if you have defined your bot to only support one scope, commands specified for the unsupported scope will be ignored. You can edit the scopes your bot supports at any time.

##### Connectors

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

#### Test and Distribute

Once you have finished defining your application, the Test and Distribute section allows you export your app’s definition as a zip file which then can be shared and uploaded into the Teams client for testing. Clicking export downloads the zip file as *appname.zip* in your default download directory.

##### Publish your app to Teams
On your project home page, you can upload your app to a team, submit your app to your company custom app store for users in your organization, or submit your app to App Source for all Teams users. Your IT admin will review these submissions. You can return to the *Publish* page to check on your submission status and learn if your app was approved or rejected by your IT admin. This is also where you'll come to submit updates to your app or cancel any currently active submissions.

### Card Editor

A card is a container for short or related pieces of information. Microsoft Teams supports cards, which can have multiple properties and attachments. Cards are a key way that bots and connectors relay actionable information to users. 

To make this process easier and less error-prone, the Card Editor tab lets you build Hero Cards or Thumbnail Cards using a form and verify and test the resulting card (exactly as a user would see it) via a bot. It also provides the corresponding JSON, C#, or Node.js code for the card that you can copy/paste into your app's source code.

If you already have a card that you would like to verify inside Teams, you can paste the JSON for that card into the JSON tab under *Add card info* and send it to yourself to see what it looks like in a chat.

### React Control Library

>[!Note]
> This React control library will be deprecated in the future. Consider using the [Fluent-UI react controls as an alternative](https://microsoft.github.io/fluent-ui-react/) (formerly Stardust UI).

Creating an app that follows the Teams best practices is a great way to give your app a look and feel that fits seamlessly with the Teams client experience. The UI controls that you use are critical to achieving that end. To make it easier to create a consistent UI, App Studio provides several categories of UI controls which follow Teams design principles.

Examples of the controls and corresponding React components are provided and ready to use in building your app.

#### Controls

Controls include:

* Buttons
* Dropdowns
* Checkboxes
* Radio Buttons
* Toggles
* Text Areas
* Links
* Tabs
* Tables
* Icons
