export const decodeText = async base64 => {
    const bytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
    const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
    return new Response(stream).text();
};
