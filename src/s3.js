const {execSync} = require('child_process');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const s3 = new AWS.S3({region: 'us-east-2'});

/**
 * Uploads converted PDF file to S3 bucket
 * and removes it from /tmp afterwards
 * @param filename {String} Name of pdf file
 * @param fileBuffer {Buffer} Converted PDF Buffer
 * @return {Promise.<String>} URL of uploaded pdf on S3
 */
function uploadPDF(filename, fileBuffer) {
  console.log(`[bucket:${process.env.S3_BUCKET_NAME}]`);
  console.log(`[key:${filename}]`);
  const options = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: filename,
    Body: fileBuffer,
    ACL: 'public-read',
    ContentType: 'application/pdf'
  };

  return s3.upload(options)
    .promise()
    .then(({Location}) => Location)
    .then(Location => {
      execSync(`rm /tmp/${filename}`);
      console.log(`[removed]`);

      return Location;
    });
}

module.exports = {
  uploadPDF
};
