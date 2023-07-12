

import { useEffect, useRef, useState } from 'react'
// import { CSVLink, CSVDownload } from "react-csv";
// import { ApplicationResponse } from './api/application';
// import { BeneficiaryInfo, ContractorInfo } from '@prisma/client';
import type { NextPage, NextPageContext } from "next";
import { collection, doc, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from "../libs/firestore/fbase";
import { CSVLink } from 'react-csv';
import { findImageBase64ById, setDragLogByUid, setSelectLogByUid } from '../libs/firestore/dbUtils';


const Download: NextPage = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [password, setPassword] = useState("")
    const [data, setData] = useState<any[]>([])

    useEffect(() => {
        console.log("sorted data is ", data)
    }, [data])

    useEffect(() => {
        setDragLogByUid(0, setData) //1st pram : p_index
        //setDragLogByUid(1, setData)
        //setSelectLogByUid(0, setData)
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

    // const headers = [
    //     { label: "로그 아이디", key: "id" },
    //     { label: "이미지 아이디", key: "imageId" },
    //     { label: "이미지", key: "imageBase64" },
    //     { label: "선택시간", key: "selectedAt" },
    //     { label: "선택시간_밀리초", key: "selectedAt_ms" },
    // ]

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