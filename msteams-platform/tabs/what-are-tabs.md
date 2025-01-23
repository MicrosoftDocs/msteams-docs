## Microsoft Teams Tabs Overview

Tabs in Microsoft Teams are webpages embedded directly into the client and can be integrated with Outlook and Microsoft 365 as well. They appear as simple HTML `<iframe/>` elements pointing to domains specified in the app manifest and can be associated with channels inside teams, in group chats, or as personal apps for users.

### Types of Tabs

There are two primary types of tabs:

1. **Static Tabs**: Typically used for personal apps or for apps requiring less configuration. They are persistent and allow easy access to content.
2. **Configurable Tabs**: Allow users to set up specific content required for their teams or group chats. They are highly flexible and can be tailored to user needs.

### Tab Scopes

Tabs can be utilized in different scopes:

- **Personal**: For individual users, pinned for quick access.
- **Group Chat**: Works similar to personal tabs but is accessible to members of group chats.
- **Teams**: Integrated directly into channel conversations.

### Real-World Scenarios and Use Cases

- **Scenario 1**: Embed an existing corporate webpage, such as a company dashboard or resource center, into Teams for quick access.
- **Scenario 2**: Add help or support documentation as a tab accompanying a Teams bot or messaging extension.
- **Scenario 3**: Utilize group scope to track project-specific tasks or resources that enhance team collaboration.

### Benefits of Using Static Tabs

1. **Instant Access**: Users can easily pin and unpin static tabs, which load instantly without configuration dialogs.
2. **Unified Functionality**: A single static tab can be created to operate in multiple teams and personal scopes, offering consistent user experience.

### Integration Steps

1. **Declare in App Manifest**: Configure your app manifest to define custom tabs specifying URL and scope, utilizing the Teams JavaScript client library.
   
2. **Configuration Pages for Group Tabs**:
   - Use additional configuration pages to allow users to set context-specific content in Teams.
   - Handle multiple team installations and user settings efficiently.

3. **Testing**:
   - Ensure tabs' functionality is tested on both Android and iOS Teams clients.
   - Use locale and theme information to ensure the correct display within Teams.

### Tools for Building Tabs

- **Teams Toolkit for Visual Studio Code**: Facilitates streamlined app creation and debugging.
- **Teams Toolkit for Visual Studio**: Offers integrated development capabilities for Teams applications.

### Next Steps

For detailed prerequisites and setup instructions, [jump to prerequisites](~/tabs/how-to/tab-requirements.md).

### Additional Resources

- Learn more about designing tabs for Microsoft Teams and understand the mobile design implications.
- Explore how to extend your tab application with Microsoft Graph for a richer user experience.
- Stay updated with Microsoft Teams updates for continuous app improvement.

For more comprehensive guidance on various aspects like authentication and permissions, refer to the appropriate documentation sections highlighted in this guide.