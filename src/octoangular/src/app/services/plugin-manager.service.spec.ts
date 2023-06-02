import { TestBed } from '@angular/core/testing';

import { PluginManagerService } from './plugin-manager.service';

describe('PluginManagerService', () => {
  let service: PluginManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PluginManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
