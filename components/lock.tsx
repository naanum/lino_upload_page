import { async } from "@firebase/util";
import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../libs/firestore/fbase";

interface UploadProps {
  currentUser: string,
}

const MyLock = (upload: UploadProps) => {
  const { currentUser } = upload;
  const [isLock, setIsLock] = useState<boolean>(false);
  const [isFirst, setIsFirst] = useState<boolean>(true);

  useEffect(() => {
		getLock();
    setIsFirst(false);
	}, []);

  const getLock = async () => {
		const docRef = doc(db, `dev/${currentUser}/Lock`, currentUser);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      setIsLock(docSnap.data().isLock);
      console.log(isLock)
    } else {
    }
	};

  const onClick = async () => {
    setIsLock(prev => !prev);
  }

  const lockUpload = async () => {
    const lockUpload = {
      createAt_ms: Date.now(),
      createAt: new Date(Date.now()).toString(),
      createId: currentUser,
      isLock : isLock,
    };
    await setDoc(doc(db, `dev/${currentUser}/Lock`, currentUser), lockUpload);
    await addDoc(collection(db, `dev/${currentUser}/LockLog`), lockUpload);
  }

  useEffect(()=>{
    !isFirst && lockUpload();
  }, [isLock])

return (
  <div className="lock" onClick={onClick}>
    {isLock ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faUnlock}/>}
  </div>
);
}

export default MyLock;