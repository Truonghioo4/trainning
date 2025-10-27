export function generateAutoIncreaseId(data){
    const set = new Set()
    data.forEach(item => {
        set.add(item.id)
    })
    let newId=1;
    while (set.has(newId)){ newId++ }
    return newId
}