> [!WARNING]
> Microsoft's cloud services, including web versions of Teams (*teams.microsoft.com*), Outlook (*outlook.com*), and Microsoft 365 (*microsoft365.com*) domains are migrating to the *cloud.microsoft* domain. Perform the following steps before June 2024 to ensure your app continues to render on the Teams web client:
>
> 1. Update TeamsJS SDK to v.2.19.0 or higher. For more information about the latest release of TeamsJS SDK, see [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. Update your [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers in your Teams app to allow your app to access the ****.cloud.microsoft*** domain. This ensures your app continues to work across existing and future Microsoft 365 host applications and minimizes the need for subsequent changes.

| **Microsoft 365 app host** | **frame-ancestor permission** |
|--|--|
| Teams | `teams.microsoft.com`, `*.teams.microsoft.com`, `*.cloud.microsoft` |
| Microsoft 365 app | `*.microsoft365.com`, `*.office.com`, `*.cloud.microsoft` |
| Outlook | `outlook.live.com`, `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com`, `*.cloud.microsoft` |
