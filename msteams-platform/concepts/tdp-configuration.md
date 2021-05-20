---
title: App configuration in Developer Portal
description: Learn how to configure and manage your apps using the Developer Portal for Microsoft Teams
keywords: getting started developer portal teams
localization_priority: Normal
ms.topic: conceptual
---

# App configuration

The most significant part of a Microsoft Teams app package is its manifest.json file. This file must conform to the [Teams App schema](~/resources/schema/manifest-schema.md). The manifest.json file contains metadata, which allows Teams to correctly present your app to users.

You can perform the following actions in the **Configure** section of the Developer Portal:

* Create an app package easily.
* Describe the app.
* Upload your icons.
* Produce a .zip file for easy distribution.

> [!NOTE]
> Developer Portal does not produce functional code for your app, or host your app. Your app must already be hosted and running at the URL listed in the manifest for the app upload process to result in a working app.

:::image type="content" source="../../assets/images/tdp/tdp_configure.png" alt-text="Screenshot showing the Configure page of Teams Developer Portal.":::

## Basic information and Branding

The **Basic information** and **Branding** sections define the high-level description of the app you are making. This includes the app’s name, description, and visual branding. The information in this section will be used in your app's Teams store listing and app installation dialogue.

## Capabilities

The **Capabilities** section of Configuration has the app's capabilities details listed.

> [!NOTE]
> The app customization feature is currently available in the developer preview only.
> 
> As a best practice, you must provide customization guidelines for app users and customers to follow when customizing your app. For more information, see [customize apps in Microsoft Teams](/MicrosoftTeams/customize-apps).

Following are the capabilities:

:::image type="content" source="../../assets/images/tdp/tdp_configure_1.png" alt-text="Screenshot showing the Configure page of Teams Developer Portal.":::

* **Personal app** 

  This section lets you define a set of tabs that are presented by default in the personal app experience, that is, the experience a user has with your app outside the context of a team or channel. In this section, provide the following details:

  * The tab name.
  * A unique identifier.
  * The URL that points to the UI to be displayed in Teams.
  * The URL to use if a user opts to view the tab in a browser. This is an optional information.
  * Any additional domains from which the tab expects to load from or link to.

* **Group and channel app**

  A Teams tab becomes part of a channel and provides quick access to team information and resources. For example, the Planner tab for a channel contains a single plan, the Power BI tab maps to a specific report. Users can drill down to the relevant context, but they should not be able to navigate outside the tab. The Power BI tab, for instance, doesn't enable navigation to other Power BI reports, but it does enable the **Go to website** button that launches the report in the main Power BI website.

    > [!NOTE]
    > For team tabs, you must provide a Configuration URL to present options and gather information, that would help you to customize the content and experience of your tab. This iframed HTML page is displayed when a user first adds the tab to a channel.
    > You must also provide any additional domains that the tab expects to load from or link to.

* **Bot**

  This section allows you to add a [conversational bot](~/bots/what-are-bots.md) to your app. If you already have a bot registered with Bot Framework, you can add that bot by clicking **Set Up** and supplying the bot's name, Bot Framework ID, and defining the scopes in which the bot will work.

  If you have not registered the bot with the Bot Framework yet, click **Register** to create a new one. After you have registered your bot, come back to this section of the Manifest Editor to enter its name and Bot Framework ID.

  After you have supplied your bot's information, you can now optionally define a list of commands that your bot can suggest to users. Add the name of the command, a description of the command which indicates its syntax and arguments, and the scope(s) to which this command should apply.

  Note that if you have defined your bot to only support one scope, commands specified for the unsupported scope will be ignored. You can edit the scopes your bot supports at any time.

* **Connector**

  This section allows you to add a connector to your app. If you already have registered an Office 365 connector, select **Set up** and enter the name and ID of the connector. If you want a new connector click **Register** to be taken to the Connector Developer Dashboard in your browser.

  > [!NOTE]
  > App customization enables admins to change the look-and-feel of the apps loaded through bots, messaging extensions, tabs, and connectors. For example, if the Teams admin customizes the name of an app from `Contoso` to `Contoso Agent`, then the app will appear with the new name `Contoso Agent` to the users. However, while adding a connector to a chat, in the list, the connectors will still show the name of the app as `Contoso`.

* **Messaging Extensions**

  [Messaging extensions](~/messaging-extensions/what-are-messaging-extensions.md) are a powerful way for users to engage with your app within Microsoft Teams. Users can query for information from your service and post that information in the form of cards, right into the channel or chat conversation.

  Messaging extensions are powered by Bot Framework bots, so they require a configured bot to operate. If you have the name and Bot Framework ID of the bot you would like to power the messaging extension, enter it. Otherwise, click *Register* to create one and enter the information afterward. Select whether the configuration of a messaging extension can be updated by the user.

  After you have the underlying bot configured, define the commands and parameters which the messaging extension can accept.

  Each command requires a title and an ID. The command can optionally contain a description for the user. Each command can support up to five parameters, each of which requires the following:

  * The name of the parameter as it appears in the Teams client and is included in the user request.
  * A user-friendly title.
  * An optional description.

  > [!NOTE]
  > To create messaging extension using app studio, see [create messaging extension using app studio](~/resources/create-messaging-extension-using-appstudio.md).

* **Meeting extension**

  //TODO: Rajesh R.

* **Scene**

  Scenes in Together Mode is an artifact created by the scene developer using the Microsoft Scene studio that brings people together along with their video stream in a creative setting as conceived by the scene creator. In a conceived scene setting, participants have designated seats with video streams rendered in those seats. For more information, see [Teams Together Mode](~/apps-in-teams-meetings/teams-together-mode.md).

## Permissions

You can enrich your Teams app with native device capabilities, such as camera, microphone, and location.

## Languages

Set up or change the languages that your app supports.

## Single Sign-On

Configure your app to authenticate users with single sign-on (SSO).

## Domains

A list of valid domains for websites the app expects to load within the Teams client. Domain listings can include wildcards, for example, `*.example.com`. This matches exactly one segment of the domain; if you need to match `a.b.example.com` then use `*.*.example.com`. If your tab configuration or content UI needs to navigate to any other domain besides the one use for tab configuration, that domain must be specified here.

It is not necessary to include the domains of the identity providers you want to support in your app. For example, to authenticate using a Google ID, it is required to redirect to accounts.google.com, however, you must not include accounts.google.com in `validDomains[]`.

Teams apps that require their own sharepoint URLs to function well, includes "{teamsitedomain}" in their valid domain list.

> [!IMPORTANT]
> Do not add domains that are outside your control, either directly or through wildcards. For example, `yourapp.onmicrosoft.com` is valid, however, `*.onmicrosoft.com` is not valid.

The object is an array with all elements of the type `string`.

## Advanced
//Todo by Karthig

### App content
//Todo by Karthig

### First party settings
//Todo by Karthig

