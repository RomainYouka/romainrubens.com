import F78_62437 from "./native/78-62437";
import F78_62669 from "./native/78-62669";
import F78_62875 from "./native/78-62875";
import F78_63012 from "./native/78-63012";
import F78_63080 from "./native/78-63080";
import F78_63174 from "./native/78-63174";
import F78_63505 from "./native/78-63505";
import F78_15337 from "./native/78-15337";
import F78_16678 from "./native/78-16678";
import F78_17754 from "./native/78-17754";
import F79_71547 from "./native/79-71547";
import F78_19712 from "./native/78-19712";
import F78_19895 from "./native/78-19895";
import F78_19943 from "./native/78-19943";
import F78_19984 from "./native/78-19984";
import F78_20100 from "./native/78-20100";
import F78_63566 from "./native/78-63566";
import extra from "./native-extra.json";
import { LazyNativeFigure } from "@/components/project-native/LazyNativeFigure";

export function nativeFigures(){return {
...Object.fromEntries(Object.entries(extra).map(([name, src]) => [name, <LazyNativeFigure key={name} src={src} />])),
"colors-system":<F78_62437 />,
"colors-state":<F78_62669 />,
"colors-accent":<F78_62875 />,
"typography":<F78_63012 />,
"icons":<F78_63080 />,
"foundations":<F78_63174 />,
"grids":<F78_63505 />,
"component-icons":<F78_15337 />,
"button-left-4":<F78_16678 />,
"button-right-1":<F78_17754 />,
"header-2":<F79_71547 />,
"actions-1":<F78_19712 />,
"actions-2":<F78_19895 />,
"language-1":<F78_19943 />,
"language-2":<F78_19984 />,
"number":<F78_20100 />,
"grids-edge":<F78_63566 />,
};}
