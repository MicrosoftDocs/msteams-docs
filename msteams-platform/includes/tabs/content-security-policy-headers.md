| **Microsoft 365 app host** | **frame-ancestor permission** |
| --- | --- |
| All hosts (New) | `*.cloud.microsoft` |
| Teams | `teams.microsoft.com`, `*.teams.microsoft.com` |
| Microsoft 365 app | `*.microsoft365.com`, `*.office.com`,  |
| Outlook | `outlook.office.com`, `outlook.office365.com`, `outlook-sdf.office.com`, `outlook-sdf.office365.com` |
| Copilot | `copilot.microsoft.com` |

> [!WARNING]
> Microsoft's cloud services, including web versions of Teams, Outlook, and Microsoft 365 domains are migrating to the *cloud.microsoft* domain. Perform the following steps before September 2024 to ensure your app continues to render on supported Microsoft 365 web client hosts:
>
> 1. Update TeamsJS library to v.2.19.0 or later. For more information about the latest release of TeamsJS, see [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. Update your Teams app's [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) header [*frame-ancestors*](https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) directive to allow your app to be hosted by the ****.cloud.microsoft*** domain. To maintain backward compatibility during the migration, retain the existing `frame-ancestors` values in your CSP headers while also adding the **_*.cloud.microsoft_** domains. This ensures that your app continues to work across existing and future Microsoft 365 host applications and minimizes the need for subsequent changes.
>
> Use the following list of `frame-ancestors` in your app's CSP headers:
>
> ```http
> https://*.cloud.microsoft https://teams.microsoft.com https://*.teams.microsoft.com https://*.microsoft365.com https://*.office.com
> ```
