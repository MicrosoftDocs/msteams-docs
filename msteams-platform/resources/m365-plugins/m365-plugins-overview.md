---
title: Microsoft 365 Plugins 
description: Microsoft 365 Plugins introduction
ms.topic: Plugins introduction
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-rpatkur
---

# Plugins Introduction

The Microsoft 365 Plugins support integration between Moodle sites and Microsoft Teams. Currently, there are seven plugins, which can be used independently, or in collaboration, as required in different scenarios. You can post any comments or issues at [dedicated GitHub repository](https://github.com/microsoft/o365-moodle/issues). For more information, see [supported plugins](https://moodle.org/plugins/?q=set:microsoft-365).

## Scenarios

The following table lists the plugins and GitHub labels depending on the scenarios:

|Result|Plugins to install|GitHub Label(s)|
|-----|-----|----|
| Enable SSO for users, who work in both Moodle and Teams | OpenID Connect | auth_oidc|
| Create Teams instances for each course in Moodle, and sync teachers as owners, and students as team members | - OpenID Connect </br> - Microsoft 365 integration | auth_oidc </br> local_o365|
| Remove Moodle blocks and extra chrome within the Moodle iframes for Teams, which applies while mapping courses to teams instances | - OpenID Connect </br> - Microsoft 365 Integration </br> - Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle | - OpenID Connect </br> - Microsoft 365 integration </br> - Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| Enable OneNote to be used for assignment, submission and feedback| - OpenID Connect </br> - OneNote </br> - OneNote Submissions </br> - OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| Enable 365 quick access blocks within Moodle with links to Microsoft 365 collaboration services and install links for Microsoft Office | - OpenID Connect </br> - Microsoft 365 Integration </br> - Microsoft 365 Repository </br> - Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| Enable Atto editor in Moodle to create Teams meeting links | Teams Meeting | atto_teamsmeeting |
| Enable video links in Moodle for YouTube and Vimeo | oEmbed Filter | Filter_oembed |

## OpenID Connect

Allows users to authenticate any site or tool that supports OpenID Connect specification. It is used to provide single-sign-on support with Microsoft Office 365.

## Microsoft 365 integration

Allows administrators to validate the following:
* Check the integration is functioning properly
* Synchronize users between Office 365 and Moodle
* Configure permissions
* Set up the sharepoint site for the course files

## Microsoft 365 repository

Use Microsoft 365 repository plugin to store course files in OneDrive. The teachers can add files from the course files area of OneDrive or from their own personal space.

## Teams Meetings

Create using the Atto editor in calendar, assignments, forum posts, or wherever Atto editor is available.

## Microsoft 365 Teams theme

Display custom view of Moodle course home page within Teams. The view is only available when users access their Moodle courses within Teams.

## OneNote Integration

Include browsing notebooks, sections, and pages; where students do assignments and teachers provide feedback on those assignments in OneNote. Enhances user experience by adding features beyond tests and links, also extends to mobile using with digital pens, photo or video media, and co-authoring with groups.
 
## Microsoft Block

Allow users to access the course sharepoint file location and view the course in OneNote notebook for submissions, and modify  Office 365 integration preferences. The admins can configure the block to appear on every course page.

## oEmbed filter

Simplify the inclusion of external HTML content within Moodle.

## See also

* [OpenID Connect](openid-connect.md)
* [Microsoft 365 Integration](microsoft-365-integration.md)
* [Microsoft 365 Repository](microsoft-365-repository.md)
* [Teams Meetings](teams-meetings.md)
* [Microsoft 365 Teams Theme](microsoft-365-theme.md)
* [OneNote Integrations](onenote-integration.md)
* [Microsoft Block](microsoft-block.md)
* [oEmbed Filter](oEmbed-filter.md)