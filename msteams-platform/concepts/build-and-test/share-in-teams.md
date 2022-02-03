---
title: Share-in-Teams for personal app or tab
description: Learn to add the Share in Teams embedded button on your personal app or tab
ms.topic: reference
ms.localizationpriority: medium
keywords: Share Teams Share-in-Teams
---
# Share-in-Teams for personal app or tab

Share-in-Teams is used to share the content from your personal app or tab to other user in Teams. When you select **Share-in-Teams** button, it launches the Share-in-Teams experience in a pop-up window. You can add the recipient (a person or group or channel) and notes to the recipient in the pop-up window and share the required content.

This document guides you on how to create and add a Share-in-Teams button for your personal app or tab.

> [!NOTE]
> This feature is available till R2 Version.

The following image displays the Share-in-Teams pop-up experience:

:::image type="content" source="../../assets/images/share-in-teams/share-in-teams.PNG" alt-text="share-in-teams-experience":::

## Prerequisites

[Microsoft Teams JavaScript client SDK v2 Preview](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true) (`@microsoft/teams-js@1.11.0-beta.7`)

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

## Benefits

Following are the key benefits of the Share-in-Teams:

* You can share a link from an app running inside Teams to recipient (a person or group or channel), so that the recipients can access the link.

* You can share a link from an app running inside Teams without relogging.

* You can easily reach to the conversation where the link was shared and you can continue the conversation in the chat where the link was shared.

* You can also add a note while sharing the link.

## Test the feature

To test the Share-in-Teams button added to your personal app or tab, perform the following step:

1. Open personal app and go to required task.

2. Select the ellipses &#x25CF;&#x25CF;&#x25CF; from the required task.

1. Select **Share-in-Teams** button.

:::image type="content" source="../../assets/images/share-in-teams/share-button.PNG" alt-text="share-in-teams-button-":::

4. Add the recipient (a person or group or channel).

:::image type="content" source="../../assets/images/share-in-teams/add-recepient.PNG" alt-text="add-recipient":::

5. You can also add a note or message in the **say something about this** textbox.

:::image type="content" source="../../assets/images/share-in-teams/add-notes.PNG" alt-text="add-note":::

6. Select **Share** button.

:::image type="content" source="../../assets/images/share-in-teams/link-shared.PNG" alt-text="share-in-teams-link-shared":::

7. Select **View** button to reach the conversation where the link was shared.
