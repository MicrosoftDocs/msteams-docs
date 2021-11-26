---
title: Manage your apps with the Developer Portal
description: Learn how to configure, distribute, and manage your apps using the Developer Portal for Microsoft Teams.
keywords: getting started developer portal teams
ms.localizationpriority: medium
ms.topic: overview
ms.author: surbhigupta
---

# Manage your apps with the Developer Portal for Microsoft Teams

The [Developer Portal for Teams](https://dev.teams.microsoft.com) is the primary tool for configuring, distributing, and managing your Microsoft Teams apps. With the Developer Portal, you can collaborate with colleagues on your app, set up runtime environments, and much more.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![tdp homepage](~/assets/images/tdp/tdp_home_1.png)](~/assets/images/tdp/tdp_home_1.png#lightbox)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

## Register an app

> [!NOTE]  
> The Developer Portal will create a unique App ID and lock the ID for your registered Teams app. You can’t edit or provide an ID of your choice; this prevents scenarios where multiple apps have duplicate App IDs

 You can register a Teams app in the Developer Portal in two ways:

* Register a brand new app
* Import an existing app package

**To Register an app**

1.	In the Developer Portal, select Apps in the left navigation bar.
1.	Select New App.
3.	Enter a name for the app and select Add.

**To Import an app**

1. In the Developer Portal, select Apps in the left navigation bar.
1. Select Import App.
1. Select the app manifest file and click Open.
1. Click **Import**.
    1. If your app package has errors, you can import the app and resolve the errors before you upload or publish the app to Teams.
    1. If you see the following message while uploading the app, click **Import** to add the app package to the Developer Portal.
 
:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![Register app](~/assets/images/tdp/dev_portal_register_app.png)](~/assets/images/tdp/dev_portal_register_app.png#lightbox)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

> [!NOTE]
> If you create an app using the [Microsoft Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension), you can manage that app in the Developer Portal.

## Set up an environment

You can configure environments and global variables to help transition your app from your local runtime to production. Global variables are used across all environments.

**To set up an environment**

1. In the Developer Portal, select **Apps** in the left navigation bar.
2. Select the app you’re working on.
3. Go to **Environments** page and select **+ Add an environment**.
    1.	If you’re a first time user, select **Create your first environment**.
4. Enter a name and select **Add**.

If you have multiple environments, you can switch between environments by selecting an environment from the drop-drop list under **Select an environment**.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![tdp environment](~/assets/images/tdp/tdp_environment.png)](~/assets/images/tdp/tdp_environment.png#lightbox)
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

### Variables
You can create variables for your environment and also use existing the variable names instead of hard-coded values to set your app configurations.

**To use variables**

1. In the environment page, select **Add a variable**.
2. Enter a variable name.
    1.	To use an existing variable, enter **{{**, a dropdown with all the variables you've created for the chosen environment along with the global variables appears. Select a variable from the list.
3. Enter a Value and click **Add**.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![tdp variable](~/assets/images/tdp/tdp_variable.png)](~/assets/images/tdp/tdp_variable.png#lightbox) 
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

> [!NOTE]  
> Before downloading your app package (for example, when getting ready to publish to the Teams store), select the environment you want to use. Your app configurations update automatically.

You can create global variables to reuse app configuration values across any environment. Select Global variables tab and follow steps 1 through 3 mentioned earlier.

## Identify app owners

Each app includes an **Owners** page, where you can share your app registration with colleagues in your org. The **Contributor** role has the same permissions as the **Owner** role except the ability to delete an app.
You can add owners and contributors to manage who can make changes to your app.
To add an owner:
1. In the app overview, select **Owners**.
2. In the title bar, select **Add an owner**.
3. Enter a name and select the ID from the drop-down list.
4. Under Role, select **Contributor** or **Administrator**.
5. Select **Add**.

## App configuration

A Teams app is a web app. Like all web apps, its source code is typically developed in an IDE or code editor and hosted somewhere in the cloud (like Azure).

To install and render your app in Teams, you must include a set of configurations that Teams recognizes. This has traditionally been done by crafting an app manifest, a JSON file that contains all the metadata Teams needs to display your app content. The Developer Portal abstracts this process and includes new features and tooling to help you be more successful.

The configure section in the developer Portal allows you to update various attributes related to your app such as:
* Owners
* Environments
* Basic information
* App features
* Permissions
* Admin settings 
* App package
* Publish to org
* Publish to store

## Test your app directly in Teams

The Developer Portal provides options for testing and debugging your app:

* In the **Overview** page, under **Dashboard**, you can see a snapshot  your app's configurations validate against Teams store test cases. Click *view details* to see additional information.
* Select **Preview in Teams** to launch your app quickly in the Teams client for debugging.

> [!NOTE]  
> Resolve errors or warnings and read the checklist before you publish the app.

## Publish your app

From the Developer portal, you can publish your app to your org, or to the Teams store.

**To Publish your app to the Org**

1. In the App Overview page, under **Publish**, Select **Publish to Org**.
1. Select **Publish your App**.

**To publish your app to Store**

1. In the App Overview page, under **Publish**, Select **Publish to Store**.
1. Select **Publish**.

You can download the app package using **Download app package** button from the publish to Teams Store page.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![Publish app](~/assets/images/tdp/tdp_publish-app.png)](~/assets/images/tdp/tdp_publish-app.png#lightbox) 
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::  

For more information, see [distribute your Teams app](~/concepts/deploy-and-publish/apps-publish-overview.md).

## Analyze your app's usage

On the app **Overview** page, under **Analytics**, you can see the total number of active users for your app. These metrics are available for apps published to the Teams store or an org's app catalog through Developer Portal and scoped to the app ID.

| Metric | Definition |
| :-----------------------| :------------------------------------------------------------------------------------------------------|
| *Monthly R30* | The default usage metric. It shows you the count of unique active users that used your app within that rolling 30-day window in UTC. |
| *Daily* | Shows you the count of unique active users that used your app in a given day in UTC. |

Monthly and daily usage is shown for the past seven, 30 days, and 60 days. You should see usage reflected for a given day within 24-48 hours. Usage for new apps can take up to 3-5 days to display.

## Use tools to create app features

The Developer Portal also includes tools to help you build some key features of Teams apps. Some of these tools include:

* **Scene studio**: Design [custom Together Mode scenes](~/apps-in-teams-meetings/teams-together-mode.md) for Teams meetings.
* **Adaptive Cards editor**: Create and preview Adaptive Cards to include with your apps.
* **Microsoft identity platform management**: Register your apps with Azure Active Directory (Azure AD) to help users sign in and provide access to APIs.
* **Bot management**: You can add conversational bots to your app that communicate with users, respond to their questions, and proactively notify them about changes and other events.

    **To add a bot**
    1. In the Developer Portal, select **Tools** in the left navigation bar.
    1. Select **Bot Management**.
    1. In the bot management page, select **+ New Bot**.
    1. Enter a name and select **Add**. A bot is created with a unique ID.

    From the Developer portal, you can navigate to [Bot framework portal](https://aka.ms/appstudionewbot) and configure your bot to update bot icon and other bot properties.

* **Teams store app validation**: The app validation tool checks your app package against the test cases Microsoft uses when reviewing your app.

:::row:::
   :::column span="":::
   :::column-end:::
   :::column span="5":::
   [![tdp tools](~/assets/images/tdp/tdp_tools.png)](~/assets/images/tdp/tdp_tools.png#lightbox) 
   :::column-end:::
   :::column span="":::
   :::column-end:::
:::row-end:::

## Resources
 
 The Developer Portal now includes resources to help you shape your app. Choose from a list of resources, such as:

  * [Teams Platform Documentation](/microsoftteams/platform/mstdd-landing)
  * [Teams Toolkit for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=TeamsDevApp.ms-teams-vscode-extension)
  * [Microsoft Teams UI kit](https://www.figma.com/community/file/916836509871353159)
  * [Sample app](https://dev.teams.microsoft.com/microsoft-teams-app-sample.zip)
  * [Data Visualization Library](https://github.com/OfficeDev/microsoft-data-visualization-library)
  * [UI templates](https://www.npmjs.com/package/@fluentui/react-teams)

## See also

[Include a SaaS offer with your Microsoft Teams app](~/concepts/deploy-and-publish/appsource/prepare/include-saas-offer.md)
