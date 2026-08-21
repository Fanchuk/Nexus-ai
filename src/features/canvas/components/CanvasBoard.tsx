import Link from "next/link";
import CanvasLinks from "./CanvasLinks";
import WebAnswerCard from "./cards/WebAnswerCard";
import ChartCard from "./cards/ChartCard";
import ImageCard from "./cards/ImageCard";
import DocCard from "./cards/DocCard";
import RecommendationsCard from "./cards/RecommendationsCard";
import LoadingCard from "@/features/states/LoadingCard";

export default function CanvasBoard() {
  return (
    <>
      <div className="space-y-4 px-4 py-6 lg:hidden">
        <Link href="/canvas/web" className="block animate-rise">
          <WebAnswerCard />
        </Link>
        <Link href="/canvas/image" className="block animate-rise [animation-delay:80ms]">
          <ImageCard />
        </Link>
        <div className="animate-rise [animation-delay:160ms]">
          <ChartCard />
        </div>
        <Link href="/canvas/document" className="block animate-rise [animation-delay:240ms]">
          <DocCard />
        </Link>
        <Link href="/canvas/recommendations" className="block animate-rise [animation-delay:320ms]">
          <RecommendationsCard />
        </Link>
        <div className="animate-rise [animation-delay:400ms]">
          <LoadingCard />
        </div>
      </div>

      <div className="hidden overflow-auto px-8 py-8 lg:block">
        <div className="relative h-[780px] w-[1120px]">
          <CanvasLinks />

          <Link
            href="/canvas/web"
            className="absolute left-0 top-0 block w-[300px] animate-rise transition-transform duration-300 hover:-translate-y-1"
          >
            <WebAnswerCard />
          </Link>

          <div className="absolute left-[380px] top-0 w-[320px] animate-rise [animation-delay:80ms] transition-transform duration-300 hover:-translate-y-1">
            <ChartCard />
          </div>

          <Link
            href="/canvas/image"
            className="absolute left-[760px] top-0 block w-[300px] animate-rise [animation-delay:160ms] transition-transform duration-300 hover:-translate-y-1"
          >
            <ImageCard />
          </Link>

          <Link
            href="/canvas/document"
            className="absolute left-0 top-[320px] block w-[300px] animate-rise [animation-delay:240ms] transition-transform duration-300 hover:-translate-y-1"
          >
            <DocCard />
          </Link>

          <Link
            href="/canvas/recommendations"
            className="absolute left-[420px] top-[500px] block w-[340px] animate-rise [animation-delay:320ms] transition-transform duration-300 hover:-translate-y-1"
          >
            <RecommendationsCard />
          </Link>

          <div className="absolute left-[800px] top-[420px] w-[280px] animate-rise [animation-delay:400ms]">
            <LoadingCard />
          </div>
        </div>
      </div>
    </>
  );
}