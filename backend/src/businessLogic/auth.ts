import { decode } from "jsonwebtoken";
import { Jwt } from "../auth/Jwt";
import { JwtPayload } from "../auth/JwtPayload";

export async function verifyToken(authHeader: string): Promise<JwtPayload> {
    const token = getToken(authHeader)
    const decodedToken: Jwt = decode(token, { complete: true }) as Jwt

    return decodedToken.payload;
}

function getToken(authHeader: string): string {
    if (!authHeader) throw new Error('No authentication header')

    if (!authHeader.toLowerCase().startsWith('bearer '))
        throw new Error('Invalid authentication header')

    const split = authHeader.split(' ')
    const token = split[1]

    return token
}