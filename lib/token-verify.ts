import jwt, { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JSONWEBTOKEN_SECRET!

interface Payload {
    id: number;
    email: string;
    org_id?: number | null;
    username?: string;
    phone?: string;
    picture?: string;
    type: 'person' | 'organization';
}

export function verifyToken(token: string): Payload | string | null {
    try {
        return jwt.verify(token, SECRET_KEY) as Payload;
    } catch (err) {
        return null;
    }
}