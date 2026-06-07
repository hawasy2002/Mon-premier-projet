const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15,
  handler: (req, res) => {
    req.session.error = 'Trop de tentatives. Réessayez plus tard.';
    res.redirect('/login');
  }
});

router.get('/google', authController.redirectToGoogle);
router.get('/google/callback', authController.handleGoogleCallback);
router.get('/logout', authController.logout);
router.post('/classic/register',
  [
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({ min: 8 }).matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/),
    body('nom').notEmpty().trim().escape(),
    body('prenom').notEmpty().trim().escape()
  ],
  authController.classicRegister
  );
router.post('/classic/login', loginLimiter, authController.classicLogin);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
