import { useForm, SubmitHandler } from "react-hook-form";
import Input from "../input/input";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useRef, useState } from "react";

interface TFormValues {
  user: string;
}

export default function CurlForm({ qnumber }: { qnumber: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<TFormValues>();

  const [loading, setloading] = useState(false);

  const [loadingA, setLoadingA] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [loadingC, setLoadingC] = useState(false);

  const onSubmit: SubmitHandler<TFormValues> = async (data, event) => {
    console.log(data, "data");

    // @ts-ignore
    if (event?.nativeEvent?.submitter?.name == "A") {
      setLoadingA(true);
    }
    // @ts-ignore
    if (event?.nativeEvent?.submitter?.name == "B") {
      setLoadingB(true);
    }
    // @ts-ignore
    if (event?.nativeEvent?.submitter?.name == "C") {
      setLoadingC(true);
    }

    try {
      const response = await axios.post("/api/curlRequest", {
        user: data.user,
        // @ts-ignore
        answer: event?.nativeEvent?.submitter?.name as string,
      });

      console.log(response.data, "response");
      setLoadingA(false);
      setLoadingB(false);
      setLoadingC(false);
      // reset();
      toast("Request Submitted Successfully", {
        icon: "👏",
        style: {
          background: "#50c878",
          borderRadius: "20px",
          color: "#fff",
        },
      });
    } catch (error: any) {
      console.log(error, "error");
      console.log(error?.response?.data?.message, "error");
      toast.error(error?.message);
      setLoadingA(false);
      setLoadingB(false);
      setLoadingC(false);
    }
  };

  return (
    <div className="w-[100%] px-3 py-2">
      <Toaster />
      {/* <h2 className="text-center text-[20px] text-[#272727] font-[600] mb-5">
        Q{qnumber}
      </h2> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-5">
          <Input
            inputType="text"
            label="User Name"
            required={true}
            register={register}
            name="user"
            errors={errors}
            rules={{ required: "User Name Is Required" }}
          />

          <button
            name="A"
            disabled={loadingA}
            className="w-[100%] rounded-md text-white h-[48px] text-[18px] bg-red-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-150 ease-in-out"
          >
            {loadingA ? <div className="loader" /> : "A"}
          </button>
          <button
            name="B"
            disabled={loadingB}
            className="w-[100%] rounded-md text-white h-[48px] text-[18px] bg-sky-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-150 ease-in-out"
          >
            {loadingB ? <div className="loader" /> : "B"}
          </button>
          <button
            name="C"
            disabled={loadingC}
            className="w-[100%] rounded-md text-white h-[48px] text-[18px] bg-purple-400 flex items-center justify-center cursor-pointer hover:opacity-80 transition-all duration-150 ease-in-out"
          >
            {loadingC ? <div className="loader" /> : "C"}
          </button>
        </div>
      </form>
    </div>
  );
}
