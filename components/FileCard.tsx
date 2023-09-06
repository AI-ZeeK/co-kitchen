import {DataType, openModal} from "@/redux/features/AppSlice";
import {useAppDispatch} from "@/redux/hook";
import Link from "next/link";
import React, {useState} from "react";
import {AiOutlineHeart, AiFillFilePdf, AiFillFileImage} from "react-icons/ai";
import {BsFillCloudArrowDownFill} from "react-icons/bs";
import {IoIosPrint} from "react-icons/io";

type Props = {
  item: DataType;
};

const FileCard = ({item}: Props) => {
  const dispatch = useAppDispatch();
  const [isDoubleClick, setIsDoubleClick] = useState(false);

  //   the double click handler to dowmload the file
  const handleDoubleClick = (itemsrc: string) => {
    setIsDoubleClick(true);

    // Construct the download URL based on the document source
    const downloadUrl = item.src;

    // Create a temporary link element to trigger the download
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "document.pdf"; // You can set the desired file name here
    link.click();

    // Reset the double-click state after a short delay
    setTimeout(() => {
      setIsDoubleClick(false);
    }, 1000); // Adjust the delay as needed
  };

  const date = new Date(`${item.created_at}`);

  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = `${date.toLocaleDateString("en-US", options)}`;
  return (
    <div
      key={item.id}
      className="p-2 flex max-w-[26rem] flex-col gap-4 rounded-md my-shadow-md justify-start items-center cursor-pointer"
    >
      <div className="rounded-md overflow-hidden min-h-[10rem] h-52 w-full flex justify-center items-center relative file-box">
        {item.src.includes("jpg") ||
        item.src.includes("jpeg") ||
        item.src.includes(".svg") ? (
          <div
            className="h-full w-full"
            onDoubleClick={() => dispatch(openModal(item))}
          >
            <div className="z-10 absolute top-0 left-0 w-full h-full flex justify-end items-start p-2">
              <div className="bg-[#696b6a55] backdrop-blur-[1px] p-2 rounded-full cursor-pointer text-white">
                <AiOutlineHeart />
              </div>
            </div>
            <img
              src={item.src}
              alt={item.name}
              className="h-full w-full object-cover image"
            />
          </div>
        ) : (
          <>
            <div className="z-10 absolute top-0 left-0 w-full h-full flex justify-end items-start p-2">
              <div className="bg-[#696b6a55] backdrop-blur-[1px] p-2 rounded-full cursor-pointer text-white">
                <AiOutlineHeart />
              </div>
            </div>

            <div
              onDoubleClick={() => handleDoubleClick(item.src)}
              className="bg-gray-100 flex justify-center items-center h-full w-full "
            >
              <AiFillFilePdf className="text-6xl text-red-600 image" />
              <div className="z-10 absolute bottom-0 left-0 w-full h-full flex justify-start items-end p-2">
                <div className="flex gap-4 justify-center items-center">
                  <div className="bg-[#aeaeae44] text-xs backdrop-blur-[1px] p-2 rounded-full cursor-pointer text-black">
                    <BsFillCloudArrowDownFill className="text-black" />
                  </div>
                  <div className="bg-[#aeaeae44] text-xs backdrop-blur-[1px] p-2 rounded-full cursor-pointer text-black">
                    <IoIosPrint className="text-black" />
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-start items-center w-full gap-4">
        {item.src.includes("jpg") ||
        item.src.includes("jpeg") ||
        item.src.includes(".svg") ? (
          <div className="p-2 rounded-full h-10 w-10 min-w-[2.5rem] flex justify-center items-center text-lg bg-yellow-200 text-yellow-600">
            <AiFillFilePdf />
          </div>
        ) : (
          <div className="p-2 rounded-full h-10 w-10 min-w-[2.5rem] flex justify-center items-center text-lg bg-red-200 text-red-600">
            <AiFillFileImage />
          </div>
        )}
        <div className="flex flex-col justify-center items-start w-full">
          <h4 className="font-semibold text-[0.9]">
            {item.name.slice(0, 6)}...{item.name.slice(-6)}
          </h4>
          <small className="font-thin text-xs">Added {formattedDate}</small>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
