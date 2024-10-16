import React from "react";
import { IconLeftArrow, IconRightArrow } from "../icons";
import { commonClassName } from "@/constants";

const PaginationBtn = ({ onClick }: { onClick?: () => void }) => {
  return (
    <div className="flex justify-end gap-3 mt-5">
      <button className={commonClassName.paginationButton}>
        <IconLeftArrow />
      </button>
      <button className={commonClassName.paginationButton}>
        <IconRightArrow />
      </button>
    </div>
  );
};

export default PaginationBtn;
