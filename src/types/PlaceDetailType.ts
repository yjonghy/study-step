export interface PlaceDetailType {
    id: number,
    userId: number,
    status: string,
    title: string,
    description: string,
    link: string,
    price: number,
    minBookingHours: number,
    maxVisitors: number,
    houseRules: string,
    country: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    zipCode: number,
    latitude: number,
    longitude: number,
    category: string,
    size: number,
    parking: number,
    parkingDetailInfo: string,
    coverImageId: number,
    coverImagePath: string,
    cellPhone: string,
    website: string,
    draftStep: string,
    createdAt: string,
    updatedAt: string,
    statusDisplay: string,
    categoryDisplay: string,
    placeImages: PlaceDetailImageType[],
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userProfileImagePath: string

}

export interface PlaceDetailImageType {
    id: number,
    userId: number,
    type: string,
    imagePath: string,
    imageUrl: null,
    width: number,
    height: number,
    createdAt: string,
    updatedAt: string
}