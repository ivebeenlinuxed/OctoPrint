import {TestBed} from "@angular/core/testing";

import {OctoPrintClientService} from "./octo-print-client.service";

describe("OctoPrintClientService", () => {
    let service: OctoPrintClientService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OctoPrintClientService);
    });

    it("should be created", () => {
        expect(service).toBeTruthy();
    });
});
