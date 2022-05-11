import React from "react";
import Moive from "./Moive";

function MoiveList({moives, likedMoives, onToggleLike}) {
  const moiveComponents = moives.map(moive => <Moive onToggleLike={onToggleLike} key={moive.id} moive={moive} liked={likedMoives.includes(moive.id)} />);
  return (
    <div className="titleList">
      <div className="title">
        {!moives.length && <h1>No results to display</h1>}
        {!!moives.length && (
          <>
            <h1>Movies</h1>
            <div className="titles-wrapper">
              {moives.length && moiveComponents}
            </div>
          </>)
        }
      </div>
    </div>
  );
}

export default MoiveList;
