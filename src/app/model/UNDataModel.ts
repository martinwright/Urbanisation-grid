export class UNDataRecord {
    'Country or Area': string;
    Year: string;
    Area: string;
    Sex: string;
    RecordType: string;
    Reliability: string;
    SourceYear: string;
    Value: number;
    ValueFootnotes: string;
}
export class UNUniqueDataRecord {
    'Country or Area': string;
    countryID: string;
    flagSrc: string;
}
export interface UNDataResponse {
    places: UNDataRecord[];
}
