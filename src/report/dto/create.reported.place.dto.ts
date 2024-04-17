export class CreateReportedPlaceDto {
  name: string;
  category: string;
  veganOption: boolean;
  tel: string;
  address: string;
  addressLotNumber: string;
  addressDetail: string;
  location: number[];
  openTimes: string[];
  snsUrl: string;
}
