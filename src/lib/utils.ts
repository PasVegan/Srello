import {randomBytes} from "node:crypto";


export const serializeNonPOJOs = (obj: any): any => {
    return structuredClone(obj);
}

export const generateUsername = (name: string): string => {
    const id = randomBytes(2).toString('hex')
    return `${name.slice(0, 5)}${id}`
}