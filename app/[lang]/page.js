import { getDictionary } from "./dictionaries/dictionaries";

export default async function Home({ params : { lang }}) {
  const dic = await getDictionary(lang);
  return (
    <div>{dic.views}</div>
  );
}
