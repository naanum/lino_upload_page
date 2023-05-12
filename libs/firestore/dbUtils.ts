import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './fbase';

const Pcode = [
    "2mGvahNABxVY7YUB4o3wJQUwOvC2", //p1
    "lN78nWBK9PafIEzS8mXunk4X0Wd2", //p2
    "aKBabe09WkbxUMFKYUhXqiERGsx1", //p3
];

export const findImageBase64ById = async (index: number, id:string) =>{
    return new Promise(function (resolve, reject) {
        getDoc(
            doc(
                db,`dev/${Pcode[index]}/Image`,id
            )
        ).then((snapshots)=>{
            // console.log(snapshots.data())
            snapshots.exists() && resolve(snapshots.data().image64)
        })
        .catch(error=>{
            reject(error)
        })
      })
}

export const setDragLogByUid = (index: number, setData: any)=>{
    const q = collection(db, `dev/${Pcode[index]}/DragInfo`);
    const data = getDocs(q).then(async documents=>{
        const dragLog = await Promise.all(

         documents.docs.map(async doc=>{
            const snapshot = {...doc.data()}
            const imageId = snapshot.id
            //const imageBase64 = findImageBase64ById(imageId).then(image)

            return {
                id: doc.id,
                imageId: snapshot.id,
                startedAt_ms: snapshot.startAt_ms,
                endedAt_ms: snapshot.endAt_ms,
                createdAt: snapshot.startAt,
                path: JSON.stringify(snapshot.path),
                imageBase64: await findImageBase64ById(index, imageId)
            }
        }))

        setData(dragLog)

    }).catch(error=>error)
}

export const setSelectLogByUid = (index: number, setData: any)=>{
    const q = collection(db, `dev/${Pcode[index]}/ImgSelect`);
    const data = getDocs(q).then(async documents=>{
        const selectLog = await Promise.all(

         documents.docs.map(async doc=>{
            const snapshot = {...doc.data()}
            const imageId = snapshot.id
            //const imageBase64 = findImageBase64ById(imageId).then(image)

            return {
                id: doc.id,
                imageId: snapshot.id,
                selectedAt: snapshot.selectedAt,
                selectedAt_ms: snapshot.selectedAt_ms,
                imageBase64: await findImageBase64ById(index, imageId)
            }
        }))

        setData(selectLog)

    }).catch(error=>error)
}