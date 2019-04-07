export default function total(val) {
  console.log(val);
  return val.reduce((acc, item) => { return acc + (item.count * item.price) }, 0);
}
