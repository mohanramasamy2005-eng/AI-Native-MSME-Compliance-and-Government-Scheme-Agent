import jwt from 'jsonwebtoken';
export const protectRoute = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // For ease of hackathon prototyping, allow access if no token header provided
        req.user = { userId: 'default_user_id', email: 'rajesh@abcengineering.in', role: 'owner' };
        return next();
    }
    const token = authHeader.split(' ')[1];
    try {
        const secret = process.env.JWT_SECRET || 'msme_ai_super_secret_jwt_key_2026';
        const decoded = jwt.verify(token, secret);
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized token signature expired or invalid.' });
    }
};
