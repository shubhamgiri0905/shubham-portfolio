import {
  SiPython,
  SiTypescript,
  SiJavascript,
  SiJupyter,
  SiCplusplus,
  SiC,
  SiHtml5,
  SiCss3,
  SiGo,
  SiRust,
} from "react-icons/si";
import type { IconType } from "react-icons";


export interface LangMeta {
  color: string;
icon: IconType | null;
}

export const LANGUAGE_META: Record<string, LangMeta> = {
  TypeScript: {
    color: "#3178C6",
    icon: SiTypescript,
  },
  JavaScript: {
    color: "#F7DF1E",
    icon: SiJavascript,
  },
  Python: {
    color: "#3776AB",
    icon: SiPython,
  },
  "Jupyter Notebook": {
    color: "#F37626",
    icon: SiJupyter,
  },
  "C++": {
    color: "#00599C",
    icon: SiCplusplus,
  },
  C: {
    color: "#00599C",
    icon: SiC,
  },
  HTML: {
    color: "#E34F26",
    icon: SiHtml5,
  },
  CSS: {
    color: "#264DE4",
    icon: SiCss3,
  },
  Go: {
    color: "#00ADD8",
    icon: SiGo,
  },
  Rust: {
    color: "#DEA584",
    icon: SiRust,
  },

  default: {
    color: "#94A3B8",
    icon: null,
  },
};
