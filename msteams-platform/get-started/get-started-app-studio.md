---
title: Get started with Teams App Studio
description: Get started building great apps in Microsoft Teams using Teams App Studio
keywords: getting started app studio teams
ms.date: 01/02/2018
---
# Quickly develop apps with Teams App Studio

Microsoft Teams is a chat-based workspace in Office 365 that integrates with the apps and services that people use to get work done together. The Microsoft Teams App Studio makes it easy to start creating integrate your own service, whether you develop custom apps for your enterprise or SaaS applications for teams around the world.

## Apps

Teams App Studio was created to simplify and streamline the process of creating real apps. It is much faster than the manual process described in [Getting started with node.js](~/get-started/get-started-with-nodejs): Teams App Studio is now the recommended way to develop Teams apps. Getting started documentation will be updated at a later date.

Apps for Teams are made up from two parts:

* The functionality of the app is hosted on a web server
* The definition of the app is contained in an application package that teams uses to find and display your app functionality. The app package is what you upload to Teams when you first test your app

The most significant part of the application package is the app manifest.

Teams App Studio streamlines the creation of the manifest for your app, and also provides some useful tools like the Card Editor and a React control library. Writing and hosting the code is still up to you.

## Installing App Studio

Teams App Studio is a Teams app which can be found in the Teams store. See the Store Icon in the left hand ribbon.

![Store icon](~/assets/images/get-started/storeicon.png)

In the store, search for Teams App Studio.

![Store entry for app studio](~/assets/images/get-started/storeappstudio.png)

Select the Teams App Studio tile to open the app configuration page:

![Configure app studio](~/assets/images/get-started/teamsappstudioconfiguration.png)

Select *Available to set up*.

![Teams app studio](~/assets/images/get-started/teamsappstudio.png)

Once you are in the Teams App Studio page in Teams, move to the teams tab where you can either connect to an existing app or create a new app.

## Teams app studio

### Conversation

This is where you can see what the [cards you create in App Studio](#card-editor) look like in Teams when you send them to yourself.

### Manifest Editor

As was mentioned earlier, the most significant part of a Microsoft Teams app is its manifest.json file. This file, which must conform to the [Teams App schema](~\resources\schema\manifest-schema.md), contains the metadata which allows Teams to correctly present your app to users.

Handcrafting this file is time consuming. The Manifest Editor tab in App Studio simplifies this process, allowing you to describe the app, upload your icons, add app capabilities, and product a .zip file which can easily be uploaded into Teams for testing or distributed for others to use. Note that App Studio does not produce functional code for your app, or host your app.  Your app must already be hosted and running at the URL listed in the manifest for the app upload process to result in a working app.

#### Details

The details section of the Manifest Editor defines the high level description of the app you are making. This includes things such as the app’s name, description, and visual branding. You can automatically generate a GUID for your app and provide URLs for your privacy statement and terms of use.

#### Capabilities

The capabilities section of the Manifest Editor is where the capabilities of the app are defined, and describe the details of each of those capabilities.

##### Tabs

###### Team Tabs

A team tab becomes part of a channel and provides a single kind of information to a team. For example, the Planner tab for a channel contains a single plan; the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports, but it does enable the Go to website button that launches the report in the main Power BI website.

For team tabs, you must provide a Configuration URL to present options and gather information so users can customize the content and experience with your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.

You must also provide any additional domains from which the tab expects to load from or link to.

###### Personal Tabs

This section lets you define a set of tabs that are presented by default in the one-on-one app experience (i.e. the experience a user has with your app outside the context of a team or channel).  In this section, provide the tab name, a unique identifier, the URL that points to the UI to be displayed in Teams, and optionally, the URL to use if a user opts to view the tab in a browser. As with Teams tabs, provide any additional domains from which the tab expects to load from or link to.

##### Bots

This section allows you to add a bot to your app. Currently, an app can only have one bot. If you already have a bot registered with Bot Framework, you can add that information by clicking *Set Up* and supplying the bot’s name, Bot Framework ID, and defining the scopes in which the bot will work.

If you have not yet registered a bot with the Bot Framework, click *Register* to create a new one. Once you’re done registering your bot, come back to this section of the Manifest Editor to enter its name and Bot Framework ID.

Once you supplied your bot’s information, you can now optionally define a list of commands that your bot can suggest to users. Add the name of the command, a description of the command which indicates its syntax and arguments, and the scope(s) to which this command should apply.

Note that if you have defined your bot to only support one scope, commands specified for the unsupported scope will be ignored. You can edit the scopes your bot supports at any time. 

##### Connectors

This section allows you to add a connector to your app. If you already have a registered an Office 365 connector, choose Set up and enter the name and ID of the connector. If you want a new connector click *Register* to go be taken to the Connector Developer Dashboard in your browser.

##### Messaging Extensions

[Messaging extensions](~\concepts\messaging-extensions.md) are a powerful new way for users to engage with your app within Microsoft Teams. Users can query for information from your service and post that information in the form of rich cards, right into the channel or chat conversation. (

Messaging extensions are powered by Bot Framework bots, so they require a configured bot to operate. If you have the name and Bot Framework ID of the bot you would like to power the messaging extension, enter it. Otherwise, click *Register* to create one and enter the information afterward. Select whether the configuration of a messaging extension can be updated by the user.

Once you have your the underlying bot configured, define the command and parameters which the messaging extension can accept.

Each command requires a title and an ID. The command can optionally contain a description for the user. Each command can support up to five parameters, each of which requires:

* The name of the parameter as it appears in the Teams client and is included in the user request
* A user-friendly title
* An optional description

#### Test and Distribute

Once you have finished defining your application, the Test and Distribute section allows you export your app’s definition as a zip file which then can be shared and uploaded into the Teams client for testing. Clicking export downloads the zip file as *appname.zip* in your default download directory.

### Card Editor

A card is a container for short or related pieces of information. Microsoft Teams supports rich cards, which can have multiple properties and attachments. Cards are a key way that bots and connectors relay actionable information to users. To make this process easier and less error-prone, the Card Editor tab lets you build Hero Cards or Thumbnail Cards using a form and verify and test the resulting card (exactly as a user would see it) via a bot. It also provides the corresponding JSON, C#, or Node.js code for that card you can copy/paste into your app's source code.

If you already have the a card you would like to verify inside Teams, you can paste the JSON for that card into the JSON tab under "Add card info" and send it to yourself to see what it looks like in the App Studio conversation tab.

### React Control Library

Creating an app that follows the Teams best practices is a great way to give your app a look and feel that fits seamlessly with the Teams client experience. The UI controls that you use are critical to achieving that end. In an effort to make it easier to create a consistent UI, App Studio provides several categories of UI controls which follow Teams design principles.

Examples of the controls and corresponding React components are provided and ready to use in building your app.

#### Controls

Controls include:

* Buttons
* Dropdowns
* Checkboxes
* Radio Buttons
* Toggles
* Test Areas
* Links
* Tabs
* Tables
* Icons

#### Source

The control library is open source and can be found on [GitHub](https://github.com/OfficeDev/msteams-ui-components/tree/develop/msteams-ui-components-react).
