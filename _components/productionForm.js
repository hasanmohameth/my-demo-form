"use client";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext, useEffect } from "react";
import { FormContext } from "@/_context/provider";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";


const STORAGE_KEY = "product-draft";

const schema = yup.object({
  name: yup.string().required("name is required").min(3),

  price: yup
    .number()
    .typeError("must be number")
    .positive("must be positive")
    .required(),


  discription: yup.string().required("discription is required").min(5, "discription must be at least 5 characters"),
 
  category: yup.string().required(),


  image: yup
    .mixed()
    .required("image is required")
    .test("fileSize", "image is required", (value) => {
      return value && value.length > 0;
    }),
});

export default function ProductionForm() {

  const { dispatch } = useContext(FormContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,

  } = useForm({

    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      price: "",

      discription: "",
      category: "",

      image: null,
    },
  });

  // Load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem(STORAGE_KEY);
    if (savedDraft) {

      const parsedDraft = JSON.parse(savedDraft);
      reset({

        name: parsedDraft.name || "",
        price: parsedDraft.price || "",
        discription: parsedDraft.discription || "",

        category: parsedDraft.category || "",
        image: null,
      });
    }


  }, [reset]);


  const watchedValues = watch();

  useEffect(() => {
    const draft = {

      name: watchedValues.name,
      price: watchedValues.price,

      discription: watchedValues.discription,
      category: watchedValues.category,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
  }, [watchedValues]);

  const onSubmit = (data) => {
    dispatch({
      type: "SET_PRODUCT",
      payload: {
        ...data,
        image: data.image[0],
      },
      
    });

    toast.success("Product added successfully");


    localStorage.removeItem(STORAGE_KEY);
    reset();
    redirect('products')
  };

  const clearDraft = () => {
    localStorage.removeItem(STORAGE_KEY);
    reset({
      name: "",
      price: "",

      discription: "",
      category: "",
      image: null,
    });
  };

  const classOfInputs ="bg-myblue-300 w-4/5 m-1 h-12 rounded-2xl text-center text-xl focus:outline-none focus:ring-2 focus:ring-myblue-500";

  return (
    <div className="flex justify-center items-center min-h-screen pt-10">
      <form
        onSubmit={handleSubmit(onSubmit)}

        className="bg-myblue-500 p-8 rounded-3xl w-full max-w-md flex flex-col items-center shadow-xl"
      >

        <label>Name of production</label>
        <input {...register("name")} className={classOfInputs} />
        <p className="text-red-700 h-6">{errors.name?.message}</p>

        <label>Price</label>
        <input type="number" {...register("price")} className={classOfInputs} />

        <p className="text-red-700 h-6">{errors.price?.message}</p>

        <label>Discription</label>
        <input 

          type="text" 
          {...register("discription")} 
          className={classOfInputs} 

        />
        <p className="text-red-700 h-6">{errors.discription?.message}</p>



        <label>Category</label>

        <select {...register("category")} className={classOfInputs}>

          <option value="">Select</option>

          <option value="mobile">Mobile</option>

          <option value="laptop">Laptop</option>

        </select>

        <p className="text-red-700 h-6">{errors.category?.message}</p>



        <label>Upload Image</label>

        <input
          type="file"
          id="file"
          accept="image/*"
          className="hidden"
          {...register("image")}
        />

        <label
          htmlFor="file"

          className={`${classOfInputs} flex items-center justify-center cursor-pointer hover:bg-myblue-400 transition-all`}
        >
          Choose an image 🖼
        </label>
        <p className="text-red-700 h-6">{errors.image?.message}</p>

        <button

          type="submit"
          disabled={isSubmitting}
          className={`${classOfInputs} mt-6  hover:bg-myblue-700 text-background font-bold disabled:opacity-50`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>

        <button
          type="button"

          onClick={clearDraft}
          className={`${classOfInputs} mt-3 bg-red-500 hover:bg-red-600 text-white`}
        >
          Clear Draft
          
        </button>
      </form>
    </div>
  );
}