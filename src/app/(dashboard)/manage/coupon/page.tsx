import { BouncedLink, StatusBadge } from "@/components/common";
import Heading from "@/components/common/Heading";
import TableAction from "@/components/common/TableAction";
import TableActionItem from "@/components/common/TableActionItem";
import { IconLeftArrow, IconRightArrow } from "@/components/icons";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { commonClassName } from "@/constants";
import { getCoupons } from "@/lib/actions/coupon.actions";
import { ECouponType } from "@/types/enum";
const page = async () => {
  const coupons = await getCoupons({});
  return (
    <div>
      <BouncedLink url="/manage/coupon/new"></BouncedLink>
      <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
        <Heading className="">Quản lý mã giảm giá</Heading>
        <div className="flex gap-3">
          <div className="w-full lg:w-[300px]">
            <Input placeholder="Tìm kiếm coupon..." />
          </div>
        </div>
      </div>
      <Table className="table-responsive">
        <TableHeader>
          <TableRow>
            <TableHead>Mã</TableHead>
            <TableHead>Tiêu đề</TableHead>
            <TableHead>Giảm giá</TableHead>
            <TableHead>Sử dụng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {coupons &&
            coupons.length > 0 &&
            coupons.map((coupon) => (
              <TableRow key={coupon._id}>
                <TableCell>
                  <strong>{coupon.code}</strong>
                </TableCell>
                <TableCell>
                  <strong>{coupon.title}</strong>
                </TableCell>
                <TableCell>
                  {coupon.title === ECouponType.AMOUNT ? (
                    <span>
                      {coupon.value.toLocaleString("us-US")}đ
                    </span>
                  ) : (
                    <span>{coupon.value}%</span>
                  )}
                </TableCell>
                <TableCell>
                  {coupon.used}/{coupon.limit}
                </TableCell>
                <TableCell>
                  {coupon.active ? (
                    <StatusBadge
                      item={{
                        title: "Đang hoạt động",
                        className: "text-green-500",
                      }}
                    />
                  ) : (
                    <StatusBadge
                      item={{
                        title: "Chưa kích hoạt",
                        className: "text-orange-500",
                      }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <TableAction>
                    <TableActionItem
                      type="edit"
                      url={`/manage/coupon/update?code=${coupon.code}`}
                    />
                    <TableActionItem type="delete" />
                  </TableAction>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex justify-end gap-3 mt-5">
        <button className={commonClassName.paginationButton}>
          <IconLeftArrow />
        </button>
        <button className={commonClassName.paginationButton}>
          <IconRightArrow />
        </button>
      </div>
    </div>
  );
};
export default page;
