export const NavbarSkeleton = () => {
  return (
    <div className="flex container py-7 px-10 gap-7 justify-between items-center">
      <div className="flex-1">
        <div className="h-12 bg-gray-300 max-w-[713px] rounded-md animate-pulse"></div>
      </div>
      <div className="flex gap-7">
        <div className="h-12 bg-gray-300 rounded-md w-36   animate-pulse"></div>
        <div className="h-12 bg-gray-300 rounded-md w-36 animate-pulse"></div>
      </div>
    </div>
  );
};

export const SidebarSkeleton = () => {
  return (
    <div className=" bg-white w-[255px] sticky top-0 h-screen shadow-sidebar overflow-y-none">
      <div className="px-10 flex flex-col gap-8 h-full">
        <div className=" sticky top-0 z-10 pt-7 pb-2 ">
          <div className="bg-gray-300 animate-pulse h-11">
          </div>
        </div>
        <div className="flex flex-col gap-10 justify-between h-full">
          <div className="flex flex-col gap-10 flex-1 bg-gray-300 animate-pulse">
          </div>
          <div className="pb-7 text-gray-4 font-medium text-sm">
            <div className="bg-gray-300 animate-pulse rounded-md h-5"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
