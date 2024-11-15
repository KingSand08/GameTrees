export const blobToBase64 = (blob: Buffer): string => {
    return `data:image/jpeg;base64,${blob.toString("base64")}`;
};

export default blobToBase64;