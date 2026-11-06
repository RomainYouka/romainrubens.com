import F78_62437 from "./native/78-62437";
import F78_62669 from "./native/78-62669";
import F78_62875 from "./native/78-62875";
import F78_63012 from "./native/78-63012";
import F78_63080 from "./native/78-63080";
import F78_63174 from "./native/78-63174";
import F78_63505 from "./native/78-63505";
import F78_63566 from "./native/78-63566";
import extra from "./native-extra.json";
import exports from "./exported-assets.json";
import { LazyNativeFigure } from "@/components/project-native/LazyNativeFigure";

export function nativeFigures(){return {
...Object.fromEntries(Object.entries(extra).filter(([name])=>!(name in exports)).map(([name, src]) => [name, <LazyNativeFigure key={name} src={src} />])),
"colors-system":<F78_62437 />,
"colors-state":<F78_62669 />,
"colors-accent":<F78_62875 />,
"typography":<F78_63012 />,
"icons":<F78_63080 />,
"foundations":<F78_63174 />,
"grids":<F78_63505 />,
"grids-edge":<F78_63566 />,
};}
