export const isDictionary = (variable) => {
        return typeof variable === 'object' && !Array.isArray(variable) && variable !== null;
};

export function FilterDictionary(messyDict) {
        let purified = []
        for (let i in messyDict) {
                if(isDictionary(messyDict[i])){
                        messyDict[i] = messyDict[i].id
                }
                if (messyDict[i] != null) {
                        purified.push([i, messyDict[i]])
                }
        }
        return purified;

}
