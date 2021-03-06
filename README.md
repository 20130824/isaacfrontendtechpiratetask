## Description 
In this project, I created an app using Reac JS and Node JS, in which you can select and image file of up to 1 GB in size, then that image is uploaded and stored in AWS S3. After the image is stored, it returns an URL for the image in S3 to my app, which calls an AWS lambda function triggered by an AWS API Gateway POST request, which with the given URL generates a 150x150 thumbnail of the image, stores it in a Thumbnail folder in S3 and returns an URL for the thumbnail which is displayed in my app. The code for the app is on this github repository, and the deployment package for AWS lambda can be found following this link: https://drive.google.com/file/d/1c8pBXb8YNPbNEi0YrBQiFOHUY-sGpvnf/view?usp=sharing 

As a reference for this app I used the following boilerplate: https://github.com/imranhsayed/react-node-boilerplate.

## How to run this project

1. Clone this project
2. Go to Routes/API/profile.js and replace the accessKeyId and secretAccessKey values for the ones given in the email I sent (they are not included for security reasons).
3. `cd frontendtechpiratetaskisaac`
4. `npm install`
5. `cd client`
6. `npm install`
7. `cd ..`
8. `npm run dev`

## Corrections

One previous limitation is the Pillow library used in Python to generate the thumbnail. By default the library only accepts images of up to 178956970 pixels, so it wasn't working with large resolution images. This limitation was solved by removing the PIL pixel size limit. Also the performance of the app was vastly improved by increasing the lambda memory size from 128 mb to 3008 MB. This noticeably reduces the execution time. The updated Deployment pack can be found here: https://isaacimagebucket.s3.us-east-2.amazonaws.com/lambda+deployment+pack.zip

## Limitations

A current limitatio is that at the moment, the application only works with one image at a time, and it's limited to some file types, however this can be improved in future revisions. 



## Reflection

I really enjoyed doing this task. It gave me the opportunity to learn and do different things from what I do in a daily basis, which I really appreciate. When I applied for this job I was seeking an opportunity that would challenge me and allow me to grow as a developer. I am so grateful for being given the chance to apply because during this week I was given just that. The challenge to learn, grow, and sharpen my skills.

This role would be a great fit for me judging solely from this task because I have learned that I can rise up to any challenge given to me by this company and I am now certain that I will find a way to execute it. Thank you so much for the opportunity.
