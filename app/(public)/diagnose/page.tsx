import Result from "@/components/pages/public/diagnose/Result";

const Page = () => {
  return (
    <section className="flex h-full w-full flex-col">
      <div className="flex h-[75%] w-full">
        <Result />
      </div>
      <div className="flex h-[25%] items-center justify-center">
        <h1 className="rounded-lg bg-[#E6F7FF] p-[32px] text-small font-medium text-black75 sm:text-p md:text-h6">
          Disclaimer: This platform serves as a decision support system <br />
          providing informational predictions. It is not a substitute for <br />
          professional medical advice or diagnosis. <br />
        </h1>
      </div>
    </section>
  );
};

export default Page;
