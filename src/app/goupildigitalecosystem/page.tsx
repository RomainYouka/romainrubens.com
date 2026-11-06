import CaseStudy from "./case-study";
import { nativeFigures } from "./native-figures";

export default function Page() { return <CaseStudy nativeFigures={nativeFigures()} />; }
