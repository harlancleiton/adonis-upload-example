'use strict'

const S3FileHook = (exports = module.exports = {})
const S3 = use('App/Services/S3')

S3FileHook.getUrl = async s3File => {
  const s3 = new S3()
  s3File.url = await s3.getSignedUrl(s3File.key)
}
