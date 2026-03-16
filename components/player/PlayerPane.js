export default function PlayerPane({ children, title }) {
  return (
    <div className="flex flex-col border-2 border-orange-500 dark:border-orange-950 rounded-xl px-2 pt-1 pb-2 gap-1">
      <div className="flex items-center text-stone-800 dark:text-stone-200 text-lg lg:text-xl pl-1 h-[38px]">
        {title}
      </div>
      <hr className="w-full border-1 border-orange-500 dark:border-orange-950 pb-1" />
      <div className="flex flex-col sm:flex-row gap-2">{children}</div>
    </div>
  );
}
