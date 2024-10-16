import Link from "next/link";
import React from "react";
import { IconDelete, IconEdit, IconEye, IconStudy } from "../icons";
import { commonClassName } from "@/constants";
type TableActionIcon = "edit" | "delete" | "view" | "study";
const TableActionItem = ({
  type,
  onClick,
  url,
}: {
  type: TableActionIcon;
  onClick?: () => void;
  url?: string;
}) => {
  const icon: Record<TableActionIcon, any> = {
    edit: <IconEdit className="size-4" />,
    delete: <IconDelete className="size-4" />,
    view: <IconEye className="size-4" />,
    study: <IconStudy className="size-4" />,
  };
  if (url) {
    return (
      <Link href={url} className="border-[2px] p-2 rounded-md">
        {icon[type]}
      </Link>
    );
  }
  return (
    <button className="border-[2px] p-2 rounded-md" onClick={onClick}>
      {icon[type]}
    </button>
  );
};

export default TableActionItem;
