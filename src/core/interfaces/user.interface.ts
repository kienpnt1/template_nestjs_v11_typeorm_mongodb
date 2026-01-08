export interface IUser {
  id: string;
  username: string;
  mapId: string;
  roleMax: string;
  roleLevel: string;
  roleCode: string;
  accessKey: string;
  languageId: string;
  projectId: string;
  type: string;
  departmentId: string;
  positionId: string;
  iat?: number;
  exp?: number;
}

// export interface IUser {
//   UserId: string;
//   UserMapId: string;
//   RoleMax: string;
//   RoleLevel: string;
//   RoleCode: string;
//   AccessKey: string;
//   LanguageId: string;
//   ProjectId: string;
//   Type: string;
//   DepartmentId: string;
//   PositionId: string;
// }
