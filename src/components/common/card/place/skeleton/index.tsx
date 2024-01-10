import SkeletonBox from "@src/components/common/skeleton-box";
import {Heading_Body_Md, Heading_Body_Sm, Heading_Body_Xs} from "@src/types/SkeletonType";

export default function Skeleton() {
    return(
        <div className="flex flex-col">
            <SkeletonBox boxStyle={`rounded-[8px] w-full aspect-[3/2]`}/>
            <SkeletonBox boxStyle={`mt-[10px] rounded-[4px] ${Heading_Body_Xs} w-full`}/>
            <SkeletonBox boxStyle={`mt-[2px] rounded-[4px] ${Heading_Body_Xs} w-[96px]`}/>
            <SkeletonBox boxStyle={`mt-[8px] rounded-[4px] ${Heading_Body_Sm} w-[60px]`}/>
        </div>
    )
}