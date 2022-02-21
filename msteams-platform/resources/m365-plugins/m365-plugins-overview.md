---
title: Microsoft 365 plugins overview
description: Microsoft 365 plugins overview 
ms.topic: Plugins overview
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-leenagopal
---

# Plugins overview

Microsoft 365 plugins provides an integration between Moodle websites and Microsoft Teams. These plugins makes it easy for you to schedule, deliver, and collabrate the course content. The plugins can be used independently, or in partership as per the requirement.

## Plugin list and labels

The following table lists the plugins and GitHub labels based on the requirements.

|Requirement|Plugins to install|GitHub label(s)|
|-----|-----|----|
| Enable SSO for users who work using both Moodle and Microsoft Teams. | OpenID Connect | auth_oidc|
| Create Teams instances for each course in Moodle, and sync faculty as owners, and students as team members. | - OpenID Connect </br> - Microsoft 365 integration | auth_oidc </br> local_o365|
| Remove Moodle blocks and extra chrome within the Moodle iframes for Teams, which applies while mapping courses to Teams instances. | - OpenID Connect </br> - Microsoft 365 Integration </br> - Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle. | - OpenID Connect </br> - Microsoft 365 integration </br> - Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| Enable OneNote to be used for assignment, submission and feedback. | - OpenID Connect </br> - OneNote </br> - OneNote Submissions </br> - OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| Enable 365 quick access blocks within Moodle with links to Microsoft 365 collaboration services and install links for Microsoft Office. | - OpenID Connect </br> - Microsoft 365 Integration </br> - Microsoft 365 Repository </br> - Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| Enable Atto editor in Moodle to create Teams meeting links. | Teams Meeting | atto_teamsmeeting |
| Enable video links in Moodle. | oEmbed Filter | Filter_oembed |

## OpenID Connect

The Open ID Connect plugin allows you to authenticate any website or tool that supports the required specification and provides single sign-on support (SSO) with Microsoft Office 365. The OpenID Connect plugin provides institutions with the following sign-in workflow options to meet their specific requirements:

* Users can enter their Office 365 credentials, such as email and password to sign in directly or sign-in using Moodle’s username and password fields, without signing into Office 365.
* Users can select the link to sign in through Office 365 or the OpenID Connect provider on Moodle page.

:::image type="content" source="../../assets/images/MoodleInstructions/openid-connect.png" alt-text="Login to openid-connect":::

## Microsoft 365 integration

Microsoft 365 consists of several apps with multiple functionalities allowing you to stay connected and perform different actions as required. The Microsoft 365 integration plugin allows administrators to validate the following:

* Validate appropriate integration functions.
* Synchronize users between Office 365 and Moodle.
* Configure required permissions for users.
* Set up SharePoint website for the course files.

:::image type="content" source="../../assets/images/MoodleInstructions/365-integration.png" alt-text="microsoft 365 integration":::

###  User functions

The users can perform the following actions with Microsoft 365 integration:

* Check the overall functioning of all Microsoft 365 plugin integrations.
* Upload a CSV file which compares Moodle to Office 365 users.
* Validate configurations for Azure AD permissions.

## Microsoft 365 repository

The Microsoft 365 repository plugin allows you to store course files in OneDrive. Faculty can add files from the course file section of OneDrive or from their own personal space to this repository.

Microsoft 365 offers you the benefit of using it as a file repository for an institution while keeping Moodle's data structure simple. The Microsoft 365 repository plugin provides the following services:

* The faculty can store the course files in OneDrive. Each course has its own folder created in OneDrive, which allows you to add files either from the course files area of OneDrive or from their own personal space.  
* To add files to Moodle as a copy or create a link to the file. The linked file is displayed in a new application window or is embedded in the webpage.
* To upload files to OneDrive or SharePoint using the Moodle file picker.

:::image type="content" source="../../assets/images/MoodleInstructions/microsoft 365 repository.png" alt-text="ms.365 repository":::

## Teams meetings

The Teams meetings plugin allows you to create meetings requests in calendar, assignments, forum posts, and in the Atto editor its availability.

After the plugin is installed, faculty and students can create an audio or video meeting using Moodle, which requires Microsoft 365 account and Moodle permissions.

>[!NOTE]
>Teams meetings don't appear on Outlook or Teams calenders, however, individual student names can be added to the invite for the same.

:::image type="content" source="../../assets/images/MoodleInstructions/teams meeting.png" alt-text="signin to teams meeting":::

## Microsoft 365 Teams theme

The Microsoft 365 Teams theme plugin provides you with custom view of Moodle course home page and is available for viewing when you access their Moodle courses within Teams.

The theme plugin offers users with an unified enhanced experience with the following features:

* Adapts to Microsoft Teams theme changes, such as default, dark, and high contrast.
* Provides focus on the course activities.
* Removes Moodle blocks, navigation, header, and footer.
* Provides Microsoft Team User Interface (UI) elements.

:::image type="content" source="../../assets/images/MoodleInstructions/teams theme.png" alt-text=" microsoft teams theme":::

## OneNote integration

The OneNote integration plugin provides you with options to browse notebooks, sections, and pages; where assignments are submitted and faculty provides necesssary feedback on corresponding assignments in OneNote. OneNote also enhances user experience by adding features beyond tests and links, while extending the capabilities to mobile using digital pens, photo or video media, and co-authoring with groups.

OneNote integration helps with access to texts, graphics, and audio repositories. The plugins provides you with the following advantages:

* Include browsing notebooks, sections, and pages, where students work on assignments and  provide feedback on those assignments in OneNote.
* Combine digital binder for notes, assignments, and feedback for reference and review.
* Expand drafting capabilities beyond text and links, and extend mobile usage using digital pens, photo or video media, and co-authoring with groups.
* Include submission and feedback page for each assignment under the faculty's account. When such is saved within Moodle, a copy of the HTML and any associated pictures are packaged in a zip file.

> [!NOTE]
> The submission or feedback events trigger OneNote creation with a section for each course the student has enrolled in.

## Microsoft block

Microsoft block plugin allows you to access the course SharePoint file location and view the course in OneNote notebook for submissions, along with the option to modify Office 365 integration preferences. The admininstrators can configure the block to appear on all the course pages.

Microsoft block enhances user experience by providing an User Interface (UI) to modify Microsoft 365 integration features and access to its numerous resources. Administators can configure the block to view the modified changes to appear on each course page. The block also allows you to perform the following activities:

* Access the course SharePoint file location and OneNote notebook.
* View the course on OneNote notebook for submissions.
* Configure the Outlook calendar sync.
* Manages connection to Office 365.
* Customize personal Office 365 integration preferences.

:::image type="content" source="../../assets/images/MoodleInstructions/microsoft lock 1.png" alt-text="microsoft block":::

## oEmbed filter

oEmbed filter plugin simplifies the inclusion of external HTML content within Moodle. The oEmbed filter plugin enhances user experience by simplifying inclusion of the external HTML content within Moodle. The following are the advantages of oEmbed filter. 

* Reduces the time to embed videos to an HTML page.
* Enables embedding of multiple video content providers.
* Ensures a quicker method to copy and embed code from any of the supported services.
* Permits video embedding without an API key.

:::image type="content" source="../../assets/images/MoodleInstructions/oEmbed filter.png" alt-text="oEmbed filter page":::

## See also

* [Partner apps for Moodle](resources/partner-apps-for-moodle.md)
<!-- * [Partner apps for Moodle](partner-apps-for-moodle.md)
* [Getting help](getting-help.md)
* [FAQs](faqs.md) -->