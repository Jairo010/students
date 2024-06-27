import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MajorsService } from './majors.service';
import { environment } from '../../../../environments/environment.development';

describe('MajorsService', () => {
  let service: MajorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MajorsService]
    });
    service = TestBed.inject(MajorsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve majors', () => {
    const mockMajors = [{ id: 1, name: 'Major 1' }, { id: 2, name: 'Major 2' }];

    service.getMajors().subscribe(majors => {
      expect(majors).toEqual(mockMajors);
    });

    const req = httpMock.expectOne(environment.URL_API + 'majors');
    expect(req.request.method).toBe('GET');
    req.flush(mockMajors);
  });

  it('should retrieve major by id', () => {
    const mockMajor = { id: 1, name: 'Major 1' };
    const id = 1;

    service.getMajorById(id).subscribe(major => {
      expect(major).toEqual(mockMajor);
    });

    const req = httpMock.expectOne(environment.URL_API + `majors/${id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockMajor);
  });
});