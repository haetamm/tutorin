import { KJUR } from "jsrsasign";

const secretKey = 'rahasiailahi'
export const generateToken = (id, role) => {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = { id: id, role: role, exp: KJUR.jws.IntDate.get('now + 1hour') };
    const sHeader = JSON.stringify(header);
    const sPayload = JSON.stringify(payload);
    const token = KJUR.jws.JWS.sign("HS256", sHeader, sPayload, { utf8: secretKey });
    return token
}