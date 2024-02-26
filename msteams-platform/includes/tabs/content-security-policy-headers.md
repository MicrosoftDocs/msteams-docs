> [!WARNING]
> Microsoft's cloud services, including web versions of Teams (*teams.microsoft.com*), Outlook (*outlook.com*), and Microsoft 365 (*microsoft365.com*) domains are migrating to the *cloud.microsoft* domain. Perform the following steps before June 2024 to ensure your app continues to render on the Teams web client:
>
> 1. Update TeamsJS SDK to v.2.19.0 or later. For more information about the latest release of TeamsJS SDK, see [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. Update your [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) headers in your Teams app to allow your app to access the **_*.cloud.microsoft_** domain.
>
> Retain the domains that your app's CSP headers refer to. The **_*.cloud.microsoft_** domain is additive and isn't going to replace the existing domains.

| **Microsoft 365 app host** | **frame-ancestor permission**                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Teams                      | `teams.microsoft.com`, `*.teams.microsoft.com`, `*.cloud.microsoft`                                                                           |
| Microsoft 365 app          | `*.microsoft365.com`, `*.office.com`, `*.cloud.microsoft`                                                                                     |
| Outlook                    | `outlook.live.com`, `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com`, `*.cloud.microsoft` |
| Copilot                    | `copilot.microsoft.com`, `*.cloud.microsoft`                                                                                                  |
