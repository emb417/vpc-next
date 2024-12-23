import Image from "next/image";

export default function LoadingMessage() {
    return <div className="h-screen w-screen flex flex-col items-center justify-start pt-4 gap-4">
            <Image src="/icon.png" width={128} height={128} alt="Loading..." className="animate-pulse" />
            <div className="text-4xl text-stone-50 animate-pulse">Loading...</div>
        </div>
  }