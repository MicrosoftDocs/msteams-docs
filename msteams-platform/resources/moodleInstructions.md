---
title: Install Moodle LMS
description: How to install and configure the Moodle integration app for Microsoft Teams
keywords: Teams Moodle app integration plugin
ms.topic: how-to
localization_priority: Normal
ms.author: lajanuar
author: laujan
---

# Install Moodle LMS

In this article you'll learn how to install the Moodle LMS.

## Prerequisites

Following are the prerequisites to install and configure Moodle: 

1. Moodle administrator credentials.

1. Azure AD administrator credentials.

1. An Azure subscription where you can create new resources.

Ensure all the prerequisites are met before starting the installation.

## 1. Install the Microsoft 365 Moodle Plugins

> [!NOTE]
> To help IT admins to easily set-up Moodle and Teams integration, open-source Microsoft 365 Moodle Plugin is updated for the following:
>
> * Auto-registration of your Moodle server with [Azure Active Directory (AAD)](https://azure.microsoft.com/services/active-directory/).
>
> * One-click deployment of your Moodle Assistant bot to Azure.
>
> * Auto-provisioning of teams and auto-synchronization of team enrollments for all or select Moodle courses.
>
> * Auto-installation of the Moodle tab and the Moodle assistant bot into each synchronized team.
>
> To learn more about the functionality this integration provides, see [Microsoft Teams and Moodle](https://education.microsoft.com/resource/3dffb3a8).

Moodle integration in Microsoft Teams is powered by the open source [Microsoft 365 Moodle plugin set](https://github.com/Microsoft/o365-moodle). To install the plugin in your Moodle server you must have the following applications installed:

1. A [current stable version of Moodle](https://download.moodle.org/releases/latest/).

1. The Moodle [OpenID Connect](https://moodle.org/plugins/auth_oidc) and the [Microsoft 365 Integration](https://moodle.org/plugins/local_o365) plugins downloaded and saved to your local computer.

   > [!NOTE]
   > Installing the OpenID Connect and Microsoft 365 Integration plugins are required for the Teams integration. In addition, the [Microsoft 365 Teams Theme](https://moodle.org/plugins/theme_boost_o365teams) plugin is highly recommended.

1. Sign in to your Moodle server as an administrator and select **Site administration** from the [Settings block](https://docs.moodle.org/22/en/Settings_block) located in the left navigation panel.

1. Select the **Plugins** tab, and then select **Install plugins**.

1. From the **Install plugin from ZIP file** section, select **Choose a file**.

1. Select **Upload a file** option from the left navigation panel, browse for the file that you downloaded, and select **Upload this file**.

1. Select **Site administration** from the left navigation panel to return to your admin dashboard. Scroll down to the **Local plugins** and select the **Microsoft 365 Integration** link. 

    > [!IMPORTANT]
    >
    > * Keep your Microsoft 365 Moodle Plugin configuration page open in a separate browser tab as you need to return to this set of pages throughout the process.  
    >
    > * If you do not have an existing Moodle site, you can check out Moodle on Azure [repo](https://github.com/azure/moodle) where you can quickly deploy a Moodle instance and customize it to your needs.

## 2. Configure the connection between the Microsoft 365 plugin and Azure Active Directory (AAD)

You must register Moodle as an application in your Azure AD. Use PowerShell script to complete this process. The PowerShell script provisions a new Azure AD application for your Microsoft 365 tenant, which is used by the Microsoft 365 Moodle Plugin. The script provisions the app for your Microsoft 365 tenant, set up the required reply URLs and permissions for the provisioned app, and return the `AppID` and `Key`. You can use the generated `AppID` and `Key` in your Microsoft 365 Moodle Plugin setup page to configure your Moodle server site with Azure AD.

> [!IMPORTANT]
>
> * The PowerShell script is not updated with the latest configuration items, therefore you must complete the configuration manually following the steps outlined in the Moodle [3.8.0.4 and 3.9.1](https://docs.moodle.org/39/en/Office365#3.8.0.4_and_3.9.1_release) and [3.8.0.5 and 3.9.2](https://docs.moodle.org/39/en/Office365#3.8.0.5_and_3.9.2_release) release pages.
>
> * To view the manual steps that the PowerShell script is automating in detail, see [Register your Moodle instance as an application](https://docs.moodle.org/34/en/Office365#Register_your_Moodle_instance_as_an_Application).

### The Moodle tab for Microsoft Teams information flow

<img width="530px" src="../assets/images/MoodleTabInformationFlow.png" alt="Moodle tab for Microsoft Teams information flow" />

1. From the Microsoft 365 Integration plugin page, select the **Setup** tab.

1. Select the **Download PowerShell Script** button and save it to your local computer.

1. You must prepare the PowerShell script from the ZIP file. Perform the following steps to prepare the PowerShell script from the ZIP file:

    1. Download and extract the `Moodle-AzureAD-Powershell.zip` file.
    1. Open the extracted folder.
    1. Right-click on the `Moodle-AzureAD-Script.ps1` file and select **Properties**.
    1. Under the **General** tab of the Properties window, check the `Unblock` box next to the **Security** attribute located at the bottom of the window.
    1. Select **OK**.
    1. Copy the directory path to the extracted folder.

1. Run PowerShell as an administrator:

    1. Select Start.
    1. Type PowerShell.
    1. Right-click Windows PowerShell.
    1. Select **Run as Administrator**.

1. Navigate to the unzipped directory by typing `cd .../.../Moodle-AzureAD-Powershell` where `.../...` is the path to the directory.

1. Execute the PowerShell script:

    1. Enter `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`.
    1. Enter `./Moodle-AzureAD-Script.ps1`.
    1. Sign in to your Microsoft 365 administrator account in the pop-up window.
    1. Enter the name of the Azure AD Application (e.g., Moodle/Moodle plugin).
    1. Enter the URL for your Moodle server.
    1. Copy the **Application ID** and **Application Key** generated by the script and save them.

1. Next you must add the `AppID` and `Key` to the Microsoft 365 Moodle Plugin. Return to the plugin administration page. The flow is: Site administration ➡ Plugins ➡ Microsoft 365 Integration.

1. On the **Setup** tab add the **Application ID** and **Application Key** you copied previously, then select **Save changes**.

1. After the page refreshes, you can see a new section **Choose connection method**. Select the checkbox labeled **Default** and then select **Save changes** again.

1. After the page refreshes you can see another new section **Admin consent & additional information**.
    1. Select **Provide Admin Consent** link, enter your Microsoft 365 Global Administrator credentials, then **Accept** to grant the permissions.
    1. Next to the **Azure AD Tenant** field, select the **Detect** button.
    1. Next to the **OneDrive for Business URL**, select the **Detect** button.
    1. After the fields populate, select the **Save changes** button again.

1. Select the **Update** button to verify the installation, then **Save changes**.

1. Synchronize users between your Moodle server and Azure AD. Depending on your environment, you can select different options during this stage. To get started:
    1. Switch to the **Sync Settings tab**
    1. In the **Sync users with Azure AD** section, select the checkboxes that apply to your environment. You must select the following:  

        ✔ Create accounts in Moodle for users in Azure AD. 
        ✔ Update all accounts in Moodle for users in Azure AD.  

    1. In the **User Creation Restriction** section, you can setup a filter to limit the Azure AD users that is synced to Moodle.
    1. The **User Field Mapping** section allows you to customize the Azure AD to Moodle User Profile field mapping.
    1. In the **Teams Sync** section, you can select to automatically create Groups, such as teams for some, or all, of your existing Moodle courses.

13. To validate [cron](https://docs.moodle.org/310/en/Cron) jobs and run them manually for the first run, select the **Scheduled tasks management page** link in the **Sync users with Azure AD** section. This takes you to the **Scheduled Tasks** page.

    1. Scroll down and find the **Sync users with Azure AD** job and select **Run now**.
    1. If you select to create Groups based on existing courses, you can also run the **Create user groups in Microsoft 365** job.

    > [!NOTE]
    >
    > The Moodle [Cron](https://docs.moodle.org/310/en/Cron) runs according to the task schedule. The default schedule is once a day. However, the cron must run more frequently to keep everything in sync.

1. Return to the plugin administration page, **Site administration > Plugins > Microsoft 365 Integration**, and select the **Teams Settings** page.

1. On the **Teams Settings** page, configure the required settings to enable the Teams app integration.

    1. To enable **OpenID Connect**, select the **Manage Authentication** link, and select the eye icon on the **OpenId Connect** line if it is greyed out.
    1. To enable frame embedding, select the **HTTP Security** link, and then select the checkbox next to **Allow frame embedding**.
    1. To enable web services, which enables the Moodle API features, select the **Advanced Features** link, and then ensure the checkbox next to **Enable web services** is selected.
    1. To enable the external services for Microsoft 365, select the **External services** link, and then:  

        ✔ Select **Edit** on the **Moodle Microsoft 365 Webservices** row.  
        ✔ Select the checkbox next to **Enabled**, then select **Save Changes**

    1. Edit your authenticated user permissions to allow them to create web service tokens. Select the **Editing role 'Authenticated user'** link. Scroll down and find the **Create a web service token** capability and select the **Allow** checkbox.

## 3. Deploy the Moodle Assistant Bot to Azure

The free Moodle assistant bot for Microsoft Teams helps teachers and students answer questions about their courses, assignments, grades, and other information in Moodle. The bot also sends Moodle notifications to students and teachers within Teams. The bot is an open-source project maintained by Microsoft and is available on [GitHub](https://github.com/microsoft/Moodle-Teams-Bot).

> [!NOTE]
>
> * Deploy resources to your Azure subscription. All resources were configured using the **free** tier. Depending on the usage of your bot, you may have to scale these resources.
>
> * To use the Moodle tab without the bot, skip to [4](#4-deploy-your-microsoft-teams-app).

### Moodle bot information flow

<img width="530px" src="../assets/images/MoodleBotInformationFlow.png" alt="Moodle bot for Microsoft Teams information flow" />

To install the bot, you must register it on the [Microsoft Identity Platform](https://identity.microsoft.com/Landing). This allows your bot to authenticate against your Microsoft endpoints. 

1. Go to the plugin administration page. Go to **Plugins**. Under **Microsoft 365 Integration**, select the **Teams Settings** tab.

1. Select the **Microsoft Application Registration Portal** link and sign in with your Microsoft ID.

1. Enter a name for your app, such as MoodleBot and select the **Create** button.

1. Copy the **Application ID** and paste it into the **Bot Application ID** field on the **Team Settings** page.

1. Select the **Generate New Password** button. Copy the generated password and and paste it into the **Bot Application Password** field on the **Team Settings** page.

1. Scroll to the bottom of the form and select **Save Changes**.

After generating your application ID and password, deploy your bot to Azure:

> [!div class="checklist"]
>
> * Select **Deploy to Azure** and complete the form with the necessary information, such as the Bot Application ID, Bot Application Password, and the Moodle Secret on the **Teams Settings** page. The Azure information is on the **Setup** page. 
> * After completing the form, select the check box to agree to the terms and conditions.
> * Select **Purchase**. All Azure resources are deployed to the free tier.

After the resources have completed deploying to Azure, you must configure the Microsoft 365 Moodle plugin with a messaging endpoint. You must get the endpoint from your bot in Azure:

1. Sign in to the [Azure portal](https://portal.azure.com).

1. In the left pane, select **Resource groups** and select the resource group you used or created, while deploying your bot.

1. Select the **WebApp Bot** resource from the list of resources in the group.

1. Copy the **Messaging Endpoint** from the **Overview** section.

1. In Moodle, open the **Team Settings** page of your Microsoft 365 Moodle Plugin.

1. In the **Bot Endpoint** field paste the URL you just copied and change the word *messages* to *webhook*. The URL should now appear as follows: `https://botname.azurewebsites.net/api/webhook`

1. Select **Save Changes**.

1. After saving the changes, go back to the **Team Settings** tab, select the **Download manifest file** button, and save the app manifest package to your computer for further use.

## 4. Deploy your Microsoft Teams app

After your bot deployed to Azure and configured to talk to your Moodle server, you must deploy your Microsoft Teams app. To do this you must load the app manifest file that you downloaded from the Microsoft 365 Moodle Plugin Team Settings page in the previous step.

Before you install the app you must ensure to enable external apps and uploading of apps. To do so, you can follow the steps in the Teams [Prepare your Microsoft 365 tenant](../concepts/build-and-test/prepare-your-o365-tenant.md) documentation. You can perform th the following steps to deploy your app: 

1. Open **Microsoft Teams**. 

1. Select the **App** icon on the lower-left area of the navigation bar.

1. Select the **Upload a custom app** link from the list of options.

   > [!NOTE]
   > If you are logged in as a global administrator, you must have the option of uploading the app to your organization's app catalog, otherwise you can only load the app for a team in which you are a member.

4. Select the `manifest.zip` package you downloaded previously and select **Save**. If you have not downloaded the app manifest package, you can download from the **Team Settings** tab of the plugin configuration page in Moodle.

Now that you have the app installed, you can add the tab to any channel that you have access to. To do so, navigate to the channel, select the **plus** (➕) symbol and select your app from the list. Follow the prompts to finish adding your Moodle course tab to a channel.

## 5. Allow automatic creation of Moodle tabs in Microsoft Teams

Although the Moodle tabs are created manually in Microsoft Teams, you can decide to have them automatically created when teams are created from course synchronization. To do this, you must configure the ID of the uploaded Microsoft Teams app in Moodle:

1. Open Microsoft Teams.

1. Select the Apps icon from the lower-left area of the navigation bar.

1. Locate the uploaded **Moodle app** > select the **options** icon > select **copy link**.

1. In a text editor, paste the copied content. It must contain a URL such as ht&#8203;tps://teams.microsoft.com/l/app/00112233-4455-6677-8899-aabbccddeeff. Copy the last part of the URL, such as  `00112233-4455-6677-8899-aabbccddeeff`, which is the ID of the Microsoft Teams app.

1. In Moodle, open the **Teams Moodle app** tab from your Microsoft 365 Moodle Plugin configuration page.

1. Paste the ID of the Microsoft Teams app into the Moodle app ID field, and save changes.

When a Moodle course is synced, Microsoft Teams automatically installs the Moodle app in the team, create a Moodle tab in the General channel of Teams, and configure it to contain the course page for the Moodle course from which it is synced. You can now start working with your Moodle courses directly from Microsoft Teams.

To share any feature requests or feedback with us, visit our [User Voice page](https://microsoftteams.uservoice.com/forums/916759-moodle).

## See also

* [Integrate web apps](~/samples/integrate-web-apps-overview.md)
* [Moodle](https://moodle.org/)
* [Moodle documentation](https://docs.moodle.org/34/en/Installing_plugins)
