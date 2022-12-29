## Establish a secure tunnel to your tab

Microsoft Teams is a cloud-based product and requires that your tab content available from the cloud using HTTPS endpoints. Teams doesn't allow local hosting. You must either publish your tab to a public URL, or use a proxy that exposes your local port to an internet-facing URL.

To test your tab, use [ngrok](https://ngrok.com/docs). Your server's web endpoints are available while ngrok is running on your computer. In the free version of ngrok, if you close ngrok, the URLs are different the next time you start it.