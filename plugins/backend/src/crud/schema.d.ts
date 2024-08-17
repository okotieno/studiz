export interface CrudGeneratorSchema {
  backendProjectName?: string;
  name: string;
}

export interface BackendGeneratorResolvedSchema {
  fileName: string;
  fileNamePlural: string;
  propertyName: string;
  propertyNamePlural: string;
  constantName: string;
  backendProjectName: string;
  scopeName: string;
  name: string;
  constantNamePlural: string;
  className: string;
  timeStamp: string;
}
