---
title: Installing the Moodle integration with Microsoft Teams
description: How to install and configure the Moodle integration app for Microsoft Teams
keywords: Teams Moodle app 
ms.date: 01/17/2019
---
# Installing the Moodle integration with Microsoft Teams

This is some overview text that goes right here. This thing is awesome, and this is why. Going through the steps below is totally worth it.

## Prerequisites

In order to install and configure this application you'll need:

1. Moodle administrator credentials
2. Azure AD administrator credentials
3. An Azure subscription you can create new resources in

## Step 1: Install the Office 365 Moodle Plugin

[!VIDEO https://www.youtube.com/embed/SETEC5nzMgk]

The Moodle integration in Microsoft Teams is powered by the opensource [Office 365 Moodle plugin](https://github.com/Microsoft/o365-moodle). Your Moodle administrator can install this plugin from the [Moodle Plugins directory](https://moodle.org/plugins/).

You can find more information on how to install Moodle plugins in the Moodle [documentation](https://docs.moodle.org/34/en/Installing_plugins). The simplest option is to install directly from the Moodle plugins directory. You can find all the plugins required for the installation in the [Office 365 plugin set](https://moodle.org/plugins/browse.php?list=set&id=72).

**Important Note** You'll want to copy the Application Id and the Application Key from the **Setup** page of your Office 365 Moodle Plugin during the registration process. Alternatively, you can keep your Office 365 Moodle Plugin configuration page open in a separate browser tab as you will be returning to this set of pages throughout this process.

*Don't have a Moodle site already?* You might want to check out our Moodle on Azure repo (https://github.com/azure/moodle) where you can quickly deploy a Moodle instance on Azure and customize it to your needs.

## Step 2: Register Moodle as an application in your Azure Active Directory

[!VIDEO https://www.youtube.com/embed/FpGEezaJ3SA]

Next you'll need to register Moodle as an application in your Azure Active Directory. This will allow Azure Active Directory to manage credentials and authentication between Microsoft Teams, your Bot, and Moodle. To register your application:

1. Open the [Azure Portal](https://portal.azure.com)
2. In the left hand pane, select the **Azure Active Directory Service**
3. In the Manage section click **App registrations**
4. At the top of the blade that pops out, click **New application registration** and fill in the information
5. Click **Create**

You can find more detailed instructions for this in the [Azure documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-v1-add-azure-ad-app). You might also want to read about how [consent works with Azure AD applications](https://docs.microsoft.com/en-us/azure/active-directory/develop/consent-framework).

## Step 3: Deploy the Moodle Assistant Bot to Azure

[!VIDEO https://www.youtube.com/embed/gbkJxf8FlfY]

The Moodle Assistant Bot for Microsoft Teams helps teachers and students answer questions about their courses, assignments, grades and other information in Moodle. The bot also sends Moodle notifications to students and teachers right within Teams. This bot is an opensource project maintained by Microsoft, and is [available on GitHub](https://github.com/microsoft/Moodle-Teams-Bot).

First, you'll need to register your Bot on the [Microsoft Identity Platform](https://identity.microsoft.com/Landing). This will allow your Bot to authenticate against your Microsoft endpoints. To register your bot:

1. Go to the [Microsoft Application Registration Portal](https://apps.dev.microsoft.com/portal/register-app).
2. Enter a name for you app (Eg. MoodleBot) and click the **Create** button.
3. Copy the **Application Id** and save it.
4. Click the **Generate New Password** button. Copy and save the generated password.
5. Scroll to the bottom of the form and click **Save**.

Now that you've generated your Application Id and Password, it's time to deploy your bot to Azure. To do that you'll first want to make sure you have the following information:

 ***Bot Application ID** - This is the Id you made a note of while registering your Bot with the Microsoft Identity Platform.
 ***Bot Application Password** - This is the Password you generated while registering your Bot with the Microsoft Identity Platform.
 ***Moodle URL** - The URL of your Moodle server.
 ***Azure AD Application ID** - The Application Id you made note of when registering the Office 365 Moodle Plugin, available on the **Setup** page.
 ***Azure AD Application Key** - The Application Key you made note of when registering the Office 365 Moodle Plugin, available on the **Setup** page.
 ***Azure AD Tenant** - The tenant name (xyz.onmicrosoft.com) of your Azure AD tenant.

Once you've gathered the necessary information click [here](https://aka.ms/DeployMoodleTeamsBot) and fill out the form with the information you gathered. Once you've got the form filled out, click the check box to agree to the terms and conditions then click the **Purchase** button.

Now that you've got the Bot deployed to Azure you'll need to configure the Office 365 Moodle plugin with it's location. First, you'll need to get the messaging endpoint from you Bot in Azure. To do that:

1. Log into the [Azure portal](https://portal.azure.com).
2. In the left pane select **Resource groups**.
3. From the list select the resource group you just used (or created) while deploying your Bot.
4. Select the **WebApp Bot** from the list of resources in the group.
5. Copy the **Messaging Endpoint** from the **Overview** section.
6. In Moodle, open the **Team Settings** page of your Office 365 Moodle Plugin.
7. In the **Bot Endpoint** field paste the URL you just copied and change the word *messages* to *webhook*. The URL should now look like https://botname.azurewebsites.net/api/webhook
8. Click **Save Changes**
9. Once your changes have saved, click the **Download manifest file** button and save the manifest package to your computer (you'll use it in the next section).

## Step 4: Deploy your Microsoft Teams app

[!VIDEO https://www.youtube.com/embed/2rMb7gtM_ZM]

Now that you have your Bot deployed to Azure and configured to talk to your Moodle server, it's time to deploy your Microsoft Teams app that will talk to your bot and host your Moodle tab. To do this you'll load the manifest file your downloaded from the Office 365 Moodle Plugin Team Settings page in the previous step. 

Before you can install the app you'll need to make sure external apps and sideloading of apps is enabled. To do so you can follow [these steps](https://docs.microsoft.com/en-us/MicrosoftTeams/admin-settings).

1. Open Microsoft Teams.
2. Click the **Store** icon on the left navigation bar.
3. Click the **Upload a custom app** link from the list of options. *Note:* If you're logged in as a global administer you'll have the option of uploading the app to your tennant app store, otherwise you'll only be able to load the app for Teams you're a part of ("sideloading").
4. Select the `manifest.zip` package you downloaded previously and click **Save**.

Now that you have the app installed you can add the tab to any channel that you have access to. To do so navigate to the Channel, click the **+** symbol and select your app from the list. Follow the prompts to finish adding your Moodle course tab to a channel.

That's it! You, and your team, can now start working with your Moodle courses directly from Microsoft Teams.

<!--Code sample example
```js
import React, { Component } from ‘react’;
import { TeamsComponentContext, ThemeStyle, connectTeamsComponent } from ‘msteams-ui-components-react’

class App extends Component {
    render() {
        return (
            <TeamsComponentContext
                fontSize={16}
                theme={ThemeStyle.HighContrast}>
                <MyComponent />
            </TeamsComponentContext>
        );
    }
}

class MyComponentInner extends Component {
    render() {
        const context = this.props.context;
        switch (context.style) {
            case ThemeStyle.Dark:
                return <div style={{ color: context.colors.dark.brand00 }}>Dark theme!</div>;
            case ThemeStyle.HighContrast:
                return <div style={{ color: context.colors.highContrast.black }}>High Contrast theme!</div>;
            case ThemeStyle.Light:
                return <div style={{ color: context.colors.light.brand00 }}>Light theme!</div>;
        }
    }
}

const MyComponent = connectTeamsComponent(MyComponentInner);

export default App;
```
-->