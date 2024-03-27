import React, { useState } from "react";
import governorHouse from "../assets/icons/governorHouseIcon.svg";
import committeeIcon from "../assets/icons/committeeIcon .svg";
import northMap from "../assets/icons/northMapIcon.png";
import republican from "../assets/icons/republicanIcon.png";
import whiteRight from "../assets/icons/whiteRightArrow.png";
import cardImg from "../assets/images/modalCardImg.png";
import mapIcon from "../assets/icons/mapIcon.png";

import { getStates } from "../utils/constants";
import { getParty } from "../utils/constants";
import { useAppSelector } from "../redux/hooks";
// import cityIcon from "../../assets/icons/City.svg";
import cityIcon from "../assets/icons/City.svg";
import { useNavigate } from "react-router-dom";

interface CardProps {
  image: string;
  name: string;
  state: string;
  office?: string;
  status: string;
  party: string;
  cardColor: string;
  id?: string;
  type?: string;
}

const ProfileCard: React.FC<CardProps> = ({
  image,
  name,
  state,
  office,
  status,
  party,
  cardColor,
  id,
  type,
}) => {
  const [hover, setHover] = useState(false);
  const color = cardColor;

  const navigate = useNavigate();
  // const authinfo = useAppSelector((state: any) => state.auth.userData);
  // console.log(authinfo,"Info check level")

  const HandleProfile = () => {
    if (type === "committee") {
      navigate(`/committee-public-profile/${type}/${id}`);
      return;
    } else if (type === "candidate") {
      navigate(`/candidate-public-profile/${type}/${id}`);
      return;
    } else if (type === "doner") {
      navigate(`/donor-public-profile/${type}/${id}`);
      return;
    }
  };

  return (
    <div
      className={`flex rounded-[20px] h-[130.30px] lg:h-[219px] md:h-[219px] ${
        status === "Republican"
          ? "hover:bg-red-700"
          : status === "Democrat"
          ? "hover:bg-sky-800"
          : "hover:bg-violet-800"
      }`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={` ${
          hover
            ? "transition-transform ease-in-out duration-1000 lg:w-[197px]"
            : "w-[111px] md:w-[186px]"
        }  `}
      >
        {hover ? (
          <div className="pl-[10px] py-4 transition-transform ease-in-out duration-700 lg:pl-5 md:pl-5 h-full">
            <div className="flex flex-col justify-between h-full">
              <div
                className="text-white text-[11px] font-bold font-['Hind Guntur'] leading-none pb-2 lg:text-[18px] md:text-[18px]"
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
                title={name}
              >
                {name}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <img className="w-6 h-6" src={governorHouse} alt="" />
                  <div
                    className="text-white text-[8px] font-bold font-['DM Sans'] lg:text-sm md:text-sm"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={office ? `Running for ${office}` : "Committee"}
                  >
                    {office ? `Running for ${office}` : "Committee"}
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <img
                    src={
                      getStates(state)?.profileIcon ||
                      getStates("United States")?.profileIcon
                    }
                    alt="Icon"
                    className="w-6 h-6"
                  />
                  <div className="text-white text-[8px] font-bold font-['DM Sans'] lg:text-sm md:text-sm">
                    {state ? `${state}` : "United States"}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    className="w-6 h-6"
                    src={getParty(status)?.profileIcon}
                    alt=""
                  />
                  <div className="text-white text-[8px] font-bold font-['DM Sans'] lg:text-sm md:text-sm">
                    {status} Party
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // w-[111px] h-[130.30px] hover:hidden lg:h-auto  md:h-auto lg:w-full md:w-full
          <img
            src={image}
            alt={name ?? "User"}
            className="w-[111px] h-[130.30px] rounded-l-[20px] bg-cover bg-center object-cover hover:hidden md:h-full md:w-full"
            loading="eager"
          />
        )}
      </div>
      {/* w-[110px] */}
      <div
        className={`w-[76px] px-[5px] py-4 rounded-r-[20px] flex flex-col justify-between ${
          hover ? "lg:w-[110px]" : "lg:w-[121px]"
        } lg:px-4 lg:py-4 md:py-4 md:px-4 ${
          status === "Republican"
            ? "bg-red-700"
            : status === "Democrat"
            ? "bg-sky-800"
            : "bg-violet-800"
        }`}
      >
        {hover ? null : (
          <>
            <h2 className="text-center text-white text-[11px] font-bold font-['Hind Guntur'] leading-none md:text-[18px]">
              {name}
            </h2>
            <div className="flex flex-col items-center gap-3 justify-center">
              {!office && (
                <img className="w-[30px] h-[28px]" src={committeeIcon} alt="" />
              )}
              <p className="text-center text-white text-[8px] font-bold font-['DM Sans'] lg:text-xs md:text-xs">
                {/* {state ? `${state}` : "United States"} */}
                {office ? `Running for ${office}` : "Committee"}
              </p>
            </div>

            <div className="flex justify-center items-center">
              <img
                src={
                  getStates(state)?.profileIcon ||
                  getStates("United States")?.profileIcon
                }
                alt="Icon"
                className="mr-2"
              />
            </div>
          </>
        )}

        {/* <div className="flex justify-center items-center">
          <img src={getStates(state)?.profileIcon || getStates("United States")?.profileIcon } alt="Icon" className="mr-2" />
        </div> */}
        {hover ? (
          <div
            className="flex items-center justify-end mt-auto gap-2 text-white font-['DM Sans'] cursor-pointer"
            onClick={HandleProfile}
          >
            <div className="text-[12px]">Profile</div>
            <img className="h-[20px]" src={whiteRight} alt="" />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProfileCard;
