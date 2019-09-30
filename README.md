# File Uploads on AWS Bucket

## Description 
> Frontend for the Tech Pirate @ Resonance task for Isaac Pérez. In this project, I created an app using Reac JS and Node JS, in which you can select and image file of up to 1 GB in size, then that image is uploaded and stored in AWS S3. After the image is stored, it returns an URL for the image in S3 to my app, which calls and AWS lambda function triggered by an AWS API Gateway POST request, which with the given URL generates a 150x150 thumbnail of the image, stores it in a Thumbnail folder in S3 and returns an URL for the thumbnail which is displayed in my app. The code for the app is on this github repository, and the deployment package for AWS lambda can be found following this link: https://drive.google.com/file/d/1c8pBXb8YNPbNEi0YrBQiFOHUY-sGpvnf/view?usp=sharing 

## How to run this project

1. Clone this project
2. Go to Routes/API/profile.js and replace the accessKeyId and secretAccessKey values for the ones given in the email I sent (they are not included for security reasons).
3. `cd frontendtechpiratetaskisaac`
4. `npm install`
5. `cd client`
6. `npm install`
7. `cd ..`
8. `npm run dev`

## Reflection

> I really enjoyed doing this task. It gave me the opportunity to learn and do different things from what I do in a daily basis, which I really appreciate. When I applied for this job I was seeking an opportunity that would challenge me and allow me to grow as a developer. I am so grateful for being given the chance to apply because during this week I was given just that. The challenge to learn, grow, and sharpen my skills.

This role would be a great fit for me judging solely from this task because I have learned that I can rise up to any challenge given to me by this company and I am now certain that I will find a way to execute it. Thank you so much for the opportunity.
