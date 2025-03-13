> [!WARNING]
> Microsoft's cloud services, including web versions of Teams, Outlook, and Microsoft 365 domains, are migrating to the `*.cloud.microsoft` domain. Perform the following steps as soon as possible to ensure your app continues to render on supported Microsoft 365 web client hosts:
>
> 1. Update TeamsJS library to v.2.19.0 or later. You must call `microsoftTeams.app.initialize()` to avoid seeing a warning in the new domain. For more information about the latest release of TeamsJS, see [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js).
>
> 2. If you've defined [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (CSP) headers for your app, update the [frame-ancestors](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors) directive to include the `*.cloud.microsoft` domain. To ensure backward compatibility during the migration, retain the existing `frame-ancestors` values in your CSP headers. This approach ensures that your app continues to work across both existing and future Microsoft 365 host applications and minimizes the need for subsequent changes.
>
> Update the following domain in the `frame-ancestors` directive of your app's CSP headers:
>
> ```http
> https://*.cloud.microsoft
> ```
