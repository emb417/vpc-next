import Image from "next/image";

export default function LoadingMessage({ message = "Loading..." }) {
    return <div className="flex flex-col items-center pt-10 gap-4 w-full">
            <Image src="/icon.png" width={128} height={128} alt={`${message}`} className="animate-pulse" />
            <div className="text-center text-4xl text-stone-200 animate-pulse">{message}</div>
            <div className="text-center text-xs text-stone-400">vpc-next v{process.env.npm_package_version}</div>
        </div>
  }