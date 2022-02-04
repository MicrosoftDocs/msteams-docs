---
title: Share-in-Teams
description: Learn to add the Share in Teams embedded on your personal app or tab
ms.topic: reference
ms.localizationpriority: medium
keywords: Share Teams Share-in-Teams
---
# Share-in-Teams

Share-in-Teams is used to share the content from your personal app or tab to other user in Teams. When you select **Share-in-Teams** option, it launches the Share-in-Teams experience in a pop-up window. This allows you to add the recipient (a person or group or channel), notes and share the required content. This document guides you on how to create and add a Share-in-Teams for your personal app or tab.

The following image displays the Share-in-Teams pop-up experience:

:::image type="content" source="../../assets/images/share-in-teams/share-in-teams.PNG" alt-text="share-in-teams-experience":::

Share-in-Teams option allows users:

* To share a link from an app running inside Teams to recipient (a person or group or channel), so that the recipients can access the link.

* To share a link from an app running inside Teams.

* To reach to the conversation where the link was shared and you can continue the conversation in the chat where the link was shared.

* To also add a note while sharing the link.

Ensure that you have [Microsoft Teams JavaScript client SDK v2 Preview](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true) (`@microsoft/teams-js@1.11.0-beta.7`).

## Enable Share-in-Teams

To enable Share-in-Teams in your personal tab or app,
call `microsoftTeams.sharing.shareWebContent` with a payload like this:

```json
microsoftTeams.sharing.shareWebContent({
        content: [
          {
            type: 'URL',
            url: 'URL which the dev wants to be shared',
            preview: true
          }
        ]
      });
```

## End user Share-in-Teams experience

Following example shows the users to use Share-in-Teams option in Teams:

1. Open a personal app or tab and select a content which you like to share.

2. From the ellipsis (...) menu, select **Share-in-Teams**.

   :::image type="content" source="../../assets/images/share-in-teams/share-button.PNG" alt-text="share-in-teams-button-":::

3. Add a recipient (a person or group or channel).

   :::image type="content" source="../../assets/images/share-in-teams/add-recepient.PNG" alt-text="add-recipient":::

4. Add a note in the **say something about this** textbox.

   :::image type="content" source="../../assets/images/share-in-teams/add-notes.PNG" alt-text="add-note":::

5. Select **Share**.

   :::image type="content" source="../../assets/images/share-in-teams/link-shared.PNG" alt-text="share-in-teams-link-shared":::

6. Select **View** to reach the conversation where the link was shared.
