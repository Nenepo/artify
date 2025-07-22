import Image from "next/image";
import React from "react";

function LoginScreen() {
  return (
    <section className="bg-blue w-full min-h-screen p-6 flex ">
      <div className="w-[40%]">
        <Image src="/logo" width={76} height={47} alt="artify's logo" />
        <div className="flex justify-center items-center ">
          <h2> Welcome back</h2>
          <form action="">
            <div className="flex flex-col gap-4">
             
             <SocialButtons
                icon="/apple-icon.svg"
                text="Apple"
               
              />
              <SocialButtons
                icon="/google-icon.svg"
                text="Google"
              />
               <SocialButtons
                icon="/facebook-icon.svg"
                text="Facebook"
              />
            </div>
          </form>
        </div>
      </div>
      <div></div>
    </section>
  );
}

export default LoginScreen;

const SocialButtons = ({
  icon,
  text,
  action,
}: {
  icon: string;
  text: string;
  action?: () => void;
}) => {
  return (
    <button
      className="px-4 py-2.5 bg-[rgba(255,255,255,0.1)] flex rounded-lg gap-4 items-center"
      onClick={action}
    >
      <Image src={icon} width={24} height={24} alt={`${text} icon`} />
      <span>{text}</span>
    </button>
  );
};
