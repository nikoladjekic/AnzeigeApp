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
    public googleMapsUrl: String,
    public aboutUs: String,
    public subtitle: String,
    public workinghours: Workinghours
  ) {}
}

export class Workinghours {
  constructor(
    public monday: String,
    public tuesday: String,
    public wednesday: String,
    public thursday: String,
    public friday: String,
    public saturday: String,
    public sunday: String
  ) {}
}
