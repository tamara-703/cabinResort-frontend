
//models for user
export interface GuestId {
  id: number
  username: string
  password: string
  email: string
  phone: string
  address: string
  language: string
  role: string
  enabled: boolean
  last_name: string
  first_name: string
  authorities: Authority[]
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
}

export interface Authority {
  authority: string
}


//model for rsvp
export interface Reservations {
  id: number
  reserved_cabin_id: ReservedCabinId
  check_out: string
  check_in: string
  guest_id: {
    id: number,
    username: string,
    password: string,
    email: string,
    phone: string,
    address: string,
    language: string,
    role: string,
    last_name: string,
    first_name: string
  }
}


//model for cabins
export interface ReservedCabinId {
  id: number
  sleeps: number
  price: number
  description: string
  capacity: number
  cabin_name: string
  cabinNameAr: string
  cabinloc: Cabinlocation
  no_rooms: number
  no_bathrooms: number
  amenities_id: AmenitiesId
  image_id: ImageId
}

export interface AmenitiesId {
  id: number
  patio: boolean
  fireplace: boolean
  kitchen: boolean
  jacuzzi: boolean
  outdoor_hot_shower: boolean
  outdoor_furniture: boolean
  pet_friendly: boolean
}

export interface ImageId {
  id: number
  url: string
}


export interface Cabin {
  id: number
  sleeps: number
  price: number
  description: string
  descAr: string
  capacity: number
  cabinloc: Cabinlocation
  cabin_name: string
  cabinNameAr: string
  image_id: ImageId
  amenities_id: AmenitiesId
  no_rooms: number
  no_bathrooms: number
}

export interface Cabinlocation {
  stateId: string
  address: string
  city: string
  cityAr: string
  zip: string
}

export interface State {
  name: string
  code: string
  flag: string
}



//model for making a new user
export interface newUser {
  username: string
  password: string
  email: string
  phone: string
  address: string
  language: string
  role: string
  last_name: string
  first_name: string
}


//model for cabin rsvp
export interface CabinReserve {
  id : number,
      sleeps : number,
      price : number,
      description : string,
      capacity : number,
      cabinloc : Cabinlocation,
      cabin_name : string,
      image : string,
      amenities_id : AmenitiesId,
      no_rooms : number,
      no_bathrooms : number
}
