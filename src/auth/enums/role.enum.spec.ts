import { Role } from './role.enum';

describe('Role', () => {
  it('should be defined', () => {
    expect(Role).toBeDefined();
  });

  it('should have a property ADMIN with value Admin', () => {
    expect(Role.ADMIN).toBe('Admin');
  });

  it('should have a property CUSTOMER with value Customer', () => {
    expect(Role.CUSTOMER).toBe('Customer');
  });

  it('should have a property ANY with value Any', () => {
    expect(Role.ANY).toBe('Any');
  });
});
