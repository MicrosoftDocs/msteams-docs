---
title: Extend Teams apps across Microsoft 365 (preview)
description: In this module, know how to build and update your Teams app experiences across other high-usage areas of Microsoft 365. 
ms.date: 05/24/2022
ms.topic: Conceptual
ms.custom: m365apps
ms.localizationpriority: medium
---
# Extend Teams apps across Microsoft 365

With the latest releases of [Microsoft Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) (version 2.0.0), [Teams App manifest](../resources/schema/manifest-schema.md) (version 1.13), and [Teams Toolkit](../toolkit/visual-studio-code-overview.md), you can build and update Teams apps to run in other high-usage Microsoft 365 products and publish them to the Microsoft commercial marketplace ([the Microsoft commercial marketplace](https://appsource.microsoft.com/)).

Extending your Teams app across Microsoft 365 provides a streamlined way to deliver cross-platform apps to an expanded user audience: from a single codebase, you can create app experiences tailored for Teams, Outlook, and Office environments. End users won't have to leave the context of their work to use your app, and administrators benefit from a consolidated management and deployment workflow.

The Teams app platform continues to evolve and expand holistically into the Microsoft 365 ecosystem. Here's the current support of Teams app platform elements across Microsoft 365 (Teams, Outlook, and Office as application hosts):

|          | App manifest element | Teams support |Outlook* support | Office* support | Notes |
|--|--|--|--|--|--|
| [**Tabs**](../tabs/what-are-tabs.md) (personal scope)    |`staticTabs`  | Web, Desktop, Mobile | Web (Targeted Release), Desktop (Beta Channel) | Web (Targeted Release)| Channel and group scope not yet supported for Microsoft 365. See [notes](../tabs/how-to/using-teams-client-sdk.md#microsoft-365-support-running-teams-apps-in-office-and-outlook).
| [**Message extensions**](../messaging-extensions/what-are-messaging-extensions.md) (search-based)| `composeExtensions` | Web, Desktop, Mobile| Web (Targeted Release), Desktop (Beta Channel)| - |Action-based not yet supported for Microsoft 365. See [notes](extend-m365-teams-message-extension.md#preview-your-message-extension-in-outlook). |
| [**Graph connectors**](/graph/connecting-external-content-connectors-overview)| `graphConnector` | Web, Desktop, Mobile| Web, Desktop | Web| See [notes](#graph-connectors)
| [**Office Add-ins**](/office/dev/add-ins/develop/json-manifest-overview) (preview) | `extensions` | - | Web, Desktop | - | Only available in [devPreview](../resources/schema/manifest-schema-dev-preview.md) manifest version. See [notes](#office-add-ins-preview).|

\* The [Microsoft 365 Targeted release](/microsoft-365/admin/manage/release-options-in-office-365) option and [Microsoft 365 Apps update channel](/deployoffice/change-update-channels) enrollment require admin opt-in for the entire organization or selected users. Update channels are device specific and apply only to installations of Office running on Windows.

For guidance about the Teams app manifest and SDK versioning guidance, and further details about current Teams platform capability support across Microsoft 365, see the [Teams JavaScript client SDK overview](../tabs/how-to/using-teams-client-sdk.md).

> [!NOTE]
> We welcome your feedback and issue reporting as you expand Teams apps to run across the Microsoft 365 ecosystem! Please use the regular [Microsoft Teams developer community channels](/microsoftteams/platform/feedback) to send feedback.

## Personal tabs and messaging extensions in Outlook and Office

Reach your users where they are, right in the context of their work by extending your web app as a Teams personal tab application that also runs in both Outlook and Office.

:::image type="content" source="images/outlook-office-teams-personal-tab.png" alt-text="The screenshot is an example that shows Personal tab running in Outlook, Office, and Teams.":::

You can also extend your search-based Teams message extensions to Outlook on the web and Windows desktop, enabling your customers to search and share results through the compose message area of Outlook, in addition to Microsoft Teams clients.

:::image type="content" source="images/outlook-teams-messaging-ext.png" alt-text="The screenshot is an example that shows Message extension running in Outlook and Teams.":::

Building your app with the latest [Teams app manifest](../resources/schema/manifest-schema.md) and [Teams JavaScript client SDK](../tabs/how-to/using-teams-client-sdk.md) provides you with a consolidated development process. By enabling you to deliver a streamlined deployment, installation, and admin experience for your customers, you can expand the potential reach and usage of your app.

## Use Teams app manifest across Microsoft 365

With an aim toward simplifying and streamlining the Microsoft 365 developer ecosystem, we're continuing to expand the Teams app manifest into other areas of Microsoft 365 with the following.

### Graph connectors

With Microsoft Graph connectors, your organization can index third-party data so that it appears as Microsoft Search results, expanding the types of searchable content sources in your Teams apps.
For more information, see [Microsoft Graph connectors overview for Microsoft Search](/microsoftsearch/connectors-overview).

To get started with graph connectors in Teams apps, check out the [Teams Toolkit Graph connectors sample](https://aka.ms/teamsfx-graph-connector-sample) and [Microsoft Teams Developer preview manifest schema](../resources/schema/manifest-schema-dev-preview.md) reference.

### Office Add-ins (preview)

You can now define and deploy Office Add-ins in the [developer preview version](../resources/schema/manifest-schema-dev-preview.md) of the Microsoft Teams app manifest. Currently this preview is limited to Outlook Add-ins running on subscription Office for Windows.

For more information, see [Teams manifest for Office Add-ins (preview)](/office/dev/add-ins/develop/json-manifest-overview).

## Microsoft AppSource submission

Join the growing number of production Teams apps in the [Microsoft AppSource](https://appsource.microsoft.com/) store with expanded support for Outlook and Office preview (Targeted Release) audiences. The app [submission process for Teams apps enabled for Outlook and Office](../concepts/deploy-and-publish/appsource/publish.md) is the same as for traditional Teams apps. The only difference is you'll use Teams app manifest [version 1.13](../tabs/how-to/using-teams-client-sdk.md) in your app package, which introduces support for Teams apps that run across Microsoft 365.

Once published as a Microsoft 365-enabled Teams app, your app will be discoverable as an installable app from the Outlook and Office app stores, in addition to the Teams store. When running in Outlook and Office, your app uses the same permissions granted in Teams. Teams admins can [Manage access to Teams apps across Microsoft 365](/MicrosoftTeams/manage-third-party-teams-apps) for users in their organization.

For more information, see [Publish Teams apps for Microsoft 365](publish.md).

## Next step

Set up your dev environment to build Teams apps for Microsoft 365:

> [!div class="nextstepaction"]
> [Install prerequisites](prerequisites.md)
