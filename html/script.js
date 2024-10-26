async function hashString(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

async function verifyHash(input, existingHash) {
    const inputHash = await hashString(input);
    return inputHash === existingHash;
}

// Contoh penggunaan:
const originalString = "Lapak Yudhas";
hashString(originalString).then(hash => console.log(hash));

const existingHash = "cce7b1465978e1519c968e580760272a280d114edd8091871a866d0032d28a04"; // Ganti dengan hash yang ingin Anda verifikasi

verifyHash(originalString, existingHash).then(isMatch => {
    if (isMatch) {
        console.log("Hash cocok! Input terverifikasi.");
    } else {
        console.log("Hash tidak cocok! Input tidak valid.");
    }
});
