import { Editor } from "@tinymce/tinymce-react";
import React from "react";

type RTEProps = {
  value?: string;
  onChange?: (content: string) => void;
  classes?: any;
  [key: string]: any;
};

const RTE: React.FC<RTEProps> = ({ value = "", onChange, ...props }) => {
  return (
    <Editor
      value={value}
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_KEY}
      onEditorChange={(content: any) => {
        if (onChange) onChange(content);
      }}
      init={{
        branding: false,
        menubar: false,
        content_css: "/tinymce/content.css",
        plugins: "link image lists code",
        toolbar: "bold italic underline link code bullist numlist",
        toolbar_sticky: true,
      }}
      {...props}
    />
  );
};

export default RTE;
