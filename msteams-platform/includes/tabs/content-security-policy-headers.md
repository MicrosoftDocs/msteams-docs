> [!WARNING]
> Microsoft's cloud services, including web versions of Teams (*teams.microsoft.com*), Outlook (*outlook.com*), and Microsoft 365 (*microsoft365.com*) domains are migrating to the new *cloud.microsoft* domain by June 1, 2024. The migration affects your app's functionality and requires you to configure your Teams app to ensure uninterrupted end user experience.
>
> To ensure your app doesn't lose critical functionality, perform the following steps before June 1, 2024:
>
> 1. Update TeamsJS SDK to v.2.19.0 or higher. For more information about the latest release of TeamsJS SDK, see [@microsoft/teams-js - npm](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. Update your [`X-Frame-Options`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options) or [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers in your Teams app to allow your app to access the *teams.cloud.microsoft* domain.
>
> 3. If your Teams app extends across Outlook and Microsoft 365, ensure you allow your app to access *teams.cloud.microsoft*, *outlook.cloud.microsoft*, and *m365.cloud.microsoft* domains.
>
> For more information regarding Microsoft's domain consolidation, see .

| **Microsoft 365 app host** | **frame-ancestor permission** |
|--|--|
| Teams | `teams.microsoft.com`, `*.teams.microsoft.com`, `*.skype.com`, `teams.cloud.microsoft` |
| Microsoft 365 app | `*.microsoft365.com`, `*.office.com`, `m365.cloud.microsoft` |
| Outlook | `outlook.live.com`, `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com`, `outlook.cloud.microsoft` |