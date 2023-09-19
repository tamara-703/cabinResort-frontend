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


export interface Reservaions {
  id: number
  reserved_cabin_id: ReservedCabinId
  check_out: string
  check_in: string
  guest_id: GuestId
}

export interface ReservedCabinId {
  id: number
  sleeps: number
  price: number
  description: string
  capacity: number
  cabin_name: string
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


export interface LogIn{
  username: string
  password: string
}
















