import { FormValue } from "@raycast/api";
import gitmoji from "../data/gitmoji";

interface Props {
  format: string;
  type: string;
  values: Record<string, FormValue>;
}

const formatDescription = ({ format, type: _type, values }: Props) => {
  const type = gitmoji?.types[_type];

  const hasEmoji = format.toString().includes("emoji");
  const hasColon = format.toString().includes(":");
  const scope = values?.ccScope;

  const description = format
    .toString()
    .replace(/\{emoji\}/g, type?.emoji)
    // .replace(
    //   /\{scope\}/g,
    //   values?.ccScope ? (hasEmoji && !values.ccDescription && hasColon ? ` (${scope})` : `(${scope})`) : ""
    // )
    .replace(/\{scope\}/g, values?.ccScope ? (hasEmoji || !type.commit ? ` (${scope})` : `(${scope})`) : "")
    .replace(/\{description\}/g, values?.ccDescription ? values?.ccDescription.toString() : "")
    .replace(/\{type\}/g, type?.commit ? (hasEmoji ? ` ${type.commit}` : `${type.commit}`) : "");

  return description;
};

export default formatDescription;
