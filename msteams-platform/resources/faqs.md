---
title: Frequently asked questions
description: Answers to some common questionsp
ms.topic: FAQs
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-rpatkur
---

# Frequently asked questions

Get answers to some common questions in Moodle learning management system.

<br>

<details>

<summary><b>What should I do if one or more of the course teams were not created after synchronization?</b></summary>

Each Moodle course must have at least one teacher and one Student in Moodle, who can be matched to a Microsoft 365 AAD UPN account. You can't create a team, if the synchronization doesn't find a match.

> [!NOTE]
> Every team course instance must have an Owner, and the synchronization sets the teacher as the Owner, with assumption that the teacher has a Microsoft Teams license.

<br>

</details>

<details>

<summary><b>What should we do to remove the Moodle login page when working from Microsoft Teams? Can we force single sign-on (SSO)?</b></summary>

The users have multiple sign-in options from the page. If the users prefer to sign-in exclusively using Microsoft 365 credentials then you will need to enable the **Force redirect** configuration settings for the **auth_oidc plugin**. If the service is enabled,you'll directly see the Microsoft sign-in page. The users can manually sign-in to the Moodle portal by using https://{moodle_url}.site/login/index.php?Noredirect=1 

[Path:](https://{moodle_url}/admin/settings.php?Section=authsettingoidc)

:::image type="content" source="../assets/images/MoodleInstructions/faq 1.png" alt-text="SSO":::

<br>

</details>

<details>

<summary><b>How can I specify which users to sync? I don’t want all Azure AD users synchronized with the Moodle site. </b></summary>

You can specify the users by synchronizing the configuration options of the **local_o365** plugin, using **User Creation Restriction**. The dropdown menu to the left of the **filter** offers options such as Country, Company Name, and Language. 

> [!TIP]
> Create a dynamic Microsoft 365 Group whenever there is the need to filter by multiple profile properties.

[Place holer for URL]

:::image type="content" source="../assets/images/MoodleInstructions/faq 2.png" alt-text="sync":::

:::image type="content" source="../assets/images/MoodleInstructions/faq 3.png" alt-text="azure ad":::

<br>

</details>

<details>

<summary><b>We would like our faculty to be able to synchronize courses to Microsoft Teams? Are Moodle Administrators the only ones who can control synchronization of courses?</b></summary>

By default only Moodle Administrators can configure synchronization. However, if the “Allow configure course sync in course” is enabled (see path and screenshot in enabled state below), then the Team Owner can control if a course is synchronized to Teams or not (by default this is the course teacher). Please Refer to the Microsoft 365 Block within the Moodle Course interface (shown in second screenshot below). Important: The block will only show the configuration option to individuals with the appropriate owner permissions.

[Place holder for url]

:::image type="content" source="../assets/images/MoodleInstructions/faq 4.png" alt-text="admin":::

:::image type="content" source="../assets/images/MoodleInstructions/faq 5.png" alt-text="synchronization":::


<br>

</details>

<details>

<summary><b>We have followed the documentation but User accounts are still not syncing between AAD and Moodle. What should we do?</b></summary>

Validate the following dependencies in the checklist shown below. In most cases, the issue will be resolved before needing a Delta Token Clean up as a final troubleshooting step. Therefore, we recommend that you perform these actions in the order shown below: 

| Action| Description| Reference|
|-------|------------|----------|
| Stable Version| Verify that your version of Moodle is listed as a 'stable' version by Moodle| [version support](https://docs.moodle.org/dev/Releases#Version_support)|
|Permissions| Verify that the Azure application has the necessary permissions to run the sync|[Microsoft permissions](https://docs.moodle.org/311/en/Microsoft_365#Permissions)|
| Full Sync| Verify that **"Perform a full sync each run"** is enabled, and review the **Task Logs** for "Sync Users with Azure AD"| Enable Full Sync: {moodle_url}\local_o365\task\usersync </br>Check Task Logs: {moodleurl}/admin/tasklogs.php |
| Token Refresh|Clean the User Sync Delta Token in the local_o365 plugin| {moodle_url}\local_o365\acp.php?Mode=maintenance_cleandeltatoken|

<br>

</details>

<details>

<summary><b>One or more users are unable to sign-in using their Microsoft 365 credentials, although most users can sign-in without an issue. What would cause this inconsistency?</b></summary>

Inconsistencies with Users being able to sign-in may be related to the User mapping operation during synchronization. Follow the listed steps to resolve this problem:

**OpenID?** Validate that the Moodle User authentication type is OpenID 
**User Name?** Validate that the Moodle username matches the AAD username
**Token Issue?** Clean up token issues via {moodle_url}/auth/oidc/cleanupoidctokens.php and retry
**Permissions?** Validate that Users have permissions to access the Azure application  

<br>

</details>

<details>

<summary><b>All Users are unable to sign-in using their Microsoft 365 credentials, although they could sign-in before. What can we do to resolve this?</b></summary>

If Users who were able to sign in start to report issues, please validate that the Application Client Secret has not expired. The error message will appear as shown in image:

:::image type="content" source="../assets/images/MoodleInstructions/faq 6.png" alt-text="report issue":::

This will also be obvious in the Azure portal as shown the image:

:::image type="content" source="../assets/images/MoodleInstructions/faq 7.png" alt-text="azure portal":::

Consequently, if the Client Secret has expired, then you need to generate a new Client Secret, and update the configuration found on this page: {moodle_url}/admin/settings.php?Section=authsettingoidc. Users should be able to sign in again after the Client Secret has been updated, but this may take up to 24 hours to reprovision

<br>

</details>

<details>

<summary><b>How to we change the teams instance that is linked to a course?</b></summary>

Administrators may change the teams instance associated with a course via the **Manage Teams Connections** page (path and screenshot shown below). Select on the **Connect** link on the page next to the course you wish to change, and then select a teams instance. Note: This is especially helpful if you have archived a team by mistake (using Course Reset) and want to link it back to the previous team.

[Place holder for url]

:::image type="content" source="../assets/images/MoodleInstructions/faq 8.png" alt-text="teams instance":::

<br>

</details>

<details>

<summary><b>Why isn’t the Atto Teams meeting integration showing up within the Atto editor?</b></summary>

This may be due to the icon reference being missing in the **Toolbar config**. After installing the plugin, please update the **Toolbar config** line to include **teams meeting** which will display the Teams icon within the Atto editor. 

*Toolbar icon shown here after Toolbar config adjustment:*

:::image type="content" source="../assets/images/MoodleInstructions/faq 9.png" alt-text="tool bar":::

[Place holder for url]

Notice that we have added teams meeting to the right of the links icons:

:::image type="content" source="../assets/images/MoodleInstructions/faq 10.png" alt-text="links icon":::

For more information regarding editing the Atto toolbar, see: 
* [Atto editor - MoodleDocs](https://docs.moodle.org/311/en/Atto_editor)[]
* [Icon Mapping](https://docs.moodle.org/311/en/Atto_editor#:~:text=in%20the%20editor.-,Atto%20editor%20toolbar,-Atto%20Row%201)

<br>

</details>

<details>

<summary><b>Do meetings that I schedule through this integration appear in my Outlook or Teams calendars? and Do they expire after some specific period of time?</b></summary>

Meetings scheduled through the app do not appear in the scheduler’s Outlook or Teams calendar as they behave similar to Channel Meetings. All the members in the course channel can attend directly from the embedded channel link, but they will not see the meeting on their calendar. For more information, see [channel meetings](https://www.knowledgewave.com/blog/benefits-of-channel-meetings-in-microsoft-teams).

However, you may open the invite and manually add participant names to the Required or Optional lines of the meeting invitation, which will in turn display the remote meeting on their calendars. 

Meetings scheduled through the application will follow the standard timelines based on the date(s) you enter when the meeting is created. For more information, see [meetings](/microsoftteams/limits-specifications-teams)
