---
redirect_url: /javascript/api/msteams-client
title: JavaScript client SDK
description: Reference documentation for the JavaScript client SDK for Microsoft Teams
keywords: teams javascript reference
---
# Reference: Microsoft Teams JavaScript client SDK

>**Important:** Use of the Microsoft Teams JavaScript client SDK is subject to the [Terms of Use](https://aka.ms/bf-terms), [Privacy Statement](https://aka.ms/bf-privacy), and [Code of Conduct](https://aka.ms/bf-conduct) for the Microsoft Bot Framework (Preview).

In your tab pages, include the library hosted at `https://statics.teams.microsoft.com/sdk/v1.0/js/MicrosoftTeams.min.js`.

For more information on specific kinds of tab pages, see the following:

* [Configuration](~/concepts/tabs/tabs-configuration)
* [Content](~/concepts/tabs/tabs-content)
* [Removal options](~/concepts/tabs/tabs-update-remove#removing-a-tab)
* [Static tab](~/concepts/tabs/tabs-static)

>**Tip:** For developers using TypeScript, Microsoft Teams provides a definition file at `https://statics.teams.microsoft.com/sdk/v1.0/types/MicrosoftTeams.d.ts`. Use this to enable IntelliSense or similar support from your code editor as well as compile-type type checking as part of your build.
>
>**Note:** The source code for this library is available in the [OfficeDev/microsoft-teams-library-js](https://github.com/OfficeDev/microsoft-teams-library-js) repo on GitHub.

## `microsoftTeams`
This is the root namespace for the JavaScript client SDK.

### `getContext(callback: (context: `[`Context`](#Context)`) => void): void`
Retrieves the current context the frame is running in.

#### Parameters
* `callback: (context: `[`Context`](#Context)`) => void`
    * The callback to invoke when the [Context](#Context) object is retrieved.

### `initialize()`
Initializes the SDK. This must be called before any other SDK calls. The caller should call this only after the frame is loaded successfully.

### `navigateCrossDomain()`
Navigates the frame to a new cross-domain URL. The domain of this URL must match at least one of the valid domains specified in the tab manifest; otherwise, an exception will be thrown. This function needs to be used only when navigating the frame to a URL in a different domain than the current one in a way that keeps the SkypeTeams app informed of the change and allows the SDK to continue working.

#### Parameters
* `url: string`
    * The URL the iframe should be navigated to.

### `registerOnThemeChangeHandler(handler: (theme: string) => void): void`
Registers a handler for when a user changes the theme. Only one handler can be registered at a time. A subsequent registration replaces the previous registration.

#### Parameters
* `handler: (theme: string) => void`
    * The handler to invoke when a user changes the theme.

### `shareDeepLink(deepLinkParameters: `[`DeepLinkParameters`](#DeepLinkParameters)`): void`
_Introduced in v0.4_

Shares a deep link a user can use to navigate back to a specific state in this page.

For consuming a deep link, see [`Context.subEntityId`](#Context).

#### Parameters
* `deepLinkParameters: `[`DeepLinkParameters`](#DeepLinkParameters)

## `microsoftTeams.authentication`

### `authenticate(authenticateParameters: `[`AuthenticateParameters`](#authentication.AuthenticateParameters)`): void`
Initiates an authentication request, which opens a new window with the specified settings.

#### Parameters
* `authenticateParameters: `[`AuthenticateParameters`](#authentication.AuthenticateParameters)
    * A set of values that configure the authentication pop-up window.

### `notifyFailure(reason?: string): void`
Notifies the frame that initiated this authentication request that the request failed. This function is usable only on the authentication window. This call causes the authentication window to be closed.

#### Parameters
* `reason?: string`
    * Specifies a reason for the authentication failure. If specified, the frame that initiated the authentication pop-up window recieves this value in its callback.

### `notifySuccess(result?: string): void`
Notifies the frame that initiated this authentication request that the request was successful. This function is usable only on the authentication window. This call causes the authentication window to be closed.

#### Parameters
* `result: string`
    * Specifies a result for the authentication. The frame that initiated the authentication pop-up window receives this value in its callback.

## `microsoftTeams.settings`
Namespace to interact with the settings view-specific SDK. This object is usable only on the settings frame.

### `getSettings(callback: (settings: `[`Settings`](#settings.Settings)`) => void): void`
Gets the settings for the current instance.

#### Parameters
* `callback: (settings: `[`Settings`](#settings.Settings)`) => void`
    * The callback to invoke when the [Settings](#settings.Settings) object is retrieved.

### `registerOnRemoveHandler(handler: (evt: `[`RemoveEvent`](#settings.RemoveEvent)`) => void): void`
Registers a handler for user attempts to remove content. This handler should be used to remove the underlying resource powering the content. The object passed to the handler must be used to notify whether to proceed with the removal. Only one handler can be registered at a time. A subsequent registration replaces the previous registration.

#### Parameters
* `handler: (evt: `[`RemoveEvent`](#settings.RemoveEvent)`): void`
    * The handler to invoke when a user selects the remove button.

### `registerOnSaveHandler(handler: (evt: `[`SaveEvent`](#settings.SaveEvent)`) => void): void`
Registers a handler for user attempts to save the settings. This handler should be used to create or update the underlying resource powering the content. The object passed to the handler must be used to notify whether to proceed with the save. Only one handler may be registered at a time. Subsequent registrations will override the first.

#### Parameters
* `handler: (evt: `[`SaveEvent`](#settings.SaveEvent)`): void`
    * The handler to invoke when a user selects the Save button.

### `setSettings(settings: `[`Settings`](#settings.Settings)`): void`
Sets the settings for the current instance. Note that this is an asynchronous operation, so there are no guarantees as to when calls to getSettings will reflect the changed state.

#### Parameters
* `settings: `[`Settings`](#settings.Settings)
    * The desired settings for this current instance.

### `setValidityState(validityState: boolean): void`
Sets the validity state for the settings. The inital value is **false**, so a user cannot save the settings until this is called with **true**.

#### Parameters
* `validityState: boolean`
    * A value indicating whether the Save or Remove button is enabled.

## Interfaces

### <a name="Context"></a>`Context`

#### `channelId: string`
_Introduced in v0.4_

The Microsoft Teams ID for the channel with which the content is associated.

#### `entityId: string`
_Introduced in v0.4_

The developer-defined unique ID for the entity this content points to.

#### `groupId?: string`
The O365 group ID for the team with which the content is associated. This field is available only when the **identity** element of the **permissions** property is set in the manifest.

#### `locale: string`
The current locale of the app, formatted as *languageId*-*countryId* (such as en-us).

#### `subEntityId?: string`
_Introduced in v0.4_

The developer-defined unique ID for the subentity this content points to. This field should be used to restore to a specific state within an entity, such as scrolling to or activating a specific piece of content.

For more information about generating a deep link with a subEntityId, see [`shareDeepLink`](#sharedeeplinkdeeplinkparameters-deeplinkparametersdeeplinkparameters-void).

#### `theme?: string`
The current UI theme.

#### `tid?: string`
The current user's Azure AD tenant ID. Because a malicious party can host content in a malicious browser, this value should be used only as a hint about the user and never as proof of identity. This field is available only when the **identity** element of the **permissions** property is set in the manifest.

#### `upn?: string`
The current user's UPN. Because a malicious party can host content in a malicious browser, this value should be used only as a hint about the user and never as proof of identity. This field is available only when the **identity** element of the **permissions** property is set in the manifest.

### <a name="DeepLinkParameters"></a>`DeepLinkParameters`

#### `subEntityId: string`
The developer-defined unique ID for the subentity to which this deep link points within the current entity. This field should be used to restore to a specific state within an entity, such as scrolling to or activating a specific piece of content.

#### `subEntityLabel: string`
The label for the subentity that should be displayed when the deep link is rendered in a client.

#### `subEntityWebUrl: string`
The fallback URL to navigate the user if there is no support for rendering the page inside the client. This URL should lead directly to the subentity.

### <a name="authentication.AuthTokenRequest"></a>`authentication.AuthTokenRequest`

#### `failureCallback?: (reason: string) => void`
A function that is called if the token request fails, with the reason for the failure.

#### `resources: string[]`
An array of resource URIs identifying the target resources for which the token should be requested.

#### `successCallback?: (token: string) => void`
A function that is called if the token request succeeds, with the resulting token.

### <a name="authentication.AuthenticateParameters"></a>`authentication.AuthenticateParameters`

#### `failureCallback?: (reason?: string) => void`
A function that is called if the authentication fails, with the reason for the failure returned from the authentication popup.

#### `height?: number`
The preferred height for the popup. Note that this value may be ignored if outside the acceptable bounds.

#### `successCallback?: (result?: string) => void`
A function that is called if the authentication succeeds, with the result returned from the authentication popup.

#### `url: string`
The URL for the authentication popup.

#### `width?: number`
The preferred width for the popup. Note that this value may be ignored if outside the acceptable bounds.

### <a name="authentication.UserProfile"></a>`authentication.UserProfile`

#### `amr: string[]`
Identifies how the subject of the token was authenticated.

#### `aud: string`
The intended recipient of the token. The application that receives the token must verify that the audience value is correct and reject any tokens intended for a different audience.

#### `exp: number`
Stores the time at which the time the token expires. The service that validates the token should verify that the current date is within the token lifetime; otherwise it should reject the token. The service might allow for up to five minutes beyond the token lifetime range to account for any differences in clock time ("time skew") between Azure AD and the service.

#### `family_name: string`
Provides the last name, surname, or family name of the user as defined in the Azure AD user object.

#### `given_name: string`
Provides the first or "given" name of the user as defined in the Azure AD user object.

#### `iat: number`
Stores the time at which the token was issued. The value is often used to measure token freshness.

#### `iss: string`
Identifies the security token service (STS) that constructs and returns the token. In the tokens that Azure AD returns, the issuer is sts.windows.net. The GUID in the Issuer claim value is the tenant ID of the Azure AD directory. The tenant ID is an immutable and reliable identifier of the directory.

#### `nbf: number`
Stores the time at which the token starts being valid.

#### `oid: string`
Contains a unique identifier of an object in Azure AD. This value is immutable and cannot be reassigned or reused. Use the object ID to identify an object in queries to Azure AD.

#### `sub: string`
Identifies the principal about which the token asserts information, such as the user of an application. This value is immutable and cannot be reassigned or reused, so it can be used to perform authorization checks safely. Because the subject is always present in the tokens the Azure AD issues, we recommended using this value in a general-purpose authorization system.

#### `tid: string`
An immutable, non-reusable identifier that identifies the directory tenant that issued the token. You can use this value to access tenant-specific directory resources in a multitenant application. For example, you can use this value to identify the tenant in a call to the Graph API.

#### `unique_name: string`
Provides a human-readable value that identifies the subject of the token. This value is not guaranteed to be unique within a tenant and is designed to be used only for display purposes.

#### `upn: string`
Stores the user name of the user principal.

#### `ver: string`
Stores the version number of the token.

### <a name="authentication.UserRequest"></a>`authentication.UserRequest`

#### `failureCallback?: (reason: string) => void`
A function that is called if the token request fails, with the reason for the failure.

#### `successCallback?: (user: `[`UserProfile`](#authentication.UserProfile)`) => void`
A function that is called if the token request succeeds, with the resulting token.

### <a name="settings.RemoveEvent"></a>`settings.RemoveEvent`

#### `notifyFailure(reason?: string): void`
Indicates that the underlying resource removal failed and that the content may not be removed.

##### Parameters
* `reason?: string`
    * Specifies a reason for the failure. If provided, this string is displayed to the user. Otherwise a generic error is displayed.

#### `notifySuccess(): void`
Indicates that the underlying resource has been removed and the content may be removed.

### <a name="settings.SaveEvent"></a>`settings.SaveEvent`

#### `notifyFailure(reason?: string): void`
Indicates that the underlying resource creation failed and that the settings may not be saved.

##### Parameters
* `reason?: string`
    * Specifies a reason for the failure. If provided, this string is displayed to the user. Otherwise a generic error is displayed.

#### `notifySuccess(): void`
Indicates that the underlying resource has been created and the settings may be saved.

### <a name="settings.Settings"></a>`settings.Settings`

#### `contentUrl: string`
Sets the URL to use for the content of this instance.

#### `entityId: string`
_Introduced in v0.4_

The developer-defined unique ID for the entity this content points to.

#### `customSettings?: string`
The custom settings for this content instance. The developer can use this for generic storage specific to this instance, such as a JSON blob describing the previously selected options used to pre-populate the UI. The string must be less than 1 KB.

#### `removeUrl?: string`
Sets the URL for the remove-configuration experience.

#### `suggestedDisplayName?: string`
A suggested display name for the new content. In the settings for an existing instance being updated,this call has no effect.

#### `websiteUrl?: string`
Sets the URL to use for the external link to view the underlying resource in a browser.
