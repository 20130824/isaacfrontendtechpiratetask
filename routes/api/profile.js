const express = require( 'express' );
const aws = require( 'aws-sdk' );
const multerS3 = require( 'multer-s3' );
const multer = require('multer');
const path = require( 'path' );

const router = express.Router();


const s3 = new aws.S3({
	accessKeyId: 'accessKeyIdHere', //
	secretAccessKey: 'secretAccessKeyHere',
	Bucket: 'isaacimagebucket'
});


const profileImgUpload = multer({
	storage: multerS3({
		s3: s3,
		bucket: 'isaacimagebucket',
		acl: 'public-read',
		key: function (req, file, cb) {
			cb(null, path.basename( file.originalname, path.extname( file.originalname ) ) + '-' + Date.now() + path.extname( file.originalname ) )
		}
	}),
	limits:{ fileSize: 1073741824 }, // In bytes: 1073741824 bytes = 1 GB
	fileFilter: function( req, file, cb ){
		checkFileType( file, cb );
	}
}).single('imageToUpload');


function checkFileType( file, cb ){

	const filetypes = /jpeg|jpg|png|gif/;

	const extname = filetypes.test( path.extname( file.originalname ).toLowerCase());

	const mimetype = filetypes.test( file.mimetype );
	if( mimetype && extname ){
		return cb( null, true );
	} else {
		cb( 'Error: Images Only!' );
	}
}


router.post( '/img-upload', ( req, res ) => {
	profileImgUpload( req, res, ( error ) => {
		console.log( 'request', req.file );
		console.log( 'error', error );
		if( error ){
			console.log( ' errors', error );
			res.json( { error: error } );
		} else {

			if( req.file === undefined ){
				console.log( 'Error: No File Selected!' );
				res.json( 'Error: No File Selected' );
			} else {

				const imageName = req.file.key;
				const imageLocation = req.file.location;

				res.json( {
					image: imageName,
					location: imageLocation
				} );
			}
		}
	});
});



module.exports = router;