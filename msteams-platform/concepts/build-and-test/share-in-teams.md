---
title: Share-in-Teams
description: Learn to add the Share in Teams embedded button on your personal app or tab
ms.topic: reference
ms.localizationpriority: medium
keywords: Share Teams Share-in-Teams
---
# Share-in-Teams

Share-in-Teams is used to share the content from your personal app or tab to other user in Teams, you can also add this button to the personal app or tab.

When you select Share-in-Teams button, it launches the Share-in-Teams experience in a pop-up window. This button allows you to share a link to the other user through a chat or channel in Teams, it also allows you to add notes.

The following image displays the Share-in-Teams pop-up experience:

:::image type="content" source="../../assets/images/share-in-teams/share-in-teams.PNG" alt-text="share-in-teams-experience":::

This document guides you on how to create and add a Share-in-Teams button for your personal app or tab.

## Prerequisites

Get latest [Microsoft Teams JavaScript client SDK v2 Preview](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true) (`@microsoft/teams-js@1.11.0-beta.7`)

## Enable Share-in-Teams button

To enable Share-in-Teams button in your personal tab or app,
call `microsoftTeams.sharing.shareWebContent` with a payload like this:

```json
microsoftTeams.sharing.shareWebContent({
        content: [
          {
            type: 'URL',
            url: 'https://www.microsoft.com/en-ca/'
            preview: true
          }
        ]
      });
```

## Test the feature

To test the Share-in-Teams button added to your personal app or tab, perform the following step:

1. Open personal app and go to required task.
2. Select the ellipse button.

:::image type="content" source="../../assets/images/share-in-teams/share-button.PNG" alt-text="share-in-teams-button-":::

3. Select **Share-in-Teams** button.
4. Add recipient (a person or group, or channel).

:::image type="content" source="../../assets/images/share-in-teams/add-recepient.PNG" alt-text="add-recipient":::

5. You can also add a note or message in the **say something about this** textbox.

:::image type="content" source="../../assets/images/share-in-teams/add-notes.PNG" alt-text="add-note":::

6. Select **Share** button.

:::image type="content" source="../../assets/images/share-in-teams/link-shared.PNG" alt-text="share-in-teams-link-shared":::

7. Select **View** button and see the chat window of personal or group or channel to check the shared link.
