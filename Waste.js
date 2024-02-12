<div className="py-5">
  <input
    {...register("total_donation_goal", {
      required: "Donation goal should not be empty",
    })}
    className="w-[317px] h-[50px] text-white bg-white bg-opacity-5 rounded-[10px] outline-none p-3 placeholder:text-white appearance-none"
    type="number"
    inputmode="numeric" // added for Safari support
    pattern="[0-9]*" // added for Safari support
    placeholder="Enter your amount"
    style="-moz-appearance: textfield;" // added for Firefox support
  />
  {errors.total_donation_goal && (
    <span className="mt-2 flex flex-row justify-start text-start text-red-600">
      {errors.total_donation_goal.message}
    </span>
  )}
</div>
