import Image from "next/image";
import React from "react";

function Modal({
  openModal,
  closeModal,
  modalTitle,
  text,
  buttonText,
}: //   route
{
  openModal: boolean;
  closeModal: () => void;
  modalTitle: string;
  text: string;
  buttonText: string;
  //   route: () => void;
}) {
  return (
    <dialog open={openModal} className="flex items-center justify-center fixed inset-0 bg-[#9D9D9D66]/40 z-50">
      <div className="w-[422px] h-[369px] rounded-lg flex flex-col justify-center bg-white px-[40px] py-[32px] gap-[40px] items-center">
        <Image src={"/modal-icon-success.svg"} width={100} height={100} alt="successful" />
        <div className="flex flex-col gap-[49px]">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-bold text-center text-[#050401]" >{modalTitle}</h3>
            <p className="text-[#050401] text-center  text-sm">{text}</p>
          </div>
          <button className="h-[48px] rounded-lg px-4 py-2.5 border border-blue text-center flex items-center text-blue bg-none justify-center cursor-pointer" onClick={closeModal}>{buttonText}</button>
        </div>
      </div>
    </dialog>
  );
}

export default Modal;
 