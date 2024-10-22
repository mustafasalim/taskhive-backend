/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication related endpoints
 *
 * /api/auth/signup:
 *   post:
 *     tags:
 *       - auth
 *     summary: Signup user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 description: Full name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 format: password
 *                 example: Passw0rd
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User created successfully
 *
 *
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 *
 *
 */

/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication related endpoints
 *
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login user
 *     description: Authenticate a user and return user data with token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email address
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 format: password
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Logged in successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 670a5aaf6e369599cded0f07
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     name:
 *                       type: string
 *                       example: johndoe
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     lastLogin:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-12T11:56:29.998Z
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-12T11:17:03.369Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-12T11:56:30.003Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                   example: eyJhbGciOiJIUzI1NiIsInR32123435cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzBhNWFhZjZlMzY5NTk5Y2RlZDBmMDciLCJpYXQiOjE3Mjg3MzQxOTAsImV4cCI6MTcyOTMzODk5MH0.sEJtw-upSB93mJC10c2hiILt--slRGbUMgAwAe3kiVg
 *       400:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 */
/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication related endpoints
 *
 * /api/auth/verify-email:
 *   post:
 *     tags:
 *       - auth
 *     summary: Verify user email
 *     description: Verifies a user's email address and returns the user data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               verificationCode:
 *                 type: string
 *                 description: Verification token sent to the user's email
 *                 example: 234156
 *     responses:
 *       200:
 *         description: Email successfully verified
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email verified successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 670a5aaf6e369599cded0f07
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     isVerified:
 *                       type: boolean
 *                       example: true
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-12T11:17:03.369Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2024-10-12T11:56:30.003Z
 *                     __v:
 *                       type: integer
 *                       example: 0
 *       400:
 *         description: Invalid or expired verification token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid or expired verification token
 */
/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication related endpoints
 *
 * /api/auth/forgot-password:
 *   post:
 *     tags:
 *       - auth
 *     summary: Forgot password
 *     description: Send a password reset email to the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email address for password reset
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password reset email sent
 *       400:
 *         description: Invalid email or email not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or email not found
 */
/**
/**
 * @swagger
 * tags:
 *   - name: auth
 *     description: Authentication related endpoints
 * 
 * /api/auth/reset-password/{token}:
 *   post:
 *     tags:
 *       - auth
 *     summary: Reset user password
 *     description: Reset the user's password using a valid reset token
 *     parameters:
 *       - name: token
 *         in: path
 *         required: true
 *         description: Password reset token
 *         schema:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *               - confirmPassword
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password for the user
 *                 format: password
 *                 example: NewPassw0rd!
 *               confirmPassword:
 *                 type: string
 *                 description: Confirmation of the new password
 *                 format: password
 *                 example: NewPassw0rd!
 *     responses:
 *       200:
 *         description: Password reset successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Password reset successful
 *       400:
 *         description: Invalid or expired token, mismatched passwords, or other error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Invalid or expired token
 */
