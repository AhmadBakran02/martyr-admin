import { Massacre } from "@/lib/massacreApi";
import { MediaItem } from "./MediaItemResponse";

export interface RequestMastyrData {
  notes: string;
  _id: string;
  requesterName: string;
  requesterEmail: string;
  relationship: string;
  fullName: string;
  dateOfMartyrdom: string | null;
  burialDate: string | null;
  nationalIdNumber: string | null;
  anonymous: boolean;
  name: string;
  fatherName: string | null;
  motherName: string | null;
  lastName: string | null;
  dateOfBirth: string;
  gender: string;
  maritalStatus: string;
  numberOfChildren: number;
  profession: string;
  country: string;
  governorate: string;
  city: string;
  neighborhood: string;
  ethnicAffiliation: string;
  age: string | null;
  ageStatus: string | null;
  dissident: string;
  preRevolution: string;
  stateOfMartyrdom: string | null;
  martyrdomGovernorate: string | null;
  cityOfMartyrdom: string | null;
  martyrdomSite: string | null;
  citationMethod: string | null;
  like: number;
  photoId: string | null;
  media: MediaItem[];
  massacreId: Massacre | null;
  status: string;
  createdAt: string;
  updatedAt: string;
  requestId: string;
  __v: number;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface AddRequestResponse {
  success: boolean;
  message: string;
  data: {
    addRequests: RequestMastyrData[];
    pagination: Pagination;
  };
}
