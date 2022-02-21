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