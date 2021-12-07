---
title: Microsoft 365 Plugins 
description: Microsoft 365 Plugins introduction
ms.topic: Plugins introduction
ms.localizationpriority: medium
ms.author: Surbhigupta
author: v-rpatkur
---

# Plugins Introduction

The Microsoft 365 Plugins are designed by Microsoft to support integration between Moodle sites and Microsoft Teams. We currently have seven (7) plugins, which can be used independently, or in collaboration, to achieve various usage scenarios. You may find the full list of supported plugins [here](https://moodle.org/plugins/?q=set:microsoft-365). As you review the descriptions below, and the documentation on GitHub, please post any comments or issues at the dedicated GitHub repository [here](https://github.com/microsoft/o365-moodle/issues).

**Usage Scenario Guide**

|Desired Result|Plugins to install|GitHub Label(s)|
|-----|-----|----|
| **Enable SSO for Users who work in both Moodle and Teams** | * OpenID Connect | auth_oidc|
| **Create teams instances for each course in Moodle, and sync Teachers as team Owners, and Students as team members** | * OpenID Connect </br> * Microsoft 365 integration | auth_oidc </br> local_o365|
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle** | * OpenID Connect </br> * Microsoft 365 integration </br> * Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| **Enable OneNote to be used for Assignment Submission and Feedback**| * OpenID Connect </br> * OneNote </br> * OneNote Submissions </br> * OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| **Enable 365 quick access Blocks within Moodle with links to Microsoft 365 collaboration services and install link for Microsoft Office** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Microsoft 365 Repository </br> * Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| **Enable Atto Editor in Moodle to create a Teams meeting link** | Teams Meeting | atto_teamsmeeting |
| **Enable video links in Moodle for YouTube and Vimeo** | oEmbed Filter | Filter_oembed |

## OpenID connect

It allows users to authenticate against any site or authentication tool that supports the OpenID Connect specification. It is used to provide single-sign-on support with Microsoft Office 365.

## Microsoft 365 integration

It allows administrators to validate that the integration is functioning properly, synchronize users between Office 365 and Moodle, configure permissions, and set up the SharePoint site for the course files.

## Microsoft 365 repository

Using the Microsoft 365 Repository plugin, the teachers have two choices to store the course files in OneDrive. Each course has its own folder created in OneDrive, which allows teachers to add files from the course files area of OneDrive or from their own personal space.

## Teams Meetings

It can be created using the Atto Editor in Calendar, Assignments, Forum posts, or wherever Atto Editor is available.

## Microsoft 365 Teams theme

Teams theme plugins display a custom view of the Moodle course home page within Teams. This view is only available when users access their Moodle courses within Teams.

## OneNote Integration

It Includes browsing notebooks, sections, and pages; where students do assignments in OneNote and teachers provide feedback on those assignments in OneNote. It also expands note-taking capabilities beyond just text and links, and extends mobile usage scenarios using digital pens, photo/video media, and co-authoring with groups.

## Microsoft Block

Microsoft Block allows users to access the course SharePoint file location, view the course OneNote notebook for submissions and modify their Office 365 integration preferences. Admins can configure the block to appear on every course page.

## oEmbed filter

The oEmbed filter is a powerful filter that simplifies the inclusion of external HTML content within Moodle.

## See also

* [OpenID Connect](openid-connect.md)
* [Microsoft 365 Integration](microsoft-365-integration.md)
* [Microsoft 365 Repository](microsoft-365-repository.md)
* [Teams Meetings](teams-meetings.md)
* [Microsoft 365 Teams Theme](microsoft-365-theme.md)
* [OneNote Integrations](onenote-integration.md)
* [Microsoft Block](microsoft-block.md)
* [oEmbed Filter](oEmbed-filter.md)