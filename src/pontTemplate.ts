// eslint-disable-next-line import/no-extraneous-dependencies
import { CodeGenerator, Interface } from 'pont-engine'

export default class MyGenerator extends CodeGenerator {
  /** 获取接口内容的类型定义代码 */
  getInterfaceContentInDeclaration(inter: Interface): string {
    const paramsCode = inter.getParamsCode()
    const bodyParamsCode = inter.getBodyParamsCode()
    const requestParams = bodyParamsCode
      ? `bodyParams: ${bodyParamsCode}`
      : `params: Params`

    return `
      export ${paramsCode}

      export type Response = ${inter.responseType};
      export const init: Response;
      export function request(${requestParams}): Promise<${inter.responseType}>;
    `
  }

  /** 获取接口实现内容的代码 */
  getInterfaceContent(inter: Interface): string {
    const { method, path } = inter

    const name = this.dataSource.name
    const pathPrefix = name === 'oauth' ? '/oauth' : '/partners-b-business'
    return `
      /**
       * @desc ${inter.description}
       */

      ${JSON.stringify(path)}

      import * as defs from '../../baseClass';
      import http from '@/http';

      export ${inter.getParamsCode()}
      export const init = ${inter.response.getInitialValue()};

      export async function request(params) {
        return http.${inter.method}(
          '${pathPrefix}${path}',
          params
        );
      }
    `
  }
}
