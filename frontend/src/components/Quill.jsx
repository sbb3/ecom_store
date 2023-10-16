import React, { useState } from "react";
import ReactQuill, { Quill as Quill2 } from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Emoji from "quill-emoji";
import "quill-emoji/dist/quill-emoji.css";

Quill2.register("modules/emoji", Emoji);

function Quill({ description, setDescription }) {
  console.log(description);

  const TOOLBAR_OPTIONS = [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "link"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ size: ["10px", "12px", "14px", "16px", "18px", "20px"] }], // Font size options in pixels
    ["link", "image"],
    ["code-block"],
    ["emoji"],
    ["video"],
    ["clean"],
    [{ align: ["center", "right", "justify", "left", "indent"] }],
  ];

  const modules = {
    toolbar: {
      container: TOOLBAR_OPTIONS,
    },
    "emoji-toolbar": true,
    "emoji-textarea": false,
    "emoji-shortname": true,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
    "emoji",
    "clean",
    "size", // Added font size format
  ];

  return (
    <ReactQuill
      theme="snow"
      value={description}
      onChange={setDescription}
      modules={modules}
      formats={formats}
    />
  );
}

export default Quill;
