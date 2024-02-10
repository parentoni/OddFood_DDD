import axios, {  Method, RawAxiosRequestHeaders } from 'axios'
import fs from 'fs'
import https from 'https'
import { Either, left, right } from './Result'
import { CommonUseCaseResult } from './Response/UseCaseError'

export type RequestProps = {
  url: string,
  method: Method
  headers?: RawAxiosRequestHeaders,
  data?:string,
}
/**
 * 
 * @class CertificatedApi
 * @classdesc Defines an API client with certification. Useful for interacting 
 * with p12 apis.
 *
 * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
 */
export class CertificatedApi {

  file: Buffer

  //Load certificate
  constructor(fileLocation:string){
    this.file = fs.readFileSync(__dirname + fileLocation)
  }

  /**
   * @param {RequestProps} props 
   * Axios request with certificate
   * @author Arthur Parentoni Guimaraes <parentoni.arthur@gmail.com>
   */
  public async request<T>(props: RequestProps): Promise<Either<CommonUseCaseResult.UnexpectedError, T>> {

    try{
      const response = await axios.request({
        url: props.url,
        method: props.method,
        headers: props.headers,
        data: props.data,
        httpsAgent: new https.Agent({
          pfx: this.file,
          passphrase: ''
        })
      })

      //return data as specified type
      return right(response.data as T)

    } catch(error) {
      //response was non successful
      return left(CommonUseCaseResult.UnexpectedError.create(error))
    }


  }


}

