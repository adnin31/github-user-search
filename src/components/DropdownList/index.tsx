import React from "react";
import './styles.css';

const ListHeader: React.FC<{ key:string; title: string; description: string, stargazerCount: number }> = ({ key, title, description, stargazerCount }) => {
    return (
        <div key={key} className="mb-1 list-container">
            <div className="flex repo-container justify-between">
                <div className="repo-description-wrapper">
                <h3 className="text-lg font-bold">
                    {title}
                </h3>
                <p className="text-xs">
                    {description}
                </p>
                </div>
                <div className="flex items-center">
                {stargazerCount} <span><img className="star-image" src={`${process.env.PUBLIC_URL}/star.png`} alt="star" /></span>
                </div>
            </div>
        </div>
    );
};
  

export default ListHeader