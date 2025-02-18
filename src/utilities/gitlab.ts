import { parseDocument, Document } from "yaml";

function move(array: any[], from: number, to: number, on = 1) {
  // eslint-disable-next-line no-sequences
  return array.splice(to, 0, ...array.splice(from, on)), array;
}

export function generateCiWithRemoteUrl(
  remoteUrl: string,
  stages: string[],
  gitlabCi: string
): string {
  if (!remoteUrl) {
    throw new Error("remoteUrl is required");
  }
  let stageList = "";
  for (let i = 0; i < stages.length; i++) {
    if (i !== 0) {
      stageList += `
  - ${stages[i]}`;
    } else {
      stageList += `- ${stages[i]}`;
    }
  }
  const stagesPart = `stages:
  ${stageList}`;
  let content = `${
    !!stageList.length
      ? `${stagesPart}  

include:
  - remote: '${remoteUrl}'`
      : `include:
  - remote: '${remoteUrl}'`
  }`;
  let ciParsed: Document = parseDocument(gitlabCi.length ? gitlabCi : content);

  if (gitlabCi.length === 0) {
    return ciParsed.toString();
  }

  // Check if the job stage exist, if that's not the case we are adding it
  if ((!ciParsed.has("stages") || !ciParsed.get("stages")) && !!stages.length) {
    if (!ciParsed.get("stages") && ciParsed.has("stages")) {
      ciParsed.delete("stages");
    }
    ciParsed.add({ key: "stages", value: stages });
  } else if (!!stages.length) {
    const currentStages = ciParsed.get("stages").items.map((item: any) => item.value);
    let stagesToAdd = Array.from(
      new Set(stages.filter((stage: string) => !currentStages.includes(stage)))
    );
    if (!!stagesToAdd.length) {
      stagesToAdd.forEach((stage: string) => {
        ciParsed.addIn(["stages"], stage);
      });
    }
    // Check if the include keyword exist, if that's not the case we are adding it
  }
  if (!ciParsed.has("include") || !ciParsed.get("include")) {
    if (!ciParsed.get("include") && ciParsed.has("include")) {
      ciParsed.delete("include");
    }
    ciParsed.add({ key: "include", value: [{ remote: remoteUrl }] });
    const includeIndex: number = ciParsed.contents.items.indexOf(
      ciParsed.contents.items.find((ele: any) => ele.key === "include")
    );
    if (includeIndex !== 0) {
      if (ciParsed.contents.items[0] && ciParsed.contents.items[0].key.value) {
        ciParsed.contents.items[0].spaceBefore = true;
      }
      move(ciParsed.contents.items, includeIndex, 0);
    }
    return ciParsed.toString().replace(remoteUrl, "'" + remoteUrl + "'");
  } else if (ciParsed.get("include") && !!ciParsed.get("include").items.length) {
    let currentIncludes: string[] = [];
    ciParsed.get("include").items = ciParsed.get("include").items.map((item: any) => {
      if (
        item.items &&
        item.items.length &&
        item.items[0].value &&
        item.items[0].value.type &&
        item.items[0].value.type === "QUOTE_DOUBLE"
      ) {
        item.items[0].value.type = "QUOTE_SINGLE";
      }
      currentIncludes.push(item.toString());
      return item;
    });

    if (
      ciParsed.get("include").toString() &&
      ciParsed.get("include").toString().includes("/job/r/") &&
      ciParsed.get("include").toString().includes("@") &&
      !!currentIncludes.find((item: any) => {
        if (
          item.split("/job/r/")[1] &&
          item.split("/job/r/")[1].split("@")[0] &&
          remoteUrl.split("/job/r/")[1] &&
          remoteUrl.split("/job/r/")[1].split("@")[0] &&
          remoteUrl.split("/job/r/")[1].split("@")[0] === item.split("/job/r/")[1].split("@")[0]
        ) {
          return item;
        }
        return false;
      })
    ) {
      throw Error("This job is already included in your .gitlab-ci.yml file");
    } else {
      if (ciParsed.get("include") === null || ciParsed.get("include").items.length === 0) {
        ciParsed.delete("include");
        ciParsed.add({ key: "include", value: [{ remote: remoteUrl }] });
        const includeIndex: number = ciParsed.contents.items.indexOf(
          ciParsed.contents.items.find((ele: any) => ele.key === "include")
        );
        if (includeIndex !== 0) {
          if (ciParsed.contents.items[0] && ciParsed.contents.items[0].key.value) {
            ciParsed.contents.items[0].spaceBefore = true;
          }
          move(ciParsed.contents.items, includeIndex, 0);
        }
      } else {
        ciParsed.addIn(["include"], { remote: remoteUrl });
      }
      return ciParsed.toString().replace(remoteUrl, "'" + remoteUrl + "'");
    }
  }

  return "";
}
