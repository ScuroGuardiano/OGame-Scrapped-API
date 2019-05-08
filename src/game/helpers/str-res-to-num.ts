export default function stringResourceToNumber(res: string) {
    return parseInt(res.replace('.', ''));
}
