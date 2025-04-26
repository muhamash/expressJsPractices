const express = require('express');
const multer = require( 'multer' );
const path = require("path");
const port = process.env.PORT || 5000;

const upFolder = "./uploads/";

const storage = multer.diskStorage( {
    destination: function ( req, file, cb )
    {
        cb( null, upFolder );
    },
    // filename: function ( req, file, cb )
    // {
    //     const uniqueSuffix = Date.now() + '-' + Math.round( Math.random() * 1E9 );
    //     cb( null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split( '/' )[ 1 ] );
    // }
    filename: ( req, file, cb ) =>
    {
        const fileExt = path.extname( file.originalname );
        const fileName =
            file.originalname
                .replace( fileExt, "" )
                .toLowerCase()
                .split( " " )
                .join( "-" ) +
            "-" +
            Date.now();

        cb( null, fileName + fileExt );
    },
} );

const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5 // 5 MB
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar' || file.fieldname === 'photos') {
            const filetypes = /jpeg|jpg|png|gif/;
            const mimetype = filetypes.test(file.mimetype);

            if (mimetype) {
                cb(null, true);
            } else {
                cb(new Error('Only image files (jpeg, jpg, png, gif) are allowed for avatar/photos'));
            }
        } else if (file.fieldname === 'pdf') {
            const filetypes = /pdf/;
            const mimetype = filetypes.test(file.mimetype);

            if (mimetype) {
                cb(null, true);
            } else {
                cb(new Error('Only PDF files are allowed for pdf field'));
            }
        } else {
            cb(new Error('Unknown field name'));
        }
    }
});

const app = express();

app.post('/', uploads.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'photos', maxCount: 10 },
    { name: 'pdf', maxCount: 5 }
] ), ( req, res ) =>
{
    console.log( req.files );
    res.status(200).send("Files uploaded successfully 🚀");
});

// Error handling middleware
app.use((error, req, res, next) => {
    if (error) {
        if (error instanceof multer.MulterError) {
            return res.status(500).json({ error: error.message });
        } else {
            return res.status(500).json({ error: error.message || error });
        }
    }
    next();
});

app.listen(port, () => {
    console.log(`Server running on port ${port} 🔥`);
});
