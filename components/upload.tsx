import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../libs/firestore/fbase";
import router from "next/router";
import MyLock from "./lock";

interface UploadProps {
  currentUser: string,
}

export type ImageObj = {
  id: string;
  createAt: string;
  createId: string;
  audioBase64: boolean;
  image64: string;
  x?:number;
  y?:number;
};

const Upload = (upload: UploadProps) => {

  const { currentUser } = upload;

  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const imageUpload = {
      createAt_ms: Date.now(),
      createAt: new Date(Date.now()).toString(),
      createId: currentUser,
      image64: attachment,
      audioBase64: false,
    };
    await addDoc(collection(db, `dev/${currentUser}/Image`), imageUpload);
    setAttachment("");
  };

  const onFileChange = (event: any) => {
    const files = event.target.files!;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.target?.result;
      if (typeof result === "string") {
        setAttachment(result);
      }
    };
    reader.readAsDataURL(theFile);
  };

  return (
    <>
    <div className="upload">
      <div className="greeting">지금 기분이 어떤가요?</div>
      { attachment ? <img width="300" src={attachment} /> : null}
      <form onSubmit={onSubmit}>
        <div className="filebox">
          <label htmlFor="ex_file">업로드</label>
          <input type="file" accept="image/*" onChange={onFileChange} id="ex_file" />
        </div>
        <input type="submit" className="submit"/>
        <MyLock currentUser = {currentUser} />
      </form>
      
    </div>
    </>
    
  );
};

export default Upload;