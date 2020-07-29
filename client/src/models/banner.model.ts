export class Banner {
    constructor(
        public name: string,
        public bundesland: string,
        public bannerLeft: string,
        public bannerRight: string,
        public bannerHorizontal: string,
        public landingPageUrl: string,
        public startDate: Date,
        public endDate: Date,
    ) { }
}