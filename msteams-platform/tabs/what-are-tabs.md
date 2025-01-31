# Microsoft Teams Tabs

Microsoft Teams tabs are client-aware webpages that are embedded within Microsoft Teams, Outlook, and Microsoft 365. They utilize simple HTML `<iframe/>` elements that link to specified domains in the app manifest. Tabs can serve a variety of applications, such as enhancing content pages or providing Teams-specific functionalities.

## Key Features

- **Types of Tabs**:
  - **Static Tabs**: Pinned for ease of access; no configuration required during addition.
  - **Configurable Tabs**: Allow the specification of configurations during tab creation.

- **Scopes**:
  - Personal
  - Group Chat
  - Teams

See detailed documentation on creating personal tabs and extensions:

- [Create a Personal Tab](~/tabs/how-to/create-personal-tab.md)
- [Channel or Group Tabs](~/tabs/how-to/create-channel-group-tab.md)

## Benefits of Static Tabs

- **Pinnable and Instant**: Easy addition and removal without configuration.
- **Unified**: Versatile static tabs available across personal, group, and meeting scopes.
- **Optional Configuration**: Flexibly modify tab `contentUrl` post-deployment.

## Real-World Scenarios

- **Corporate Website Access**: Embed information-rich sites within tabs for easy user access.
- **Support Integration**: Add static tabs for support pages within Teams to complement bots or messaging extensions.
- **Collaborative Access**: Provide users with access to shared resources or items through tabs that offer deep linkage.

### Tab Demonstrations on Different Platforms

#### Personal Context

**Desktop Preview**

![Personal Tab in Teams Desktop](~/assets/images/tabs/personal-tab-configure.png)

**Mobile Preview**

![Personal Tab in Teams Mobile](~/assets/images/tabs/mobile-design-access-tab.png)

#### Channel Context

**Desktop Preview**

![Channel Tab in Teams Desktop](~/assets/images/tabs/tabs.png)

**Mobile Preview**

![Channel Tab in Teams Mobile](~/assets/images/tabs/mobile-design-static-tab.png)

#### Meeting Context

**Desktop Preview**

![Meeting Tab in Teams Desktop](~/assets/images/tabs/personal-tab-meeting.png)

**Mobile Preview**

![Meeting Tab in Teams Mobile](~/assets/images/tabs/mobile-personal-tab-meeting.png)

## Implementation Guide

1. **Declare Custom Tabs**:
   - Define URL and scope in the app manifest.
   - Add the Teams JavaScript client library to incorporate specialized Teams features.

2. **Use Tools for Tab Development**:
   - Utilize Teams Toolkit in Visual Studio Code or Visual Studio for guided development.

3. **Configure Tabs**:
   - Use the `configurableTabs` array for channel or group tabs by setting a configuration URL for custom content display.

For further details, explore how to [create a content page](~/tabs/how-to/create-tab-pages/content-page.md) or [configure tabs](~/tabs/how-to/create-tab-pages/configuration-page.md).

## Next Steps

- **[Prerequisites](~/tabs/how-to/tab-requirements.md)**
- Understand **[Tab Design Principles](design/tabs.md)**
- Explore **[Mobile Tab Usability](design/tabs-mobile.md#tabs-on-mobile)**
- Extend with **[Graph Permissions](how-to/authentication/tab-sso-graph-api.md)**

## Conclusion

By understanding and utilizing Teams tabs, developers can create more interactive and integrated experiences for users directly within Microsoft Teams.