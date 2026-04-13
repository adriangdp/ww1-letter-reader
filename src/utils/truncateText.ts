export default function truncate(text:string) :string{
    const newLineMark = text.indexOf("\n");
    const cuttOffIndex = newLineMark < 250 ? newLineMark : 250;
    return text.slice(0,cuttOffIndex)+" [...]";
}