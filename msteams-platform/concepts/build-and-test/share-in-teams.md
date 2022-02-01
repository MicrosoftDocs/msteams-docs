---
title: Create Share-in-Teams button
description: Learn to add the Share in Teams embedded button on your website, with a website preview, using Code samples 
ms.topic: reference
ms.localizationpriority: medium
keywords: Share Teams Share-in-Teams
---
# Create Share-in-Teams button

Share-in-Teams is used to share the link from a personal app or tab to other user in Teams. Share-in-teams button to be embedded to the personal app or tab. 

When you select Share-in-Teams button, it launches the Share-in-Teams experience in a pop-up window. This allows you to share a link to the other user through any chat or channel in Teams. The pop-up window allows you to add notes or message also. 
This document guides you on how to create and embed a Share-in-Teams button for your personal app or tab.

## Prerequisites

* latest teams client SDK beta: "@microsoft/teams-js": "^1.11.0-beta.7"

## Enable Share-in-Teams button

To enable Share-in-Teams button in the personal tab or app, 
call microsoftTeams.sharing.shareWebContent with a payload like this:

microsoftTeams.sharing.shareWebContent({
        content: [
          {
            type: 'URL',
            url: ’https://www.microsoft.com/en-ca/'
            preview: true
          }
        ]
      });

## Test the feature

To test the feature, perform the following step:

1. Open personal app and click ellipse.
1. Select Share-in-Teams button.
1. Add recipient (a person or group, or channel).
1. Add a note or message in the **say something about this** textbox.
1. Select **Share** button.
1. Now you can see the chat window of person or group or channel to check your message and link is shared.