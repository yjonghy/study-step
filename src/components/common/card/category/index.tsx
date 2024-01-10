import process from "process";
import {useState} from "react";
import {MotionFast} from "@src/types/ButtonType";

export const categoryCardParent = `
    w-full grid gap-[16px] 
    desktop:grid-cols-5 
    tablet:grid-cols-2 
`

export const mainCategoryCardParent = `
    w-full grid 
    fullCol:grid-cols-5 
    halfCol:grid-cols-2
    desktop:gap-x-[12px] desktop:gap-y-[12px]
    tablet:gap-x-[10px] tablet:gap-y-[10px]
    mobile:gap-x-[8px] mobile:gap-y-[8px]
`
export const categoryIcDir = process.env.NEXT_PUBLIC_DEFAULT_IMAGE_URL + "web/icon/category/"


export const getCategoryImage = (categoryId) => {
    const imageUrl = categoryIcDir
    switch (categoryId) {
        case 1 :
            return imageUrl + "ic-photovideostudio.svg"
        case 2 :
            return imageUrl + "ic-productionset.svg"
        case 3 :
            return imageUrl + "ic-dancestudio.svg"
        case 4 :
            return imageUrl + "ic-recordingstudio.svg"
        case 5 :
            return imageUrl + "ic-warehouse.svg"
        case 6 :
            return imageUrl + "ic-house.svg"
        case 7 :
            return imageUrl + "ic-apartmentloft.svg"
        case 8 :
            return imageUrl + "ic-mansion.svg"
        case 9 :
            return imageUrl + "ic-restaurantscafes.svg"
        case 10 :
            return imageUrl + "ic-commercialspace.svg"

    }
}
export const getLocalImage = (categoryId) => {
    const imageUrl = '/images/icon/category/'
    switch (categoryId) {
        case 1 :
            return imageUrl + "ic-photovideostudio.svg"
        case 2 :
            return imageUrl + "ic-productionset.svg"
        case 3 :
            return imageUrl + "ic-dancestudio.svg"
        case 4 :
            return imageUrl + "ic-recordingstudio.svg"
        case 5 :
            return imageUrl + "ic-warehouse.svg"
        case 6 :
            return imageUrl + "ic-house.svg"
        case 7 :
            return imageUrl + "ic-apartmentloft.svg"
        case 8 :
            return imageUrl + "ic-mansion.svg"
        case 9 :
            return imageUrl + "ic-restaurantscafes.svg"
        case 10 :
            return imageUrl + "ic-commercialspace.svg"

    }
}


export const getCategoryGray050Image = (categoryId) => {
    const imageUrl = categoryIcDir + "gray050/"
    switch (categoryId) {
        case 1 :
            return imageUrl + "ic-photovideostudio.svg"
        case 2 :
            return imageUrl + "ic-productionset.svg"
        case 3 :
            return imageUrl + "ic-dancestudio.svg"
        case 4 :
            return imageUrl + "ic-recordingstudio.svg"
        case 5 :
            return imageUrl + "ic-warehouse.svg"
        case 6 :
            return imageUrl + "ic-house.svg"
        case 7 :
            return imageUrl + "ic-apartmentloft.svg"
        case 8 :
            return imageUrl + "ic-mansion.svg"
        case 9 :
            return imageUrl + "ic-restaurantscafes.svg"
        case 10 :
            return imageUrl + "ic-commercialspace.svg"
    }
}



export default function CategoryCard(props: any) {

    const clickCategory = () => props.onSelect && props.onSelect(props.id)
    const [icLoad, setIcLoad] = useState(true)

    return (
        <article
            onClick={clickCategory}
            className={`relative rounded-[16px] mobile:rounded-[8px] cursor-pointer flex items-center ${MotionFast}
            h-[156px]
            tablet:h-[148px]
            mobile:h-[124px]
            ${props.selected &&
            props.selected.includes(props.id) ?
                "bg-blue005 border-[2px] border-hourblue" : "bg-gray010 hover:bg-gray015 border border-transparent"}`}>
            <div className='w-full flex flex-col gap-[8px] mobile:gap-[6px] items-center justify-center relative'>
                <img
                    onLoad={() => setIcLoad(false)}
                    className={`w-[54px] h-[54px] ${icLoad && 'hidden'}
                                tablet:w-[54px] tablet:h-[54px]
                                mobile:w-[46px] mobile:h-[46px]`}
                    src={getCategoryImage(props.id)} alt={props.title}/>


                <img
                    className={`w-[54px] h-[54px] ${!icLoad && 'hidden'}
                                tablet:w-[54px] tablet:h-[54px]
                                mobile:w-[46px] mobile:h-[46px]`}
                    src={getLocalImage(props.id)} alt={props.title}
                />


                <div className={props.titleStyle + " text-center"}>{props.title}</div>
            </div>
        </article>
    )
}