---
title: App detail page checklist 
description: Describes what app detail page must have 
keywords: teams publish store office publishing policy AppSource content
---

# App detail page checklist 
Make sure your app descriptions and screenshots follows:
* [AppSource guidance](/office/dev/store/create-effective-office-store-listings) to create an effective detail page
* [Manifest requirement](#manifest-requirement)
* [Screenshots requirement](#screenshots-requirement)

>[!IMPORTANT]
> Make sure you copy over the description you write in AppScource onto the manifest. Teams will only use the description you provided in the manifest.

### Manifest requirement

* Don't use "Teams", "Microsoft", or "app" in your app name.
* The developerName in the App Manifest must be same as the Provider Name defined in Seller Dashboard.
* Make sure the app description, screenshots, text, and promotional images describe only the app and do not contain any additional advertising, promotions or copyrighted brand names.
* If your product requires an account on your service or another service, list that in the description and ensure there are links to sign up, sign in and sign out.
* If your product requires additional purchases to function properly, list that in the description.
* Provide the requisite Terms and Privacy policy links in the manifest and the Seller Dashboard. Verify that the links properly resolve to the correct documentation, ideally Teams specific. For bots, you must provide this same information in the Submission section of the Bot Framework registration page.
* Ensure that metadata in the manifest roughly matches metadata in the Seller Dashboard (and, for bots, in the Bot Framework registration). Note that your Seller Dashboard entry should contain a more detailed and formatted description for use in the AppSource product page.


## Screenshots requirement

The screenshots uploaded on the Seller Dashboard are displayed in both [Microsoft AppSource](https://appsource.microsoft.com/marketplace/apps?product=office%3Bteams&page=1) and your app listing in the Teams client to provide a visual preview of your app along with your app description.

You can provide 1 to 5 screenshots. They can be .png, .jpg, or .gif files, and should be 1366x768 pixels, with a max size of 1024 KB.

Screenshots submitted on the seller dashboard should:

* Focus on highlighting all of your app's capabilities
* Not show any chrome/UI from outside of your app; do not capture any Teams or browser UI in your screenshots.
* Content should be representative of the app; do not include mock-ups that do not accurately reflect your apps actual UI such as showing your website instead of your Teams tab
* Text should be well-populated without being excessive

You can surround your screenshots with a background color and add marketing content similar to the [Freshdesk](https://appsource.microsoft.com/product/office/WA104381505?src=office&tab=Overview) example. In that case the dimensions are not of the screenshot, they are of the overall image.

<img width="800px" title="Freshdesk screenshot" src="~/assets/images/freshdesk.png" />
See more on the subject here:

* [Crafting effective AppSource store images](/office/dev/store/craft-effective-appsource-store-images)
