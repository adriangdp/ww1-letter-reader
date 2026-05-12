export default function truncate(text:string) :string{
    const newLineMark = text.indexOf("\n");
    if(newLineMark === -1 && text.length < 250){
        return text;
    }
    const cuttOffIndex = newLineMark > 0 && newLineMark < 250 ? newLineMark : 250;
    return text.slice(0,cuttOffIndex)+" [...]";
}