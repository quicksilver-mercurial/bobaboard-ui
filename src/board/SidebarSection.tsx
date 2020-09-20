import React from "react";

import classnames from "classnames";
import Input, { InputStyle } from "../common/Input";
import Editor, {
  getAllImages,
  replaceImages,
  removeTrailingWhitespace,
  // @ts-ignore
} from "@bobaboard/boba-editor";

import debug from "debug";
const log = debug("bobaui:boards:sidebarSection");

export enum SidebarTypes {
  TEXT,
  CATEGORIES,
}

const SidebarSection: React.FC<SidebarSection> = (props) => {
  return (
    <div
      className={classnames("sidebar-section", { editable: props.editable })}
    >
      <div className="title">
        <Input
          id="title"
          label="title"
          value={props.title}
          onTextChange={props.onTitleChange}
          theme={InputStyle.DARK}
          disabled={!props.editable}
        />
      </div>
      <div className="description">
        <div className="content-title">Content</div>
        <div className="content-editor">
          <Editor
            initialText={props.description ? JSON.parse(props.description) : ""}
            editable={props.editable}
            focus={true}
            onSubmit={() => {}}
            onIsEmptyChange={(empty: boolean) => {}}
            onTextChange={(text: any) =>
              props.onDescriptionChange(JSON.stringify(text.ops))
            }
          />
        </div>
      </div>
      <style jsx>{`
        .content-title {
          font-size: large;
          color: white;
        }
        .sidebar-section {
          color: white;
        }
        .content-editor {
          background-color: #2f2f30;
          border: 1px solid rgba(255, 255, 255, 0.3);
          min-height: 300px;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export interface SidebarSection {
  title: string;
  description: string;
  editable: boolean;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
}

export default SidebarSection;