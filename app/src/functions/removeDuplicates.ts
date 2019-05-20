// passed an array of objects, take unique by property

export default function removeDuplicates(myArr, prop) {
  return myArr
    .filter(
      (obj, pos, arr) =>
        arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos
    )
    .sort((a, b) => a.value.localeCompare(b.value));
}
