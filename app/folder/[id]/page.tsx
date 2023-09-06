"use client";
import React, {useEffect, useRef, useState} from "react";
import {useRouter, useParams} from "next/navigation";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import {
  DataType,
  getData,
  getFolderData,
  reset,
} from "@/redux/features/AppSlice";
import Spinner from "@/components/Spinner";
import FileCard from "@/components/FileCard";
import Modal from "@/components/Modal";
import {AiTwotoneFolderAdd} from "react-icons/ai";
import {BsSearch} from "react-icons/bs";
import {CgSortAz} from "react-icons/cg";
type Props = {};

const Page = (props: Props) => {
  // Getting required information from the app redux state
  const {fileData, isLoading2, isError2, isSuccess2} = useAppSelector(
    (state) => state.AppReducer
  );
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortByTime, setSortByTime] = useState(false);
  const sortCardRef: any = useRef(null);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const param = useParams();
  const {id} = param;

  //   filtering through the data to get the only the objects with types of folder
  const folderData = fileData.filter((item) => {
    return item.type === "folder";
  });

  //   filtering through the data to get the only the objects with types of file
  const filedata = fileData
    .filter((item) => {
      return item.type === "file";
    })
    .sort((a, b) => {
      const dateA = new Date(a.created_at);
      const dateB = new Date(b.created_at);
      //  if sortby time is set to true return
      if (sortByTime) return dateB.getTime() - dateA.getTime();
      //  else return

      return a.name.localeCompare(b.name);
    });
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

  useEffect(() => {
    dispatch(getFolderData(id));
  }, []);
  useEffect(() => {
    if (isError2) {
      setTimeout(() => {
        router.push("/404");
      }, 100);
    }
  }, [isError2, isLoading2]);

  return (
    <div>
      {isLoading2 && <Spinner />}
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
          {folderData.length > 0 && (
            <section className="flex flex-col w-full gap-2 justify-center items-start">
              <h3 className="text-2xl font-semibold">Folders</h3>
              <div className="grid gap-2 custom-grid-columns w-full">
                {folderData.map((item, i) => (
                  <div
                    onDoubleClick={() => router.push(`/folder/${item.id}`)}
                    key={item.id}
                    className="p-2 px-4 max-w-[20rem] flex gap-4 rounded-md my-shadow-md justify-start items-center cursor-pointer"
                  >
                    <div className="rounded-full h-10 w-10 text-xl p-2 flex justify-center items-center bg-gray-100">
                      <AiTwotoneFolderAdd />
                    </div>
                    <div className="flex flex-col">
                      <h4 className="font-semibold text-[0.9rem]">
                        {item.name}
                      </h4>
                      <small className="font-thin text-xs">
                        {Number(i) === 0 || Number(i) === 2 ? "10mb" : "240mb"}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
          {filedata.length > 0 && (
            <section className="flex flex-col w-full gap-2 justify-center items-start">
              <h3 className="text-2xl font-semibold">Files</h3>
              <div className="grid gap-4 custom-grid-columns-2 w-full">
                {filedata.map((item, i) => (
                  <FileCard item={item} key={item.id} />
                ))}
              </div>
            </section>
          )}
        </div>
        <Modal />
      </main>
    </div>
  );
};

export default Page;
