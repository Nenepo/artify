import Image from "next/image";
import React from "react";

function AuthImage() {
  return (
    <div className="h-screen overflow-y-auto md:w-[50%] scroll-bar bg-blue md:flex items-center justify-center lg:block">
      <div className=" lg:h-[976px] w-0 bg-[#FDFDFF]  flex  rounded-3xl bgImg pb-[42px] relative  md:w-full ">
        <div className="z-[20] ">
          <div className=" w-[175px] h-[52px] lg:w-[275px] lg:h-[82px]  left-[10px]  absolute top-[10px] lg:top-[55px] lg:left-[40px]">
            <Image alt="" fill src={"/amazing-img.png"} />
          </div>

          <div className="absolute top-[60px] lg:top-[137px] right-[10px] lg:right-[45px] w-[175px] h-[52px] lg:w-[275px] lg:h-[82px]">
            <Image alt="" fill src={"/withdraw-img.png"} />
          </div>
          <div className="absolute top-[140px] lg:top-[265px] left-[20px] lg:left-[63px] w-[175px] h-[52px] lg:w-[275px] lg:h-[82px]">
            {" "}
            <Image alt="" fill src={"/payment-img.png"} />
          </div>

          <div className="absolute top-[180px] lg:top-[321px] right-[10px] lg:right-[34px] w-[175px] h-[52px] lg:w-[275px] lg:h-[82px]">
            <Image alt="" fill src={"/interest-img.png"} />
          </div>
        </div>
        <div className="flex self-end mx-auto w-[400px] xl:w-[564px] xl:h-[587px]">
          <Image alt="" width={564} height={587} src={"/phone-img.png"} />
        </div>
      </div>
    </div>
  );
}

export default AuthImage;
