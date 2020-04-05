export class Anzeige {
  constructor(
    public firma: String,
    public address: String,
    public bundesland: String,
    public services: String,
    public email: String,
    public website: String,
    public phone: String,
    public photoUrl: String,
    public startDate: Date,
    public endDate: Date,
    public googleMapsUrl: string,
    public aboutUs: string,
    public subtitle: string
  ) {}
}
