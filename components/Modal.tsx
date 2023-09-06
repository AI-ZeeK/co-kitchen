import {closeModal} from "@/redux/features/AppSlice";
import {useAppDispatch, useAppSelector} from "@/redux/hook";
import React, {useEffect, useRef} from "react";
import {AiFillFileImage, AiFillFilePdf, AiOutlineHeart} from "react-icons/ai";
import {BsFillCloudArrowDownFill} from "react-icons/bs";
import {IoIosPrint} from "react-icons/io";
import {IoClose} from "react-icons/io5";

const Modal = () => {
  const modalRef: any = useRef(null);
  const modalOverlayRef: any = useRef(null);
  const {filedata, isModal} = useAppSelector((state) => state.AppReducer);
  const dispatch = useAppDispatch();
  const date = new Date(`${filedata.created_at}`);

  const options: any = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = `${date.toLocaleDateString("en-US", options)}`;

  const handleClickOutside = (event: any) => {
    if (
      modalRef.current &&
      modalOverlayRef.current &&
      modalOverlayRef.current.contains(event.target) &&
      !modalRef.current.contains(event.target)
    ) {
      dispatch(closeModal());
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <section
      ref={modalOverlayRef}
      className={`modal-overlay  ${isModal ? "active" : ""}`}
    >
      {/* {isLoading && <Spinner />} */}
      <div ref={modalRef} className="modal">
        <div
          key={filedata.id}
          className="p-3 flex flex-col gap-2 rounded-md my-shadow-md justify-start items-center cursor-pointer bg-white"
        >
          <div className="flex justify-between items-center w-full">
            <div className="p-2 rounded-full h-10 w-10 min-w-[2.5rem] flex justify-center items-center text-lg border text-gray-600">
              <AiFillFilePdf />
            </div>

            <div
              onClick={() => dispatch(closeModal())}
              className="flex justify-center items-center gap-2 p-2 text-xs bg-gray-200 text-gray-600 rounded-md"
            >
              <IoClose fontSize={18} />
              <span>Close</span>
            </div>
          </div>
          <div className="h-[1px] w-full bg-gray-300" />
          <div className="rounded-md overflow-hidden min-h-[10rem] h-52 w-full flex justify-center items-center relative file-box">
            <div className="z-10 absolute top-0 left-0 w-full h-full flex justify-end items-start p-2">
              <div className="bg-[#696b6a55] backdrop-blur-[1px] p-2 rounded-full cursor-pointer text-white">
                <AiOutlineHeart />
              </div>
            </div>

            {filedata.src.includes("jpg") || filedata.src.includes("jpeg") ? (
              <img
                src={filedata.src}
                alt={filedata.name}
                className="h-full w-full object-cover image"
              />
            ) : (
              <div className="bg-gray-100 flex justify-center items-center h-full w-full ">
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
            )}
          </div>
          <div className="flex justify-start items-center w-full gap-4 py-2">
            {filedata.src.includes("jpg") || filedata.src.includes("jpeg") ? (
              <div className="p-2 rounded-full h-10 w-10 min-w-[2.5rem] flex justify-center items-center text-lg bg-yellow-200 text-yellow-600">
                <AiFillFilePdf />
              </div>
            ) : (
              <div className="p-2 rounded-full h-10 w-10 min-w-[2.5rem] flex justify-center items-center text-lg bg-red-200 text-red-600">
                <AiFillFileImage />
              </div>
            )}
            <div className="flex flex-col justify-center items-start w-full">
              <h4 className="font-semibold text-[0.9]">{filedata.name}</h4>
              <small className="font-thin text-xs">Added {formattedDate}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Modal;
