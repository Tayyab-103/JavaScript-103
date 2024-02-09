import React from "react";

const Issues = () => {
  return (
    <div>
      <div className="flex-grow px-24 pt-24">
        <p className="text-5xl font-bold mb-4">
          Welcome to <span className="text-red-600">Red</span>Wave
        </p>
        <p className="text-xl font-normal text-[#585C7B]">
          Please Provide The Details Below To Complete Your Profile
        </p>

        <div className="mt-14">
          <div className="flex flex-row flex-nowrap gap-4">
            <img src={Fire} alt="Back" className="w-8 h-8" />
            <p className="mt-1 text-zinc-800 text-base font-medium font-['Hind Guntur']">
              Top Issue
            </p>
          </div>
          <div className="flex flex-row flex-wrap gap-x-6">
            {CommitteeIssueState &&
              CommitteeIssueState?.map((value: any) => {
                return (
                  <>
                    <div
                      // w-[98px] flex items-center justify-between h- bg-red-700 rounded-[14px] relative mt-6
                      className="flex items-center  w-auto h-9 bg-red-700 rounded-[25px] mt-6"
                      key={value}
                    >
                      <div className=" text-white text-base font-medium font-['Hind Guntur'] pl-4">
                        {value}
                      </div>
                      {/* absolute right-0 h-full flex items-center */}
                      <div className="pl-4 mr-1">
                        {/* <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center"> */}
                        <img
                          className="w-7 h-7 cursor-pointer"
                          src={Minus}
                          alt="Minus"
                          onClick={() => RemoveIssueHandler(value)}
                        />
                        {/* </div> */}
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
          <div className="flex flex-row flex-nowrap gap-4 mt-14">
            <p className="text-slate-600 text-xl font-normal font-['Hind Guntur']">
              Tell us why you are passionate about these issues :
            </p>
          </div>
          <div className="w-full rounded-[14px] mt-6">
            <form onSubmit={handleSubmit(submitForm)}>
              <CharacterCounter
                label={"Write about why you are passionate about these issues"}
                name={"issues_description"}
                value={issuesDescription}
                maxLength={2000}
                message={"Issues description"}
                onChange={(e) => {
                  clearErrors("issues_description");
                  setIssuesDescription(e);
                }}
                register={register}
                watch={watch}
                error={
                  errors.issues_description
                    ? errors.issues_description.message
                    : ""
                }
              />
            </form>
          </div>
        </div>

        <div className="flex flex-nowrap py-14 justify-between gap-4 sm:gap-2">
          <div
            className="flex flex-wrap gap-2 text-base font-medium cursor-pointer"
            onClick={() => dispatch(UpdateCommitteeForm("Issues"))}
          >
            <img
              src={Back}
              alt="Back"
              className="w-8 h-8 pt-2 hidden sm:inline-block"
            />
            <button
              className="hidden sm:inline-block"
              // onClick={() => navigate("/issues")}
            >
              Back
            </button>
          </div>
          <div className="flex flex-wrap justify-between gap-4 sm:gap-8 items-center">
            <p className="text-zinc-800 text-[16px] sm:text-[32px] font-bold font-['DM Sans'] leading-[27.18px] sm:leading-[37.18px]">
              Issues Explained
            </p>
            <button
              className="w-[140px] h-[32px] sm:w-[183px] sm:h-[42px] rounded-[16px] sm:rounded-[21px] bg-red-700 text-white text-sm sm:text-xl font-medium"
              disabled={loading}
              type="button"
              onClick={() => handleSubmit(submitForm)()}
            >
              {loading ? "Loading..." : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Issues;
