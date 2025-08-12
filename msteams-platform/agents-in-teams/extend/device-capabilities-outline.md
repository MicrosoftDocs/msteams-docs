---
title: Device capabilities for Teams apps and agents  
description: Learn how to access camera, microphone, location, barcode scanner, and People Picker APIs in Microsoft Teams, Outlook, and Microsoft 365.  
ms.localizationpriority: medium  
ms.topic: conceptual
ms.date: 07/02/2025  
---
# Use native device capabilities  

[Template instruction → 60-word intro: explain why leveraging built-in hardware (camera, mic, GPS) delivers richer scenarios such as expense scanning or on-site inspections.]

## 1. Supported capabilities and host matrix  

| Capability | Teams desktop | Teams mobile | Outlook | Microsoft 365 app | API namespace |  
|------------|--------------|--------------|---------|----------|---------------|  
| Camera / media capture | ✔ | ✔ | Preview | — | `media.*` |  
| Location (geo) | — | ✔ | ✔ | ✔ | `location.* / geoLocation.*` |  
| QR / barcode scanner | — | ✔ | — | — | `barCode.scanBarCode()` |  
| File download & upload | ✔ | ✔ | ✔ | ✔ | `media.download()` |  
| People Picker | ✔ | ✔ | ✔ | ✔ | `people.selectPeople()` |

[Template instruction → Keep table concise (< 8 rows).]

## 2. Permission model  

### Native device permissions  

[Template instruction → 2-sentence summary that desktop prompts once per session, mobile uses OS permission dialogs.]

### Manifest `devicePermissions` block  

```json
"devicePermissions": [ "media", "geolocation", "barCode", "people" ]
```  

[Template instruction → Briefly describe each enum.]

## 3. API deep dive  

### 3.1 Media capture (`media.*`)  

#### Capture image or video  

```ts
import { media } from "@microsoft/teams-js";
const result = await media.selectMedia({ mediaType: media.MediaType.Image });
```  

[Template instruction → ≤ 2 sentences on result object.]

#### File size limits & formats  

[Template instruction → Bullet list.]

### 3.2 Location (`geoLocation` and `location`)  

#### Get current coordinates  

```ts
const pos = await geoLocation.getCurrentPosition();
```  

#### Continuous tracking *(mobile only)*  

[Template instruction → Note battery impact.]

### 3.3 QR / barcode scanner (`barCode.scanBarCode`)  

```ts
const code = await barCode.scanBarCode({ timeOutIntervalInSec: 30 });
```  

[Template instruction → Mention supported formats: QR, Code-128, EAN-13.]

### 3.4 People Picker (`people.selectPeople`)  

```ts
const users = await people.selectPeople({ title: "Assign reviewers", setSelected: true });
```  

[Template instruction → Add note on AAD objectId vs UPN.]

## 4. UX & design tips  

- Provide inline guidance (“Center QR code in the frame”).  
- Handle permission denial with graceful fallbacks.  
- Respect dark theme—use white overlay icons on camera preview.

## 5. Testing device APIs locally  

| Client | Trick |  
|--------|-------|  
| Teams desktop | Use webcam or virtual camera; location APIs return null → mock values in Agents Playground. |  
| Android | Deploy to real device via **Android Debug Bridge**; ensure HTTPS dev-tunnel. |  
| iOS | TestFlight build; enable “Allow cross-website tracking” for cookies if using auth pop-ups. |

## 6. Limitations (July 2025)  

[Template instruction → 2-3 bullets, for example, no barcode scanning on desktop, location API requires HTTPS.]

## Next step  

[Template instruction → Link to how-to page that shows integrating these APIs in a tab or bot.]  
See “Integrate media capabilities” for step-by-step code samples.

## See also  

- [Authentication & single sign-on](../integrate/authentication-and-sso-outline.md)  
- [Teams JavaScript SDK reference](../reference/sdk-and-api-reference-hub-outline.md#platform-sdks)
