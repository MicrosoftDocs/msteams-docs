---
title: Frequently asked questions
description: Answers to some common questions
ms.topic: Frequently asked questions on Moodle LMS
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-leenagopal
---

# FAQ

Get answers to some of your queries when using Moodle LMS.<br>

<br>

<details>

<summary><b>What should I do if one or more of the course teams weren't created after synchronization?</b></summary>

Each Moodle course must have at least one faculty and one student who can be matched to a Microsoft 365 AAD UPN account. You can't create a team, if the synchronization doesn't find a match.

> [!NOTE]
> Each team course instance must have an owner, and the synchronization sets the faculty as the owner, with assumption that the faculty has Microsoft Teams license.

<br>

</details>

<details>

<summary><b>What should we do to remove Moodle login page when working from Microsoft Teams? Can we force single sign-on (SSO)?</b></summary>

The users have multiple sign in options from the Moodle login page. If the users prefer to sign in exclusively using Microsoft 365 credentials then you will need to enable the **Force redirect** configuration settings for the **auth_oidc plugin**. If the service is enabled, you'll see the Microsoft sign in page. The users can manually sign in to the Moodle portal by using https://moodle.org/login/index.php

<br>

</details>

<details>

<summary><b>How can I specify which users to sync? I don’t want all Azure AD users synchronized with the Moodle website. </b></summary>

You can specify the users by synchronizing the configuration options of the **local_o365** plugin, using **User Creation Restriction**. The dropdown menu to the left of the **filter** offers options such as Country, Company Name, and Language. 

> [!TIP]
> Create a dynamic Microsoft 365 group to enable the **filter** option with multiple profile properties.

<!-- [Place holer for URL] -->

:::image type="content" source="../assets/images/MoodleInstructions/faq 2.png" alt-text="sync":::

:::image type="content" source="../assets/images/MoodleInstructions/faq 3.png" alt-text="azure ad":::

<br>

</details>

<details>

<summary><b>We would like our faculty to be able to synchronize courses to Microsoft Teams? Are Moodle administrators the only ones who can control synchronization of courses?</b></summary>

By default only Moodle administrators can configure synchronization. The Team owner can control if a course is synchronized to Teams and the **Allow configure course sync in course** is enabled.

> [!NOTE]
> In this case, the team owner is the faculty.

For more information, see Microsoft 365 block within the Moodle Course interface.

>[!NOTE]
>The block will only show the configuration option to individuals with the appropriate owner permissions.

<!-- [Place holder for url] -->

:::image type="content" source="../assets/images/MoodleInstructions/faq 4.png" alt-text="admin":::

:::image type="content" source="../assets/images/MoodleInstructions/faq 5.png" alt-text="synchronization":::


<br>

</details>

<details>

<summary><b>We have followed the documentation but the user accounts fail to sync AAD and Moodle. What should we do?</b></summary>

In most cases, the issue will be resolved before users need **Delta token clean up** as a final troubleshooting step. The following table provides the actions and dependencies to be performed and validated:

| Dependency | Action | Reference|
|-------|------------|----------|
| Stable version| Verify that the version of Moodle is listed as a **stable**| [Version support](https://docs.moodle.org/dev/Releases#Version_support)|
|Permissions| Verify that the Azure application has the necessary permissions to run the sync|[Microsoft permissions](https://docs.moodle.org/311/en/Microsoft_365#Permissions)|
| Full sync| Verify that **Perform a full sync each run** is enabled, and review the **Task Logs** for **Sync users with Azure AD**| Enable full sync: {moodle_url}\local_o365\task\usersync </br>Check task logs: {moodleurl}/admin/tasklogs.php |
| Token refresh|Clean the **User sync delta token** in the local_o365 plugin| {moodle_url}\local_o365\acp.php?Mode=maintenance_cleandeltatoken|

<br>

</details>

<details>

<summary><b>One or more users are unable to sign in using their Microsoft 365 credentials, although most users can sign in without an issue. What would be the cause of this inconsistency?</b></summary>

Inconsistencies with users being able to sign in can be related to the user mapping operation during synchronization. To resolve the issue, perform the following steps:

* Validate the Moodle user authentication type is **OpenID**.
* Validate the Moodle **User Name** matches the AAD username.
* Clean up **Token Issue** through [place holder for url] and retry.
* Validate the users have **Permissions** to access the Azure application.

<br>

</details>

<details>

<summary><b>All users are unable to re-sign in using their Microsoft 365 credentials. What can we do to resolve this?</b></summary>

If users who were able to sign in at the start need to report the issue, validate that the Application **Client secret** has not expired. The following image shows the error message:

:::image type="content" source="../assets/images/MoodleInstructions/faq 6.png" alt-text="report issue":::

The following image shows the error in Azure portal:

:::image type="content" source="../assets/images/MoodleInstructions/faq 7.png" alt-text="azure portal":::

Consequently, if the **Client secret** has expired, then you need to generate a new Client secret, and update the configuration found on this page. The users can sign in again after the Client secret has been updated, which may take up to 24 hours to re-provision.

<br>

</details>

<details>

<summary><b>How to change the teams instance that is linked to a course?</b></summary>

Administrators may change the teams instance associated with a course through the **Manage Teams Connections** page. Select **Connect** next to the course to be changed and select teams instance.

>[!NOTE]
>If you use Course reset to archive a team by mistake, you can link it back to the previous team.

:::image type="content" source="../assets/images/MoodleInstructions/faq 8.png" alt-text="teams instance":::

<br>

</details>

<details>

<summary><b>Why isn’t the Atto Teams meeting integration showing up within the Atto editor?</b></summary>

The user can face the issue if the icon reference is missing in the **Toolbar config**. which will display the Teams icon within the Atto editor. 

* Install the plugin.
* Update **Toolbar config** with **teams meeting**.

The following image shows Toolbar icon after Toolbar config adjustment:

:::image type="content" source="../assets/images/MoodleInstructions/faq 9.png" alt-text="tool bar":::

<!-- [Place holder for url] -->

>[!NOTE]
> Add teams meeting to the right of the links icons.

:::image type="content" source="../assets/images/MoodleInstructions/faq 10.png" alt-text="links icon":::

For more information on editing Atto toolbar, see: 
* [Atto editor - MoodleDocs](https://docs.moodle.org/311/en/Atto_editor)
* [Icon Mapping](https://docs.moodle.org/311/en/Atto_editor#:~:text=in%20the%20editor.-,Atto%20editor%20toolbar,-Atto%20Row%201)

<br>

</details>

<details>

<summary><b>Do the meetings scheduled through Microsoft integration appear in Outlook or in Teams calendars? What is the standard timeline for the meetings to be displayed?</b></summary>

The meetings scheduled through the app don't appear in the scheduler’s Outlook or Teams calendar as they are similar to Channel Meetings. All the members in the course channel can attend the meeting directly from the embedded channel link. For more information, see [Channel meetings](https://www.knowledgewave.com/blog/benefits-of-channel-meetings-in-microsoft-teams).

However, you can access the invite and manually add participant names to the **Required** or **Optional** fields of the meeting invitation to display the remote meeting on their calendars. The standard timelines are based on the date the user specifies when the meeting is created. 

<!-- For more information, see [Meetings](https://docs.microsoft.com/en-us/microsoftteams/limits-specifications-teams) -->