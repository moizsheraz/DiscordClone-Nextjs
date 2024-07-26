"use client";

import { UploadDropzone } from "../../lib/utils";
import { X } from "lucide-react";
import Image from "next/image"
import "@uploadthing/react/styles.css";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value?: string;
  endpoint: "messageFile" | "serverImage";
}

const FileUpload = ({ endpoint, value, onChange }: FileUploadProps) => {
  const fileType = value?.split(".")?.pop();
  if (value && fileType !== "pdf") {
    return (
      <div className="flex relative  justify-center items-center h-20 w-20 ">
        <Image 
          src={value}
          alt="server image"
          className="rounded-full "
          layout="fill" 
        />

       <button onClick={()=>onChange()} className="bg-rose-500 text-white p-1 rounded-full  absolute top-0 right-0 shadow-sm">
        <X 
        
        
        />
       </button>
      </div>
    );
  }
  
  
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        console.error("Upload Error:", error.stack);
      }}
    />
  );
};

export default FileUpload;
