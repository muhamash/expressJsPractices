const express = require( 'express' );
const multer = require( 'multer' );
const port = process.env.PORT || 5000;

const upFolder = "./uploads/";

var uploads = multer( {
    dest: upFolder,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    },
    fileFilter: ( req, file, cb ) =>
    {
        const filetypes = /jpeg|jpg|png|gif/;
        const mimetype = filetypes.test( file.mimetype );
        const extname = filetypes.test( path.extname( file.originalname ).toLowerCase() );

        if ( mimetype && extname )
        {
            return cb( null, true );
        }
        else
        {
            cb( "Error: File upload only supports the following filetypes - " + filetypes );
        }
    }
} );

const app = express();


// uploads.none() -> to upload forms without files
app.post( '/', uploads.fields( [ {
    name: 'avatar', maxCount: 1
}, {
    name: 'photos', maxCount: 10
} ] ), ( req, res ) =>
{
    res.status( 200 ).send( "Hello World" );
} );

app.listen( port, () =>
{
    console.log( `Server running on port ${port} 🔥` );
});