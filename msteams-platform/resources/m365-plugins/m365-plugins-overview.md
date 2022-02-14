---
title: Microsoft 365 Plugins 
description: Microsoft 365 Plugins introduction
ms.topic: Plugins introduction
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-leenagopal
---

# Plugins introduction

The Microsoft 365 plugins provides an integration between Moodle sites and Microsoft Teams. This plugins makes it easy to schedule, deliver, and collabrate on the course content. There are seven plugins, which can be used independently, or in collaboration, as required in . You can post any comments or issues at [dedicated GitHub repository](https://github.com/microsoft/o365-moodle/issues). For more information, see [supported plugins](https://moodle.org/plugins/?q=set:microsoft-365).

## Distinct user requirements

The following table lists the plugins and GitHub labels based on the requirements:

|Result|Plugins to install|GitHub Label(s)|
|-----|-----|----|
| Enable SSO for users, who work in both Moodle and Teams | OpenID Connect | auth_oidc|
| Create Teams instances for each course in Moodle, and sync teachers as owners, and students as team members | - OpenID Connect </br> - Microsoft 365 integration | auth_oidc </br> local_o365|
| Remove Moodle blocks and extra chrome within the Moodle iframes for Teams, which applies while mapping courses to Teams instances | - OpenID Connect </br> - Microsoft 365 Integration </br> - Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle | - OpenID Connect </br> - Microsoft 365 integration </br> - Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| Enable OneNote to be used for assignment, submission and feedback| - OpenID Connect </br> - OneNote </br> - OneNote Submissions </br> - OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| Enable 365 quick access blocks within Moodle with links to Microsoft 365 collaboration services and install links for Microsoft Office | - OpenID Connect </br> - Microsoft 365 Integration </br> - Microsoft 365 Repository </br> - Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| Enable Atto editor in Moodle to create Teams meeting links | Teams Meeting | atto_teamsmeeting |
| Enable video links in Moodle for YouTube and Vimeo | oEmbed Filter | Filter_oembed |

## OpenID Connect

The Open ID Connect plugin allows users to authenticate any site or tool that supports the required specification. It is used to provide single-sign-on support with Microsoft Office 365.

## Microsoft 365 integration

The Microsoft 365 integration plugin allows administrators to validate the following:

* Check if the integration is functioning properly.
* Synchronize users of Office 365 and Moodle.
* Configure the required permissions.
* Set up the SharePoint site for the course files.

## Microsoft 365 repository

The Microsoft 365 repository plugin allows the user to store course files in OneDrive. Users (teachers) can add files from the course files area of OneDrive or from their own personal space to this repository.

## Teams meetings

The Teams meetings plugin allows users to create meetings requests in calendar, assignments, forum posts, and in the Atto editor when available.

## Microsoft 365 Teams theme

The Microsoft 365 Teams theme plugin provides user with custom view of Moodle course home page when accessing the course through Teams.

## OneNote integration

The OneNote integration plugin provides the option to browse notebooks, sections, and pages; where assignments are submitted and faculty provides necesssary feedback on corresponding assignments in OneNote. OneNote also Enhances user experience by adding features beyond tests and links, while extending the capabilities to mobile using digital pens, photo or video media, and co-authoring with groups.
 
## Microsoft block

Microsoft block plugin allows users to access the course SharePoint file location and view the course in OneNote notebook for submissions, along with the option to modify Office 365 integration preferences. The admininstrators can configure the block to appear on all the course pages.

## oEmbed filter

This plugin simplifies the inclusion of external HTML content within Moodle.

## See also

* [Plugin overview](openid-connect.md)