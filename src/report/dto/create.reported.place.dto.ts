export class CreateReportedPlaceDto {
  name: string;
  category: string;
  vegan_option: boolean;
  tel: string;
  address: string;
  address_lot_number: string;
  address_detail: string;
  location: number[];
  open_times: string[];
  sns_url: string;
}
