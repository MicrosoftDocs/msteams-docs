# Microsoft Teams Tabs

## Overview

Microsoft Teams tabs are client-aware webpages embedded within Microsoft Teams, Outlook, and Microsoft 365. They are implemented as HTML `<iframe/>` tags pointing to approved domains declared in the app manifest. Tabs can be added to channels, group chats, or as personal apps for individual users.

You can enhance your application by embedding custom tabs that contain web content or incorporate Teams-specific functionalities. For a deeper dive, refer to the [Teams JavaScript client library].

### Types of Tabs

Tabs come in two configurations:

1. **Static Tabs**: Predefined for use without additional user configuration.
2. **Configurable Tabs**: Allow user configuration to personalize content within Teams.

### Tab Scopes

Tabs exist within three main scopes:

- **Personal**: Scoped to individual users, easily accessible via the left navigation bar.
- **Group Chat**: Shared within group conversations.
- **Teams**: Embedded within channels.

## Benefits of Tabs

- **Pinnable and Instant**: Pin apps with static tabs in chats, channels, and meetings. Tabs do not require configuration dialogs and act like apps.
- **Unified**: Create a single static tab for both personal and group use.
- **Optional Configuration**: Customize default URL via `contentUrl` in the app once pinned.

## User Scenarios

Here are scenarios where tabs provide valuable solutions:

- **Integrate Web Resources**: Import web pages into Teams as a static tab, like a corporate informational site.
- **Support Integration**: Enhance bots or messaging with static tabs for help or info pages.
- **Consistent Access**: Enable tabs linking to regularly used items for collaborative work.

## Creating and Managing Tabs

### Create a Custom Tab in the App Manifest

To declare a tab in your app:

1. Define a unique URL along with a scope for each webpage.
2. Utilize [Teams JavaScript client library] for additional features.
3. Implement the `<iframe/>` HTML structure for your tab content.

For **static tabs**, configure your `contentUrl` directly in the manifest.

For **configurable tabs**, you can offer an additional configuration page for a tailored user experience. This helps provide specific content through context-specific query string parameters.

### Tools for Building Tabs

- **Visual Studio Code Teams Toolkit**: Facilitates app creation within VS Code.
- **TeamsFx CLI**: Use command-line tools for managing and deploying Teams apps.

## Next Steps

Proactively familiarize yourself with the prerequisites for utilizing tabs and assess scenarios where these elements of Microsoft Teams can add value to your workflows.

## Additional Resources

- [Designing Tabs for Teams](design/tabs.md)
- [Tabs on Mobile](design/tabs-mobile.md)
- [Graph API and Auth](how-to/authentication/tab-sso-graph-api.md)
- [Teams Updates](../resources/teams-updates.md)
- [Device Permissions in Teams](~/sbs-tab-device-permissions.yml)

Explore these resources to enhance your understanding and implementation of Teams tabs in practical scenarios.