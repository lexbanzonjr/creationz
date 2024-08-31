import { allNav } from "./allNav";

export interface Nav {
  id: number;
  title: string;
  icon: JSX.Element;
  role: string;
  path: string;
}

export const getNav = (role: String) => {
  const finalNavs: Nav[] = [];
  for (let i = 0; i < allNav.length; ++i) {
    if (role === allNav[i].role) finalNavs.push(allNav[i]);
  }
  return finalNavs;
};
