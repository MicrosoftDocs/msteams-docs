---
title: Moodle Frequently asked questions
description: In this article, fetch answers to some frequently asked questions while using the Moodle LMS. 
ms.topic: conceptual
ms.localizationpriority: high
ms.author: Surbhigupta
ms.date: 06/29/2022
---

# Moodle FAQ

Get answers to some of your queries when using Moodle LMS.<br>

<br>

<details>

<summary><b>What should I do if one or more of the course teams weren't created after synchronization?</b></summary>

Each Moodle course must have at least one faculty and one student matched to a Microsoft 365 AAD UPN account. The team can't be created, if the synchronization doesn't find a match.

Each team course instance must have an owner, and the synchronization sets the faculty as the owner, with assumption that the faculty has Teams license.

<br>

</details>

<details>

<summary><b>What should we do to remove Moodle login page when working from Teams? Can we force single sign-on (SSO)?</b></summary>

The users have multiple sign in options from the Moodle login page.

* To sign in exclusively using Microsoft 365 credentials, enable the **Force redirect** configuration settings for the **auth_oidc plugin**. If the service is enabled, user can see the Microsoft sign in page.
* To sign in manually to the Moodle portal, see [Moodle](https://moodle.org/login/index.php).

<br>

</details>

<details>

<summary><b>How can I specify which users to sync? I don’t want all Azure AD users synchronized with the Moodle website. </b></summary>

Use the **User Creation Restriction** option to specify the users by synchronizing the configuration options of the **local_o365** plugin. The dropdown menu to the left of the **filter** offers options such as Country/Region, Company Name, and Language.

> [!TIP]
> Create a dynamic Microsoft 365 group to enable the **filter** option with multiple profile properties.

The following image shows user creation restrictions options:

:::image type="content" source="../assets/images/MoodleInstructions/faq-2.png" alt-text="sync":::

:::image type="content" source="../assets/images/MoodleInstructions/faq-3.png" alt-text="Azure ad":::

<br>

</details>

<details>

<summary><b>We would like our faculty to be able to synchronize courses to Teams? Are Moodle administrators the only ones who can control synchronization of courses?</b></summary>

By default only Moodle administrators can configure synchronization. The team owner can control if a course is synchronized to Teams and **Allow configure course sync in course** is enabled. In this case, the team owner is the faculty. The block displays the configuration option to individuals with the appropriate owner permissions.

<!-- For more information, see Microsoft 365 block within the Moodle course interface. -->

The following image shows the option **Allow configure course sync in course**:

:::image type="content" source="../assets/images/MoodleInstructions/faq-4.png" alt-text="admin":::

The following image shows synchronization of courses:

:::image type="content" source="../assets/images/MoodleInstructions/faq-5.png" alt-text="synchronization":::

<br>

</details>

<details>

<summary><b>We have followed the documentation, but the user accounts fail to sync AAD and Moodle. What should we do?</b></summary>

The issue can be resolved before users perform the **Delta token clean up** as a final troubleshooting step.

The following table provides the actions and dependencies to be performed and checked:

| Dependency | Action | Reference|
|-------|------------|----------|
| Stable version| Verify that the version of Moodle is listed as a **stable**.| For more information, see [Version support](https://docs.moodle.org/dev/Releases#Version_support).|
|Permissions| Verify that the Azure application has the necessary permissions to run the synchronization.| For more information, see [Microsoft permissions](https://docs.moodle.org/311/en/Microsoft_365#Permissions).|
| Full sync| Verify that **Perform a full sync each run** is enabled, and review the **Task Logs** for **Sync users with Azure AD**.| For more information, see [Enable full sync](https://docs.moodle.org/311/en/local_o365)</br>For more information, see [Check task logs](https://docs.moodle.org/311/en/local_o365#Sync_users_with_Azure_AD). |
|Token refresh|Clean the **User sync delta token** in the local_o365 plugin.| For more information, see, [Token refresh](https://docs.moodle.org/38/en/Office365).|
<!-- |Token refresh|Clean the **User sync delta token** in the local_o365 plugin| {moodle_url}\local_o365\acp.php?Mode=maintenance_cleandeltatoken| -->
<br>

</details>

<details>

<summary><b>One or more users are unable to sign in using their Microsoft 365 credentials, although most users can sign in without an issue. What would be the cause of this inconsistency?</b></summary>

The reason for inconsistencies with users being able unable to sign using their Microsoft 365 credentials can be related to the user mapping operation during synchronization. To resolve the issue, perform the following steps:

* Check if the Moodle user authentication type is **OpenID**.
* Check if the Moodle **User Name** matches the AAD username.
* Clean up the **Token Issue** and retry.
* Check if the users have **Permissions** to access the Azure application.

<br>

</details>

<details>

<summary><b>All users are unable to sign in using their Microsoft 365 credentials. What can we do to resolve this?</b></summary>

Users who were unable to sign in at the start need to report the issue and verify that the application **Client secret** hasn't expired.

The following image shows the error message received when user sign using their Microsoft 365 credentials:

:::image type="content" source="../assets/images/MoodleInstructions/faq-6.png" alt-text="report issue":::

The following image shows the error in Azure portal:

:::image type="content" source="../assets/images/MoodleInstructions/faq-7.png" alt-text="Azure portal":::

If the **Client secret** has expired, then user needs to generate a new **Client secret**, and update the configuration found on page. Users can sign in again after the **Client secret** has been updated, which can take up to 24 hours to re-provision.

<br>

</details>

<details>

<summary><b>How to change the teams instance that is linked to a course?</b></summary>

Administrators can change the teams instance associated with a course through the **Manage Teams Connections** page. Select **Connect** next to the course to be changed and select teams instance. If you use course reset to archive a team, you can link it back to the previous team.

The following image shows the teams instance:

:::image type="content" source="../assets/images/MoodleInstructions/faq-8.png" alt-text="teams instance":::

<br>

</details>

<details>

<summary><b>Why isn’t the Atto Teams meeting integration showing up within the Atto editor?</b></summary>

The user can face Atto Teams meeting issue if the icon reference is missing in the **Toolbar config**, which displays the Teams icon within the Atto editor. User needs to add Teams meeting icon to the right of the links icon using the following steps:

* Install the plugin.
* Update **Toolbar config** with **teams meeting**.

The following images show Toolbar icon after Toolbar configuration adjustment:

:::image type="content" source="../assets/images/MoodleInstructions/faq-9.png" alt-text="tool bar":::

:::image type="content" source="../assets/images/MoodleInstructions/faq-10.png" alt-text="links icon":::

For more information on editing Atto toolbar, see:

* [Atto editor-ModdleDocs](https://docs.moodle.org/311/en/Atto_editor)
* [Atto editor-Icon mapping](https://docs.moodle.org/311/en/Atto_editor#:~:text=in%20the%20editor.-,Atto%20editor%20toolbar,-Atto%20Row%201)
<br>

</details>

<details>

<summary><b>Do the meetings scheduled through Microsoft integration appear in Outlook or in Teams calendars? What is the standard timeline for the meetings to be displayed?</b></summary>

The meetings scheduled through the app don't appear in the scheduler’s Outlook or Teams calendar as they're similar to Channel Meetings. All the members in the course channel can attend the meeting directly from the embedded channel link. For more information, see [Channel meetings](https://www.knowledgewave.com/blog/benefits-of-channel-meetings-in-microsoft-teams).

However, you can access the invite and manually add participant names to the **Required** or **Optional** fields of the meeting invitation to display the remote meeting on their calendars. The standard timelines are based on the date the user specifies when the meeting is created. For more information, see [Limits and specifications for Teams](/microsoftteams/limits-specifications-teams).

<br>

</details>

<details>

<summary><b>Is there any support site where we can get more help on products and other issues?</b></summary>

For support and help on the product and services issues or developer community help see, [Support and Feedback](/microsoftteams/platform/feedback).
