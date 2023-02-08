import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../../pages/api/fbase';

const Pcode = {
    "P1" :{
        uid: "rXcZaIVRDnTmDTqlW3iWzHKYymJ3"
    }
}

const uid = "rXcZaIVRDnTmDTqlW3iWzHKYymJ3"
export const findImageBase64ById =async (id:string) =>{
    return new Promise(function (resolve, reject) {
        getDoc(
            doc(
                db,`dev/${uid}/Image`,id
            )
        ).then((snapshots)=>{
            // console.log(snapshots.data())
            resolve(snapshots.data().image64)
        })
        .catch(error=>{
            reject(error)
        })
      })
}
