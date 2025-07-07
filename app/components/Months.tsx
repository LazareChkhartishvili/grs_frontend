import React from 'react'

type Props = {
  onSelect: (month: string) => void;
}

export default function Month({ onSelect }: Props) {
  const months = ["1 месяц", "3 месяц", "6 месяц", "12 месяц"];

  return (
    <div className="absolute flex flex-col border-[1px] border-[#D4BAFC] bg-white rounded-[20px] md:bottom-[-300px] bottom-[-200px] w-[150px] md:w-[200px] h-[200px] md:h-auto overflow-y-auto ">
      {months.map((month) => (
        <React.Fragment key={month}>
          <div
            onClick={() => onSelect(month)}
            className="flex items-center justify-between h-[70px] hover:bg-gray-300 px-[20px] cursor-pointer"
          >
            <p className="text-[#3D334A]">{month}</p>
            <p className="text-[#3D334A]">Icon</p>
          </div>
          <hr className="h-[3px] bg-[#3D334A] opacity-[0.1]" />
        </React.Fragment>
      ))}
    </div>
  );
}
