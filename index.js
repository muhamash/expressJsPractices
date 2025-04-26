const express = require( 'express' );
const multer = require( 'multer' );
const port = process.env.PORT || 5000;

const upFolder = "./uploads/";

var uploads = multer( {
    dest: upFolder,
} );

const app = express();

app.post( '/', uploads.array('avatar', 3), ( req, res ) =>
{
    res.status( 200 ).send( "Hello World" );
} );

app.listen( port, () =>
{
    console.log( `Server running on port ${port} 🔥` );
});