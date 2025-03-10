export function Capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function FromNumberToId(id: number) {
    if (id < 10) return `00${id}`;
    if (id < 100) return `0${id}`;
    return `${id}`;
}

export function FromUrlToId(url: string) {
    const id = url.split('/')[6];

    if (id.length === 1) return `00${id}`;
    if (id.length === 2) return `0${id}`;
    return id;
}