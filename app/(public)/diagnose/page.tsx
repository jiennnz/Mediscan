import Result from "@/components/pages/public/diagnose/Result";

const Page = () => {
  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[75%] w-full">
        <Result />
      </div>
      <div className="flex   h-[25%] w-full items-start justify-center">
        <h1 className="w-[80%] rounded-lg bg-[#E6F7FF]  p-[24px] text-small font-medium text-black75 sm:text-p md:w-[70%] lg:w-[55%] xl:w-[42%] 2xl:w-[39%] 2xl:p-[32px] 2xl:text-h6">
          Disclaimer: This platform serves as a decision support system
          providing informational predictions. It is not a substitute for
          professional medical advice or diagnosis.
        </h1>
      </div>
    </section>
  );
};

export default Page;
