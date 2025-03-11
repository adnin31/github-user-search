import React from "react";

const ListHeader: React.FC<{ key:string; title: string; isShowList: boolean, onClick: () => void }> = ({ key, isShowList, onClick, title }) => {
    return (
        <div key={key} className="flex justify-between border p-2 mb-2 cursor-pointer" onClick={onClick}>
            <h3>{title}</h3>
            <img className={`icon-container  ${isShowList && "rotate"}`} src={`${process.env.PUBLIC_URL}/arrow-down.svg`} alt="dropdown-icon" />
        </div>
    );
};
  

export default ListHeader