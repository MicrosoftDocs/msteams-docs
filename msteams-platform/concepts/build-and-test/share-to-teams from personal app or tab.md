---
title: Share-to-Teams from personal app or tab
description: Learn to add the Share in Teams embedded on your personal app or tab
ms.topic: reference
ms.localizationpriority: medium
keywords: Share Teams Share-to-Teams
---
# Share-to-Teams from personal app or tab

> [!NOTE]
> Share-to-Teams is currently available only in [public developer preview](../../resources/dev-preview/developer-preview-intro.md).

Share-to-Teams allows you to share the content from personal app or tab to other user or group or channel within Teams. You can select Share-to-Teams to launch the Share-to-Teams experience in a pop-up window. The pop-up window allows you to add other user or group or channel and to share the content.

The following image shows the Share-to-Teams pop-up window:

:::image type="content" source="../../assets/images/share-to-teams/share-to-teams.PNG" alt-text="share-to-teams-pop-up":::

## Enable Share-to-Teams

> [!NOTE]
> Ensure that you have [Microsoft Teams JavaScript Client SDK v2 Preview](/javascript/api/overview/msteams-client?view=msteams-client-js-beta&preserve-view=true&branch=pr-en-us-5129) (`@microsoft/teams-js@1.11.0-beta.7`) to enable Share-to-Teams.

To enable Share-to-Teams in your personal tab or app,
call `microsoftTeams.sharing.shareWebContent` with a payload.

The following example explains how to create a payload:

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

The payload contains the following parameters:

| Property name | Purpose |
|---|---|
| `type` | The type must be `URL` |
| `url` | Required URL |
| `preview` | Preview must be `true` |

The following image shows the Share-to-Teams option:

:::image type="content" source="../../assets/images/share-to-teams/share-button.PNG" alt-text="share-to-teams-button":::

## End user Share-to-Teams experience

1. Open a personal app or tab and select **Share-to-Teams**.

    :::image type="content" source="../../assets/images/share-to-teams/share-button.PNG" alt-text="share-to-teams-button":::

2. Add other user or group or channel.

    :::image type="content" source="../../assets/images/share-to-teams/add-recepient.PNG" alt-text="add-recipient":::

3. Select **Share**.

> [!NOTE]
> You can add a note in **say something about this**.

    :::image type="content" source="../../assets/images/share-to-teams/add-notes.PNG" alt-text="add-note":::

4. Select **View** to reach the conversation where the link was shared.

   :::image type="content" source="../../assets/images/share-to-teams/link-shared.PNG" alt-text="share-to-teams-link-shared":::

## See also

[Share-to-Teams](~/concepts/build-and-test/share-to-teams.md)
