export default async function createSpan() {
  const res = await fetch('https://comfortable-sandals-bee.cyclic.app/api/v1/quotes');
  const data = await res.json();
  const text = data.res;
  const array = text.split('');
  return array;
}

