---
title: Moodle learning management system
description: Frequently asked questions
ms.topic: FAQs
ms.localizationpriority: medium
ms.author: Surbhi Gupta
author: v-rpatkur
---

# Frequently asked questions

Get answers to some common questions Moodle learning management system.

<br>

<details>

<summary><b>What should I do if one or more of the course teams were not created after synchronization?</b></summary>

Each Moodle Course must have at least one **Teacher** and at least one **Student** in Moodle who can each be matched to a Microsoft 365 AAD UPN account. If the synchronization did not find a match for them, this will prevent the team from being created.

 Important: Every team course instance must have an Owner, and the synchronization **sets the Teacher as the Owner** (which also assumes the Teacher has a Microsoft Teams license). 

<br>

</details>

<details>

<summary><b>What should we do to remove  the Moodle login page when working from Microsoft Teams? Can we force single sign-on (SSO)?</b></summary>

You have multiple sign in options from that page. If you prefer that users sign-in exclusively using their Microsoft 365 credentials then you will need to enable the “Force redirect” configuration setting for the **auth_oidc plugin**. If this is enabled, the login index page will be skipped in favor of the Microsoft login page.

 Users wanting to manually sign in to the Moodle portal may do so using this special url: https://{moodle_url}.site/login/index.php?noredirect=1 

Path: https://{moodle_url}/admin/settings.php?section=authsettingoidc

<br>

</details>

<details>

<summary><b>I don’t want all Azure AD users synchronized with the Moodle site. How can I specify which specific users to sync?</b></summary>

I don’t want all Azure AD users synchronized with the Moodle site. How can I specify which specific users to sync?
You may specify which specific users will be synchronized in the configuration options of the **local_o365** plugin, using the **User Creation Restriction** field (path and screenshot in enabled state shown in the table left side below). The dropdown menu to the left of the filter value offers many options such as Country, Company Name, and Language (shown in the table right side below.) We do recommended creating a dynamic Microsoft 365 group whenever there is the need to filter by multiple profile properties (shown in the screenshot below).

Path: https://{moodle_url}/admin/settings.php?section=local_o365&s_local_o365_tabs=1
[Place holder for image]

<br>

</details>

<details>

<summary><b>We would like our faculty to be able to synchronize courses to Microsoft Teams? Are Moodle Administrators the only ones who can control synchronization of courses?</b></summary>

By default only Moodle Administrators can configure synchronization. However, if the “Allow configure course sync in course” is enabled (see path and screenshot in enabled state below), then the Team Owner can control if a course is synchronized to Teams or not (by default this is the course teacher). Please refer to the Microsoft 365 Block within the Moodle Course interface (shown in second screenshot below). Important: The block will only show the configuration option to individuals with the appropriate owner permissions.

Path: https://{moodle_url}/admin/settings.php?section=local_o365&s_local_o365_tabs=1
[Place holder for image]

<br>

</details>

<details>

<summary><b>We have followed the documentation but User accounts are still not syncing between AAD and Moodle. What should we do?</b></summary>

Please validate the following dependencies in the checklist shown below. In most cases, the issue will be resolved before needing a Delta Token Cleanup as a final troubleshooting step. Therefore, we recommend that you perform these actions in the order shown below: 

**Stable Version?**	Verify that your version of Moodle is listed as a 'stable' version by Moodle 
Reference: https://docs.moodle.org/dev/Releases#Version_support

**Permissions?**	Verify that the Azure application has the necessary permissions to run the sync.
Reference: https://docs.moodle.org/311/en/Microsoft_365#Permissions 

**Full Sync?**	Verify that **"Perform a full sync each run"** is enabled, and review the **Task Logs** for "Sync Users with Azure AD"
References:
Enable Full Sync: {moodle_url}\local_o365\task\usersync 
Check Task Logs: {moodleurl}/admin/tasklogs.php 

**Token Refresh?**	Clean the User Sync Delta Token in the local_o365 plugin
Reference: moodle_url}\local_o365\acp.php?mode=maintenance_cleandeltatoken

<br>

</details>

<details>

<summary><b>One or more users are unable to sign-in using their Microsoft 365 credentials, although most users can sign-in without an issue. What would cause this inconsistency?</b></summary>

Inconsistencies with Users being able to sign-in may be related to the User mapping operation during synchronization. Follow the following steps to resolve this problem:

**OpenID?** Validate that the Moodle User authentication type is OpenID 
**User Name?** Validate that the Moodle username matches the AAD username
**Token Issue?** Clean up token issues via {moodle_url}/auth/oidc/cleanupoidctokens.php and retry
**Permissions?** Validate that Users have permissions to access the Azure application  

<br>

</details>

<details>

<summary><b>All Users are unable to sign-in using their Microsoft 365 credentials, although they could sign-in before. What can we do to resolve this?</b></summary>

If Users who were able to sign-in start to report issues, please validate that the Application Client Secret has not expired. The error message will appear as shown in this screenshot: 
[Place holder for image]

This will also be obvious in the Azure Portal as shown in this screenshot:

[Place holder for image]

Consequently, if the Client Secret has expired, then you will need to generate a new Client Secret, and update the configuration found on this page: {moodle_url}/admin/settings.php?section=authsettingoidc. Users should be able to sign-in again after the Client Secret has been updated, but this may take up to 24 hours to reprovision

<br>

</details>

<details>


<summary><b>How to we change the teams instance that is linked to a course?</b></summary>

Administrators may change the teams instance associated with a course via the **Manage Teams Connections** page (path and screenshot shown below). Click on the **Connect** link on the page next to the course you wish to change, and then select a teams instance. Note: This is especially helpful if you have archived a team by mistake (using Course Reset) and want to link it back to the previous team.

Path: https://{moodle_URL}/local/o365/acp.php?mode=teamconnections


![Place holder for image](~/assets/images/partner-center-verification-status.png)

<br>

</details>

<details>

<summary><b>Why isn’t the Atto Teams Meeting integration showing up within the Atto Editor?</b></summary>

This may be due to the icon reference being missing in the **Toolbar config**. After installing the plugin, please update the **Toolbar config** line to include **teamsmeeting** which will display the Teams icon within the Atto editor. 

*Toolbar icon shown here after Toolbar config adjustment:*
[Place holder for image]

Path: https://{moodle_URL}//admin/settings.php?section=editorsettingsatto

Notice that we have added teamsmeeting to the right of the links icons:

[Place holder for image]

For general information regarding editing the Atto toolbar please see: 
Atto editor - MoodleDocs
Icon Mapping

br>

</details>

<details>

<summary><b>Do meetings that I schedule through this integration appear in my Outlook or Teams calendars? and Do they expire after some specific period of time?</b></summary>

Meetings scheduled through the app do not appear in the scheduler’s Outlook or Teams calendar as they behave similar to Channel Meetings. All the members in the course channel can attend directly from the embedded channel link, but they will not see the meeting on their calendar. Learn more here.

However, you may open the invite and manually add participant names to the Required or Optional lines of the meeting invitation, which will in turn display the remote meeting on their calendars. 

Meetings scheduled through the application will follow the standard timelines based on the date(s) you enter when the meeting is created. Please see https://docs.microsoft.com/en-us/microsoftteams/limits-specifications-teams 



