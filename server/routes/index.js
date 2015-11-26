var express = require('express'),
    router = express.Router(),
    itemRouter = require('./itemRouter'),
    userRouter = require('./userRouter'),
    jwt = require('jsonwebtoken'),
    resetRouter = new (require('./resetRouter'))(),
    multipart = require('connect-multiparty'),
    multipartMiddleware = multipart();


router.get('/reset', resetRouter.resetCollections);

router.post('/login', userRouter.postLogin);

router.post('/registration', userRouter.postRegister);

router.get('/unique', userRouter.uniqueUser);

router.post('/me', userRouter.postMe);

router.get('/item/:id', itemRouter.getById);

router.get('/item', itemRouter.get);

router.use(function(req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.cookies.token || '';
    // decode token
    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, 'secret', function(err, decoded) {      
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });    
            } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
    } else {
    // if there is no token
    // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.' 
        });

    }
});

router.delete('/item/:id', itemRouter.delete);
router.put('/item/:id', itemRouter.put);
router.post('/item/:id/image',multipartMiddleware,  itemRouter.postImage);
router.post('/item', itemRouter.post);

router.get('/current-user', userRouter.currentUser);

router.get('/user-items', itemRouter.userItems);

router.put('/user/:id', userRouter.putById);

router.get('/user', userRouter.findUser);

router.post('/user', userRouter.addUser);

module.exports = router;
