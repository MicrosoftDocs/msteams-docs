---
title: Installing the Moodle integration with Microsoft Teams
description: How to install and configure the Moodle integration app for Microsoft Teams
keywords: Teams Moodle app integration plugin
ms.topic: how-to
ms.author: lajanuar
author: laujan
---

# Installing the Moodle integration with Microsoft Teams

[Moodle](https://moodle.org/), a popular open-source Learning Management System (LMS) ,is now integrated with Microsoft Teams! This integration helps educators and teachers collaborate around Moodle courses, ask questions about their grades and assignments and stay updated with notifications directly within Teams.

To help IT admins easily set this integration up, we have updated our open-source Office 365 Moodle Plugin with the following capabilities:

* Auto-registration of your Moodle server with Azure AD.
* One-select deployment of your Moodle Assistant bot to Azure.
* Auto-provisioning of teams and auto-synchronization of team enrollments for all or select Moodle courses.
* Auto-installation of the Moodle tab and the Moodle Assistant bot into each synchronized team.

To learn more about the functionality this integration provides, please *see*[Microsoft Teams and Moodle](https://education.microsoft.com/resource/3dffb3a8).

## Prerequisites

In order to install and configure this application you'll need:

1. Moodle administrator credentials.

1. Azure AD administrator credentials.

1. An Azure subscription where you can create new resources.

## Step 1: Install the Office 365 Moodle Plugins

The Moodle integration in Microsoft Teams is powered by the open source [Office 365 Moodle plugin set](https://github.com/Microsoft/o365-moodle). To install the plugin in your Moodle server:

1. First, you will need to have the [current stable version of Moodle](https://download.moodle.org/releases/latest/) installed.

1. Download the Moodle [OpenID Connect](https://moodle.org/plugins/auth_oidc) and the [Microsoft Office 365 Integration](https://moodle.org/plugins/local_o365) plugins and save them to your local computer.

> [!NOTE]
> Installing the OpenID Connect and Microsoft Office 365 Integration plugins are required for the Teams integration. Additionally the [Office 365 Teams Theme](https://moodle.org/plugins/theme_boost_o365teams) plugin is highly recommended.

3. Login to your Moodle server as an administrator and select **Site administration** from the left navigation panel.

1. Select the **Plugins** tab, and then select **Install plugins**.

1. Under the **Install plugin from ZIP file** section select the **Choose a file** button.

1. Select the **Upload a file** options from the left navigation, browse for the file you downloaded above and select **Upload this file**.

1. Select the **Site administration** option from the left navigation panel again to return to your admin dashboard. Scroll down to the **Local plugins** and select the **Microsoft Office 365 Integration** link. Keep this configuration page open in a separate browser tab as you'll be using it throughout the rest of this process.

You can find more information on how to install Moodle plugins in the [Moodle documentation](https://docs.moodle.org/34/en/Installing_plugins).

> [!IMPORTANT]
> Keep your Office 365 Moodle Plugin configuration page open in a separate browser tab as you will be returning to this set of pages throughout the process.

*Don't have a Moodle site already?* You might want to check out our Moodle on Azure [repo](https://github.com/azure/moodle) where you can quickly deploy a Moodle instance on Azure and customize it to your needs.

## Step 2: Configure the connection between the Office 365 plugin and Azure Active Directory

Next, you'll need to register Moodle as an application in your Azure Active Directory. We've provided a PowerShell script to help you complete this process. The PowerShell Script provisions a new Azure AD application for your Office 365 tenant, which will be used by the Office 365 Moodle Plugin. The script will provision the app for your O365 tenant, set up the required reply URLs and permissions for the provisioned app and return the `AppID` and `Key`. You can use the generated `AppID` and `Key` in your O365 Moodle Plugin Setup Page to configure your Moodle server site with Azure AD. 

>[!IMPORTANT]
> The PowerShell script is not updated with the latest configuration items, so you will have to complete the configuration manually following the steps outlined in the Moodle [3.8.0.4 and 3.9.1](https://docs.moodle.org/39/en/Office365#3.8.0.4_and_3.9.1_release) and [3.8.0.5 and 3.9.2](https://docs.moodle.org/39/en/Office365#3.8.0.5_and_3.9.2_release) release pages. </br></br>
> To view the manual steps that the PowerShell script is automating in detail , *see* [Register your Moodle instance as an Application](https://docs.moodle.org/34/en/Office365#Register_your_Moodle_instance_as_an_Application).

### Moodle tab for Microsoft Teams information flow

<img width="530px" src="../assets/images/MoodleTabInformationFlow.png" alt="Moodle tab for Microsoft Teams information flow" />

1. From the Microsoft Office 365 Integration plugin page select the **Setup** tab.

1. Select the **Download PowerShell Script** button and save it to your local computer.

1. You'll need to prepare the PowerShell script from the ZIP file. To do so:
    * Download and extract the `Moodle-AzureAD-Powershell.zip` file.
    * Open the extracted folder.
    * Right-select on the `Moodle-AzureAD-Script.ps1` file and select **Properties**.
    * Under the **General** tab of the Properties window, check the `Unblock` box next to the **Security** attribute at the bottom.
    * Select **OK**.
    * Copy the directory path of the extracted folder.

1. Next you'll run PowerShell as an administrator:
    * Select Start.
    * Type PowerShell.
    * Right-select Windows PowerShell.
    * Select "Run as Administrator".

1. Navigate to the unzipped directory by typing `cd ...\...\Moodle-AzureAD-Powershell` where `...\...` is the path to the directory.

1. Execute the PowerShell script by:
    * Enter `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.
    * Enter `.\Moodle-AzureAD-Script.ps1`.
    * Login to your O365 Administrator account in the pop-up window.
    * Enter the name of the Azure AD Application (Ex. Moodle/Moodle plugin).
    * Enter the URL of your Moodle server.
    * Copy the **Application ID** and **Application Key** generated by the script and save them.
1. Next you'll need to add the Id and Key to the Office 365 Moodle Plugin. Return to the plugin administration page (Site administration > Plugins > Microsoft Office 365 Integration).

1. On the **Setup** tab add the **Application Id** and **Application Key** you copied previously, then select **Save changes**.

1. Once the page refreshes you should now see a new section **Choose connection method**. Select the checkbox labeled **Default** and then select **Save changes** again.

1. Once the page refreshes you will see another new section **Admin consent & additional information**.
    * Select the **Provide Admin Consent** link, enter your Office3 365 Global Administrator credentials, then **Accept** to grant the permissions.
    * Next to the **Azure AD Tenant** field select the **Detect** button.
    * Next to the **OneDrive for Business URL** select the **Detect** button.
    * Once the fields populate, select the **Save changes** button again.

1. Select the **Update** button to verify the installation, then **Save changes**.

1. Next, you'll need to synchronize users between your Moodle server and Azure Active Directory. Depending on your environment, you may select different options during this stage. To get started:
    * Switch to the **Sync Settings tab**
    * In the **Sync users with Azure AD** section, select the checkboxes that apply to your environment. Typically, you would select at least:
        ✔ Create accounts in Moodle for users in Azure AD  
        ✔ Update all accounts in Moodle for users in Azure AD
    * In the **User Creation Restriction** section, you can setup a filter to limit the Azure AD users that will by synced to Moodle.
    * The **User Field Mapping** section will allow you to customize the Azure AD to Moodle User Profile field mapping.
    * In the **Teams Sync** section you can choose to automatically create Groups (i.e. Teams) for some, or all, of your existing Moodle courses.

> [!NOTE]
> The Moodle [Cron](https://docs.moodle.org/310/en/Cron) will run according the the task schedule which is once a day by default. However, the Cron should run more frequently to keep everything in sync.

13. To validate [Cron](https://docs.moodle.org/310/en/Cron) jobs (and/or run them manually for the first run) select the **Scheduled tasks management page** link in the **Sync users with Azure AD** section. This will take you to the **Scheduled Tasks** page.
    * Scroll down and find the job **Sync users with Azure AD** job and select **Run now**.
    * If you chose to create Groups based on existing courses, you can also run the **Create user groups in Office 365** job.

1. Return to the plugin administration page (Site administration -> Plugins -> Microsoft Office 365 Integration) and select the **Teams Settings** page. You'll need to configure some settings to enable the Teams app integration.
    * To enable **OpenID Connect**, select the **Manage Authentication** link, and select the eye icon on the **OpenId Connect** line if it is greyed out.
    * Next, you'll need to enable frame embedding. Select the **HTTP Security** link, then select the checkbox next to **Allow frame embedding**.
    * The next step is to enable web services which will enable the Moodle API features. Select the **Advanced Features** link, then make sure the checkbox next to **Enable web services** is checked.
    * Finally, you'll need to enabled the external services for Office 365. Select the **External services** link then:  
        ✔ Select **Edit** on the **Moodle Office 365 Webservices** row.  
        ✔ Mark the checkbox next to **Enabled**, then select **Save Changes**
    * Next, you'll need to edit your authenticated user permissions to allow them to create web service tokens. Select the **Editing role 'Authenticated user'** link. Scroll down and find the **Create a web service token** capability and mark the **Allow** checkbox.

## Step 3: Deploy the Moodle Assistant Bot to Azure

The free Moodle Assistant Bot for Microsoft Teams helps teachers and students answer questions about their courses, assignments, grades and other information in Moodle. The bot also sends Moodle notifications to students and teachers right within Teams. This bot is an open-source project maintained by Microsoft, and is available on [GitHub](https://github.com/microsoft/Moodle-Teams-Bot).

> [!NOTE]
> In this section you will deploy resources to your Azure subscription, and all resources will be configured using the **free** tier. Depending on the usage of your bot, you may need to scale these resources.
> If you want to just use the Moodle tab without the bot, skip to [step 4](#step-4-deploy-your-microsoft-teams-app).

### Moodle bot information flow

<img width="530px" src="../assets/images/MoodleBotInformationFlow.png" alt="Moodle bot for Microsoft Teams information flow" />

To install the bot, you'll first need to register it on the [Microsoft Identity Platform](https://identity.microsoft.com/Landing). This allows your Bot to authenticate against your Microsoft endpoints. To register your bot:

1. Return to the plugin administration page (Site administration > Plugins > Microsoft Office 365 Integration) and select the **Teams Settings** tab.

1. Select the **Microsoft Application Registration Portal** link and login with your Microsoft Id.

1. Enter a name for your app (Eg. MoodleBot) and select the **Create** button.

1. Copy the **Application Id** and paste it into the **Bot Application ID** field on the **Team Settings** page.

1. Select the **Generate New Password** button. Copy the generated password and and paste it into the **Bot Application Password** field on the **Team Settings** page.

1. Scroll to the bottom of the form and select **Save Changes**.

Now that you've generated your Application Id and Password, it's time to deploy your bot to Azure. Select on the **Deploy to Azure** button and fill out the form with the necessary information (the Bot Application Id, Bot Application Password and the Moodle Secret are on the **Team Settings** page, and the Azure information is on the **Setup** page). Once you've got the form filled out, select the check box to agree to the terms and conditions then select the **Purchase** button (all Azure resources are deployed to the free tier).

Once the resources are finished deploying to Azure, you'll need to configure the Office 365 Moodle plugin with a messaging endpoint. First, you'll need to get the endpoint from your Bot in Azure. To do that:

1. Log into the [Azure portal](https://portal.azure.com).

1. In the left pane select **Resource groups**.

1. From the list select the resource group you just used (or created) while deploying your bot.

1. Select the **WebApp Bot** resource from the list of resources in the group.

1. Copy the **Messaging Endpoint** from the **Overview** section.

1. In Moodle, open the **Team Settings** page of your Office 365 Moodle Plugin.

1. In the **Bot Endpoint** field paste the URL you just copied and change the word *messages* to *webhook*. The URL should now look like `https://botname.azurewebsites.net/api/webhook`

1. Select **Save Changes**

1. Once your changes have saved, go back to the **Team Settings** tab, select the **Download manifest file** button and save the manifest package to your computer (you'll use it in the next section).

## Step 4: Deploy your Microsoft Teams app

Now that you have your Bot deployed to Azure and configured to talk to your Moodle server, it's time to deploy your Microsoft Teams app. To do this you'll load the manifest file you downloaded from the Office 365 Moodle Plugin Team Settings page in the previous step.

Before you can install the app you'll need to make sure external apps and uploading of apps is enabled. To do so you can follow [these steps](https://docs.microsoft.com/microsoftteams/platform/get-started/get-started-tenant). Once you've ensured that external apps are enabled, you can follow the steps below to deploy your app.

1. Open Microsoft Teams.

1. Select the **Store** icon on the lower-left area of the navigation bar.

1. Select the **Upload a custom app** link from the list of options.

> [!Note]
> If you're logged in as a global administrator you'll have the option of uploading the app to your organization's app store, otherwise you'll only be able to load the app for a team of which you are a member.

4. Select the `manifest.zip` package you downloaded previously and select **Save**. If you haven't yet downloaded the manifest package, you can do so from the **Team Settings** tab of the plugin configuration page in Moodle.

Now that you have the app installed you can add the tab to any channel that you have access to. To do so navigate to the channel, select the **plus** (➕) symbol and select your app from the list. Follow the prompts to finish adding your Moodle course tab to a channel.

## Step 5: Allow automatic creation of Moodle tabs in Microsoft Teams

Now that the Moodle tabs can be created manually in Microsoft teams, you may decide to have them automatically created in Microsoft Teams when teams are created from course synchronization. To do this, you'll configure the ID of the uploaded Microsoft Teams app in Moodle.

1. Open Microsoft Teams.

1. Select the Apps icon from the lower-left area of the navigation bar. 

1. Locate the uploaded **Moodle app** ->select the **options** icon ->select **copy link**.

1. In a text editor, paste the copied content. It should contain a URL such as ht&#8203;tps://teams.microsoft.com/l/app/00112233-4455-6677-8899-aabbccddeeff. Copy the last part of the URL, e.g. `00112233-4455-6677-8899-aabbccddeeff`, which is the ID of the Microsoft Teams app.

1. In Moodle, open the **Teams Moodle app** tab from your Office 365 Moodle Plugin configuration page.

1. Paste the ID of the Microsoft Teams app into the Moodle app ID field, and save changes.

Now when a Moodle course is synced, the Microsoft Team created will automatically install the Moodle app in the Team, create a Moodle tab in the General channel of Team, and configure it to contain course page of the Moodle course from which it is synced.

### That's it! You and your team, can now start working with your Moodle courses directly from Microsoft Teams.

To share any feature requests or feedback with us, please visit our [User Voice page](https://microsoftteams.uservoice.com/forums/916759-moodle).
