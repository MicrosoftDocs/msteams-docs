---
title: Moodle learning management system
description: Microsoft 365 Plugins introduction
ms.topic: Plugins introduction
ms.localizationpriority: medium
ms.author: Surbhi Gupta
author: v-rpatkur
---

# Plugins Introduction

The Microsoft 365 Plugins are designed by Microsoft to support integration between Moodle sites and Microsoft Teams. We currently have seven (7) plugins, which can be used independently, or in collaboration, to achieve various usage scenarios. You may find the full list of supported plugins [here](https://moodle.org/plugins/?q=set:microsoft-365). As you review the descriptions below, and the documentation on GitHub, please post any comments or issues at the dedicated GitHub repository [here](https://github.com/microsoft/o365-moodle/issues).

**Usage Scenario Guide**

|Desired Result|Plugins to install|GitHub Label(s)|
|-----|-----|----|
| **Enable SSO for Users who are working in both Moodle and Teams** | * OpenID Connect | auth_oidc|
| **Create teams instances for each course in Moodle, and sync Teachers as team Owners, and Students as team members** | * OpenID Connect </br> * Microsoft 365 integration | auth_oidc </br> local_o365|
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Remove Moodle Blocks and extra chrome within the Moodle iframes for Teams (applies only when mapping courses to teams instances)** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Teams Theme| auth_oidc </br> local_o365 </br> themeboost_o365teams |
| **Leverage Microsoft 365 OneDrive content for file repositories to reduce storage needs in Moodle** | * OpenID Connect </br> * Microsoft 365 integration </br> * Microsoft 365 Repository | auth_oidc </br> local_o365 </br> repository_office 365|
| **Enable OneNote to be used for Assignment Submission and Feedback **| * OpenID Connect </br> * OneNote </br> * OneNote Submissions </br> * OneNote Feedback | auth_oidc </br> local_onenote </br> assignsubmission_onenote </br> assignfeedback_onenote| 
| **Enable 365 quick access Blocks within Moodle with links to Microsoft 365 collaboration services and install link for Microsoft Office.** | * OpenID Connect </br> * Microsoft 365 Integration </br> * Microsoft 365 Repository </br> * Microsoft Block | auth_oidc </br> local_o365 </br> repository_office365 </br> block_microsoft |
| **Enable Atto Editor in Moodle to create a Teams meeting link** | Teams Meeting | atto_teamsmeeting |
| **Enable video links within Moodle for YouTube and Vimeo** | oEmbed Filter | Filter_oembed |

Related Topics[links to be given]
 



