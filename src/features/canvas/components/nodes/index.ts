import ChartNode from "./ChartNode";
import DocNode from "./DocNode";
import ImageNode from "./ImageNode";
import RecsNode from "./RecsNode";
import WebNode from "./WebNode";

export const nodeTypes = {
  WEB: WebNode,
  CHART: ChartNode,
  IMAGE: ImageNode,
  DOC: DocNode,
  RECS: RecsNode,
};