

import { useEffect, useRef, useState } from 'react'
// import { CSVLink, CSVDownload } from "react-csv";
// import { ApplicationResponse } from './api/application';
// import { BeneficiaryInfo, ContractorInfo } from '@prisma/client';
import type { NextPage, NextPageContext } from "next";
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "./api/fbase";
import { CSVLink } from 'react-csv';
import { findImageBase64ById } from '../libs/firestore/dbUtils';



const uid = "rXcZaIVRDnTmDTqlW3iWzHKYymJ3"
const setDragLogByUid = (uid:string, setData)=>{
    const q = collection(db, `dev/${uid}/DragInfo`);
    const data = getDocs(
        q
    ).then(async documents=>{
        const dragLog = await Promise.all(

         documents.docs.map(async doc=>{
            const snapshot = {...doc.data()}
            const imageId = snapshot.id
            // const imageBase64 = findImageBase64ById(imageId).then(image)

            return {
                id: doc.id,
                imageId: snapshot.id,
                startedAt_ms: snapshot.startAt_ms,
                endedAt_ms: snapshot.endAt_ms,
                createdAt: snapshot.startAt,
                path:JSON.stringify(snapshot.path),
                imageBase64:await findImageBase64ById(imageId)
            }
        }))

        setData(dragLog)

    }).catch(error=>error)
}

const Download: NextPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [password, setPassword] = useState("")
    const [data, setData] = useState<any[]>([])


    useEffect(() => {
        console.log("sorted data is ", data)
    }, [data])

    useEffect(() => {
        console.log("hello")
        setDragLogByUid(uid,setData)

    }, [])

    const headers = [
        { label: "로그 아이디", key: "id" },
        { label: "이미지 아이디", key: "imageId" },
        { label: "이미지", key: "imageBase64" },
        { label: "이동시작시간_밀리초", key: "startedAt_ms" },
        { label: "이동종료시간_밀리초", key: "endedAt_ms" },
        { label: "생성시간", key: "createdAt" },
        { label: "경로", key: "path" },
    ]


    return (
        <div
            className='flex justify-center items-center w-screen h-screen '
        >
            {isAuthorized ? (
           
                <CSVLink
                    className='border border-black p-5 '

                    data={data}
                    headers={headers}
                    filename={'신청서'}
                    onClick={() => confirm('신청서를 다운로드 받겠습니까?')}
                >
                    계약서 다운로드
                </CSVLink>
            ) : (
                <form
                    className='border border-black w-1/3 flex justify-between'
                    onSubmit={(event) => {
                        event?.preventDefault()
                        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD && setIsAuthorized(true)
                        setPassword("")
                    }}
                >
                    <input
                        type={"password"}
                        placeholder={"관리자 비밀번호를 입력해 주세요"}
                        onChange={(event) => {
                            setPassword(event.target.value)

                        }}
                        value={password}
                    />
                    <button
                    >확인</button>
                </form>
            )}

        </div>
    )

}

export default Download