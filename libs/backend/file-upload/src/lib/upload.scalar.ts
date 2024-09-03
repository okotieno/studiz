import { Scalar } from '@nestjs/graphql';
// import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import { EnumValueNode, FloatValueNode, IntValueNode, StringValueNode } from 'graphql/language';

@Scalar('Upload')
export class Upload {
  description = 'Upload files';

  async parseValue(value: string) {
    // return GraphQLUpload.parseValue(value);
  }

  serialize(value: string) {
    // return GraphQLUpload.serialize(value);
  }

  parseLiteral(ast: IntValueNode | FloatValueNode | StringValueNode | EnumValueNode) {
    // return GraphQLUpload.parseLiteral(ast, ast.value as any);
  }
}
