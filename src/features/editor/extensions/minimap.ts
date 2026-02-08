import { showMinimap } from "@replit/codemirror-minimap";
import { Extension } from "@codemirror/state";

const createMinimap = () => {
  const dom = document.createElement("div");
  return { dom };
};

export const miniMap = (): Extension => {
  return showMinimap.compute(["doc"], () => ({
    create: createMinimap,
  }));
};
