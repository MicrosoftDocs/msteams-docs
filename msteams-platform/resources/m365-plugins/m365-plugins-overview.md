---
title: Microsoft 365 plugins overview
description: Microsoft 365 plugins overview 
ms.topic: Plugins introduction
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-leenagopal
---

# Plugins overview

Microsoft 365 plugins provides an integration between Moodle websites and Microsoft Teams. These plugins makes it easy for you to schedule, deliver, and collabrate the course content. The plugins be used independently, or in partership as per the requirement. For more information, see [supported plugins](https://moodle.org/plugins/?q=set:microsoft-365).

## Plugin list and labels

The following table lists the plugins and GitHub labels based on the requirements:

|Requirement|Plugins to install|GitHub Label(s)|
|-----|-----|----|
| Enable SSO for users who work using both Moodle and Microsoft Teams | OpenID Connect | auth_oidc|
| Create Teams instances for each course in Moodle, and sync faculty as owners, and students as team members | - OpenID Connect </br> - Microsoft 365 integration | auth_oidc </br> local_o365|
| Remove Moodle blocks and extra chrome within the Moodle iframes for Teams, which applies while mapping courses to Teams instances | - OpenID Connect </br> - Microsoft 365 Integration </br> - Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle | - OpenID Connect </br> - Microsoft 365 integration </br> - Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| Enable OneNote to be used for assignment, submission and feedback| - OpenID Connect </br> - OneNote </br> - OneNote Submissions </br> - OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| Enable 365 quick access blocks within Moodle with links to Microsoft 365 collaboration services and install links for Microsoft Office | - OpenID Connect </br> - Microsoft 365 Integration </br> - Microsoft 365 Repository </br> - Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| Enable Atto editor in Moodle to create Teams meeting links | Teams Meeting | atto_teamsmeeting |
| Enable video links in Moodle | oEmbed Filter | Filter_oembed |

## OpenID Connect

The Open ID Connect plugin allows you to authenticate any website or tool that supports the required specification and provides single-sign-on support (SSO) with Microsoft Office 365.

## Microsoft 365 integration

The Microsoft 365 integration plugin allows administrators to validate the following:

* Check if the integration is functioning properly.
* Synchronize users of Office 365 and Moodle.
* Configure the required permissions.
* Set up the SharePoint site for the course files.

## Microsoft 365 repository

The Microsoft 365 repository plugin allows you to store course files in OneDrive. Faculty can add files from the course file section of OneDrive or from their own personal space to this repository.

## Teams meetings

The Teams meetings plugin allows you to create meetings requests in calendar, assignments, forum posts, and in the Atto editor.

## Microsoft 365 Teams theme

The Microsoft 365 Teams theme plugin provides you with custom view of Moodle course home page when accessing the course through Teams.

## OneNote integration

The OneNote integration plugin provides you with options to browse notebooks, sections, and pages; where assignments are submitted and faculty provides necesssary feedback on corresponding assignments in OneNote. OneNote also enhances user experience by adding features beyond tests and links, while extending the capabilities to mobile using digital pens, photo or video media, and co-authoring with groups.
 
## Microsoft block

Microsoft block plugin allows you to access the course SharePoint file location and view the course in OneNote notebook for submissions, along with the option to modify Office 365 integration preferences. The admininstrators can configure the block to appear on all the course pages.

## oEmbed filter

oEmbed filter plugin simplifies the inclusion of external HTML content within Moodle.

## See also

* [Plugin introduction](openid-connect.md)