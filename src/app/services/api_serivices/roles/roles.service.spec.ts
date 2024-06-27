import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RolesService } from './roles.service';
import { environment } from '../../../../environments/environment.development';

describe('RolesService', () => {
  let service: RolesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RolesService]
    });
    service = TestBed.inject(RolesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve roles', () => {
    const dummyRoles = [{ id: 1, name: 'Admin' }, { id: 2, name: 'User' }];

    service.getRoles().subscribe(roles => {
      expect(roles).toEqual(dummyRoles);
    });

    const req = httpMock.expectOne(environment.URL_API + 'roles');
    expect(req.request.method).toBe('GET');
    req.flush(dummyRoles);
  });

  it('should retrieve role by id', () => {
    const dummyRole = { id: 1, name: 'Admin' };
    const roleId = 1;

    service.getRolById(roleId).subscribe(role => {
      expect(role).toEqual(dummyRole);
    });

    const req = httpMock.expectOne(environment.URL_API + `roles/${roleId}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRole);
  });
});