import { parseComplexString } from "./parser";
import {
  convertInfotextObject,
  FooocusLogObject,
  getInfotext,
} from "./infotext";

const ORIGINAL_BUTTON_TEXT = "生成情報をコピー";
const COPYED_BUTTON_TEXT = "コピー完了！";

const createCopyBtn = () => {
  const copyBtn = document.createElement("div");

  const button = document.createElement("button");
  button.innerHTML = ORIGINAL_BUTTON_TEXT;
  button.style.alignItems = "center";
  button.style.border = "1px solid #eee";
  button.style.height = "40px";
  button.style.padding = "8px 12px";
  button.style.display = "inline-block";
  button.style.fontSize = "14px";
  button.style.fontWeight = "700";

  copyBtn.appendChild(button);

  // copy to clipboard
  button.addEventListener("click", () => {
    const textList = copyBtn?.parentElement?.querySelectorAll("p");
    if (!textList) return;

    let data = "";
    // @ts-ignore
    for (const text of textList) {
      // check exists parse target
      const isExists = text.textContent.split(": ").length > 1;
      if (isExists) {
        data += text.textContent + "\n";
      }
    }

    const parsedData = parseComplexString(data);
    if (!parsedData) {
      return;
    }

    const infotext = getInfotext(
      convertInfotextObject(parsedData as FooocusLogObject),
    );

    navigator.clipboard.writeText(infotext).then(() => {
      button.innerText = COPYED_BUTTON_TEXT;
      setTimeout(() => {
        button.innerText = ORIGINAL_BUTTON_TEXT;
      }, 1000);
    }).catch((err) => {
      console.error("Failed to copy text: ", err);
    });
  });

  return copyBtn;
};

const logList = document.querySelectorAll("div[id]");
for (const log of Array.from(logList)) {
  log.appendChild(createCopyBtn());
}
