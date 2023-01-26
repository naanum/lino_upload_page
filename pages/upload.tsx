import React, { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "./api/fbase";

export interface UserObj {
	uid: string | undefined;
};

type Upload = {
  userObj: UserObj;
};

export type ImageObj = {
  id: string;
  createAt: string;
  createId: string;
  audioBase64: boolean;
  image64: string;
  x?:number;
  y?:number;
};

const Upload = ({ userObj }: Upload) => {

  const [attachment, setAttachment] = useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();

    const imageUpload = {
      createAt_ms: Date.now(),
      createAt: new Date(Date.now()).toString(),
      createId: userObj.uid,
      image64: attachment,
      audioBase64: false,
    };
    await addDoc(collection(db, `dev/${userObj.uid}/Image`), imageUpload);
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
      <form onSubmit={onSubmit}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" />
      </form>
      {attachment ? <img width="300" src={attachment} /> : null}
    </>
  );
};

export default Upload;