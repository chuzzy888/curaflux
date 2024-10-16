import { Skeleton } from "../../components/ui/skeleton";

export const ShiftSkeleton = ({ num }: { num: number }) => {
  const l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className=" space-y-2">
      {l.map((_s, i) => (
        <div key={i}>
          <Skeleton className="max-w-[1540px] h-[150px] rounded-md" />
        </div>
      ))}
    </div>
  );
};

export const ShiftDetailsSkeleton = ({
  num,
  className,
}: {
  num: number;
  className: string;
}) => {
  const l = [];
  for (let i = 0; i < num; i++) {
    l.push(i);
  }

  return (
    <div className=" space-y-2">
      {l.map((_s, i) => (
        <div key={i}>
          <Skeleton className={`${className}`} />
        </div>
      ))}
    </div>
  );
};
