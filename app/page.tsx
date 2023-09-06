"use client";
import Image from "next/image";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {useEffect, useRef, useState} from "react";
import {getData, openModal} from "@/redux/features/AppSlice";
import {BsFillCloudArrowDownFill, BsSearch} from "react-icons/bs";
import {
  AiFillFileImage,
  AiFillFilePdf,
  AiOutlineFileImage,
  AiOutlineHeart,
  AiTwotoneFolderAdd,
} from "react-icons/ai";
import {useRouter} from "next/navigation";
import {CgSortAz} from "react-icons/cg";
import {IoIosPrint} from "react-icons/io";
import Modal from "@/components/Modal";
import FileCard from "@/components/FileCard";
import Link from "next/link";

export default function Home() {
  const {data} = useAppSelector((state) => state.AppReducer);
  const dispatch = useAppDispatch();
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortByTime, setSortByTime] = useState(false);
  const sortCardRef: any = useRef(null);
  const router = useRouter();

  //   filtering through the data to get the only the objects with types of folder
  const folderData = data.filter((item) => {
    return item.type === "folder";
  });

  //   filtering through the data to get the only the objects with types of file
  const fileData = data
    .filter((item) => {
      return item.type === "file";
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      if (sortByTime) return dateB.getTime() - dateA.getTime();
      return a.name.localeCompare(b.name);
    });
  useEffect(() => {
    // getting the data from the
    dispatch(getData());
  }, []);

  const handleClickOutside = (event: any) => {
    if (!sortCardRef.current.contains(event.target)) {
      setIsSortOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <main className="p-4 md:p-8 lg:p-16">
      <div className="flex flex-col w-full gap-4 justify-center items-center">
        <section className="flex justify-between items-center w-full">
          <div className="relative" ref={sortCardRef}>
            <div
              onClick={() => setIsSortOpen((prev) => !prev)}
              className="p-2 px-4 flex justify-center items-center text-sm gap-2 rounded-md my-shadow-md cursor-pointer"
            >
              <span>Sort</span>
              <CgSortAz className="text-lg" />
            </div>
            <div
              className={`${
                isSortOpen ? "flex" : "hidden"
              } absolute -bottom-16 left-0 w-32 shadow-md  rounded-md overflow-hidden bg-gray-100 text-xs flex-col `}
            >
              <div
                onClick={() => setSortByTime(false)}
                className="p-2 px-3 hover:bg-gray-200 transition-all cursor-pointer"
              >
                By Name
              </div>
              <div
                onClick={() => setSortByTime(true)}
                className="p-2 px-3 hover:bg-gray-200 transition-all cursor-pointer"
              >
                By Time Created
              </div>
            </div>
          </div>
          <div className="p-2 px-4 flex justify-center items-center text-sm gap-3 rounded-md my-shadow-md cursor-pointer">
            <BsSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="search"
              className="outline-none transparent text-sm"
            />
          </div>
        </section>
        <section className="flex flex-col w-full gap-2 justify-center items-start">
          <h3 className="text-2xl font-semibold">Folders</h3>
          <div className="grid gap-2 custom-grid-columns w-full">
            {folderData.map((item, i) => (
              <div
                onDoubleClick={() => router.push(`/folder/${item.id}`)}
                key={item.id}
                className="p-2 px-4 flex gap-4 rounded-md my-shadow-md justify-start items-center cursor-pointer"
              >
                <div className="rounded-full h-10 w-10 text-xl p-2 flex justify-center items-center bg-gray-100">
                  <AiTwotoneFolderAdd />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-semibold text-[0.9rem]">{item.name}</h4>
                  <small className="font-thin text-xs">
                    {Number(i) === 0 || Number(i) === 2 ? "10mb" : "240mb"}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col w-full gap-2 justify-center items-start">
          <h3 className="text-2xl font-semibold">Files</h3>
          <div className="grid gap-4 custom-grid-columns-2 w-full">
            {fileData.map((item, i) => (
              <FileCard item={item} key={item.id} />
            ))}
          </div>
        </section>
      </div>
      <Modal />
    </main>
  );
}
