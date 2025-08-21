# Deployment

This project is hosted on AWS using the following services:

- Amazon S3
- Amazon CloudFront

## Why these services

### Amazon S3

Amazon S3 (Simple Storage Service) is used to store the static site files (HTML, CSS, JS, images).

### Benefits:

- Durable, highly-available object storage designed for static assets.
- Scales automatically with traffic and storage needs.
- Low cost for static hosting and simple integration with CI/CD or the AWS CLI.
- Supports static website hosting (index/error pages), object versioning and lifecycle rules.

### Amazon CloudFront

CloudFront is AWS's CDN (Content Delivery Network) used in front of the S3 origin.

### Benefits:

- Global edge caching reduces latency and improves page load times for worldwide users.
- Offloads traffic from S3 (lower origin cost) by serving cached content from the edge.
- HTTPS by default, support for custom domains and AWS Certificate Manager (ACM).
- Security features (WAF integration, geo restrictions, origin access controls) and cache invalidation for deployments.

### Why use S3 + CloudFront together + S3 Sync

- S3 provides durable storage for your static site; CloudFront caches that content at edge locations close to users to improve performance and reduce costs.
- CloudFront enables HTTPS and custom domain support for production traffic, and can restrict direct access to S3 using an Origin Access Control so assets are only served via CloudFront (improves security).
- This combination is a standard best-practice for fast, secure, and cost-effective static site hosting on AWS.
- S3 Sync is used to implement a CI/CD between the github repo and the S3 bucket to avoid manual update to s3 bucket.
