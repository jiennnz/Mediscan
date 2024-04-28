import Result from "@/components/pages/public/diagnose/Result";

const Page = () => {
  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[75%] w-full">
        <Result />
      </div>
      <div className="flex h-[25%] w-full items-start justify-center">
        <div className="w-[80%] rounded-lg bg-[#E6F7FF] p-[24px] text-[12px] text-black75 sm:text-small lg:w-[70%] xl:w-[55%] 2xl:w-[45%] 2xl:text-p">
          <p>
            Disclaimer: This platform serves as a decision support system
            providing informational predictions. It is not a substitute for
            professional medical advice or diagnosis.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
