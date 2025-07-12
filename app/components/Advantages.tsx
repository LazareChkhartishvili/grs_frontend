import React from "react";
import { useI18n } from "../context/I18nContext";

const Advantages = () => {
  const { t } = useI18n();
  return (
    <section className="md:max-w-full max-w-[359px] px-2 md:px-8 md:mb-20 mb-10">
      <h2 className="md:text-[64px] text-2xl text-[rgba(61,51,74,1)] md:pb-10 pb-6">
        {t('advantages.title')}
      </h2>
      <div className="grid md:grid-cols-2 h-full grid-cols-1 md:gap-5 gap-4 w-full">
        <div className="flex flex-col gap-4 md:gap-5 w-full min-w-full">
          <div className="bg-[rgba(249,247,254,1)] md:rounded-[15px] rounded-3xl md:p-5 p-4 w-full">
            <h3 className="text-2xl   md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
              {t('advantages.personal_support.title')}
            </h3>
            <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt-[59px] mt-8">
              {t('advantages.personal_support.description')}
            </p>
          </div>
          <div className="bg-[rgba(249,247,254,1)] md:rounded-[15px] rounded-3xl md:p-5 p-4">
            <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
              {t('advantages.inspiration.title')}
            </h3>
            <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt-[75px] mt:[134px]">
              {t('advantages.inspiration.description')}
            </p>
          </div>
          <div className="flex flex-col  md:flex-row gap-4 md:gap-5 ">
            <div className="bg-[rgba(249,247,254,1)] w-full md:rounded-[15px] rounded-3xl md:p-5 p-4 ">
              <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
                {t('advantages.exercise_count.title')}
              </h3>
              <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt-[26px] mt-[122px]">
                {t('advantages.exercise_count.description')}
              </p>
            </div>
            <div className="bg-[rgba(249,247,254,1)] md:rounded-[15px] rounded-3xl md:p-5 p-4">
              <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
                {t('advantages.accessibility.title')}
              </h3>
              <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt-[96px] mt-[168px]">
                {t('advantages.accessibility.description')}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:gap-5 ">
          <div className="bg-[rgba(249,247,254,1)] md:rounded-[15px] rounded-3xl md:p-5 p-4">
            <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
              {t('advantages.informativeness.title')}
            </h3>
            <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium  md:mt-[130px] mt-[117px]">
              {t('advantages.informativeness.description')}
            </p>
          </div>
          <div className="flex flex-col  md:flex-row gap-4 md:gap-5 ">
            <div className="bg-[rgba(249,247,254,1)] flex flex-col justify-between md:rounded-[15px] rounded-3xl md:p-5 p-4">
              <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
                {t('advantages.train_anywhere.title')}
              </h3>
              <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt[230px] mt-[71px]">
                {t('advantages.train_anywhere.description')}
              </p>
            </div>
            <div className="bg-[rgba(249,247,254,1)] md:rounded-[15px] rounded-3xl md:p-5 p-4 ">
              <h3 className="text-2xl  md:tracking-[-1%] tracking-[-3%] leading-[100%] text-[rgba(61,51,74,1)]">
                {t('advantages.video_count.title')}
              </h3>
              <p className="md:text-[18px] font-[Pt] text-[14px] text-[rgba(132,111,160,1)]  tracking-[0%] leading-[120%] font-medium md:mt-[230px] mt-[105px]">
                {t('advantages.video_count.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Advantages;
